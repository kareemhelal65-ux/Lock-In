
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: {
      username: {
        in: ['bottester', '@bottester', 'botuser', '@botuser']
      }
    },
    select: {
      username: true,
      sawaCurrency: true
    }
  });

  console.log('Current Balances:');
  users.forEach(u => console.log(`${u.username}: ${u.sawaCurrency} SC`));
}

main().catch(err => {
    console.error(err);
    process.exit(1);
}).finally(() => prisma.$disconnect());
