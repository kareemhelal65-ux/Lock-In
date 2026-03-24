const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst();
  if (!user) {
    console.log("No user found. Please sign up first.");
    return;
  }
  
  const cards = await prisma.card.findMany();
  console.log(`Giving ${cards.length} cards to user: ${user.username}`);
  
  for (const card of cards) {
    await prisma.userCard.create({
      data: {
        userId: user.id,
        cardId: card.id,
        isUsed: false
      }
    });
  }
  console.log("Success!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
