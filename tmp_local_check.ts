import { PrismaClient as SQLiteClient } from '@prisma/client';
async function checkLocal() {
  const local = new SQLiteClient({ datasources: { db: { url: 'file:C:/Users/HP/Desktop/lock in it is/lock_in_app/prisma/dev.db' } } });
  try {
    const userCount = await local.user.count();
    const user1 = await local.user.findUnique({ where: { email: 'user1@test.com' } });
    console.log('Local User Count:', userCount);
    console.log('Local User1:', user1 ? 'Found' : 'Not Found');
  } catch (err) {
    console.error('Local Check Error:', err);
  } finally {
    await local.$disconnect();
  }
}
checkLocal();
