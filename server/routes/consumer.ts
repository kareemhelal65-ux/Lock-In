import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { supabase } from '../lib/supabase.js';

const prisma = new PrismaClient();
export const consumerRouter = Router();

// In-memory store for lock invites (Real apps would use a DB table)
const lockInviteStore: Record<string, any[]> = {};

// Sequential order number generator (100-1500, resets daily)
const getNextOrderNumber = async (): Promise<string> => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const latestOrder = await prisma.order.findFirst({
        where: { createdAt: { gte: todayStart } },
        orderBy: { orderNumber: 'desc' },
        select: { orderNumber: true }
    });
    
    let nextNum = 100;
    if (latestOrder?.orderNumber) {
        const parsed = parseInt(latestOrder.orderNumber.replace('#', ''));
        if (!isNaN(parsed) && parsed >= 100 && parsed < 1500) {
            nextNum = parsed + 1;
        }
    }
    return `#${nextNum}`;
};

// Helper to format user response with streaks
const formatUserResponse = (user: any) => {
    const { passwordHash: _ph, streaksAsUser, streaksAsFriend, ...userWithoutPassword } = user;

    // Combine streaks and deduplicate by friendId
    const rawStreaks = [...(streaksAsUser || []), ...(streaksAsFriend || [])];
    const streakMap = new Map<string, any>();

    rawStreaks.forEach((s: any) => {
        const isUser = s.userId === user.id;
        const friend = isUser ? s.friend : s.user;
        const friendId = friend.id;

        // Calculate hours remaining (48 hour streak window logic)
        const hoursPassed = (Date.now() - new Date(s.updatedAt).getTime()) / (1000 * 60 * 60);
        const hoursRemaining = Math.max(0, 48 - Math.floor(hoursPassed));
        // No-reset on Thu(4), Fri(5), Sat(6) — orders don't happen on these days
        const today = new Date().getDay();
        const isWeekendNoOrder = today === 4 || today === 5 || today === 6;
        const isActive = (hoursRemaining > 0 || isWeekendNoOrder) && s.isActive;

        const streakData = {
            friendId,
            friendName: friend.name,
            friendAvatar: friend.avatar,
            lastOrderedAt: s.updatedAt,
            hoursRemaining,
            isActive,
            locksTogether: s.streak
        };

        // If duplicate exists, keep the one with higher streak or later update
        if (!streakMap.has(friendId) || s.streak > streakMap.get(friendId).locksTogether) {
            streakMap.set(friendId, streakData);
        }
    });

    const streaks = Array.from(streakMap.values());

    return {
        ...userWithoutPassword,
        streaks
    };
};

// Helper to update hype score and award keys
export const updateHypeScore = async (userId: string, points: number, tx: any = prisma, reason?: string) => {
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (!user) return { updatedUser: null, keysEarned: 0 };

    const oldScore = user.hypeScore;
    const newScore = Math.max(0, oldScore + points);
    
    // Key reward every 250 points (only for positive gains)
    const oldMilestone = Math.floor(oldScore / 250);
    const newMilestone = Math.floor(newScore / 250);
    
    let keysEarned = 0;
    if (newMilestone > oldMilestone) {
        keysEarned = newMilestone - oldMilestone;
    }

    const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
            hypeScore: newScore,
            keysAvailable: { increment: keysEarned }
        }
    });

    // Log the hype change for periodic leaderboards
    const autoReason = reason || (points >= 150 ? 'Gamble Reward' : 'Order Completion');
    await tx.hypeLog.create({
        data: {
            userId,
            points,
            reason: autoReason
        }
    });

    return { updatedUser: formatUserResponse(updatedUser), keysEarned };
};

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer Setup (Memory Storage is better for Vercel/Serverless)
const storage = multer.memoryStorage();
const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// 1. Consumer Signup
consumerRouter.post('/signup', async (req, res) => {
    try {
        const { email, username, password, name } = req.body;

        // Basic validation
        if (!email || !username || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check for existing user
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'Username or Email already in use' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create User
        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                passwordHash,
                name: name || username, // Default name to username if not provided yet
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`, // Default avatar
                hypeScore: 0,
                keysAvailable: 0,
                walletBalance: 0.0,
            },
            include: {
                streaksAsUser: { include: { friend: true } },
                streaksAsFriend: { include: { user: true } }
            }
        }) as any;

        // Strip password before returning
        const formattedUser = formatUserResponse(newUser);
        res.status(201).json({ message: 'User created successfully', user: formattedUser });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 2. Consumer Login
consumerRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const user = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username: email }] // Allow login with email or username
            },
            include: {
                streaksAsUser: { include: { friend: true } },
                streaksAsFriend: { include: { user: true } }
            }
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, user.passwordHash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if user needs onboarding (e.g. if their name is exactly their username, or they somehow lack an avatar)
        const needsOnboarding = user.name === user.username;

        const formattedUser = formatUserResponse(user);

        res.json({
            message: 'Login successful',
            user: { ...formattedUser, needsOnboarding }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 3. Consumer Onboarding (Update Profile)
consumerRouter.post('/onboard', upload.single('avatarFile'), async (req, res) => {
    try {
        const { userId, name, username, avatarUrl } = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const updateData: any = {};
        if (name) updateData.name = name;
        if (username) updateData.username = username;

        // Handle avatar: check if file was uploaded via multer, otherwise fall back to avatarUrl
        if (req.file) {
            updateData.avatar = `/uploads/${req.file.filename}`;
        } else if (avatarUrl) {
            updateData.avatar = avatarUrl;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            include: {
                streaksAsUser: { include: { friend: true } },
                streaksAsFriend: { include: { user: true } }
            }
        });

        const formattedUser = formatUserResponse(updatedUser);
        res.json({ message: 'Onboarding completed successfully', user: formattedUser });

    } catch (error) {
        console.error('Onboarding error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update Consumer Stats
consumerRouter.patch('/stats', async (req, res) => {
    try {
        const { userId, hypeScorePoints } = req.body;

        if (!userId) return res.status(400).json({ error: 'Missing userId' });

        const user = await (prisma.user as any).findUnique({ where: { id: userId } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const data: any = {};

        if (hypeScorePoints) {
            data.hypeScore = { increment: hypeScorePoints };
        }

        const updatedUser = await (prisma.user as any).update({
            where: { id: userId },
            data,
            include: {
                streaksAsUser: { include: { friend: true } },
                streaksAsFriend: { include: { user: true } }
            }
        });

        const formattedUser = formatUserResponse(updatedUser);
        res.json({ message: 'Stats updated', user: formattedUser });

    } catch (error) {
        console.error('Stats update error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Update Friendship Streaks logic has been moved to vendorData.ts (awarded on FIRE));

// Upload Receipt (Now with Supabase Storage Cloud fallback)
consumerRouter.post('/upload-receipt', upload.single('receipt'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Only attempt Supabase upload if configured (for production/Vercel)
        if (supabase) {
            const fileName = `receipts/${Date.now()}-${req.file.originalname}`;

            const { data, error } = await supabase.storage
                .from('receipts')
                .upload(fileName, req.file.buffer, {
                    contentType: req.file.mimetype,
                    upsert: true
                });

            if (error) {
                console.error('Supabase Storage Error:', error);
                // Fallback to local if Supabase fails (handled below)
            } else {
                const { data: { publicUrl } } = supabase.storage
                    .from('receipts')
                    .getPublicUrl(fileName);
                return res.json({ url: publicUrl });
            }
        }

        // Default / Fallback: Local Storage (Works for localhost/dev)
        if (process.env.VERCEL) {
             return res.status(400).json({ 
                error: 'Supabase Storage keys missing on Vercel. Production uploads require cloud storage.' 
             });
        }

        const fileName = `receipt-${Date.now()}${path.extname(req.file.originalname)}`;
        const filePath = path.join(UPLOADS_DIR, fileName);
        fs.writeFileSync(filePath, req.file.buffer);

        const url = `/uploads/${fileName}`;
        res.json({ url });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get User Profile (for polling)
consumerRouter.get('/user/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id },
            include: {
                streaksAsUser: { include: { friend: true } },
                streaksAsFriend: { include: { user: true } },
                inventory: { include: { card: true } }
            }
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        const formattedUser = formatUserResponse(user);
        
        // Find active card from inventory if needed
        const activeUserCard = user.activeCardId 
            ? user.inventory.find((uc: any) => uc.id === user.activeCardId)
            : null;
            
        res.json({ 
            user: { 
                ...formattedUser, 
                activeCard: activeUserCard?.card || null 
            } 
        });
    } catch (error) {
        console.error('Fetch user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get User Orders (for Locks tab)
consumerRouter.get('/:userId/orders', async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await prisma.order.findMany({
            where: {
                participants: {
                    some: { userId }
                }
            },
            include: {
                items: true,
                participants: {
                    where: { userId },
                    select: { hasPaid: true, paymentScreenshotUrl: true, shareAmount: true }
                },
                vendor: {
                    select: { name: true, image: true, instapayAddress: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json({ orders });
    } catch (error) {
        console.error('Get user orders error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create Order (Flash Drop, Solo, or Safe Checkout) [first handler removed - kept below]

// 4. Consumer Explore (Fetch all Vendors)
consumerRouter.get('/explore', async (req, res) => {
    try {
        const vendors = await prisma.vendor.findMany({
            select: {
                id: true,
                name: true,
                image: true,
                bannerImage: true,
                rating: true,
                status: true,
                instapayAddress: true,
                instapayName: true,
            }
        });

        const mappedVendors = vendors.map(v => ({
            id: v.id,
            name: v.name,
            image: v.image || `https://api.dicebear.com/7.x/initials/svg?seed=${v.name}`,
            bannerImage: v.bannerImage,
            rating: v.rating.toFixed(1),
            deliveryTime: '15-25 min',
            activeLocks: 0,
            isOnLock: false,
            onLockCount: 0,
            status: v.status || 'LIVE',
            instapayAddress: v.instapayAddress,
            instapayName: v.instapayName,
        }));

        res.json({ vendors: mappedVendors });
    } catch (error) {
        console.error('Explore fetch error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 5. Create Order
consumerRouter.post('/order', async (req, res) => {
    try {
        const { 
            userId, 
            vendorId, 
            totalAmount, 
            items, 
            isSolo = true, 
            isCoveredByHost = false, 
            participantShare = totalAmount, 
            hasPaid = false,
            useActivePerk = false // NEW: Manual choice for solo orders
        } = req.body;

        if (!userId || !vendorId || !items || items.length === 0) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Apply 0.1% Logic: Zero fees ONLY if card is active AND user chose to use it
        const user = await prisma.user.findUnique({ where: { id: userId } });
        let isZeroFee = false;

        if (user?.activeCardId && useActivePerk) {
            const activeUserCard = await prisma.userCard.findUnique({
                where: { id: user.activeCardId },
                include: { card: true }
            });
            if (activeUserCard?.card.perkCode === 'THE01') {
                isZeroFee = true;
                // Mark card as used
                await prisma.userCard.update({ where: { id: activeUserCard.id }, data: { isUsed: true } });
                await prisma.user.update({ where: { id: userId }, data: { activeCardId: null } });
            }
        }

        const serviceFee = isZeroFee ? 0 : (isSolo ? 10 : 5);
        const adjustedTotal = totalAmount + serviceFee;
        const finalShare = participantShare + serviceFee; 

        const newOrderNumber = await getNextOrderNumber();

        const result = await prisma.$transaction(async (tx) => {
            // Validate vendorId exists to prevent FK violation from mock data
            let actualVendorId = vendorId;
            const vendorCheck = await tx.vendor.findUnique({ where: { id: vendorId } });
            if (!vendorCheck) {
                const firstVendor = await tx.vendor.findFirst();
                if (firstVendor) {
                    actualVendorId = firstVendor.id;
                } else {
                    throw new Error("No vendors available in database");
                }
            }

            // 1. Create Order
            const order = await tx.order.create({
                data: {
                    orderNumber: newOrderNumber,
                    hostId: userId,
                    vendorId: actualVendorId,
                    totalAmount: adjustedTotal,
                    isCoveredByHost,
                    status: isCoveredByHost ? 'PENDING' : 'AWAITING_PAYMENT',
                }
            });

            // 2. Create OrderItems
            await tx.orderItem.createMany({
                data: items.map((item: any) => ({
                    orderId: order.id,
                    menuItemId: item.menuItemId || undefined,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity || 1,
                    modifiers: item.modifiers || "[]",
                    specialNotes: item.specialNotes
                }))
            });

            // 3. Create ParticipantOrder (for the host/solo user)
            const participantOrder = await tx.participantOrder.create({
                data: {
                    orderId: order.id,
                    userId,
                    shareAmount: finalShare,
                    hasPaid: isCoveredByHost ? true : hasPaid
                }
            });

            // Points now awarded upon payment verification in /payment-verification
            const updatedUser = formatUserResponse(user);
            const keysEarned = 0;

            return { order, participantOrder, updatedUser, keysEarned };
        });

        res.status(201).json(result);
    } catch (error: any) {
        console.error('Create order error:', error);
        require('fs').writeFileSync('order_error_log.txt', String(error) + '\n\n' + (error.stack || ''));
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 5b. Get single order by ID
consumerRouter.get('/order/:orderId', async (req, res) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: req.params.orderId },
            include: { items: true, participants: true, vendor: true }
        });
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json({ order });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 5c. Cancel Order (host cancels entire order, or participant cancels their part)
consumerRouter.post('/order/:orderId/cancel', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { userId } = req.body;

        if (!orderId || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { participants: true }
        });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        if (order.status !== 'AWAITING_PAYMENT') {
            return res.status(400).json({ error: 'Cannot cancel an order that is not awaiting payment' });
        }

        // If host cancels, delete the entire order
        if (order.hostId === userId) {
            await prisma.$transaction([
                prisma.participantOrder.deleteMany({ where: { orderId } }),
                prisma.orderItem.deleteMany({ where: { orderId } }),
                prisma.order.delete({ where: { id: orderId } })
            ]);
            return res.json({ message: 'Order cancelled successfully' });
        }

        // If participant cancels, remove only their participant order
        const participantOrder = order.participants.find(p => p.userId === userId);
        if (!participantOrder) {
            return res.status(403).json({ error: 'You are not a participant in this order' });
        }

        await prisma.participantOrder.delete({ where: { id: participantOrder.id } });

        // Recalculate total after participant leaves
        const remainingParticipants = await prisma.participantOrder.findMany({ where: { orderId } });
        if (remainingParticipants.length === 0) {
            // No participants left, delete the order entirely
            await prisma.orderItem.deleteMany({ where: { orderId } });
            await prisma.order.delete({ where: { id: orderId } });
        } else {
            const newTotal = remainingParticipants.reduce((sum, p) => sum + p.shareAmount, 0);
            await prisma.order.update({ where: { id: orderId }, data: { totalAmount: newTotal } });
        }

        res.json({ message: 'You have been removed from this order' });
    } catch (error) {
        console.error('Cancel order error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 6. Payment Verification (OCR Simulator processing)
consumerRouter.post('/payment-verification', async (req, res) => {
    try {
        const { orderId, userId, amountExpected, receiptData } = req.body;

        if (!orderId || !userId || !amountExpected) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // 1. Manual Review Only
        // We no longer perform OCR validation here. 
        // Any submitted receiptData is considered a successful upload,
        // and it is strictly up to the vendor to manually accept/reject it.
        if (!receiptData) {
            return res.status(400).json({ error: 'Receipt upload is required.' });
        }

        // 2. Update ParticipantOrder to Paid
        const participantOrder = await prisma.participantOrder.findFirst({
            where: { orderId, userId }
        });

        if (!participantOrder) {
            return res.status(404).json({ error: 'Participant order not found' });
        }

        await prisma.participantOrder.update({
            where: { id: participantOrder.id },
            data: {
                hasPaid: true,
                paymentScreenshotUrl: receiptData // Store the receipt data/url for the vendor to review manually
            }
        });

        // 3. Check if all participants have paid
        const allParticipants = await prisma.participantOrder.findMany({
            where: { orderId }
        });

        const allPaid = allParticipants.every(p => p.hasPaid);

        if (allPaid) {
            // Update Order status to AWAITING_VERIFICATION (ready for vendor to review manually)
            await prisma.order.update({
                where: { id: orderId },
                data: { status: 'AWAITING_VERIFICATION' }
            });
            
            // Auto-remove safe: find the in-memory safe linked to this order and mark COMPLETED
            for (const [safeId, safe] of Object.entries(activeSafeSessions)) {
                if ((safe as any).orderId === orderId) {
                    (safe as any).status = 'COMPLETED';
                    break;
                }
            }
        }

        // 4. Hype Score awarding is now deferred until the vendor approves & fires the order.
        // This logic has been moved to vendorData.ts status update route.

        res.json({
            message: 'Receipt uploaded successfully. Pending vendor manual review.',
            allPaid,
            orderStatus: allPaid ? 'AWAITING_VERIFICATION' : 'AWAITING_PAYMENT'
        });

    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 7. Generic OCR Mock Endpoint (Alternative approach for testing)
consumerRouter.post('/ocr', upload.single('receipt'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        
        // This is a mock endpoint for testing. We just return a success message.
        // Tesseract.js could be used here if real OCR was needed from the buffer.
        
        res.json({ 
            status: 'ok', 
            text: 'MOCK OCR RESULT: 150 EGP detected',
            confidence: 0.95
        });
    } catch (error) {
        console.error('OCR error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// 8. Friends: Search users by username
consumerRouter.get('/friends/search', async (req, res) => {
    try {
        const { q, userId } = req.query as { q: string; userId: string };
        if (!q || q.length < 2) return res.json({ users: [] });
        const users = await prisma.user.findMany({
            where: { username: { contains: q }, ...(userId ? { NOT: { id: userId } } : {}) },
            select: { id: true, name: true, username: true, avatar: true, hypeScore: true },
            take: 10
        });
        res.json({ users });
    } catch (error) {
        console.error('Friend search error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 8b. Leaderboard (Global — with period filter)
consumerRouter.get('/leaderboard', async (req, res) => {
    try {
        const period = (req.query.period as string) || 'weekly';
        
        if (period === 'weekly' || period === 'monthly') {
            const dateFilter = new Date(Date.now() - (period === 'weekly' ? 7 : 30) * 24 * 60 * 60 * 1000);
            
            // Real Periodic Data: Sum points from HypeLog within the window
            const aggregations = await prisma.hypeLog.groupBy({
                by: ['userId'],
                where: { createdAt: { gte: dateFilter } },
                _sum: { points: true },
                orderBy: { _sum: { points: 'desc' } },
                take: 50
            });

            const userIds = aggregations.map(a => a.userId);
            const users = await prisma.user.findMany({
                where: { id: { in: userIds } },
                select: { id: true, name: true, username: true, avatar: true }
            });

            const leaderboard = aggregations.map(a => {
                const user = users.find(u => u.id === a.userId);
                return {
                    ...user,
                    hypeScore: a._sum.points || 0
                };
            }).sort((a, b) => (b.hypeScore || 0) - (a.hypeScore || 0));

            return res.json({ leaderboard, period });
        }

        // Return empty or default to weekly if 'all' or unknown is requested
        return res.json({ leaderboard: [], period, message: "All-time leaderboard has been removed." });
    } catch (error) {
        console.error('Leaderboard error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 8c. Leaderboard (Friends only)
consumerRouter.get('/leaderboard/friends/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const streaks = await prisma.friendshipStreak.findMany({
            where: { OR: [{ userId }, { friendId: userId }], isActive: true },
            select: { userId: true, friendId: true }
        });
        const friendIds = [...new Set(streaks.flatMap(s => [s.userId, s.friendId]))];
        
        const users = await prisma.user.findMany({
            where: { id: { in: friendIds } },
            orderBy: { hypeScore: 'desc' },
            select: { id: true, name: true, username: true, avatar: true, hypeScore: true },
            take: 50
        });
        res.json({ leaderboard: users });
    } catch (error) {
        console.error('Friends leaderboard error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 9. Friends: Send a friend request (creates inactive streak record)
consumerRouter.post('/friends/request', async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        if (!userId || !friendId) return res.status(400).json({ error: 'Missing userId or friendId' });
        if (userId === friendId) return res.status(400).json({ error: 'Cannot add yourself' });
        // Check if already friends or request exists
        const existing = await prisma.friendshipStreak.findFirst({
            where: {
                OR: [
                    { userId, friendId },
                    { userId: friendId, friendId: userId }
                ]
            }
        });
        if (existing) return res.status(409).json({ error: 'Request already sent or already friends' });
        await prisma.friendshipStreak.create({
            data: { userId, friendId, streak: 0, isActive: false }
        });
        res.json({ message: 'Friend request sent' });
    } catch (error) {
        console.error('Friend request error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 9b. (Legacy) Friends: Add directly (kept for compatibility)
consumerRouter.post('/friends/add', async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        if (!userId || !friendId) return res.status(400).json({ error: 'Missing userId or friendId' });
        if (userId === friendId) return res.status(400).json({ error: 'Cannot add yourself' });
        await prisma.friendshipStreak.upsert({
            where: { userId_friendId: { userId, friendId } },
            update: { isActive: true },
            create: { userId, friendId, streak: 0, isActive: true }
        });
        res.json({ message: 'Friend added successfully' });
    } catch (error) {
        console.error('Friend add error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 9c. Get pending friend requests (incoming requests where current user is friendId and isActive=false)
consumerRouter.get('/friends/requests/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const requests = await prisma.friendshipStreak.findMany({
            where: { friendId: userId, isActive: false },
            include: {
                user: { select: { id: true, name: true, username: true, avatar: true, hypeScore: true } }
            },
            orderBy: { streak: 'desc' }
        });
        res.json({ requests: requests.map((r: any) => ({ ...r.user, requestId: r.id })) });
    } catch (error) {
        console.error('Friend requests error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 9d. Accept friend request
consumerRouter.post('/friends/accept', async (req, res) => {
    try {
        const { userId, requesterId } = req.body;
        // Activate the request record (requester sent to userId)
        const updated = await prisma.friendshipStreak.updateMany({
            where: { userId: requesterId, friendId: userId, isActive: false },
            data: { isActive: true }
        });
        if (updated.count === 0) return res.status(404).json({ error: 'Request not found' });
        res.json({ message: 'Friend request accepted' });
    } catch (error) {
        console.error('Accept friend error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 9e. Reject friend request (delete it)
consumerRouter.post('/friends/reject', async (req, res) => {
    try {
        const { userId, requesterId } = req.body;
        await prisma.friendshipStreak.deleteMany({
            where: { userId: requesterId, friendId: userId, isActive: false }
        });
        res.json({ message: 'Friend request rejected' });
    } catch (error) {
        console.error('Reject friend error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 9f. Invite friend to safe (consolidated handler)
// This handler is intentionally left as a no-op stub.
// The real invite logic is in handler 14 below.

// 9g. Get Safe Invites
consumerRouter.get('/:userId/invites', async (req, res) => {
    try {
        const { userId } = req.params;
        const invites = lockInviteStore[userId] || [];
        res.json({ invites });
    } catch (error) {
        console.error('Get invites error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ==========================================
// 10. Multiplayer Safe logic (in-memory)
// ==========================================
const activeSafeSessions: Record<string, any> = {};

consumerRouter.post('/safes/create', async (req, res) => {
    try {
        const { id, hostId, hostName, restaurantId, restaurantName, targetAmount, expiresAt, timeRemaining } = req.body;
        
        // Apply MAGNET Logic for Global Broadcast
        let isGlobal = false;
        const hostUser = await prisma.user.findUnique({ where: { id: hostId } });
        if (hostUser?.activeCardId) {
            const activeUserCard = await prisma.userCard.findUnique({
                where: { id: hostUser.activeCardId },
                include: { card: true }
            });
            if (activeUserCard?.card.perkCode === 'MAGNET') {
                isGlobal = true;
                // Note: Card usage is usually handled during trigger-checkout or payment, 
                // but for Global Broadcast, it starts at creation.
            }
        }

        // Check if the host has LURKER active (cache it to avoid N+1 on every poll)
        let hostIsLurker = false;
        if (hostUser?.activeCardId) {
            const activeUserCard = await prisma.userCard.findUnique({
                where: { id: hostUser.activeCardId },
                include: { card: true }
            });
            if (activeUserCard?.card.perkCode === 'LURKER') hostIsLurker = true;
        }

        const safeStartTime = timeRemaining || 900;
        activeSafeSessions[id] = {
            id,
            hostId,
            hostName,
            restaurantId,
            restaurantName,
            targetAmount,
            currentAmount: 0,
            expiresAt,
            timeRemaining: safeStartTime,
            maxTime: safeStartTime,
            isGlobal,
            status: 'ACTIVE',
            participants: [{ userId: hostId, name: hostName, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${hostName}`, hasLockedIn: false, isLurker: hostIsLurker }],
            orders: [], // Holds completed partial orders inside the safe
            deployedCards: []
        };

        // Server-side timer: decrement every second to keep all clients in sync
        const timerInterval = setInterval(() => {
            const s = activeSafeSessions[id];
            if (!s || s.status !== 'ACTIVE') {
                clearInterval(timerInterval);
                return;
            }
            if (s.timeRemaining > 0) {
                s.timeRemaining -= 1;
            } else {
                s.status = 'EXPIRED';
                clearInterval(timerInterval);
            }
        }, 1000);

        res.status(201).json(activeSafeSessions[id]);
    } catch (e) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// List all active safes for a user (MUST come before /safes/:safeId)
consumerRouter.get('/safes/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const userSafes = Object.values(activeSafeSessions).filter((safe: any) =>
            safe.participants.some((p: any) => p.userId === userId) || safe.hostId === userId
        );
        res.json({ safes: userSafes });
    } catch (e) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

consumerRouter.get('/safes/:safeId', (req, res) => {
    const safe = activeSafeSessions[req.params.safeId];
    if (!safe) return res.status(404).json({ error: 'No Active Safe Found' });
    const userId = req.query.userId as string | undefined;
    const userRole = userId && safe.hostId === userId ? 'host' : 'guest';
    
    // Apply Lurker Logic using the CACHED isLurker flag on each participant — zero extra DB queries
    const obfuscatedParticipants = safe.participants.map((p: any) => {
        if (p.isLurker) {
            return { ...p, name: 'Anonymous Lurker', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=lurker' };
        }
        return p;
    });

    res.json({ ...safe, participants: obfuscatedParticipants, userRole });
});

consumerRouter.post('/safes/:safeId/join', async (req, res) => {
    try {
        const { userId, userName } = req.body;
        const safe = activeSafeSessions[req.params.safeId];
        if (!safe) return res.status(404).json({ error: 'No Active Safe Found' });

        const exists = safe.participants.find((p: any) => p.userId === userId);
        if (!exists) {
            // Cache lurker status on the participant object to avoid N+1 on every poll
            let isLurker = false;
            try {
                const joiningUser = await prisma.user.findUnique({ where: { id: userId } });
                if (joiningUser?.activeCardId) {
                    const activeCard = await prisma.userCard.findUnique({
                        where: { id: joiningUser.activeCardId },
                        include: { card: true }
                    });
                    if (activeCard?.card.perkCode === 'LURKER') isLurker = true;
                }
            } catch (_) { /* non-critical */ }

            safe.participants.push({
                userId,
                name: userName,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`,
                hasLockedIn: false,
                sharedTotal: 0,
                isLurker
            });
        }
        const userRole = safe.hostId === userId ? 'host' : 'guest';
        res.json({ ...safe, userRole });
    } catch (e) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

const recalculateSharedTotals = (safe: any) => {
    safe.participants.forEach((p: any) => {
        p.sharedTotal = 0;
    });

    safe.orders.filter((o: any) => o.type === 'SHARED').forEach((orderSet: any) => {
        if (!orderSet.rawSharedItems) return;
        orderSet.rawSharedItems.forEach((sharedItem: any) => {
            const includedUsers = sharedItem.includedUserIds;
            if (!includedUsers || includedUsers.length === 0) return;

            const splitCost = sharedItem.price / (includedUsers.includes('all') ? safe.participants.length : includedUsers.length);
            safe.participants.forEach((p: any) => {
                if (includedUsers.includes('all') || includedUsers.includes(p.userId)) {
                    p.sharedTotal += splitCost;
                }
            });
        });
    });
};

consumerRouter.post('/safes/:safeId/lockin', async (req, res) => {
    try {
        const { userId, orderItems, sharedItems, isHostCoverMode } = req.body;
        const safe = activeSafeSessions[req.params.safeId];
        if (!safe) return res.status(404).json({ error: 'Safe not found' });

        // Handle Host checkout bypassing locks
        if (isHostCoverMode) {
            safe.participants = safe.participants.map((p: any) => ({ ...p, hasLockedIn: true }));
            safe.orders.push(orderItems);
            return res.json(safe);
        }

        safe.participants = safe.participants.map((p: any) =>
            p.userId === userId ? { ...p, hasLockedIn: true } : p
        );

        // Remove any previous orders from this user to prevent compounding on re-lock
        safe.orders = safe.orders.filter((o: any) => o.userId !== userId && o.sourceUserId !== userId);

        if (sharedItems && sharedItems.length > 0) {
            safe.orders.push({
                type: 'SHARED',
                sourceUserId: userId,
                items: sharedItems.map((i: any) => `${i.name} (Shared)`),
                originalPrice: sharedItems.reduce((acc: number, i: any) => acc + i.price, 0),
                rawSharedItems: sharedItems
            });
        }

        if (orderItems) {
            safe.orders.push(orderItems);
        }

        recalculateSharedTotals(safe);

        res.json(safe);
    } catch (e) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

consumerRouter.post('/safes/:safeId/unlock', async (req, res) => {
    try {
        const { userId } = req.body;
        const safe = activeSafeSessions[req.params.safeId];
        if (!safe) return res.status(404).json({ error: 'Safe not found' });

        safe.participants = safe.participants.map((p: any) =>
            p.userId === userId ? { ...p, hasLockedIn: false } : p
        );

        safe.orders = safe.orders.filter((o: any) => o.userId !== userId && o.sourceUserId !== userId);

        recalculateSharedTotals(safe);

        res.json(safe);
    } catch (e) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Trigger checkout (Host decides payment method and sets global checkout intent)
consumerRouter.post('/safes/:safeId/trigger-checkout', async (req, res) => {
    try {
        const { isCoveredByHost } = req.body;
        const safe = activeSafeSessions[req.params.safeId];
        if (!safe) return res.status(404).json({ error: 'Safe not found' });

        // Only create the order once if not already created
        if (!safe.orderId) {
            // Calculate totals
            const allItems: any[] = [];
            const participantShares: Record<string, number> = {};

            safe.orders.forEach((orderSet: any) => {
                if (Array.isArray(orderSet)) {
                    orderSet.forEach((item: any) => {
                        allItems.push(item);
                    });
                } else if (orderSet.type === 'SHARED') {
                    if (orderSet.items) {
                        orderSet.items.forEach((itemName: any) => {
                            allItems.push({ name: typeof itemName === 'string' ? itemName : itemName.name, price: 0, quantity: 1 });
                        });
                    }
                } else if (orderSet.userId) {
                    participantShares[orderSet.userId] = orderSet.total || 0;
                    if (orderSet.items) {
                        (Array.isArray(orderSet.items) ? orderSet.items : []).forEach((item: any) => {
                            // item can be a string (old format) or object (new format)
                            if (typeof item === 'string') {
                                allItems.push({ name: item, price: 0, quantity: 1, modifiers: '[]' });
                            } else {
                                allItems.push({ 
                                    name: item.name, 
                                    price: item.price, 
                                    quantity: item.quantity, 
                                    modifiers: item.modifiers || '[]',
                                    specialNotes: item.specialNotes,
                                    menuItemId: item.menuItemId 
                                });
                            }
                        });
                    }
                }
            });

            safe.participants.forEach((p: any) => {
                if (p.sharedTotal) {
                    participantShares[p.userId] = (participantShares[p.userId] || 0) + p.sharedTotal;
                }
            });

            let totalAmount = Object.values(participantShares).reduce((a, b) => (a as number) + (b as number), 0) || allItems.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);
            
            // Add Service Fee (5 EGP per person)
            // 0.1% Perk: If host has THE01, entire safe fee is waived.
            const hostUserForFee = await prisma.user.findUnique({ where: { id: safe.hostId } });
            let isZeroFeeSafe = false;
            if (hostUserForFee?.activeCardId) {
                const activeUserCard = await prisma.userCard.findUnique({
                    where: { id: hostUserForFee.activeCardId },
                    include: { card: true }
                });
                if (activeUserCard?.card.perkCode === 'THE01') {
                    isZeroFeeSafe = true;
                }
            }

            const totalFee = isZeroFeeSafe ? 0 : (safe.participants.length * 5);
            totalAmount += totalFee;
            const newOrderNumber = await getNextOrderNumber();

            let actualVendorId = safe.restaurantId;
            const vendorCheck = await prisma.vendor.findUnique({ where: { id: safe.restaurantId } });
            if (!vendorCheck) {
                const firstVendor = await prisma.vendor.findFirst();
                if (firstVendor) actualVendorId = firstVendor.id;
                else return res.status(400).json({ error: 'No vendors available' });
            }

            const order = await prisma.$transaction(async (tx) => {
                const orderDoc = await tx.order.create({
                    data: {
                        orderNumber: newOrderNumber,
                        hostId: safe.hostId,
                        vendorId: actualVendorId,
                        totalAmount,
                        isCoveredByHost,
                        status: 'AWAITING_PAYMENT',
                    }
                });

                if (allItems.length > 0) {
                    await tx.orderItem.createMany({
                        data: allItems.map((item: any) => ({
                            orderId: orderDoc.id,
                            menuItemId: item.menuItemId || undefined,
                            name: item.name || 'Item',
                            price: item.price || 0,
                            quantity: item.quantity || 1,
                            modifiers: item.modifiers || '[]',
                            specialNotes: item.specialNotes
                        }))
                    });
                }

                for (const participant of safe.participants) {
                    const baseShare = participantShares[participant.userId] || (totalAmount / safe.participants.length);
                    const shareWithFee = baseShare + 5; // adding the 5 EGP fee per person
                    await tx.participantOrder.create({
                        data: {
                            orderId: orderDoc.id,
                            userId: participant.userId,
                            shareAmount: shareWithFee,
                            hasPaid: isCoveredByHost
                        }
                    });
                }

                // Award points immediately ONLY if covered by host (pre-paid)
                // Otherwise points are awarded in /payment-verification upon receipt upload
                if (isCoveredByHost) {
                    await updateHypeScore(safe.hostId, 75, tx);
                    for (let i = 0; i < safe.participants.length; i++) {
                        const participant = safe.participants[i];
                        if (participant.userId !== safe.hostId) {
                            const pUser = await tx.user.findUnique({ where: { id: participant.userId } });
                            let points = 25;
                            // First joiner is at index 1 (index 0 is host)
                            if (i === 1 && pUser?.activeCardId) {
                                const activeUserCard = await tx.userCard.findUnique({
                                    where: { id: pUser.activeCardId },
                                    include: { card: true }
                                });
                                if (activeUserCard?.card.perkCode === 'EARLYBIRD') {
                                    points *= 2;
                                    await tx.userCard.update({ where: { id: activeUserCard.id }, data: { isUsed: true } });
                                    await tx.user.update({ where: { id: participant.userId }, data: { activeCardId: null } });
                                }
                            }
                            await updateHypeScore(participant.userId, points, tx);
                        }
                    }
                }

                // Magnet Logic remains here as it affects Safe state immediately

                // Apply Magnet Logic for Host
                const hostUser = await tx.user.findUnique({ where: { id: safe.hostId } });
                if (hostUser?.activeCardId) {
                    const activeUserCard = await tx.userCard.findUnique({
                        where: { id: hostUser.activeCardId },
                        include: { card: true }
                    });
                    if (activeUserCard?.card.perkCode === 'MAGNET') {
                        // Global Broadcast + Priority Expiry + 60s and Pin Host
                        safe.priorityExpiry = Date.now() + 60000;
                        safe.isPinned = true;
                        safe.isGlobal = true; // New Perk: MAGNET broadcast to everyone
                        // Mark card as used
                        await tx.userCard.update({ where: { id: activeUserCard.id }, data: { isUsed: true } });
                        await tx.user.update({ where: { id: safe.hostId }, data: { activeCardId: null } });
                    }
                }

                // Market Maker Logic
                const hasMarketMaker = await Promise.all(safe.participants.map(async (p: any) => {
                    const u = await tx.user.findUnique({ where: { id: p.userId } });
                    if (u?.activeCardId) {
                        const activeUserCard = await tx.userCard.findUnique({
                            where: { id: u.activeCardId },
                            include: { card: true }
                        });
                        return activeUserCard?.card.perkCode === 'MARKET_DATA' ? false : activeUserCard?.card.perkCode === 'MARKET_MAKER';
                    }
                    return false;
                }));

                if (hasMarketMaker.some(Boolean)) {
                    safe.isMarketMakerActive = true;
                }

                let hostReward = null;
                let participantResults: any[] = [];
                return { ...orderDoc, hostReward, participantResults };
            });

            safe.orderId = order.id;
            safe.orderNumber = newOrderNumber;
            safe.isCoveredByHost = isCoveredByHost; // Flag for frontend
            safe.rewards = {
                host: order.hostReward,
                participants: order.participantResults
            };
        }

        safe.status = 'CHECKOUT_READY'; // Always go through CHECKOUT_READY for frontend UI flow
        safe.isCoveredByHost = isCoveredByHost;

        res.json({ message: 'Checkout triggered', safe });
    } catch (e) {
        console.error('Safe trigger checkout error:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Leave a safe (participant removes themselves before checkout)
consumerRouter.post('/safes/:safeId/leave', async (req, res) => {
    try {
        const { userId } = req.body;
        const safe = activeSafeSessions[req.params.safeId];
        if (!safe) return res.status(404).json({ error: 'Safe not found' });



        safe.participants = safe.participants.filter((p: any) => p.userId !== userId);
        safe.orders = safe.orders.filter((o: any) => !o.userId || o.userId !== userId);

        recalculateSharedTotals(safe);

        res.json({ message: 'Left safe successfully' });
    } catch (e) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Abandon safe (completly remove it)
consumerRouter.post('/safes/:safeId/abandon', async (req, res) => {
    try {
        const { userId } = req.body;
        const safe = activeSafeSessions[req.params.safeId];
        if (!safe) return res.status(404).json({ error: 'Safe not found' });

        // If host abandons, remove the whole session
        if (safe.hostId === userId) {
            delete activeSafeSessions[req.params.safeId];
            return res.json({ message: 'Safe abandoned and removed' });
        }

        // If guest abandons, same as leaving
        safe.participants = safe.participants.filter((p: any) => p.userId !== userId);
        safe.orders = safe.orders.filter((o: any) => !o.userId || o.userId !== userId);
        recalculateSharedTotals(safe);

        res.json({ message: 'Left safe successfully' });
    } catch (e) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

consumerRouter.get('/:userId/friends', async (req, res) => {
    try {
        const { userId } = req.params;
        const streaks = await prisma.friendshipStreak.findMany({
            where: { OR: [{ userId }, { friendId: userId }] },
            include: {
                user: { select: { id: true, name: true, username: true, avatar: true, hypeScore: true } },
                friend: { select: { id: true, name: true, username: true, avatar: true, hypeScore: true } }
            }
        });
        const friends = streaks.map((s: any) => {
            const friend = s.userId === userId ? s.friend : s.user;
            return { ...friend, streak: s.streak, isActive: s.isActive };
        });
        const seen = new Set<string>();
        const unique = friends.filter((f: any) => { if (seen.has(f.id)) return false; seen.add(f.id); return true; });
        res.json({ friends: unique });
    } catch (error) {
        console.error('Friends list error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 11. Real Feed
consumerRouter.get('/feed/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const streaks = await prisma.friendshipStreak.findMany({
            where: { OR: [{ userId }, { friendId: userId }] },
            select: { userId: true, friendId: true }
        });
        const friendIds: string[] = [...new Set(streaks.flatMap((s: any) => [s.userId, s.friendId]).filter((id: string) => id !== userId))];
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const friendOrders = friendIds.length > 0 ? await prisma.order.findMany({
            where: { hostId: { in: friendIds }, createdAt: { gte: since } },
            include: { host: { select: { name: true, avatar: true, username: true } }, vendor: { select: { name: true, image: true, id: true } }, items: { take: 3 } },
            orderBy: { createdAt: 'desc' }, take: 20
        }) : [];
        const now = new Date();
        const flashDrops = await prisma.flashDrop.findMany({
            where: { isActive: true, expiresAt: { gte: now }, quantityLeft: { gt: 0 } },
            include: { vendor: { select: { id: true, name: true, image: true } } },
            orderBy: { expiresAt: 'asc' }, take: 10
        });
        const announcements = await prisma.vendor.findMany({
            where: { announcementBanner: { not: null } },
            select: { id: true, name: true, image: true, announcementBanner: true, updatedAt: true },
            orderBy: { updatedAt: 'desc' }, take: 10
        });

        const globalSafes = Object.values(activeSafeSessions).filter((s: any) => s.isGlobal && !s.isPaid);

        res.json({ friendOrders, flashDrops, announcements, globalSafes });
    } catch (error) {
        console.error('Feed error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 12. Submit Vendor Rating
consumerRouter.post('/rating', async (req, res) => {
    try {
        const { vendorId, rating } = req.body;
        if (!vendorId || !rating || rating < 1 || rating > 5) return res.status(400).json({ error: 'Invalid rating' });
        const vendor = await prisma.vendor.findUnique({ where: { id: vendorId } });
        if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
        const newCount = vendor.ratingCount + 1;
        const newRating = (vendor.rating * vendor.ratingCount + parseFloat(rating)) / newCount;
        await prisma.vendor.update({ where: { id: vendorId }, data: { rating: Math.round(newRating * 10) / 10, ratingCount: newCount } });
        res.json({ message: 'Rating submitted', newRating: Math.round(newRating * 10) / 10 });
    } catch (error) {
        console.error('Rating error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 13. Friend Suggestions (Mutuals)
consumerRouter.get('/friends/suggestions/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        // 1. Get my current friends
        const myFriendships = await prisma.friendshipStreak.findMany({
            where: { OR: [{ userId }, { friendId: userId }], isActive: true },
            select: { userId: true, friendId: true }
        });
        const myFriendIds = new Set(myFriendships.flatMap((s: any) => [s.userId, s.friendId]).filter((id: string) => id !== userId));

        // 2. Get friends of my friends
        const friendsOfFriends = await prisma.friendshipStreak.findMany({
            where: {
                OR: [
                    { userId: { in: Array.from(myFriendIds) } },
                    { friendId: { in: Array.from(myFriendIds) } }
                ],
                isActive: true
            },
            include: {
                user: { select: { id: true, name: true, username: true, avatar: true, hypeScore: true } },
                friend: { select: { id: true, name: true, username: true, avatar: true, hypeScore: true } }
            }
        });

        // 3. Filter out me and my direct friends
        const suggestionsMap = new Map<string, any>();
        friendsOfFriends.forEach((s: any) => {
            const potential1 = s.user;
            const potential2 = s.friend;

            [potential1, potential2].forEach(p => {
                if (p.id !== userId && !myFriendIds.has(p.id) && p.id !== userId) {
                    suggestionsMap.set(p.id, p);
                }
            });
        });

        res.json({ suggestions: Array.from(suggestionsMap.values()).slice(0, 10) });
    } catch (error) {
        console.error('Friend suggestions error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// 14. Send Lock Invite (unified handler with safeId, restaurantName, hostName)
consumerRouter.post('/friends/invite', async (req, res) => {
    try {
        const { fromUserId, toUserId, vendorId, message, senderName, safeId, restaurantName, hostName } = req.body;

        if (!fromUserId || !toUserId) {
            return res.status(400).json({ error: 'Missing invite details' });
        }

        const inviteMessage = message || `${senderName || hostName || 'Someone'} invited you to join their Lock!`;
        const resolvedHostName = hostName || senderName || 'A friend';
        const resolvedRestaurantName = restaurantName || 'a restaurant';

        // Store the invite so the recipient can poll for it
        if (!lockInviteStore[toUserId]) {
            lockInviteStore[toUserId] = [];
        }
        lockInviteStore[toUserId].push({
            id: `invite-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            fromUserId,
            fromUserName: resolvedHostName,
            hostName: resolvedHostName,
            vendorId,
            safeId: safeId || null,
            restaurantName: resolvedRestaurantName,
            message: inviteMessage,
            sentAt: new Date().toISOString()
        });

        console.log(`🔒 LOCK INVITE STORED: ${resolvedHostName} → userId:${toUserId} (safe: ${safeId || 'none'}, vendor: ${resolvedRestaurantName})`);

        res.json({
            message: 'Invite sent successfully',
            inviteDetails: {
                fromUserId,
                toUserId,
                vendorId,
                safeId,
                restaurantName: resolvedRestaurantName,
                hostName: resolvedHostName,
                message: inviteMessage,
                sentAt: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Lock invite error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 14b. Poll for notifications (lock invites) for a user
consumerRouter.get('/notifications/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const pending = lockInviteStore[userId] || [];
        // Clear after returning so they don't show again
        lockInviteStore[userId] = [];
        res.json({ notifications: pending });
    } catch (error) {
        console.error('Notifications poll error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 16. Gamble Wheel: Spin
consumerRouter.post('/gamble/spin', async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(400).json({ error: 'Missing userId' });

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (user.keysAvailable < 1) {
            return res.status(400).json({ error: 'No keys available. Earn more points to get a key!' });
        }

        // Deduct 1 key
        await prisma.user.update({
            where: { id: userId },
            data: { keysAvailable: { decrement: 1 } }
        });

        // Weighted Probabilities
        const random = Math.random() * 100;
        let result: any = { type: 'DUD', message: 'Better luck next time!' };

        if (random < 5) {
            // 5%: BIG L
            result = { type: 'BIG_L', message: 'BIG L. THE SAFE REMAINS SEALED.' };
        } else if (random < 65) {
            // 60%: Hype Boost (+150 points)
            const { updatedUser, keysEarned } = await updateHypeScore(userId, 150);
            result = { type: 'HYPE_BOOST', points: 150, message: 'Hype Boost! +150 Points', updatedUser, keysEarned };
        } else {
            // Card Rewards (35% remaining total)
            let rarityQuery: string[] = [];
            let poolRandom = (random - 65) / 35 * 100; // Recalculate within the 35% card pool
            
            // Re-evaluating the user's specific weighted requirements:
            // 20%: Random Common/Uncommon
            // 10%: Random Rare
            // 4%: Legendary
            // 1%: Exotic
            
            // Wait, the user provided exact % for the WHOLE spin originally:
            // Now: 5% Dud, 60% HypeBoost, 20% Common/Uncommon, 10% Rare, 4% Legendary, 1% Exotic

            if (random < 5) { /* Handled (BIG L) */ }
            else if (random < 65) { /* Handled (HYPE BOOST) */ }
            else if (random < 85) { rarityQuery = ['Common', 'Uncommon']; }
            else if (random < 95) { rarityQuery = ['Rare']; }
            else if (random < 99) { rarityQuery = ['Legendary']; }
            else { rarityQuery = ['Exotic']; }

            if (rarityQuery.length > 0) {
                const availableCards = await prisma.card.findMany({
                    where: { rarity: { in: rarityQuery } }
                });

                if (availableCards.length > 0) {
                    const selectedItem = availableCards[Math.floor(Math.random() * availableCards.length)];
                    
                    // Add to user inventory
                    const userCard = await prisma.userCard.create({
                        data: {
                            userId,
                            cardId: selectedItem.id,
                        },
                        include: { card: true }
                    });

                    result = { 
                        type: 'CARD', 
                        card: userCard.card, 
                        userCardId: userCard.id,
                        message: `Congratulations! You won: ${userCard.card.name}` 
                    };
                } else {
                    // Fallback to hype boost if no cards found (shouldn't happen with proper seeding)
                    const { updatedUser, keysEarned } = await updateHypeScore(userId, 100);
                    result = { type: 'HYPE_BOOST', points: 100, message: 'Hype Boost! +100 Points', updatedUser, keysEarned };
                }
            }
        }

        const updatedUser = await prisma.user.findUnique({ where: { id: userId } });
        res.json({ ...result, updatedUser });

    } catch (error) {
        console.error('Gamble spin error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 17. Activate Card
consumerRouter.post('/user/activate-card', async (req, res) => {
    try {
        const { userId, userCardId } = req.body;
        if (!userId) return res.status(400).json({ error: 'Missing userId' });

        if (!userCardId) {
            await prisma.user.update({ where: { id: userId }, data: { activeCardId: null } });
            return res.json({ message: 'Card deactivated' });
        }

        const userCard = await prisma.userCard.findUnique({
            where: { id: userCardId },
            include: { card: true }
        });

        if (!userCard || userCard.userId !== userId) {
            return res.status(404).json({ error: 'Card not found in your inventory' });
        }

        if (userCard.isUsed) {
            return res.status(400).json({ error: 'This card has already been used' });
        }

        await prisma.user.update({
            where: { id: userId },
            data: { activeCardId: userCard.id }
        });

        res.json({ message: `Card ${userCard.card.name} activated`, activeCard: userCard });
    } catch (error) {
        console.error('Activate card error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 18. Get User Inventory
consumerRouter.get('/user/:userId/inventory', async (req, res) => {
    try {
        const { userId } = req.params;
        const inventory = await prisma.userCard.findMany({
            where: { userId, isUsed: false },
            include: { card: true }
        });
        res.json({ inventory });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 15. Cancel Order — REMOVED (consolidated into handler 5b above)
