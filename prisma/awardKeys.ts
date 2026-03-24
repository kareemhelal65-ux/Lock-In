import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function awardKey() {
  const user = await prisma.user.findFirst({ where: { email: 'bot@test.com' } });
  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: { keysAvailable: { increment: 5 } }
    });
    console.log('Awarded 5 keys to bot@test.com');
  } else {
    console.log('User bot@test.com not found');
  }
}

awardKey();
