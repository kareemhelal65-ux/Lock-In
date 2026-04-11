
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const username = 'botuser';
  const amountToLabel = 10000;

  try {
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      console.error(`User @${username} not found.`);
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        sawaCurrency: {
          increment: amountToLabel
        }
      }
    });

    console.log(`Successfully added ${amountToLabel} SC to @${username}.`);
    console.log(`New Balance: ${updatedUser.sawaCurrency} SC`);
  } catch (error) {
    console.error('Error updating user balance:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
