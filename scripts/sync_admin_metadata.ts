import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Synching existing orders into Dev Dashboard SystemSnapshot using Raw SQL...');

    // Get all completed orders
    const orders = await prisma.order.findMany({
        where: { status: 'COMPLETED' },
        include: { participants: true }
    });

    const configKeys = await prisma.systemConfig.findMany({
        where: { key: { in: ['soloFeeAmount', 'groupPerPersonFeeAmount'] } }
    });
    const soloFee = parseFloat(configKeys.find(c => c.key === 'soloFeeAmount')?.value || '10');
    const groupFee = parseFloat(configKeys.find(c => c.key === 'groupPerPersonFeeAmount')?.value || '5');

    const snapshots: Record<string, { totalRevenue: number, groupRevenue: number, soloRevenue: number, totalOrders: number, groupOrders: number, totalParticipants: number, platformTake: number }> = {};

    orders.forEach(order => {
        const dateString = new Date(order.createdAt).toISOString().split('T')[0];
        if (!snapshots[dateString]) {
            snapshots[dateString] = { totalRevenue: 0, groupRevenue: 0, soloRevenue: 0, totalOrders: 0, groupOrders: 0, totalParticipants: 0, platformTake: 0 };
        }

        snapshots[dateString].totalRevenue += order.totalAmount;
        snapshots[dateString].totalOrders += 1;
        
        const participantCount = order.participants.length;
        if (participantCount > 1) {
            snapshots[dateString].groupOrders += 1;
            snapshots[dateString].totalParticipants += participantCount;
            snapshots[dateString].groupRevenue += order.totalAmount;
            snapshots[dateString].platformTake += groupFee * (participantCount + 1);
        } else {
            snapshots[dateString].soloRevenue += order.totalAmount;
            snapshots[dateString].platformTake += soloFee;
        }
    });

    for (const [dateString, stats] of Object.entries(snapshots)) {
        await (prisma as any).$executeRawUnsafe(`
            INSERT INTO "SystemSnapshot" ("id", "dateString", "totalRevenue", "groupRevenue", "soloRevenue", "platformTake", "totalOrders", "groupOrders", "totalParticipants", "updatedAt")
            VALUES (gen_random_uuid(), '${dateString}', ${stats.totalRevenue}, ${stats.groupRevenue}, ${stats.soloRevenue}, ${stats.platformTake}, ${stats.totalOrders}, ${stats.groupOrders}, ${stats.totalParticipants}, NOW())
            ON CONFLICT ("dateString") DO UPDATE
            SET "totalRevenue" = "SystemSnapshot"."totalRevenue" + ${stats.totalRevenue},
                "groupRevenue" = "SystemSnapshot"."groupRevenue" + ${stats.groupRevenue},
                "soloRevenue" = "SystemSnapshot"."soloRevenue" + ${stats.soloRevenue},
                "platformTake" = "SystemSnapshot"."platformTake" + ${stats.platformTake},
                "totalOrders" = "SystemSnapshot"."totalOrders" + ${stats.totalOrders},
                "groupOrders" = "SystemSnapshot"."groupOrders" + ${stats.groupOrders},
                "totalParticipants" = "SystemSnapshot"."totalParticipants" + ${stats.totalParticipants},
                "updatedAt" = NOW();
        `);
        console.log(`✅ Synced Dev Dashboard for ${dateString}: $${stats.totalRevenue} revenue`);
    }

    console.log('🏁 Admin Sync Complete!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
