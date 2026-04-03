import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Synching existing orders into Vendor Metadata...');

    const vendors = await prisma.vendor.findMany();
    
    for (const vendor of vendors) {
        // Aggregate existing completed orders
        const orders = await prisma.order.findMany({
            where: { vendorId: vendor.id, status: 'COMPLETED' },
            include: { participants: true }
        });

        let totalSales = 0;
        let totalOrders = orders.length;
        let totalCommission = 0;

        orders.forEach(order => {
            totalSales += order.totalAmount;
            
            // Calculate fees: 10 for solo, 5 per participant for group
            const participantCount = order.participants.length;
            if (participantCount === 1) {
                totalCommission += 10;
            } else if (participantCount > 1) {
                totalCommission += participantCount * 5;
            }
        });

        if (totalOrders > 0) {
            await (prisma.vendor as any).update({
                where: { id: vendor.id },
                data: {
                    lifetimeSales: totalSales,
                    lifetimeOrders: totalOrders,
                    commissionOwedBalance: totalCommission
                }
            });
            console.log(`✅ Synced Vendor ${vendor.name}: ${totalOrders} orders, $${totalSales} sales`);
        }
    }

    console.log('🏁 Sync Complete!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
