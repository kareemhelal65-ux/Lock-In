import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('🚀 Starting Robust Data Recovery Seed...');

    const users = [
        "01358f09-c787-4069-9467-5cd2038ed0d1", // ziad_hype
        "016cac67-e78e-4bc8-9d44-985aa8b36c11", // botuser
        "01f68513-3d7d-4c06-ab74-de20c444c5df"  // denyoo
    ];

    const vendors = [
        "0cf3c7fb-6088-4433-9f49-1558a6cc7bd8", // Amino's Kitchen
        "387ccac1-026c-4856-9b1a-f27f8c631e78", // Hype Kitchen
        "695da2a4-1bab-460a-aa65-8847f7685ca4"  // Pizza King
    ];

    for (let i = 0; i < 15; i++) {
        try {
            const vendorId = vendors[i % vendors.length];
            const hostId = users[i % users.length];
            
            const daysAgo = Math.floor(Math.random() * 5) + 1;
            const createdAt = new Date();
            createdAt.setDate(createdAt.getDate() - daysAgo);
            const updatedAt = new Date(createdAt.getTime() + 20 * 60000);

            const amount = 150 + (i * 10);

            // 1. Create Order
            const order = await prisma.order.create({
                data: {
                    orderNumber: (2000 + i).toString(),
                    vendorId,
                    hostId,
                    status: 'COMPLETED',
                    totalAmount: amount,
                    isSolo: true,
                    createdAt,
                    updatedAt
                }
            });

            // 2. Create ParticipantOrder
            await (prisma.participantOrder as any).create({
                data: {
                    orderId: order.id,
                    userId: hostId,
                    shareAmount: amount,
                    hasPaid: true
                }
            });

            // 3. Create OrderItem
            await (prisma.orderItem as any).create({
                data: {
                    orderId: order.id,
                    name: 'Legacy Item ' + (i + 1),
                    price: amount,
                    quantity: 1,
                    modifiers: "[]"
                }
            });

            console.log(`✅ Fixed legacy Order #${order.orderNumber}`);
        } catch (err) {
            console.error(`❌ Failed on iteration ${i}:`, err);
        }
    }

    console.log('🏁 Robust Recovery Complete!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
