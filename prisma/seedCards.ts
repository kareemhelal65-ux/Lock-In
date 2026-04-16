import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cards = [
  {
    name: "The Passenger",
    description: "Standard card for new users with no unique active mechanics.",
    perkCode: "PASSENGER",
    rarity: "Common",
  },
  {
    name: "The Lurker",
    description: "Hides your identity in lobbies and steals Hype points from others upon completion.",
    perkCode: "LURKER",
    rarity: "Common",
  },
  {
    name: "The Whale",
    description: "Provides a 1.5x Hype multiplier to every participant in your Safe.",
    perkCode: "WHALE",
    rarity: "Uncommon",
  },
  {
    name: "The Early Bird",
    description: "Grants a 2x Hype multiplier if you are the very first person to join a Safe.",
    perkCode: "EARLYBIRD",
    rarity: "Uncommon",
  },
  {
    name: "The Magnet",
    description: "Pins your Safe to everyone's feed and extends priority expiry by 60s.",
    perkCode: "MAGNET",
    rarity: "Rare",
  },
  {
    name: "The Market Maker",
    description: "Massive Hype reward boost based on how many people join your Safe.",
    perkCode: "MARKET_MAKER",
    rarity: "Legendary",
  },
  {
    name: "No Service Fees",
    description: "Waives the service fee for your Solo orders and the entire Safe if you are the Host.",
    perkCode: "THE01",
    rarity: "Uncommon",
  },
];

async function main() {
  console.log('🌱 Cleaning up and Seeding cards...');
  
  // To avoid any unique constraint issues with both name and perkCode, 
  // we'll delete existing cards and recreate them.
  // Warning: This will delete UserCard relations too. For a dev seed this is fine.
  
  await prisma.userCard.deleteMany();
  await prisma.card.deleteMany();

  for (const card of cards) {
    await prisma.card.create({
      data: card,
    });
  }
  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
