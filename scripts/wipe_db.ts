import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 Starting Launch Wipe...');

    try {
        // 1. Transactional Data (Orders & Logistics)
        console.log('🗑 Clearing OrderItems...');
        await prisma.orderItem.deleteMany();

        console.log('🗑 Clearing ParticipantOrders...');
        await prisma.participantOrder.deleteMany();

        console.log('🗑 Clearing DeliveryRequests...');
        await prisma.deliveryRequest.deleteMany();

        console.log('🗑 Clearing Orders...');
        await prisma.order.deleteMany();

        console.log('🗑 Clearing SafeSessions...');
        await prisma.safeSession.deleteMany();

        // 2. User Activity & Social
        console.log('🗑 Clearing HypeLogs...');
        await prisma.hypeLog.deleteMany();

        console.log('🗑 Clearing FriendshipStreaks...');
        await prisma.friendshipStreak.deleteMany();

        console.log('🗑 Clearing UserCards (Inventory)...');
        await prisma.userCard.deleteMany();

        // 3. Catalog Data (Test Items & Drops)
        console.log('🗑 Clearing FlashDrops...');
        await prisma.flashDrop.deleteMany();

        console.log('🗑 Clearing MenuItems (preparing for clean import)...');
        await prisma.menuItem.deleteMany();

        // 4. Analytics
        console.log('🗑 Clearing SystemSnapshots...');
        await prisma.systemSnapshot.deleteMany();

        console.log('🗑 Clearing UserCohorts...');
        await prisma.userCohort.deleteMany();

        // 5. CORE ENTITIES
        console.log('🔥 Clearing Users...');
        await prisma.user.deleteMany();

        console.log('🔥 Clearing Vendors...');
        await prisma.vendor.deleteMany();

        console.log('✅ WIPE COMPLETE. Database is ready for launch.');
        console.log('ℹ️  Note: Card and SystemConfig tables were preserved.');
    } catch (error) {
        console.error('❌ Wipe failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
