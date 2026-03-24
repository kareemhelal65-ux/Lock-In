import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const username = process.argv[2];
  if (!username) {
    console.error('Please provide a username: node award_cards.js <username>');
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    console.error(`User ${username} not found`);
    process.exit(1);
  }

  const cards = await prisma.card.findMany();
  console.log(`Found ${cards.length} cards in DB`);

  const expectedCards = [
    'The Passenger', 'The Lurker', 'The Whale', 'The Early Bird',
    'The Ghost', 'The Magnet', 'The Market Maker', 'The 0.1%'
  ];

  for (const cardName of expectedCards) {
    const card = cards.find(c => c.name === cardName);
    if (!card) {
      console.warn(`Warning: Card "${cardName}" not found in DB`);
      continue;
    }

    console.log(`Awarding 2x "${cardName}" to ${username}...`);
    for (let i = 0; i < 2; i++) {
      await prisma.userCard.create({
        data: {
          userId: user.id,
          cardId: card.id,
          isUsed: false
        }
      });
    }
  }

  console.log('Finished awarding cards!');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
