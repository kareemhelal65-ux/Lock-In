import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const user1 = await prisma.user.findUnique({ where: { email: 'user1@test.com' } });
  const shibo = await prisma.user.findFirst({ where: { OR: [{ email: 'shibo@test.com' }, { username: 'shibo' }] } });
  const allUsers = await prisma.user.findMany({ take: 50, select: { email: true, username: true } });
  
  console.log('User1:', user1 ? 'Found' : 'Not Found');
  console.log('Shibo:', shibo ? 'Found' : 'Not Found');
  console.log('All Users:', allUsers.map(u => u.email).join(', '));
}
main().catch(console.error).finally(() => prisma.$disconnect());
