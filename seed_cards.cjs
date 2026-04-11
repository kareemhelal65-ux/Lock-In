const { PrismaClient } = require('@prisma/client');
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
    name: "The 0.1%",
    description: "Zero fees on your Solo orders and the entire Safe if you are the Host.",
    perkCode: "THE01",
    rarity: "Exotic",
  },
  {
    name: "Sawa Discount",
    description: "Active 15% discount on your next order share.",
    perkCode: "SAWA_DISCOUNT",
    rarity: "Exotic",
  },
  {
    name: "The Feast",
    description: "Up to 150 EGP subsidy on your next group order.",
    perkCode: "SAWA_FEAST",
    rarity: "Exotic",
  },
  {
    name: "Squad Spinner",
    description: "Deployment into a Safe grants 10% off the total bill for everyone.",
    perkCode: "SQUAD_SPINNER",
    rarity: "Exotic",
  },
];

async function main() {
  for (const card of cards) {
    await prisma.card.upsert({
      where: { perkCode: card.perkCode },
      update: card,
      create: card,
    });
  }
  console.log("Seeded 8 cards successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
