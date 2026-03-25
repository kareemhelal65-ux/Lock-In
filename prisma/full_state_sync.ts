import { PrismaClient as SQLiteClient } from '@prisma/client';
import { PrismaClient as PostgresClient } from '@prisma/client';

/**
 * FULL STATE SYNC: SQLite -> Supabase Postgres
 * This script migrates EVERY table to the cloud.
 */

async function sync() {
    console.log('🏗️ INITIALIZING FULL CLOUD SYNC...');

    // 1. Setup Connections
    const local = new SQLiteClient({ datasources: { db: { url: 'file:C:/Users/HP/Desktop/lock in it is/lock_in_app/prisma/dev.db' } } });
    const cloud = new PostgresClient({ datasources: { db: { url: process.env.DATABASE_URL } } });

    try {
        // --- 1. MIGRATING USERS ---
        console.log('👤 Migrating Users...');
        const users = await local.user.findMany();
        for (const u of users) {
            await cloud.user.upsert({ where: { id: u.id }, update: u, create: u });
        }
        console.log(`✅ ${users.length} Users synced.`);

        // --- 2. MIGRATING VENDORS ---
        console.log('🏪 Migrating Vendors...');
        const vendors = await local.vendor.findMany();
        for (const v of vendors) {
            await cloud.vendor.upsert({ where: { id: v.id }, update: v, create: v });
        }
        console.log(`✅ ${vendors.length} Vendors synced.`);

        // --- 3. MIGRATING MENU ITEMS ---
        console.log('🍔 Migrating Menu Items...');
        const menuItems = await local.menuItem.findMany();
        for (const m of menuItems) {
            await cloud.menuItem.upsert({ where: { id: m.id }, update: m, create: m });
        }
        console.log(`✅ ${menuItems.length} Menu Items synced.`);

        // --- 4. MIGRATING CARDS & INVENTORY ---
        console.log('🃏 Migrating Cards & Inventory...');
        const cards = await local.card.findMany();
        for (const c of cards) {
            await cloud.card.upsert({ where: { id: c.id }, update: c, create: c });
        }
        const userCards = await local.userCard.findMany();
        for (const uc of userCards) {
            await cloud.userCard.upsert({ where: { id: uc.id }, update: uc, create: uc });
        }
        console.log(`✅ Cards & User Inventories synced.`);

        // --- 5. MIGRATING STREAKS & HYPELOGS ---
        console.log('🔥 Migrating Streaks & Hype Logs...');
        const streaks = await local.friendshipStreak.findMany();
        for (const s of streaks) {
            await cloud.friendshipStreak.upsert({ where: { id: s.id }, update: s, create: s });
        }
        const hypeLogs = await local.hypeLog.findMany();
        for (const h of hypeLogs) {
            await cloud.hypeLog.upsert({ where: { id: h.id }, update: h, create: h });
        }
        console.log(`✅ Streaks & Hype Points history synced.`);

        // --- 6. MIGRATING ORDERS & PAYMENTS ---
        console.log('💰 Migrating Order History & Payments...');
        const orders = await local.order.findMany();
        for (const o of orders) {
            await cloud.order.upsert({ where: { id: o.id }, update: o, create: o });
        }
        const partOrders = await local.participantOrder.findMany();
        for (const po of partOrders) {
            await cloud.participantOrder.upsert({ where: { id: po.id }, update: po, create: po });
        }
        const orderItems = await local.orderItem.findMany();
        for (const oi of orderItems) {
            await cloud.orderItem.upsert({ where: { id: oi.id }, update: oi, create: oi });
        }
        console.log(`✅ Orders, Items, and Verification logs synced.`);

        console.log('\n🏁 ALL STATE SYNCED TO THE CLOUD! 🏁');
        console.log('Leaderboards and Safes are now functional on your phone.');

    } catch (error) {
        console.error('❌ Sync Failed:', error);
    } finally {
        await local.$disconnect();
        await cloud.$disconnect();
    }
}

sync();
