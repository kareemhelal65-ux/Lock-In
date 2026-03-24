import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    include: {
      inventory: {
        include: {
          card: true
        }
      }
    }
  });
  console.log(JSON.stringify(users.map(u => ({
    id: u.id,
    username: u.username,
    email: u.email,
    inventoryCount: u.inventory.length
  })), null, 2));
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
