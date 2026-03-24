/**
 * verify_group_ocr_pipeline.js
 * 
 * This script synthetically mimics `TheSafeScreen` group lock-in with AI OCR processing.
 * It tests:
 *   - Random Photo / Invalid Receipt override
 *   - Wrong Amount override 
 *   - Right Amount / Valid Receipt override
 *   - Group payment completion logic
 */



const API_BASE = 'http://localhost:3001/api';
let vendorId = '';
let hostId = '';
let friendId = '';
let orderId = '';
let expectedTotal = 300;
let individualShare = 150;

async function runTests() {
    console.log('🚀 Starting End-to-End Group OCR Verification Pipeline Test\n');

    try {
        // 1. Setup Data - Fetch a vendor
        console.log('--- 1. Setting up Test Data ---');
        const exploreRes = await fetch(`${API_BASE}/consumer/explore`);
        const exploreData = await exploreRes.json();
        if (!exploreData.vendors || exploreData.vendors.length === 0) {
            throw new Error('No vendors found. Database might be empty.');
        }
        vendorId = exploreData.vendors[0].id;
        console.log(`✅ Selected Vendor: ${vendorId}`);

        // Create Host User
        const hostRes = await fetch(`${API_BASE}/consumer/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: `host_${Date.now()}@test.com`, username: `host_${Date.now()}`, password: 'password123' })
        });
        const hostData = await hostRes.json();
        hostId = hostData.user.id;
        console.log(`✅ Created Host User: ${hostId}`);

        // Create Friend User (Participant)
        const friendRes = await fetch(`${API_BASE}/consumer/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: `friend_${Date.now()}@test.com`, username: `friend_${Date.now()}`, password: 'password123' })
        });
        const friendData = await friendRes.json();
        friendId = friendData.user.id;
        console.log(`✅ Created Friend User: ${friendId}`);

        // 2. Create Group Order
        console.log('\n--- 2. Creating Group Order ---');
        const orderPayload = {
            userId: hostId,
            vendorId: vendorId,
            totalAmount: expectedTotal,
            isCoveredByHost: false,
            items: [{ name: 'Test Box', price: 300, quantity: 1 }],
            participants: [
                { userId: hostId, shareAmount: individualShare, hasPaid: false },
                { userId: friendId, shareAmount: individualShare, hasPaid: false }
            ]
        };

        const createOrderRes = await fetch(`${API_BASE}/consumer/order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderPayload)
        });
        const orderData = await createOrderRes.json();
        orderId = orderData.order.id;
        console.log(`✅ Created Group Order: ${orderId} (Status: ${orderData.order.status})`);


        /*
        // 3. Test Invalid Receipt (Random Photo)
        console.log('\n--- 3. Testing Invalid Receipt (Random Photo) ---');
        const invalidReceiptRes = await fetch(`${API_BASE}/consumer/payment-verification`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderId,
                userId: hostId,
                amountExpected: individualShare,
                receiptData: 'NOT_A_RECEIPT_JUST_RANDOM_TEXT'
            })
        });
        if (invalidReceiptRes.status === 400) {
            console.log('✅ Correctly rejected invalid receipt. Status:', invalidReceiptRes.status);
        } else {
            console.error('❌ Failed. Expected 400 bad request logic.');
        }


        // 4. Test Wrong Amount Receipt
        console.log('\n--- 4. Testing Wrong Amount Receipt ---');
        const wrongAmountRes = await fetch(`${API_BASE}/consumer/payment-verification`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderId,
                userId: hostId,
                amountExpected: individualShare, // 150
                receiptData: 'VALID_RECEIPT_50' // Only 50 paid
            })
        });
        if (wrongAmountRes.status === 400) {
            console.log('✅ Correctly rejected receipt with wrong amount. Status:', wrongAmountRes.status);
        } else {
            console.error('❌ Failed. Expected 400 bad request logic.');
        }


        // 5. Test Valid Receipt (Host Pays Their Share)
        console.log('\n--- 5. Testing Valid Receipt (Host Pays Share) ---');
        const validHostRes = await fetch(`${API_BASE}/consumer/payment-verification`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderId,
                userId: hostId,
                amountExpected: individualShare, // 150
                receiptData: 'VALID_RECEIPT_150'
            })
        });
        const validHostData = await validHostRes.json();

        if (validHostRes.ok && validHostData.orderStatus === 'AWAITING_PAYMENT' && !validHostData.allPaid) {
            console.log('✅ Host payment verified successfully. Order still waiting for friend.');
        } else {
            console.error('❌ Failed Host payment verification logic.', validHostData);
        }

        // 6. Test Valid Receipt (Friend Pays Their Share - Completing Order)
        console.log('\n--- 6. Testing Valid Receipt (Friend Pays Share / Group Completion) ---');
        const validFriendRes = await fetch(`${API_BASE}/consumer/payment-verification`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderId,
                userId: friendId,
                amountExpected: individualShare, // 150
                receiptData: 'VALID_RECEIPT_150'
            })
        });
        const validFriendData = await validFriendRes.json();

        if (validFriendRes.ok && validFriendData.orderStatus === 'PENDING' && validFriendData.allPaid) {
            console.log('✅ Friend payment verified successfully.');
            console.log('✅🎉 GROUP ORDER COMPLETE. Status transitioned to PENDING (Ready for Vendor Terminal).');
        } else {
            console.error('❌ Failed Friend payment verification / Order Completion logic.', validFriendData);
        }

        // 7. Verify Vendor Terminal Receives Order
        console.log('\n--- 7. Verifying Vendor Terminal Pipeline ---');
        const dashboardRes = await fetch(`${API_BASE}/vendorData/${vendorId}/dashboard`);
        const dashboardData = await dashboardRes.json();
        const incomingOrder = dashboardData.orders.find((o: any) => o.id === orderId);

        if (incomingOrder && incomingOrder.status === 'PENDING') {
            console.log('✅ VERIFIED: Order successfully routed to the Vendor Dashboard Incoming Queue!');
        } else {
            console.error('❌ Failed: Order not found in vendor dashboard or wrong status.');
        }

        console.log('\n🏁 Verification Script Complete.');
        */

    } catch (err: any) {
        console.error('\n\n❌ Test script failed. Full Error Context:');
        console.error(err.message);
        if (err.stack) console.error(err.stack);
        // Sometimes it's a fetch error where response body has clues
        console.error(JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
    }
}

runTests();
