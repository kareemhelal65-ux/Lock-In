import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const count = await (prisma as any).userCohort.count();
    console.log(`✅ UserCohort table exists. Count: ${count}`);
  } catch (e: any) {
    console.error(`❌ Table check failed: ${e.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

main();
