
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkOrders() {
  try {
    const aminoVendor = await prisma.vendor.findFirst({
      where: { name: { contains: 'Amino' } }
    });
    console.log('Amino Vendor:', aminoVendor ? { id: aminoVendor.id, name: aminoVendor.name } : 'Not found');

    const orders = await prisma.order.findMany({
      where: {
        orderNumber: { in: ['105', '106'] }
      },
      include: {
        vendor: { select: { id: true, name: true } }
      }
    });

    console.log('Orders found:', JSON.stringify(orders, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

checkOrders();
