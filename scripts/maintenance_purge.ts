import { PrismaClient } from '@prisma/client';
import { supabase } from '../server/lib/supabase.js';

const prisma = new PrismaClient();

async function purgeStorageAndDatabase() {
    console.log('🧹 Starting Daily Data Purge...');
    
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);

    try {
        // 1. Delete receipt images from Supabase Storage for completed orders older than 2 hours
        // We find the ParticipantOrders with screenshots, where the parent Order is COMPLETED and updated < 2hrs ago
        const oldCompletedParticipantOrders = await prisma.participantOrder.findMany({
            where: {
                paymentScreenshotUrl: { not: null },
                order: {
                    status: 'COMPLETED',
                    updatedAt: { lt: twoHoursAgo }
                }
            },
            select: {
                id: true,
                paymentScreenshotUrl: true
            }
        });

        if (supabase && oldCompletedParticipantOrders.length > 0) {
            console.log(`🗑️ Deleting ${oldCompletedParticipantOrders.length} old receipt images from Supabase Storage...`);
            const filesToRemove = oldCompletedParticipantOrders
                .map(po => {
                    if (!po.paymentScreenshotUrl) return null;
                    // Extract filename from URL - assumes standard Supabase URL format: /storage/v1/object/public/receipts/filename
                    const urlParts = po.paymentScreenshotUrl.split('/');
                    const fileName = urlParts[urlParts.length - 1];
                    return fileName;
                })
                .filter(Boolean) as string[];

            if (filesToRemove.length > 0) {
                const { error } = await supabase.storage.from('receipts').remove(filesToRemove);
                if (error) {
                    console.error('⚠️ Failed to remove files from Supabase:', error);
                }
                
                // Clear the screenshot URLs in DB to save space and avoid re-processing
                await prisma.participantOrder.updateMany({
                   where: { id: { in: oldCompletedParticipantOrders.map(p => p.id) } },
                   data: { paymentScreenshotUrl: null }
                });
            }
        }

        // 2. DELETE SafeSession records older than 6 hours (if not completed)
        const deletedSafesResult = await prisma.safeSession.deleteMany({
            where: {
                status: { not: 'COMPLETED' },
                createdAt: { lt: sixHoursAgo }
            }
        });
        console.log(`🗑️ Deleted ${deletedSafesResult.count} abandoned SafeSession records.`);

        // 3. DELETE Order records older than 24 hours.
        // Prisma cascade delete requires us to find them and delete related ParticipantOrders and OrderItems first if not configured in DB.
        // Assuming schema has NO SET NULL / CASCADE, we delete children first:
        const oldOrders = await prisma.order.findMany({
            where: { createdAt: { lt: twentyFourHoursAgo } },
            select: { id: true }
        });
        
        const oldOrderIds = oldOrders.map(o => o.id);

        if (oldOrderIds.length > 0) {
            await prisma.participantOrder.deleteMany({ where: { orderId: { in: oldOrderIds } } });
            await prisma.orderItem.deleteMany({ where: { orderId: { in: oldOrderIds } } });
            
            const deletedOrdersResult = await prisma.order.deleteMany({
                where: { id: { in: oldOrderIds } }
            });
            console.log(`🗑️ Deleted ${deletedOrdersResult.count} Order records older than 24 hours.`);
        } else {
            console.log(`🗑️ No Orders older than 24 hours to delete.`);
        }

        console.log('✅ Daily Data Purge Completed Successfully.');
    } catch (error) {
        console.error('❌ Data Purge Failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

purgeStorageAndDatabase();
