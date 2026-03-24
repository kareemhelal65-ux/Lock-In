import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    where: {
      inventory: { some: {} }
    },
    include: {
      inventory: true
    }
  });
  
  const orders = await prisma.order.findMany({
    include: {
      participants: true
    },
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  console.log('--- Users ---');
  console.log(JSON.stringify(users.map(u => ({ 
    id: u.id,
    username: u.username, 
    email: u.email,
    hypeScore: u.hypeScore,
    inventoryCount: u.inventory.length
  })), null, 2));
  
  console.log('--- Recent Orders ---');
  console.log(JSON.stringify(orders.map(o => ({ 
    id: o.id, 
    hostId: o.hostId, 
    status: o.status, 
    participantCount: o.participants.length 
  })), null, 2));
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
