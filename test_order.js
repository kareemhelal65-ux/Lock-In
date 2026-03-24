const fetch = require('node-fetch');

async function testOrder() {
    console.log('Testing /order endpoint...');

    // First get a vendor and user
    const explore = await fetch('http://localhost:3001/api/consumer/explore').then(r => r.json());
    const vendorId = explore.vendors[0].id;

    const hostData = await fetch('http://localhost:3001/api/consumer/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: `host_${Date.now()}@test.com`, username: `h_${Date.now()}`, password: '123' })
    }).then(r => r.json());
    const hostId = hostData.user.id;

    console.log('Sending order payload...');
    const result = await fetch('http://localhost:3001/api/consumer/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: hostId,
            vendorId: vendorId,
            totalAmount: 300,
            isCoveredByHost: false,
            items: [{ name: 'Test Box', price: 300, quantity: 1 }],
            participants: [{ userId: hostId, shareAmount: 300, hasPaid: false }]
        })
    });

    console.log('Status:', result.status);
    const text = await result.text();
    console.log('Response:', text);
}

testOrder().catch(console.error);
