import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

export const adminRouter = Router();
const prisma = new PrismaClient();

// ==========================================
// 1. MORNING COFFEE REPORT
// ==========================================
adminRouter.get('/morning-coffee', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const lastWeekEnd = new Date(lastWeek);
        lastWeekEnd.setDate(lastWeek.getDate() + 1);

        // Active Group Orders (orders with participants)
        const todayGroupOrders = await prisma.order.count({
            where: { createdAt: { gte: today, lt: tomorrow }, participants: { some: {} } }
        });
        const lastWeekGroupOrders = await prisma.order.count({
            where: { createdAt: { gte: lastWeek, lt: lastWeekEnd }, participants: { some: {} } }
        });

        // Avg Delivery Time using createdAt to updatedAt diff for COMPLETED orders
        const getAvgDeliveryTime = async (startDate: Date, endDate: Date) => {
            const completed = await prisma.order.findMany({
                where: { status: 'COMPLETED', createdAt: { gte: startDate, lt: endDate } },
                select: { createdAt: true, updatedAt: true }
            });
            if (completed.length === 0) return 0;
            const diffs = completed.map(o => (o.updatedAt.getTime() - o.createdAt.getTime()) / 60000);
            return Math.round(diffs.reduce((a, b) => a + b, 0) / diffs.length);
        };
        const todayDelivery = await getAvgDeliveryTime(today, tomorrow);
        const lastWeekDelivery = await getAvgDeliveryTime(lastWeek, lastWeekEnd);

        // New Card Claims
        const todayClaims = await prisma.userCard.count({
            where: { acquiredAt: { gte: today, lt: tomorrow } }
        });
        const lastWeekClaims = await prisma.userCard.count({
            where: { acquiredAt: { gte: lastWeek, lt: lastWeekEnd } }
        });

        res.json({
            groupOrders: { today: todayGroupOrders, lastWeek: lastWeekGroupOrders },
            deliveryTime: { today: todayDelivery, lastWeek: lastWeekDelivery },
            cardClaims: { today: todayClaims, lastWeek: lastWeekClaims }
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// ==========================================
// 2. GOD MODE
// ==========================================
adminRouter.post('/god-mode/freeze-vendor', async (req, res) => {
    try {
        const { vendorId, freeze } = req.body;
        const status = freeze ? 'FROZEN' : 'LIVE';
        const updated = await prisma.vendor.update({
            where: { id: vendorId },
            data: { status }
        });
        res.json(updated);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

adminRouter.post('/god-mode/mass-refund', async (req, res) => {
    try {
        const { vendorId } = req.body;
        // Refund all awaiting payment or processing orders for this vendor
        const orders = await prisma.order.updateMany({
            where: { vendorId, status: { in: ['AWAITING_PAYMENT', 'PROCESSING'] } },
            data: { status: 'REFUNDED' }
        });
        res.json({ count: orders.count });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

adminRouter.post('/god-mode/force-release', async (req, res) => {
    try {
        const { globalMessage } = req.body;
        await prisma.systemConfig.upsert({
            where: { key: 'globalMessage' },
            create: { key: 'globalMessage', value: globalMessage },
            update: { value: globalMessage }
        });
        res.json({ success: true, message: 'Message broadcasted' });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

adminRouter.get('/god-mode/network-effect', async (req, res) => {
     try {
         // Live visualization data: cluster size based on recent orders
         const recentOrders = await prisma.order.findMany({
             where: { createdAt: { gte: new Date(Date.now() - 3600000) } }, // last hour
             include: { vendor: true, participants: true }
         });
         
         const density = recentOrders.reduce((acc: any, order) => {
             const key = order.vendor.name;
             if (!acc[key]) acc[key] = 0;
             acc[key] += 1 + order.participants.length;
             return acc;
         }, {});
         
         res.json({ density });
     } catch (e: any) {
         res.status(500).json({ error: e.message });
     }
});

// ==========================================
// 3. OPERATIONS HUB
// ==========================================
adminRouter.get('/operations/live-orders', async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: { status: { notIn: ['COMPLETED', 'REFUNDED', 'CANCELLED'] } },
            orderBy: { createdAt: 'desc' },
            include: { vendor: true, host: true, items: true }
        });
        res.json({ orders });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

adminRouter.get('/operations/vendors', async (req, res) => {
    try {
        const vendors = await prisma.vendor.findMany({
            include: { orders: { where: { createdAt: { gte: new Date(Date.now() - 86400000) } } } }
        });
        const scorecards = vendors.map(v => ({
            id: v.id,
            name: v.name,
            status: v.status,
            ordersToday: v.orders.length,
            rating: v.rating,
            hypeMultiplier: v.hypeMultiplier,
            commissionOwedBalance: v.commissionOwedBalance
        }));
        res.json({ scorecards });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// ==========================================
// 4. STRATEGIC ANALYTICS
// ==========================================
adminRouter.get('/analytics/heatmap', async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            select: { createdAt: true }
        });
        const hours = new Array(24).fill(0);
        orders.forEach(o => {
            hours[o.createdAt.getHours()]++;
        });
        res.json({ heatmap: hours });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

adminRouter.get('/analytics/financial', async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: { status: 'COMPLETED' },
            include: { participants: true }
        });
        
        let totalRevenue = 0;
        let groupRevenue = 0;
        let soloRevenue = 0;
        
        orders.forEach(o => {
            totalRevenue += o.totalAmount;
            if (o.participants.length > 0) groupRevenue += o.totalAmount;
            else soloRevenue += o.totalAmount;
        });
        
        const aov = orders.length ? (totalRevenue / orders.length) : 0;
        
        // Generate chart data for last 7 days dynamically
        const chartData = [];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            d.setHours(0,0,0,0);
            const dEnd = new Date(d);
            dEnd.setDate(d.getDate() + 1);
            
            const dayOrders = orders.filter(o => o.createdAt >= d && o.createdAt < dEnd);
            let dayRev = 0;
            dayOrders.forEach(o => dayRev += o.totalAmount);
            
            chartData.push({
                name: days[d.getDay()],
                revenue: dayRev,
                ltv: dayRev * 0.6 // Represents long term value estimated retention
            });
        }
        
        res.json({
            aov,
            totalRevenue,
            groupRevenue,
            soloRevenue,
            takeRate: totalRevenue * 0.1, // 10% example
            chartData
        });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// ==========================================
// 5. HYPE ENGINE
// ==========================================
adminRouter.post('/hype/boost', async (req, res) => {
    try {
        const { multiplier, durationHours, title } = req.body;
        await prisma.systemConfig.upsert({
            where: { key: 'hypeBoost' },
            create: { key: 'hypeBoost', value: JSON.stringify({ multiplier, expires: Date.now() + durationHours * 3600000, title }) },
            update: { value: JSON.stringify({ multiplier, expires: Date.now() + durationHours * 3600000, title }) }
        });
        res.json({ success: true });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

adminRouter.post('/hype/shadow-boost', async (req, res) => {
    try {
        const { vendorId, multiplier } = req.body;
        const vendor = await prisma.vendor.update({
            where: { id: vendorId },
            data: { hypeMultiplier: multiplier }
        });
        res.json(vendor);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

adminRouter.get('/hype/status', async (req, res) => {
     try {
         const boost = await prisma.systemConfig.findUnique({ where: { key: 'hypeBoost' }});
         res.json({ boost: boost ? JSON.parse(boost.value) : null });
     } catch (e: any) {
         res.status(500).json({ error: e.message });
     }
});

// ==========================================
// 6. CARD MANAGEMENT
// ==========================================
adminRouter.get('/cards', async (req, res) => {
    try {
        const cards = await prisma.card.findMany({
            include: { _count: { select: { users: true } } }
        });
        res.json({ cards });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

adminRouter.post('/cards/mint', async (req, res) => {
    try {
        const card = await prisma.card.create({
            data: req.body
        });
        res.json(card);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

adminRouter.put('/cards/:id', async (req, res) => {
    try {
        const card = await prisma.card.update({
            where: { id: req.params.id },
            data: req.body
        });
        res.json(card);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

adminRouter.post('/cards/drop', async (req, res) => {
    try {
        const { cardId, target } = req.body;
        let users: any[] = [];
        if (target === 'ALL') {
            users = await prisma.user.findMany({ select: { id: true } });
        } // Add other segmentation logic if needed
        
        const creations = users.map(u => ({
            userId: u.id,
            cardId,
            isUsed: false
        }));
        
        await prisma.userCard.createMany({
            data: creations
        });
        res.json({ droppedCount: creations.length });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// ==========================================
// 7. LEADERBOARD
// ==========================================
adminRouter.get('/leaderboard', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { hypeScore: 'desc' },
            take: 100
        });
        res.json({ users });
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

adminRouter.post('/leaderboard/reset', async (req, res) => {
    try {
        const { userId } = req.body;
        const result = await prisma.user.update({
            where: { id: userId },
            data: { hypeScore: 0 }
        });
        res.json(result);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});

// ==========================================
// 8. VENDOR PAYOUTS
// ==========================================
adminRouter.post('/payouts/collect', async (req, res) => {
    try {
        const { vendorId } = req.body;
        const vendor = await prisma.vendor.update({
            where: { id: vendorId },
            data: { commissionOwedBalance: 0 }
        });
        res.json(vendor);
    } catch (e: any) {
        res.status(500).json({ error: e.message });
    }
});
