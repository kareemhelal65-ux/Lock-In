import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient({ datasources: { db: { url: 'file:C:/Users/HP/Desktop/lock in it is/lock_in_app/prisma/dev.db' } } });

async function dump() {
    console.log('📦 EXPORTING LOCAL DATA TO JSON...');
    
    const data = {
        users: await prisma.user.findMany(),
        vendors: await prisma.vendor.findMany(),
        menuItems: await prisma.menuItem.findMany(),
        cards: await prisma.card.findMany(),
        userCards: await prisma.userCard.findMany(),
        streaks: await prisma.friendshipStreak.findMany(),
        hypeLogs: await prisma.hypeLog.findMany(),
        orders: await prisma.order.findMany(),
        partOrders: await prisma.participantOrder.findMany(),
        orderItems: await prisma.orderItem.findMany(),
    };

    fs.writeFileSync('migration_data.json', JSON.stringify(data, null, 2));
    console.log('✅ Local data exported to migration_data.json');
    await prisma.$disconnect();
}

dump().catch(console.error);
