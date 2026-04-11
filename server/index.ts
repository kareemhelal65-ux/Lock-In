import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { vendorRouter } from './routes/vendor.js';
import { vendorDataRouter } from './routes/vendorData.js';
import { consumerRouter } from './routes/consumer.js';
import { adminRouter } from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static images from /uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Health check that also tests DB
app.get('/api/health', async (req, res) => {
    try {
        const userCount = await prisma.user.count();
        res.json({ 
            status: 'ok', 
            message: 'LOCK IN API is running', 
            database: 'CONNECTED',
            users: userCount 
        });
    } catch (err: any) {
        res.status(500).json({ 
            status: 'error', 
            message: 'API is up but Database is DISCONNECTED',
            error: err.message 
        });
    }
});

// Routes
app.use('/api/vendor', vendorRouter);
app.use('/api/vendorData', vendorDataRouter);
app.use('/api/consumer', consumerRouter);
app.use('/api/admin', adminRouter);

import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

// Import perk restoration helper
import { restorePerk } from './routes/consumer';

// Cleanup Abandoned Orders and Old Receipts Every Hour
setInterval(async () => {
    try {
        const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000);
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        // 1. Restore Perks for Abandoned Orders (6+ hours old, Unpaid)
        const abandonedOrders = await prisma.order.findMany({
            where: {
                status: 'AWAITING_PAYMENT',
                createdAt: { lt: sixHoursAgo }
            },
            include: { participants: true }
        });

        for (const order of abandonedOrders) {
            console.log(`[CLEANUP] Restoring perks for abandoned order ${order.orderNumber}`);
            await prisma.$transaction(async (tx) => {
                for (const p of order.participants) {
                    if (p.perkUserCardId && !p.hasPaid) {
                        await restorePerk(p.perkUserCardId, tx, p.sawaSubsidy);
                    }
                }
                // We keep the order for history but maybe mark it as EXPIRED?
                await tx.order.update({
                    where: { id: order.id },
                    data: { status: 'CANCELLED' }
                });
            });
        }

        // 2. Old Receipts Cleanup (24+ hours old)
        const oldOrders = await prisma.order.findMany({
            where: {
                updatedAt: { lt: twentyFourHoursAgo }
            },
            include: { participants: true }
        });

        for (const order of oldOrders) {
            for (const participant of order.participants) {
                if (participant.paymentScreenshotUrl) {
                    const filename = participant.paymentScreenshotUrl.split('/').pop();
                    if (filename) {
                        const filepath = path.join(process.cwd(), 'uploads', filename);
                        if (fs.existsSync(filepath)) {
                            fs.unlinkSync(filepath);
                        }
                    }
                    await prisma.participantOrder.update({
                        where: { id: participant.id },
                        data: { paymentScreenshotUrl: null }
                    });
                }
            }
        }
    } catch (error) {
        console.error('Cleanup task error:', error);
    }
}, 60 * 60 * 1000);

// Export for Vercel
export default app;

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`🚀 LOCK IN Server running on port ${PORT}`);
    });
}

