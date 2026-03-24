const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    const vendorId = 'fake_vendor_' + Date.now();
    const rawPassword = 'password123';
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const pinHash = await bcrypt.hash('1234', 10);

    const vendor = await prisma.vendor.create({
        data: {
            id: vendorId,
            username: 'fakevendor',
            passwordHash: hashedPassword,
            ledgerPinHash: pinHash,
            name: 'The Pixel Pizzeria',
            instapayName: 'PixelPizza',
            instapayAddress: '@pixelpizza',
            image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop',
            bannerImage: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=1200&h=400&fit=crop',
            rating: 4.8,
            status: 'LIVE'
        }
    });

    console.log('Created fake vendor:', vendor.name);

    const menuItems = [
        {
            vendorId: vendor.id,
            name: 'Cyber Slice',
            description: 'Pepperoni, jalapeños, and hot honey drizzle',
            price: 150,
            image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop',
            category: 'Pizza',
            requiredHypeLevel: 0,
            inStock: true
        },
        {
            vendorId: vendor.id,
            name: 'Neon Nuggets',
            description: 'Crispy chicken bites with glowing cheese sauce',
            price: 90,
            image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=400&h=300&fit=crop',
            category: 'Sides',
            requiredHypeLevel: 0,
            inStock: true
        },
        {
            vendorId: vendor.id,
            name: 'Glued Garlic Bread',
            description: 'Extra cheesy garlic bread pulled straight out of the matrix',
            price: 60,
            image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400&h=300&fit=crop',
            category: 'Sides',
            requiredHypeLevel: 0,
            inStock: true
        }
    ];

    for (const item of menuItems) {
        await prisma.menuItem.create({ data: item });
    }

    console.log('Created fake menu for', vendor.name);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
