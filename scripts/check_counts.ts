import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const userCount = await prisma.user.count();
    const orderCount = await prisma.order.count();
    console.log(`Users: ${userCount}, Orders: ${orderCount}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
