import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting SAWA Currency backfill...');
  const users = await prisma.user.findMany();
  
  let updatedCount = 0;
  for (const user of users) {
    if (user.sawaCurrency < user.hypeScore) {
      await prisma.user.update({
        where: { id: user.id },
        data: { sawaCurrency: user.hypeScore }
      });
      updatedCount++;
    }
  }
  
  console.log(`Backfill complete. Updated ${updatedCount} users.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
