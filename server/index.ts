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

// Routes
app.use('/api/vendor', vendorRouter);
app.use('/api/vendorData', vendorDataRouter);
app.use('/api/consumer', consumerRouter);
app.use('/api/admin', adminRouter);

// Base route for health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'LOCK IN API is running' });
});

import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

// Cleanup Old Receipts Every Hour
setInterval(async () => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

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
        console.error('Receipt cleanup error:', error);
    }
}, 60 * 60 * 1000);

// Export for Vercel
export default app;

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`🚀 LOCK IN Server running on port ${PORT}`);
    });
}

