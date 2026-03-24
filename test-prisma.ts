import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

async function main() {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: process.env.DATABASE_URL,
        });
        await prisma.$connect();
        console.log('Successfully connected to Prisma!');
    } catch (error) {
        console.error('Failed:', error);
    }
}

main();
