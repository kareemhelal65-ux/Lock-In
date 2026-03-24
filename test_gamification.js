import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  if (!users.length) return console.log('No users found');

  const cards = await prisma.card.findMany();
  for (const user of users) {
    for (const card of cards) {
      const existing = await prisma.userCard.findFirst({
          where: { userId: user.id, cardId: card.id }
      });
      if (!existing) {
          await prisma.userCard.create({
              data: { userId: user.id, cardId: card.id }
          });
      }
    }
  }

  // Activate THE01 card for the first user
  const the01Card = await prisma.userCard.findFirst({
     where: { userId: users[0].id, card: { perkCode: 'THE01' } }
  });
  if (the01Card) {
     await prisma.user.update({
         where: { id: users[0].id },
         data: { activeCardId: the01Card.id }
     });
     console.log('THE01 activated for ' + users[0].username);
  }

  // Activate MAGNET for the second user
  if (users.length > 1) {
      const magnetCard = await prisma.userCard.findFirst({
         where: { userId: users[1].id, card: { perkCode: 'MAGNET' } }
      });
      if (magnetCard) {
         await prisma.user.update({
             where: { id: users[1].id },
             data: { activeCardId: magnetCard.id }
         });
         console.log('MAGNET activated for ' + users[1].username);
      }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());

main().catch(console.error).finally(() => prisma.$disconnect());
