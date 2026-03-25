import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient({ 
    datasources: { 
        db: { url: 'postgresql://postgres.rbhizgyqnfgbjswfpgsw:E7na%40ELshilla@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?sslmode=require&pgbouncer=true' } 
    } 
});

async function push() {
    console.log('🚀 PUSHING DATA TO SUPABASE...');
    const data = JSON.parse(fs.readFileSync('migration_data.json', 'utf8'));

    // 1. Users
    console.log('👤 Users...');
    for (const u of data.users) await prisma.user.upsert({ where: { id: u.id }, update: u, create: u });

    // 2. Vendors
    console.log('🏪 Vendors...');
    for (const v of data.vendors) await prisma.vendor.upsert({ where: { id: v.id }, update: v, create: v });

    // 3. Menu Items
    console.log('🍔 Menu Items...');
    for (const m of data.menuItems) await prisma.menuItem.upsert({ where: { id: m.id }, update: m, create: m });

    // 4. Cards
    console.log('🃏 Cards...');
    for (const c of data.cards) await prisma.card.upsert({ where: { id: c.id }, update: c, create: c });
    for (const uc of data.userCards) await prisma.userCard.upsert({ where: { id: uc.id }, update: uc, create: uc });

    // 5. Streaks & Logs
    console.log('🔥 Streaks & Hype...');
    for (const s of data.streaks) await prisma.friendshipStreak.upsert({ where: { id: s.id }, update: s, create: s });
    for (const h of data.hypeLogs) await prisma.hypeLog.upsert({ where: { id: h.id }, update: h, create: h });

    // 6. Orders
    console.log('💰 Orders...');
    for (const o of data.orders) await prisma.order.upsert({ where: { id: o.id }, update: o, create: o });
    for (const po of data.partOrders) await prisma.participantOrder.upsert({ where: { id: po.id }, update: po, create: po });
    for (const oi of data.orderItems) await prisma.orderItem.upsert({ where: { id: oi.id }, update: oi, create: oi });

    console.log('🏁 CLOUD SYNC COMPLETE!');
    await prisma.$disconnect();
}

push().catch(console.error);
