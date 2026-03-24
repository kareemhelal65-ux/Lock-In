import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    console.log('Seeding friendships...');

    // 1. Create some more users if they don't exist
    const usernames = ['omar_the_plug', 'moustafa_lock', 'nour_safe', 'ziad_hype', 'layla_vault'];

    for (const username of usernames) {
        await prisma.user.upsert({
            where: { username },
            update: {},
            create: {
                username,
                email: `${username}@example.com`,
                passwordHash: 'dummy',
                name: username.replace(/_/g, ' ').toUpperCase(),
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
                hypeScore: Math.floor(Math.random() * 1000),
                walletBalance: 500,
            }
        });
    }

    const users = await prisma.user.findMany();
    const solotester = users.find(u => u.username === 'solotester') || users.find(u => u.username === 'tester_user_6');

    if (!solotester) {
        console.log('solotester not found, skipping friendship seed.');
        return;
    }

    // 2. Make solotester friends with all the new users
    // This ensures that anyone who adds solotester will get suggestions.
    for (const u of users) {
        if (u.id === solotester.id) continue;

        await prisma.friendshipStreak.upsert({
            where: {
                userId_friendId: { userId: solotester.id, friendId: u.id }
            },
            update: { isActive: true },
            create: {
                userId: solotester.id,
                friendId: u.id,
                streak: 5,
                isActive: true
            }
        });

        // Symmetric
        await prisma.friendshipStreak.upsert({
            where: {
                userId_friendId: { userId: u.id, friendId: solotester.id }
            },
            update: { isActive: true },
            create: {
                userId: u.id,
                friendId: solotester.id,
                streak: 5,
                isActive: true
            }
        });
    }

    console.log('Friendship seeding complete.');
}

seed()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
