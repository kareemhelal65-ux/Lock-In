import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const vendor = await prisma.vendor.findFirst({
    where: { username: { contains: 'amino' } },
    include: { 
      menuItems: true, 
      orders: { 
        include: { 
          items: true, 
          participants: true 
        } 
      } 
    }
  });

  if (!vendor) {
    console.log("Vendor 'amino' not found.");
    return;
  }

  console.log("--- VENDOR DATA ---");
  console.log(JSON.stringify({
    id: vendor.id,
    username: vendor.username,
    name: vendor.name,
    status: vendor.status,
    ledgerPinHash: !!vendor.ledgerPinHash
  }, null, 2));

  console.log("\n--- ORDERS DATA ---");
  vendor.orders.forEach((order, i) => {
    console.log(`\nOrder #${i+1} (${order.id}):`);
    console.log(`  Status: ${order.status}`);
    console.log(`  Total Amount: ${order.totalAmount}`);
    console.log(`  Items Count: ${order.items?.length}`);
    order.items?.forEach((item, j) => {
      console.log(`    Item #${j+1}: ${item.name}, Price: ${item.price}, Modifiers: ${item.modifiers}`);
      try {
        if (item.modifiers) JSON.parse(item.modifiers);
      } catch (e) {
        console.log(`    !!! INVALID MODIFIERS JSON !!!`);
      }
    });
    console.log(`  Participants Count: ${order.participants?.length}`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
