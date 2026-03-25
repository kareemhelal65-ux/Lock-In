const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    console.log('🚀 Starting Master Cloud Migration...');

    // 1. Seed Cards (The Perks)
    const cards = [
        { name: "The Passenger", description: "Standard card for new users with no unique active mechanics.", perkCode: "PASSENGER", rarity: "Common" },
        { name: "The Lurker", description: "Hides your identity in lobbies and steals Hype points from others upon completion.", perkCode: "LURKER", rarity: "Common" },
        { name: "The Whale", description: "Provides a 1.5x Hype multiplier to every participant in your Safe.", perkCode: "WHALE", rarity: "Uncommon" },
        { name: "The Early Bird", description: "Grants a 2x Hype multiplier if you are the very first person to join a Safe.", perkCode: "EARLYBIRD", rarity: "Uncommon" },
        { name: "The Magnet", description: "Pins your Safe to everyone's feed and extends priority expiry by 60s.", perkCode: "MAGNET", rarity: "Rare" },
        { name: "The Market Maker", description: "Massive Hype reward boost based on how many people join your Safe.", perkCode: "MARKET_MAKER", rarity: "Legendary" },
        { name: "The 0.1%", description: "Zero fees on your Solo orders and the entire Safe if you are the Host.", perkCode: "THE01", rarity: "Exotic" },
    ];

    for (const card of cards) {
        await prisma.card.upsert({
            where: { perkCode: card.perkCode },
            update: card,
            create: card,
        });
    }
    console.log('✅ 8 Cards Seeded.');

    // 2. Seed Main Vendor (Burger Bench - from mockData context)
    const hashedPassword = await bcrypt.hash('password123', 10);
    const pinHash = await bcrypt.hash('1234', 10);

    const vendor = await prisma.vendor.upsert({
        where: { username: 'burgerbench' },
        update: {},
        create: {
            id: 'rest1',
            username: 'burgerbench',
            passwordHash: hashedPassword,
            ledgerPinHash: pinHash,
            name: 'Burger Bench',
            instapayName: 'BurgerBench',
            instapayAddress: '@burgerbench',
            image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=600&fit=crop',
            rating: 4.8,
            status: 'LIVE'
        }
    });

    const menuItems = [
        { vendorId: vendor.id, name: 'Classic Smash Burger', description: 'Double patty, american cheese, secret sauce', price: 120, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop', category: 'Burgers', requiredHypeLevel: 0, inStock: true },
        { vendorId: vendor.id, name: 'Truffle Smash Burger', description: 'Premium beef, truffle aioli, aged cheddar', price: 180, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200&h=200&fit=crop', category: 'Burgers', requiredHypeLevel: 4, inStock: true },
        { vendorId: vendor.id, name: 'Loaded Fries', description: 'Cheese sauce, bacon bits, jalapeños', price: 75, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop', category: 'Sides', requiredHypeLevel: 0, inStock: true }
    ];

    for (const item of menuItems) {
        await prisma.menuItem.upsert({
            where: { id: item.name + '_' + vendor.id }, // Simple composite key simulation
            update: item,
            create: { ...item, id: undefined } // ID handled by DB if not provided
        }).catch(async () => {
             // Fallback to simple create if upsert logic fails
             await prisma.menuItem.create({ data: item });
        });
    }
    console.log('✅ Main Vendor (Burger Bench) & Menu Seeded.');

    console.log('🏁 Cloud Migration Complete! Everything is live.');
}

main()
    .catch(e => {
        console.error('❌ Migration Failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
