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
export const updateHypeScore = async (userId: string, points: number, tx: any = prisma, reason?: string, baseSCPoints: number = 0) => {
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
            ...(baseSCPoints > 0 ? { sawaCurrency: { increment: baseSCPoints } } : {}),
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

// Helper to restore a perk card consistently (handles SAWA_FEAST value and isUsed)
export const restorePerk = async (perkUserCardId: string, tx: any = prisma, subsidyAmount: number = 0) => {
    const card = await tx.userCard.findUnique({
        where: { id: perkUserCardId },
        include: { card: true }
    });

    if (card) {
        await tx.userCard.update({
            where: { id: perkUserCardId },
            data: {
                isUsed: false,
                // For SAWA_FEAST, restore the value that was deducted
                remainingValue: (card.remainingValue ?? 0) + (subsidyAmount || 0)
            }
        });

        // Optionally restore as active if user has no active card
        const user = await tx.user.findFirst({ where: { userCards: { some: { id: perkUserCardId } } } });
        if (user && !user.activeCardId) {
            await tx.user.update({
                where: { id: user.id },
                data: { activeCardId: perkUserCardId }
            });
        }
    }
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
                },
                deliveryRequest: {
                    include: {
                        deliverer: { select: { name: true, avatar: true } }
                    }
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

        // N+1 Fix: Fetch latest completed orders in bulk
        const recentOrders = await prisma.order.findMany({
            where: { status: 'COMPLETED' },
            orderBy: { updatedAt: 'desc' },
            take: 1000,
            select: { vendorId: true, createdAt: true, updatedAt: true }
        });

        const deliveryTimesByVendor: Record<string, number[]> = {};
        for (const order of recentOrders) {
            if (!deliveryTimesByVendor[order.vendorId]) {
                deliveryTimesByVendor[order.vendorId] = [];
            }
            if (deliveryTimesByVendor[order.vendorId].length < 50) {
                deliveryTimesByVendor[order.vendorId].push(order.updatedAt.getTime() - order.createdAt.getTime());
            }
        }

        const mappedVendors = vendors.map(v => {
            let deliveryTime = '25 min';
            const times = deliveryTimesByVendor[v.id];

            if (times && times.length > 0) {
                const totalMs = times.reduce((sum, ms) => sum + ms, 0);
                const avgMins = Math.round((totalMs / times.length) / 60000);
                deliveryTime = `${Math.max(avgMins, 5)} min`;
            }

            return {
                id: v.id,
                name: v.name,
                image: v.image || `https://api.dicebear.com/7.x/initials/svg?seed=${v.name}`,
                bannerImage: v.bannerImage,
                rating: v.rating.toFixed(1),
                deliveryTime,
                activeLocks: 0,
                isOnLock: false,
                onLockCount: 0,
                status: v.status || 'LIVE',
                instapayAddress: v.instapayAddress,
                instapayName: v.instapayName,
            };
        });

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
            useActivePerk = false,
            perkUserCardId,
            perkUserCardIds
        } = req.body;

        if (!userId || !vendorId || !items || items.length === 0) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newOrderNumber = await getNextOrderNumber();

        // Resolve vendorId
        const vendorCheck = await prisma.vendor.findUnique({ where: { id: vendorId } });
        const actualVendorId = vendorCheck ? vendorId : ((await prisma.vendor.findFirst())?.id || vendorId);

        // Create Order and ParticipantOrder together
        const order = await prisma.order.create({
            data: {
                orderNumber: newOrderNumber,
                hostId: userId,
                vendorId: actualVendorId,
                totalAmount,
                isCoveredByHost,
                status: isCoveredByHost ? 'PENDING' : 'AWAITING_PAYMENT',
                items: {
                    create: items.map((item: any) => ({
                        menuItemId: item.menuItemId || undefined,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity || 1,
                        modifiers: item.modifiers || '[]',
                        specialNotes: item.specialNotes
                    }))
                },
                participants: {
                    create: [{
                        userId,
                        shareAmount: participantShare,
                        sawaSubsidy: 0,
                        perkUserCardId: useActivePerk ? perkUserCardId : null,
                        hasPaid: isCoveredByHost ? true : false,
                    }]
                }
            },
            include: {
                participants: true,
                items: true
            }
        });

        // Award Hype Points + Sawa Currency (50 SC per solo order — Economy v2)
        await updateHypeScore(userId, 25, prisma, 'Order Placed', 50);

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error: any) {
        console.error('Create order error:', error);
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
            await prisma.$transaction(async (tx) => {
                // Restore cards for any participants who used them
                for (const p of order.participants) {
                    if (p.perkUserCardId) {
                        await restorePerk(p.perkUserCardId, tx, p.sawaSubsidy);
                    }
                }

                await tx.participantOrder.deleteMany({ where: { orderId } });
                await tx.orderItem.deleteMany({ where: { orderId } });
                await tx.order.delete({ where: { id: orderId } });
            });
            return res.json({ message: 'Order cancelled successfully' });
        }

        // If participant cancels, remove only their participant order
        const participantOrder = order.participants.find(p => p.userId === userId);
        if (!participantOrder) {
            return res.status(403).json({ error: 'You are not a participant in this order' });
        }

        await prisma.$transaction(async (tx) => {
            // Restore card for this participant
            if (participantOrder.perkUserCardId) {
                await restorePerk(participantOrder.perkUserCardId, tx, participantOrder.sawaSubsidy);
            }
            await tx.participantOrder.delete({ where: { id: participantOrder.id } });
        });

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
        const { orderId, userId, amountExpected, receiptData, perkUserCardId, perkUserCardIds } = req.body;

        if (!orderId || !userId || !amountExpected) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!receiptData) {
            return res.status(400).json({ error: 'Receipt upload is required.' });
        }

        const participantOrder = await prisma.participantOrder.findFirst({
            where: { orderId, userId }
        });

        if (!participantOrder) {
            return res.status(404).json({ error: 'Participant order not found' });
        }

        let newSawaSubsidy = participantOrder.sawaSubsidy;

        const targetIds = perkUserCardIds || (perkUserCardId ? [perkUserCardId] : []);

        // Process perks on checkout if provided
        if (targetIds.length > 0) {
            for (const targetId of targetIds) {
                const activeUserCard = await prisma.userCard.findUnique({
                    where: { id: targetId },
                    include: { card: true }
                });

                if (activeUserCard && !activeUserCard.isUsed) {
                    const perk = activeUserCard.card.perkCode;

                    if (perk === 'SAWA_DISCOUNT') {
                        // 15% discount on item share only
                        newSawaSubsidy += participantOrder.shareAmount * 0.15;
                        await prisma.userCard.update({ where: { id: activeUserCard.id }, data: { isUsed: true } });
                        const u = await prisma.user.findUnique({ where: { id: userId } });
                        if (u?.activeCardId === activeUserCard.id) {
                            await prisma.user.update({ where: { id: userId }, data: { activeCardId: null } });
                        }
                    } else if (perk === 'SAWA_FEAST') {
                        // Covers share up to 150 EGP once
                        newSawaSubsidy += Math.min(150, participantOrder.shareAmount);
                        await prisma.userCard.update({ where: { id: activeUserCard.id }, data: { isUsed: true, remainingValue: 0 } });
                        const u = await prisma.user.findUnique({ where: { id: userId } });
                        if (u?.activeCardId === activeUserCard.id) {
                            await prisma.user.update({ where: { id: userId }, data: { activeCardId: null } });
                        }
                    } else if (perk === 'THE01') {
                        // Waives ONLY the service fee (5 or 10 EGP)
                        // Fetch order to check if it's solo or group
                        const order = await prisma.order.findUnique({
                            where: { id: orderId },
                            include: { participants: true }
                        });
                        const isSolo = order ? order.participants.length <= 1 : true;
                        const feePortion = isSolo ? 10 : 5;

                        newSawaSubsidy += feePortion;
                        await prisma.userCard.update({ where: { id: activeUserCard.id }, data: { isUsed: true } });
                        const u = await prisma.user.findUnique({ where: { id: userId } });
                        if (u?.activeCardId === activeUserCard.id) {
                            await prisma.user.update({ where: { id: userId }, data: { activeCardId: null } });
                        }
                    }
                }
            }
        }

        await prisma.participantOrder.update({
            where: { id: participantOrder.id },
            data: {
                hasPaid: true,
                paymentScreenshotUrl: receiptData,
                sawaSubsidy: newSawaSubsidy
            }
        });

        // Add this participant's subsidy to the total order subsidy
        if (newSawaSubsidy > 0) {
            await prisma.order.update({
                where: { id: orderId },
                data: { sawaSubsidy: { increment: newSawaSubsidy }, updatedAt: new Date() }
            });
        } else {
            await prisma.order.update({
                where: { id: orderId },
                data: { updatedAt: new Date() }
            });
        }

        // 3. Check if all participants have paid
        const allParticipants = await prisma.participantOrder.findMany({
            where: { orderId }
        });

        const allPaid = allParticipants.every(p => p.hasPaid);

        if (allPaid) {
            // Update Order status to AWAITING_VERIFICATION
            await prisma.order.update({
                where: { id: orderId },
                data: { status: 'AWAITING_VERIFICATION' }
            });

            // Auto-mark safe as COMPLETED in DB when all participants have paid
            await (prisma as any).safeSession.updateMany({
                where: { orderId },
                data: { status: 'COMPLETED' }
            }).catch(() => { }); // non-critical
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
// 10. Multiplayer Safe logic (DB-backed for Vercel serverless)
// ==========================================

// Helper: compute current timeRemaining from when safe was created
const computeTimeRemaining = (safe: any): number => {
    const elapsed = Math.floor((Date.now() - new Date(safe.createdAt).getTime()) / 1000);
    return Math.max(0, safe.maxTime - elapsed);
};

// Helper to recalculate sharedTotals across participants (operates on JSON arrays)
const recalculateSharedTotals = (participants: any[], orders: any[]): any[] => {
    const updated = participants.map((p: any) => ({ ...p, sharedTotal: 0 }));
    orders.filter((o: any) => o.type === 'SHARED').forEach((orderSet: any) => {
        if (!orderSet.rawSharedItems) return;
        orderSet.rawSharedItems.forEach((sharedItem: any) => {
            const includedUsers = sharedItem.includedUserIds;
            if (!includedUsers || includedUsers.length === 0) return;
            const splitCost = sharedItem.price / (includedUsers.includes('all') ? updated.length : includedUsers.length);
            updated.forEach((p: any) => {
                if (includedUsers.includes('all') || includedUsers.includes(p.userId)) {
                    p.sharedTotal = (p.sharedTotal || 0) + splitCost;
                }
            });
        });
    });
    return updated;
};

// Helper to serialize safe for client (adds computed timeRemaining)
const serializeSafe = (safe: any) => ({
    ...safe,
    participants: safe.participants,
    orders: safe.orders,
    deployedCards: safe.deployedCards,
    timeRemaining: computeTimeRemaining(safe),
});

consumerRouter.post('/safes/create', async (req, res) => {
    try {
        const { id, hostId, hostName, restaurantId, restaurantName, targetAmount, expiresAt, timeRemaining } = req.body;

        // Apply MAGNET Logic for Global Broadcast
        let isGlobal = false;
        let hostIsLurker = false;
        const hostUser = await prisma.user.findUnique({ where: { id: hostId } });
        if (hostUser?.activeCardId) {
            const activeUserCard = await prisma.userCard.findUnique({
                where: { id: hostUser.activeCardId },
                include: { card: true }
            });
            if (activeUserCard?.card.perkCode === 'MAGNET') isGlobal = true;
            if (activeUserCard?.card.perkCode === 'LURKER') hostIsLurker = true;
        }

        const safeStartTime = timeRemaining || 300;
        const participants = [{ userId: hostId, name: hostName, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${hostName}`, hasLockedIn: false, isLurker: hostIsLurker, sharedTotal: 0 }];

        const safe = await (prisma as any).safeSession.create({
            data: {
                id,
                hostId,
                hostName,
                restaurantId,
                restaurantName,
                targetAmount: targetAmount || 2,
                maxTime: safeStartTime,
                timeRemaining: safeStartTime,
                isGlobal,
                status: 'ACTIVE',
                participants: participants as any,
                orders: [] as any,
                deployedCards: [] as any,
                expiresAt: expiresAt ? new Date(expiresAt) : new Date(Date.now() + safeStartTime * 1000)
            }
        });

        res.status(201).json(serializeSafe(safe));
    } catch (e: any) {
        console.error('Safe create error:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// List all active safes for a user (MUST come before /safes/:safeId)
consumerRouter.get('/safes/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const safes = await (prisma as any).safeSession.findMany({
            where: {
                status: { in: ['ACTIVE', 'CHECKOUT_READY'] },
                OR: [
                    { hostId: userId },
                    { participants: { path: '$[*].userId', array_contains: userId } }
                ]
            }
        }).catch(async () => {
            // Fallback: fetch all active and filter in JS (if JSON path query not supported)
            const all = await (prisma as any).safeSession.findMany({
                where: { status: { in: ['ACTIVE', 'CHECKOUT_READY'] } }
            });
            return all.filter((s: any) =>
                s.hostId === userId || (Array.isArray(s.participants) && s.participants.some((p: any) => p.userId === userId))
            );
        });
        res.json({ safes: safes.map(serializeSafe) });
    } catch (e) {
        console.error('Safe list error:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

consumerRouter.get('/safes/:safeId', async (req, res) => {
    try {
        const safe = await (prisma as any).safeSession.findUnique({ where: { id: req.params.safeId } });
        if (!safe) return res.status(404).json({ error: 'No Active Safe Found' });

        const userId = req.query.userId as string | undefined;
        const userRole = userId && safe.hostId === userId ? 'host' : 'guest';

        // Apply Lurker logic using cached isLurker flag on participant (zero extra DB queries)
        const obfuscatedParticipants = (safe.participants as any[]).map((p: any) => {
            if (p.isLurker) return { ...p, name: 'Anonymous Lurker', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=lurker' };
            return p;
        });

        res.json({ ...serializeSafe(safe), participants: obfuscatedParticipants, userRole });
    } catch (e) {
        console.error('Safe get error:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

consumerRouter.post('/safes/:safeId/join', async (req, res) => {
    try {
        const { userId, userName } = req.body;
        const safe = await (prisma as any).safeSession.findUnique({ where: { id: req.params.safeId } });
        if (!safe) return res.status(404).json({ error: 'No Active Safe Found' });

        const participants: any[] = Array.isArray(safe.participants) ? safe.participants : [];
        const exists = participants.find((p: any) => p.userId === userId);
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

            participants.push({ userId, name: userName, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`, hasLockedIn: false, sharedTotal: 0, isLurker });
            await (prisma as any).safeSession.update({ where: { id: req.params.safeId }, data: { participants: participants as any } });
        }

        const updatedSafe = await (prisma as any).safeSession.findUnique({ where: { id: req.params.safeId } });
        const userRole = updatedSafe.hostId === userId ? 'host' : 'guest';
        res.json({ ...serializeSafe(updatedSafe), userRole });
    } catch (e) {
        console.error('Safe join error:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

consumerRouter.post('/safes/:safeId/lockin', async (req, res) => {
    try {
        const { userId, orderItems, sharedItems, isHostCoverMode } = req.body;
        const safe = await (prisma as any).safeSession.findUnique({ where: { id: req.params.safeId } });
        if (!safe) return res.status(404).json({ error: 'Safe not found' });

        let participants: any[] = Array.isArray(safe.participants) ? safe.participants : [];
        let orders: any[] = Array.isArray(safe.orders) ? safe.orders : [];

        if (isHostCoverMode) {
            participants = participants.map((p: any) => ({ ...p, hasLockedIn: true }));
            if (orderItems) orders.push(orderItems);
            await (prisma as any).safeSession.update({ where: { id: req.params.safeId }, data: { participants: participants as any, orders: orders as any } });
            const updated = await (prisma as any).safeSession.findUnique({ where: { id: req.params.safeId } });
            return res.json(serializeSafe(updated));
        }

        participants = participants.map((p: any) =>
            p.userId === userId ? { ...p, hasLockedIn: true } : p
        );

        // Remove any previous orders from this user to prevent compounding on re-lock
        orders = orders.filter((o: any) => o.userId !== userId && o.sourceUserId !== userId);

        if (sharedItems && sharedItems.length > 0) {
            orders.push({
                type: 'SHARED',
                sourceUserId: userId,
                items: sharedItems.map((i: any) => `${i.name} (Shared)`),
                originalPrice: sharedItems.reduce((acc: number, i: any) => acc + i.price, 0),
                rawSharedItems: sharedItems
            });
        }

        if (orderItems) orders.push(orderItems);

        participants = recalculateSharedTotals(participants, orders);

        await (prisma as any).safeSession.update({
            where: { id: req.params.safeId },
            data: { participants: participants as any, orders: orders as any }
        });

        const updated = await (prisma as any).safeSession.findUnique({ where: { id: req.params.safeId } });
        res.json(serializeSafe(updated));
    } catch (e) {
        console.error('Safe lockin error:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

consumerRouter.post('/safes/:safeId/unlock', async (req, res) => {
    try {
        const { userId } = req.body;
        const safe = await (prisma as any).safeSession.findUnique({ where: { id: req.params.safeId } });
        if (!safe) return res.status(404).json({ error: 'Safe not found' });

        let participants: any[] = Array.isArray(safe.participants) ? safe.participants : [];
        let orders: any[] = Array.isArray(safe.orders) ? safe.orders : [];

        participants = participants.map((p: any) =>
            p.userId === userId ? { ...p, hasLockedIn: false } : p
        );
        orders = orders.filter((o: any) => o.userId !== userId && o.sourceUserId !== userId);
        participants = recalculateSharedTotals(participants, orders);

        await (prisma as any).safeSession.update({
            where: { id: req.params.safeId },
            data: { participants: participants as any, orders: orders as any }
        });

        const updated = await (prisma as any).safeSession.findUnique({ where: { id: req.params.safeId } });
        res.json(serializeSafe(updated));
    } catch (e) {
        console.error('Safe unlock error:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Trigger checkout (Host decides payment method and sets global checkout intent)
consumerRouter.post('/safes/:safeId/trigger-checkout', async (req, res) => {
    try {
        const { isCoveredByHost } = req.body;
        const safe = await (prisma as any).safeSession.findUnique({ where: { id: req.params.safeId } });
        if (!safe) return res.status(404).json({ error: 'Safe not found' });

        const participants: any[] = Array.isArray(safe.participants) ? safe.participants : [];
        const orders: any[] = Array.isArray(safe.orders) ? safe.orders : [];

        // Only create the order once if not already created
        if (!safe.orderId) {
            const allItems: any[] = [];
            const participantShares: Record<string, number> = {};

            orders.forEach((orderSet: any) => {
                if (orderSet.type === 'SHARED') {
                    if (orderSet.items) {
                        orderSet.items.forEach((itemName: any) => {
                            allItems.push({ name: typeof itemName === 'string' ? itemName : itemName.name, price: 0, quantity: 1 });
                        });
                    }
                } else if (orderSet.userId) {
                    participantShares[orderSet.userId] = orderSet.total || 0;
                    if (orderSet.items) {
                        (Array.isArray(orderSet.items) ? orderSet.items : []).forEach((item: any) => {
                            if (typeof item === 'string') {
                                allItems.push({ name: item, price: 0, quantity: 1, modifiers: '[]' });
                            } else {
                                allItems.push({ name: item.name, price: item.price, quantity: item.quantity, modifiers: item.modifiers || '[]', specialNotes: item.specialNotes, menuItemId: item.menuItemId });
                            }
                        });
                    }
                }
            });

            participants.forEach((p: any) => {
                if (p.sharedTotal) {
                    participantShares[p.userId] = (participantShares[p.userId] || 0) + p.sharedTotal;
                }
            });

            let totalAmount = Object.values(participantShares).reduce((a, b) => (a as number) + (b as number), 0) as number
                || allItems.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);

            // Add service fee
            const hostUserForFee = await prisma.user.findUnique({ where: { id: safe.hostId } });
            let isZeroFeeSafe = false;
            let hostPerkCardId: string | null = null;
            if (hostUserForFee?.activeCardId) {
                const activeUserCard = await prisma.userCard.findUnique({ where: { id: hostUserForFee.activeCardId }, include: { card: true } });
                if (activeUserCard?.card.perkCode === 'THE01' || activeUserCard?.card.perkCode === 'MAGNET') {
                    isZeroFeeSafe = true;
                    hostPerkCardId = activeUserCard.id;
                }
            }

            const totalFee = isZeroFeeSafe ? 0 : (participants.length * 5);
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

                // Consume Hub Breach card if active on host
                if (isZeroFeeSafe) {
                    const hostUser = await tx.user.findUnique({ where: { id: safe.hostId } });
                    if (hostUser?.activeCardId) {
                        const hCard = await tx.userCard.findUnique({ where: { id: hostUser.activeCardId }, include: { card: true } });
                        if (hCard?.card.perkCode === 'THE01') {
                            await tx.userCard.update({ where: { id: hCard.id }, data: { isUsed: true } });
                            await tx.user.update({ where: { id: safe.hostId }, data: { activeCardId: null } });
                        }
                    }
                }

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

                let totalSawaSubsidy = 0;
                const participantPerks: Record<string, string> = {};

                for (const participant of participants) {
                    const baseShare = participantShares[participant.userId] || (totalAmount / participants.length);
                    let shareWithFee = isZeroFeeSafe ? baseShare : baseShare + 5;
                    let sawaSubsidy = 0; // Will be set during actual payment verification
                    let currentParticipantPerkId: string | null = (participant.userId === safe.hostId) ? hostPerkCardId : null;

                    const pOrder = await tx.participantOrder.create({
                        data: {
                            orderId: orderDoc.id,
                            userId: participant.userId,
                            shareAmount: isCoveredByHost
                                ? (participant.userId === safe.hostId ? totalAmount : 0)
                                : shareWithFee,
                            sawaSubsidy,
                            perkUserCardId: currentParticipantPerkId,
                            hasPaid: participant.userId === safe.hostId ? false : isCoveredByHost
                        }
                    });

                    if (currentParticipantPerkId) {
                        participantPerks[participant.userId] = currentParticipantPerkId;
                    }
                }

                if (totalSawaSubsidy > 0) {
                    await tx.order.update({ where: { id: orderDoc.id }, data: { sawaSubsidy: totalSawaSubsidy } });
                }

                if (isCoveredByHost) {
                    await updateHypeScore(safe.hostId, 75, tx, undefined, 75);
                    for (let i = 0; i < participants.length; i++) {
                        const participant = participants[i];
                        if (participant.userId !== safe.hostId) {
                            const pUser = await tx.user.findUnique({ where: { id: participant.userId } });
                            let points = 25;
                            if (i === 1 && pUser?.activeCardId) {
                                const activeUserCard = await tx.userCard.findUnique({ where: { id: pUser.activeCardId }, include: { card: true } });
                                if (activeUserCard?.card.perkCode === 'EARLYBIRD' || activeUserCard?.card.perkCode === 'MARKET_MAKER') {
                                    points *= 2;
                                    await tx.userCard.update({ where: { id: activeUserCard.id }, data: { isUsed: true } });
                                    await tx.user.update({ where: { id: participant.userId }, data: { activeCardId: null } });

                                    // Update the ParticipantOrder we just created with the perk ID
                                    await tx.participantOrder.updateMany({
                                        where: { orderId: orderDoc.id, userId: participant.userId },
                                        data: { perkUserCardId: activeUserCard.id }
                                    });
                                }
                            }
                            await updateHypeScore(participant.userId, points, tx, undefined, 50);
                        }
                    }
                }

                // Magnet & Market Maker logic
                const hostUser = await tx.user.findUnique({ where: { id: safe.hostId } });
                if (hostUser?.activeCardId) {
                    const activeUserCard = await tx.userCard.findUnique({ where: { id: hostUser.activeCardId }, include: { card: true } });
                    if (activeUserCard?.card.perkCode === 'MAGNET') {
                        await tx.userCard.update({ where: { id: activeUserCard.id }, data: { isUsed: true } });
                        await tx.user.update({ where: { id: safe.hostId }, data: { activeCardId: null } });
                    }
                }

                return orderDoc;
            });

            await (prisma as any).safeSession.update({
                where: { id: req.params.safeId },
                data: {
                    orderId: order.id,
                    orderNumber: newOrderNumber,
                    status: 'CHECKOUT_READY',
                    isCoveredByHost,
                }
            });
        } else {
            await (prisma as any).safeSession.update({
                where: { id: req.params.safeId },
                data: { status: 'CHECKOUT_READY', isCoveredByHost }
            });
        }

        const updatedSafe = await (prisma as any).safeSession.findUnique({ where: { id: req.params.safeId } });
        res.json({ message: 'Checkout triggered', safe: serializeSafe(updatedSafe) });
    } catch (e) {
        console.error('Safe trigger checkout error:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Leave a safe (participant removes themselves before checkout)
consumerRouter.post('/safes/:safeId/leave', async (req, res) => {
    try {
        const { userId } = req.body;
        const safe = await (prisma as any).safeSession.findUnique({ where: { id: req.params.safeId } });
        if (!safe) return res.status(404).json({ error: 'Safe not found' });

        let participants: any[] = Array.isArray(safe.participants) ? safe.participants : [];
        let orders: any[] = Array.isArray(safe.orders) ? safe.orders : [];

        participants = participants.filter((p: any) => p.userId !== userId);
        orders = orders.filter((o: any) => !o.userId || o.userId !== userId);
        participants = recalculateSharedTotals(participants, orders);

        await (prisma as any).safeSession.update({
            where: { id: req.params.safeId },
            data: { participants: participants as any, orders: orders as any }
        });

        res.json({ message: 'Left safe successfully' });
    } catch (e) {
        console.error('Safe leave error:', e);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Abandon safe (completely remove it)
consumerRouter.post('/safes/:safeId/abandon', async (req, res) => {
    try {
        const { userId } = req.body;
        const safe = await (prisma as any).safeSession.findUnique({ where: { id: req.params.safeId } });
        if (!safe) return res.status(404).json({ error: 'Safe not found' });

        // If host abandons, delete the whole session
        if (safe.hostId === userId) {
            await (prisma as any).safeSession.delete({ where: { id: req.params.safeId } });
            return res.json({ message: 'Safe abandoned and removed' });
        }

        // If guest abandons, same as leaving
        let participants: any[] = Array.isArray(safe.participants) ? safe.participants : [];
        let orders: any[] = Array.isArray(safe.orders) ? safe.orders : [];

        participants = participants.filter((p: any) => p.userId !== userId);
        orders = orders.filter((o: any) => !o.userId || o.userId !== userId);
        participants = recalculateSharedTotals(participants, orders);

        await (prisma as any).safeSession.update({
            where: { id: req.params.safeId },
            data: { participants: participants as any, orders: orders as any }
        });

        res.json({ message: 'Left safe successfully' });
    } catch (e) {
        console.error('Safe abandon error:', e);
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
            where: {
                announcementBanner: { not: null },
                announcementUpdatedAt: { gte: since }
            },
            select: { id: true, name: true, image: true, announcementBanner: true, announcementUpdatedAt: true },
            orderBy: { announcementUpdatedAt: 'desc' }, take: 10
        });

        const globalSafes = await (prisma as any).safeSession.findMany({
            where: { isGlobal: true, status: { in: ['ACTIVE', 'CHECKOUT_READY'] } }
        }).catch(() => []);

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
                    where: {
                        rarity: { in: rarityQuery },
                        perkCode: { notIn: ['SAWA_DISCOUNT', 'SAWA_FEAST', 'THE01'] }
                    }
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



// --- FINAL ISOLATED DELIVERY SYSTEM ---

// 19. Request Delivery — Requester submits campus location
consumerRouter.post('/order/:orderId/request-delivery', async (req, res) => {
    try {
        const { orderId } = req.params;
        const { userId, campusLocation, location } = req.body;
        // BUG FIX: Normalize both field names into finalLocation
        const finalLocation = (campusLocation || location)?.trim();

        if (!userId || !finalLocation) {
            return res.status(400).json({ error: 'Missing userId or campusLocation' });
        }

        const order = await prisma.order.findUnique({ where: { id: orderId } });
        if (!order) return res.status(404).json({ error: 'Order not found' });
        if (order.hostId !== userId) return res.status(403).json({ error: 'Only the order host can request delivery' });
        // Allow delivery request for any payment-verified status (PENDING, FIRE, or READY)
        const verifiedStatuses = ['PENDING', 'FIRE', 'READY'];
        if (!verifiedStatuses.includes(order.status)) {
            return res.status(400).json({ error: 'Order must be payment-verified (PENDING/FIRE/READY) to request delivery' });
        }

        // Check if a non-cancelled delivery request already exists
        const existing = await prisma.deliveryRequest.findUnique({ where: { orderId } });
        if (existing && existing.status !== 'CANCELLED') {
            return res.status(400).json({ error: 'A delivery request already exists for this order' });
        }

        // BUG FIX: If there is a cancelled request (orderId is @unique), delete it first so we can create a new one
        if (existing && existing.status === 'CANCELLED') {
            await prisma.deliveryRequest.delete({ where: { id: existing.id } });
        }

        const deliveryRequest = await prisma.deliveryRequest.create({
            data: {
                orderId,
                requesterId: userId,
                // BUG FIX: Use finalLocation (not campusLocation which may be undefined)
                campusLocation: finalLocation,
                status: 'OPEN',
            }
        });

        res.status(201).json({ message: 'Delivery request created', deliveryRequest });
    } catch (error) {
        console.error('Request delivery error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// 20. Get All Open Delivery Requests (for Radar tab)
consumerRouter.get('/delivery-requests', async (req, res) => {
    try {
        const { userId } = req.query as { userId: string };

        const requests = await prisma.deliveryRequest.findMany({
            where: { status: 'OPEN' },
            include: {
                order: {
                    include: {
                        vendor: { select: { name: true, image: true } }
                    }
                },
                requester: {
                    select: { id: true, name: true, avatar: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        const formatted = requests
            // BUG FIX: Do NOT filter out the requester's own posts — the frontend handles
            // displaying "Your Own Request" label. Removing this filter allows the requester
            // to see their listing is live in Radar.
            .map(r => ({
                id: r.id,
                orderId: r.orderId,
                orderNumber: r.order.orderNumber,
                restaurantName: r.order.vendor?.name || 'Unknown',
                restaurantImage: r.order.vendor?.image || '',
                campusLocation: r.campusLocation,
                requesterId: r.requesterId,
                requesterName: r.requester.name,
                requesterAvatar: r.requester.avatar,
                status: r.status,
                createdAt: r.createdAt,
            }));

        res.json({ deliveryRequests: formatted });
    } catch (error) {
        console.error('Get delivery requests error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 21. Accept Delivery Request
consumerRouter.post('/delivery-requests/:requestId/accept', async (req, res) => {
    try {
        const { requestId } = req.params;
        const { userId } = req.body;

        if (!userId) return res.status(400).json({ error: 'Missing userId' });

        const deliveryRequest = await prisma.deliveryRequest.findUnique({
            where: { id: requestId },
            include: { order: true }
        });

        if (!deliveryRequest) return res.status(404).json({ error: 'Delivery request not found' });
        if (deliveryRequest.status !== 'OPEN') return res.status(400).json({ error: 'This delivery request is no longer open' });
        if (deliveryRequest.requesterId === userId) return res.status(400).json({ error: 'You cannot accept your own delivery request' });

        await prisma.$transaction([
            prisma.deliveryRequest.update({
                where: { id: requestId },
                data: { delivererId: userId, status: 'ACCEPTED' }
            })
            // REMOVED: prisma.order.update({ status: 'DELIVERY_ACCEPTED' })
        ]);

        res.json({ message: 'Delivery accepted! Head to the vendor to pick up the order.' });
    } catch (error) {
        console.error('Accept delivery error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 22. Mark Delivery as Delivered (awards 100 Hype Points to deliverer)
consumerRouter.post('/delivery-requests/:requestId/delivered', async (req, res) => {
    try {
        const { requestId } = req.params;
        const { userId } = req.body;

        if (!userId) return res.status(400).json({ error: 'Missing userId' });

        const deliveryRequest = await prisma.deliveryRequest.findUnique({
            where: { id: requestId }
        });

        if (!deliveryRequest) return res.status(404).json({ error: 'Delivery request not found' });
        if (deliveryRequest.delivererId !== userId) return res.status(403).json({ error: 'Only the assigned deliverer can mark this as delivered' });
        if (deliveryRequest.status !== 'ACCEPTED') return res.status(400).json({ error: 'Delivery is not in ACCEPTED state' });

        await prisma.$transaction(async (tx) => {
            await tx.deliveryRequest.update({
                where: { id: requestId },
                data: { status: 'DELIVERED' }
            });
            // Mark order as COMPLETED for both parties
            await tx.order.update({
                where: { id: deliveryRequest.orderId },
                data: { status: 'COMPLETED' }
            });
            // Award 100 Hype Points to the deliverer
            await updateHypeScore(userId, 100, tx, 'Campus Delivery', 100);
        });

        res.json({ message: 'Delivery confirmed! You earned 100 Hype Points 🎉', pointsAwarded: 100 });
    } catch (error) {
        console.error('Mark delivered error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 22.b Cancel Delivery Request (by Requester only)
consumerRouter.post('/delivery-requests/:requestId/cancel', async (req, res) => {
    try {
        const { requestId } = req.params;
        const { userId } = req.body;

        if (!userId) return res.status(400).json({ error: 'Missing userId' });

        const dr = await prisma.deliveryRequest.findUnique({
            where: { id: requestId }
        });

        if (!dr) return res.status(404).json({ error: 'Request not found' });
        if (dr.requesterId !== userId) return res.status(403).json({ error: 'Only the requester can cancel this' });
        if (dr.status !== 'OPEN') return res.status(400).json({ error: 'Only open delivery requests can be cancelled' });

        await prisma.deliveryRequest.update({
            where: { id: requestId },
            data: { status: 'CANCELLED' }
        });

        res.json({ message: 'Delivery request cancelled successfully' });
    } catch (err) {
        console.error('Cancel delivery request error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 23. Get My Active Deliveries (orders I have accepted to deliver)
consumerRouter.get('/my-deliveries/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const myDeliveries = await prisma.deliveryRequest.findMany({
            where: { delivererId: userId, status: 'ACCEPTED' },
            include: {
                order: {
                    include: { vendor: { select: { name: true, image: true } } }
                },
                requester: { select: { name: true, avatar: true } }
            },
            orderBy: { updatedAt: 'desc' }
        });

        const formatted = myDeliveries.map(d => ({
            id: d.id,
            orderId: d.orderId,
            orderNumber: d.order.orderNumber,
            orderStatus: d.order.status,
            restaurantName: d.order.vendor?.name || 'Unknown',
            campusLocation: d.campusLocation,
            requesterName: d.requester.name,
            requesterAvatar: d.requester.avatar,
            status: d.status,
        }));

        res.json({ deliveries: formatted });
    } catch (error) {
        console.error('Get my deliveries error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Vault: Buy Card
consumerRouter.post('/vault/buy-card', async (req, res) => {
    try {
        const { userId, cardType } = req.body;
        const cost = cardType === 'THE_FEAST' ? 5000 : cardType === 'NO_SERVICE_FEES' ? 800 : 1000;
        const perkCode = cardType === 'THE_FEAST' ? 'SAWA_FEAST' :
            cardType === 'NO_SERVICE_FEES' ? 'THE01' : 'SAWA_DISCOUNT';

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || user.sawaCurrency < cost) {
            return res.status(400).json({ error: 'Insufficient SAWA Currency' });
        }

        let card = await prisma.card.findUnique({ where: { perkCode } });
        if (!card) {
            card = await prisma.card.create({
                data: {
                    name: cardType === 'THE_FEAST' ? 'The Feast' : 'Hype Hub Discount',
                    description: cardType === 'THE_FEAST' ? 'Free 150 EGP Meal' : '15% Off Your Next Order',
                    perkCode,
                    rarity: 'Legendary',
                    usage: 'ONE_TIME'
                }
            });
        }

        await prisma.$transaction([
            prisma.user.update({
                where: { id: userId },
                data: { sawaCurrency: { decrement: cost } }
            }),
            prisma.userCard.create({
                data: { userId, cardId: card.id, remainingValue: cardType === 'THE_FEAST' ? 150 : null }
            })
        ]);

        const updatedUser = await prisma.user.findUnique({
            where: { id: userId },
            include: { inventory: { include: { card: true } } }
        });

        res.json({ message: 'Purchase successful', user: formatUserResponse(updatedUser) });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
