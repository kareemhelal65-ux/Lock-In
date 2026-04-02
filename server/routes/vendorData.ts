import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { updateHypeScore } from './consumer.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();
export const vendorDataRouter = Router();

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// 1. Get Vendor Dashboard (Terminal)
vendorDataRouter.get('/:id/dashboard', async (req, res) => {
    try {
        const { id } = req.params;
        const orders = await prisma.order.findMany({
            where: { vendorId: id },
            include: {
                items: true,
                host: { select: { name: true, avatar: true } },
                participants: {
                    select: {
                        userId: true,
                        shareAmount: true,
                        hasPaid: true,
                        paymentScreenshotUrl: true,
                        user: { select: { name: true, username: true } }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json({ orders });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 2. Update Vendor Status (Live/Swamped/Offline)
vendorDataRouter.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['LIVE', 'SWAMPED', 'OFFLINE'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const vendor = await prisma.vendor.update({
            where: { id },
            data: { status }
        });

        res.json({ message: 'Vendor status updated', status: vendor.status });
    } catch (error) {
        console.error('Error updating vendor status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 3. Update Order Status
vendorDataRouter.patch('/:id/order/:orderId/status', async (req, res) => {
    try {
        const { id, orderId } = req.params;
        const { status } = req.body;

        const order = await prisma.order.update({
            where: { id: orderId, vendorId: id },
            data: { status },
            include: { participants: true }
        });

        // 4. Award Hype Score when vendor approves & fires
        if (status === 'FIRE') {
            // Logic moved from consumer.ts /payment-verification
            // Award points to EVERY participant
            for (const participant of order.participants) {
                const userId = participant.userId;
                const isHost = order.hostId === userId;
                const isSolo = order.participants.length === 1 && isHost;
                
                // Optimization: Pre-fetch current user's active card
                const userObj = await prisma.user.findUnique({ 
                    where: { id: userId },
                    include: { inventory: { include: { card: true } } }
                });
                const activeUserCard = userObj?.activeCardId ? userObj.inventory.find((uc: any) => uc.id === userObj.activeCardId) : null;
                const perkCode = (activeUserCard && !activeUserCard.isUsed) ? activeUserCard.card.perkCode : null;

                let points = 25; // Default for joiner
                if (isHost) {
                    points = isSolo ? 15 : 100;
                }

                // Helper to consume
                const consume = async () => {
                    if (activeUserCard) {
                        await prisma.userCard.update({ where: { id: activeUserCard.id }, data: { isUsed: true } });
                        await prisma.user.update({ where: { id: userId }, data: { activeCardId: null } });
                    }
                };

                // 1. EARLYBIRD: 2x if first joiner (the first participant after the host)
                const firstJoiner = order.participants.find(p => p.userId !== order.hostId);
                if (perkCode === 'EARLYBIRD' && userId === firstJoiner?.userId) {
                    points *= 2;
                    await consume();
                }

                // 2. WHALE: 1.5x for group if ANY participant has an active Whale card
                let isWhaleActive = false;
                for (const p of order.participants) {
                    const otherUser = await prisma.user.findUnique({ where: { id: p.userId } });
                    if (otherUser?.activeCardId) {
                        const otherCard = await prisma.userCard.findUnique({ 
                            where: { id: otherUser.activeCardId },
                            include: { card: true }
                        });
                        if (otherCard?.card.perkCode === 'WHALE' && !otherCard.isUsed) {
                            isWhaleActive = true;
                            break;
                        }
                    }
                }

                if (isWhaleActive) {
                    points = Math.floor(points * 1.5);
                    if (perkCode === 'WHALE') await consume();
                }

                // 3. MARKET_MAKER: 100 + (2 * 25 * others)
                if (perkCode === 'MARKET_MAKER') {
                    const othersCount = order.participants.length - 1;
                    points = 100 + (2 * 25 * othersCount);
                    await consume();
                }

                // 4. LURKER: Stealth + Siphon
                if (perkCode === 'LURKER') {
                    const nonHostParticipants = order.participants.filter(
                        (p: any) => p.userId !== order.hostId && p.userId !== userId
                    );
                    let stolenTotal = 0;
                    for (const victimParticipant of nonHostParticipants) {
                        const victim = await prisma.user.findUnique({ where: { id: victimParticipant.userId } });
                        if (victim) {
                            const deduction = Math.min(25, victim.hypeScore);
                            if (deduction > 0) {
                                await updateHypeScore(victimParticipant.userId, -deduction, prisma, 'Lurker Steal');
                                stolenTotal += deduction;
                            }
                        }
                    }
                    points += stolenTotal;
                    await consume();
                }

                // 5. General Cleanup (PASSENGER, MAGNET, THE01)
                if (perkCode === 'PASSENGER' || perkCode === 'MAGNET' || perkCode === 'THE01') {
                    if (perkCode === 'THE01') points += 10; // Extra reward for legendary THE01 usage
                    await consume();
                }

                await updateHypeScore(userId, points);
            }

            // 5. Award Friendship Streaks amongst all pairs
            if (order.participants.length > 1) {
                const pIds = order.participants.map(p => p.userId);
                for (let i = 0; i < pIds.length; i++) {
                    for (let j = i + 1; j < pIds.length; j++) {
                        const p1 = pIds[i];
                        const p2 = pIds[j];
                        
                        // Canonical ordering: userId always < friendId
                        const [uid1, uid2] = p1 < p2 ? [p1, p2] : [p2, p1];
                        
                        await prisma.friendshipStreak.upsert({
                            where: { userId_friendId: { userId: uid1, friendId: uid2 } },
                            update: { streak: { increment: 1 }, isActive: true, updatedAt: new Date() },
                            create: { userId: uid1, friendId: uid2, streak: 1, isActive: true }
                        });
                    }
                }
            }
        }

        res.json({ message: 'Order status updated', order });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 3. Get Vendor Ledger (Analytics)
vendorDataRouter.get('/:id/ledger', async (req, res) => {
    try {
        const { id } = req.params;
        const { period } = req.query as { period?: string };
        const vendor = await prisma.vendor.findUnique({
            where: { id },
            select: { commissionOwedBalance: true }
        });

        const now = new Date();
        let startOfCurrent = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let startOfPrevious = new Date(startOfCurrent);
        startOfPrevious.setDate(startOfPrevious.getDate() - 1);

        if (period === 'week') {
            startOfCurrent.setDate(now.getDate() - 7);
            startOfPrevious.setDate(startOfCurrent.getDate() - 7);
        } else if (period === 'month') {
            startOfCurrent.setMonth(now.getMonth() - 1);
            startOfPrevious.setMonth(startOfCurrent.getMonth() - 1);
        } else if (period === 'all') {
            startOfCurrent = new Date(0);
            startOfPrevious = new Date(0);
        }

        const createdAtFilter = period === 'all' ? undefined : { gte: startOfPrevious };

        const orders = await prisma.order.findMany({
            where: {
                vendorId: id,
                status: 'COMPLETED',
                ...(createdAtFilter ? { createdAt: createdAtFilter } : {})
            },
            select: {
                totalAmount: true,
                createdAt: true,
                items: { select: { name: true, quantity: true } },
                participants: { select: { id: true } }
            }
        });

        let currentVolume = 0;
        let previousVolume = 0;
        let currentOrdersCount = 0;
        let previousOrdersCount = 0;
        const currentOrders: typeof orders = [];
        let periodCommissionOwed = 0;

        orders.forEach(order => {
            const orderDate = new Date(order.createdAt);
            if (period === 'all') {
                currentVolume += order.totalAmount;
                currentOrdersCount++;
                currentOrders.push(order);
            } else if (orderDate >= startOfCurrent) {
                currentVolume += order.totalAmount;
                currentOrdersCount++;
                currentOrders.push(order);
            } else if (orderDate >= startOfPrevious && orderDate < startOfCurrent) {
                previousVolume += order.totalAmount;
                previousOrdersCount++;
            }

            // Calculate fees for all completed orders in the filtered set
            const participantCount = order.participants.length;
            if (participantCount === 1) {
                periodCommissionOwed += 10;
            } else if (participantCount > 1) {
                periodCommissionOwed += participantCount * 5;
            }
        });

        const volumeChange = previousVolume === 0
            ? (currentVolume > 0 ? 100 : 0)
            : ((currentVolume - previousVolume) / previousVolume) * 100;

        const ordersChange = previousOrdersCount === 0
            ? (currentOrdersCount > 0 ? 100 : 0)
            : ((currentOrdersCount - previousOrdersCount) / previousOrdersCount) * 100;

        const totalVolume = currentVolume;
        const totalOrders = currentOrdersCount;

        // 1. Calculate Peak Hours (11am to 5pm)
        const hourCounts = new Array(7).fill(0);
        let maxCount = 0;
        currentOrders.forEach(order => {
            const hour = new Date(order.createdAt).getHours();
            if (hour >= 11 && hour <= 17) {
                const index = hour - 11;
                hourCounts[index]++;
                if (hourCounts[index] > maxCount) maxCount = hourCounts[index];
            }
        });
        const peakHours = hourCounts.map(count => maxCount === 0 ? 0 : Math.round((count / maxCount) * 100));

        // 2. Calculate Item Popularity
        const itemCountMap: Record<string, number> = {};
        currentOrders.forEach(order => {
            order.items.forEach(item => {
                if (!itemCountMap[item.name]) itemCountMap[item.name] = 0;
                itemCountMap[item.name] += item.quantity;
            });
        });

        const sortedItems = Object.entries(itemCountMap)
            .map(([name, qty]) => ({ name, qty }))
            .sort((a, b) => b.qty - a.qty)
            .slice(0, 4);

        const colors = ['bg-electric-red', 'bg-cool-gray', 'bg-cool-gray', 'bg-volt-green'];
        const itemPopularity = sortedItems.map((item, i) => ({
            ...item,
            color: colors[i % colors.length]
        }));

        const stats = {
            totalVolume,
            commissionOwed: periodCommissionOwed,
            totalOrders,
            peakHours,
            itemPopularity,
            volumeChange,
            ordersChange
        };

        res.json({ stats });
    } catch (error) {
        console.error('Error fetching ledger data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 3a. Get Vendor Profile
vendorDataRouter.get('/:id/profile', async (req, res) => {
    try {
        const { id } = req.params;
        const vendor = await prisma.vendor.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                image: true,
                bannerImage: true,
                status: true,
                instapayAddress: true,
                instapayName: true,
                rating: true,
            }
        });
        if (!vendor) return res.status(404).json({ error: 'Vendor not found' });
        res.json({ vendor });
    } catch (error) {
        console.error('Error fetching vendor profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 3b. Update Vendor Profile (with imagery)
vendorDataRouter.put('/:id/profile', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'bannerImage', maxCount: 1 }]), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, instapayName, instapayAddress } = req.body;

        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        const updateData: any = {};
        if (name) updateData.name = name;
        if (instapayName) updateData.instapayName = instapayName;
        if (instapayAddress) updateData.instapayAddress = instapayAddress;

        if (files?.image?.[0]) {
            updateData.image = `/uploads/${files.image[0].filename}`;
        }
        if (files?.bannerImage?.[0]) {
            updateData.bannerImage = `/uploads/${files.bannerImage[0].filename}`;
        }

        const updatedVendor = await prisma.vendor.update({
            where: { id: id as string },
            data: updateData
        });

        res.json({ message: 'Profile updated successfully', vendor: updatedVendor });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 4. Get Menu Items
vendorDataRouter.get('/:id/menu', async (req, res) => {
    try {
        const { id } = req.params;
        const menuItems = await prisma.menuItem.findMany({
            where: { vendorId: id },
            orderBy: { name: 'asc' }
        });
        res.json({ menuItems });
    } catch (error) {
        console.error('Error fetching menu:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 5. Add Menu Item
vendorDataRouter.post('/:id/menu', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, requiredHypeLevel, inStock, addOns } = req.body;

        const imagePath = req.file ? `/uploads/${req.file.filename}` : '/placeholder-item.jpg';

        const newItem = await prisma.menuItem.create({
            data: {
                vendorId: id as string,
                name,
                description: description || '',
                price: parseFloat(price),
                category: category || 'General',
                requiredHypeLevel: parseInt(requiredHypeLevel || '0'),
                inStock: inStock === 'true' || inStock === true,
                image: imagePath,
                addOns: addOns || '[]'
            }
        });

        res.status(201).json({ message: 'Item created', item: newItem });
    } catch (error) {
        console.error('Error creating menu item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 6. Update Menu Item
vendorDataRouter.put('/:id/menu/:itemId', upload.single('image'), async (req, res) => {
    try {
        const { id, itemId } = req.params;
        const { name, description, price, category, requiredHypeLevel, inStock, addOns } = req.body;

        const updateData: any = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (price) updateData.price = parseFloat(price);
        if (category) updateData.category = category;
        if (requiredHypeLevel) updateData.requiredHypeLevel = parseInt(requiredHypeLevel);
        if (inStock !== undefined) updateData.inStock = inStock === 'true' || inStock === true;
        if (addOns !== undefined) updateData.addOns = addOns;

        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const updatedItem = await prisma.menuItem.update({
            where: { id: itemId as string, vendorId: id as string }, // Ensure the item belongs to the vendor
            data: updateData
        });

        res.json({ message: 'Item updated', item: updatedItem });
    } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 7. Create Flash Drop
vendorDataRouter.post('/:id/drop', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, originalPrice, dropPrice, quantity, duration } = req.body;

        if (!title || !dropPrice) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + parseInt(duration || '30'));

        const newDrop = await prisma.flashDrop.create({
            data: {
                vendorId: id as string,
                itemName: title,
                originalPrice: parseFloat(originalPrice || '0'),
                dropPrice: parseFloat(dropPrice),
                totalQuantity: parseInt(quantity || '0'),
                quantityLeft: parseInt(quantity || '0'),
                expiresAt,
                isActive: true
            }
        });

        res.status(201).json({ message: 'Flash drop created', drop: newDrop });
    } catch (error) {
        console.error('Error creating flash drop:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 8. Get All Active Flash Drops (consumer feed)
vendorDataRouter.get('/flash-drops', async (req, res) => {
    try {
        const now = new Date();
        const drops = await prisma.flashDrop.findMany({
            where: { isActive: true, expiresAt: { gte: now }, quantityLeft: { gt: 0 } },
            include: { vendor: { select: { id: true, name: true, image: true, rating: true } } },
            orderBy: { expiresAt: 'asc' },
            take: 20
        });
        res.json({ drops });
    } catch (error) {
        console.error('Flash drops error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 9. Post Vendor Announcement
vendorDataRouter.post('/:id/announcement', async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        if (!message?.trim()) return res.status(400).json({ error: 'Message is required' });

        const vendor = await prisma.vendor.update({
            where: { id },
            data: { 
                announcementBanner: message.trim(),
                announcementUpdatedAt: new Date()
            }
        });
        res.json({ message: 'Announcement posted', announcementBanner: vendor.announcementBanner });
    } catch (error) {
        console.error('Announcement error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

    try {
        await prisma.vendor.update({ 
            where: { id: req.params.id }, 
            data: { 
                announcementBanner: null,
                announcementUpdatedAt: null
            } 
        });
        res.json({ message: 'Announcement cleared' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
