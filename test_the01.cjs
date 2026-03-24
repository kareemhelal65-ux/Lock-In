const { PrismaClient } = require('@prisma/client');

const p = new PrismaClient();

async function test() {
  try {
    const user = await p.user.findUnique({ where: { username: 'test0.1' }});
    const vendor = await p.vendor.findFirst({
        where: { menuItems: { some: {} } },
        include: { menuItems: true }
    });
    
    if (!user || !vendor || vendor.menuItems.length === 0) {
      console.log('Missing test data');
      return;
    }
    
    // Ensure active card is set before testing
    const c = await p.card.findUnique({ where: { perkCode: 'THE01' } });
    if (!user.activeCardId && c) {
        let uc = await p.userCard.findFirst({ where: { userId: user.id, cardId: c.id, isUsed: false } });
        if (!uc) {
           uc = await p.userCard.create({ data: { userId: user.id, cardId: c.id, isUsed: false } });
        }
        await p.user.update({ where: { id: user.id }, data: { activeCardId: uc.id } });
    }

    const payload = {
      userId: user.id,
      vendorId: vendor.id,
      totalAmount: vendor.menuItems[0].price,
      items: [{
        menuItemId: vendor.menuItems[0].id,
        name: vendor.menuItems[0].name,
        price: vendor.menuItems[0].price,
        quantity: 1
      }],
      isSolo: true,
      hasPaid: false,
      useActivePerk: false
    };

    console.log('Testing useActivePerk: false');
    const res1 = await fetch('http://localhost:5173/api/consumer/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const r1 = await res1.json();
    console.log('T1 Result:', r1.order ? 'Success' : r1.error);
    
    const u1 = await p.user.findUnique({ where: { id: user.id }});
    console.log('Active Card after T1 (should be present):', u1.activeCardId ? 'Yes' : 'No');

    payload.useActivePerk = true;
    console.log('\nTesting useActivePerk: true');
    const res2 = await fetch('http://localhost:5173/api/consumer/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const r2 = await res2.json();
    console.log('T2 Result:', r2.order ? 'Success' : r2.error);
    
    const u2 = await p.user.findUnique({ where: { id: user.id }});
    console.log('Active Card after T2 (should be null):', u2.activeCardId ? 'Yes' : 'No');
  } catch (err) {
    console.error("Error during test:", err);
  }
}

test().finally(()=>process.exit(0));
