import dotenv from 'dotenv';
dotenv.config();

const testOrder = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/consumer/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: 'f87a83d4-1a35-43a5-ab9f-723a105a109a', // Dummy UUID for tester profile
                hostId: 'f87a83d4-1a35-43a5-ab9f-723a105a109a',
                vendorId: 'd624a04d-e131-4171-af36-8e54e4e96d0f', // Amino's kitchen 
                totalAmount: 200,
                participantShare: 200,
                isCoveredByHost: true,
                hasPaid: true,
                items: [
                    {
                        menuItemId: '2f068305-b0d3-4a1d-85ed-4eec03d526fa', // Cheese
                        name: 'cheese',
                        price: 200,
                        quantity: 1,
                        // purposely omitting modifiers here to simulate frontend payload
                    }
                ]
            })
        });

        if (!response.ok) {
            const text = await response.text();
            console.error('Failed:', response.status, text);
            return;
        }
        const data = await response.json();
        console.log('Success:', data);
    } catch (error) {
        console.error('Error:', error);
    }
};

testOrder();
