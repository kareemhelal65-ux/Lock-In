
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const order = await prisma.order.findFirst({
        where: {
            participants: {
                some: { sawaSubsidy: { gt: 0 } }
            }
        },
        include: {
            participants: true
        }
    });

    console.log("Discounted Order:", JSON.stringify(order, null, 2));

    const allOrders = await prisma.order.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        include: { participants: true }
    });

    console.log("Recent Orders:", JSON.stringify(allOrders, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
