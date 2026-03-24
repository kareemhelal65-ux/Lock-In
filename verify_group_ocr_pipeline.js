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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var API_BASE = 'http://localhost:3001/api';
var vendorId = '';
var hostId = '';
var friendId = '';
var orderId = '';
var expectedTotal = 300;
var individualShare = 150;
function runTests() {
    return __awaiter(this, void 0, void 0, function () {
        var exploreRes, exploreData, hostRes, hostData, friendRes, friendData, orderPayload, createOrderRes, orderData, invalidReceiptRes, wrongAmountRes, validHostRes, validHostData, validFriendRes, validFriendData, dashboardRes, dashboardData, incomingOrder, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🚀 Starting End-to-End Group OCR Verification Pipeline Test\n');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 18, , 19]);
                    // 1. Setup Data - Fetch a vendor
                    console.log('--- 1. Setting up Test Data ---');
                    return [4 /*yield*/, fetch("".concat(API_BASE, "/consumer/explore"))];
                case 2:
                    exploreRes = _a.sent();
                    return [4 /*yield*/, exploreRes.json()];
                case 3:
                    exploreData = _a.sent();
                    if (!exploreData.vendors || exploreData.vendors.length === 0) {
                        throw new Error('No vendors found. Database might be empty.');
                    }
                    vendorId = exploreData.vendors[0].id;
                    console.log("\u2705 Selected Vendor: ".concat(vendorId));
                    return [4 /*yield*/, fetch("".concat(API_BASE, "/consumer/signup"), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: "host_".concat(Date.now(), "@test.com"), username: "host_".concat(Date.now()), password: 'password123' })
                        })];
                case 4:
                    hostRes = _a.sent();
                    return [4 /*yield*/, hostRes.json()];
                case 5:
                    hostData = _a.sent();
                    hostId = hostData.user.id;
                    console.log("\u2705 Created Host User: ".concat(hostId));
                    return [4 /*yield*/, fetch("".concat(API_BASE, "/consumer/signup"), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email: "friend_".concat(Date.now(), "@test.com"), username: "friend_".concat(Date.now()), password: 'password123' })
                        })];
                case 6:
                    friendRes = _a.sent();
                    return [4 /*yield*/, friendRes.json()];
                case 7:
                    friendData = _a.sent();
                    friendId = friendData.user.id;
                    console.log("\u2705 Created Friend User: ".concat(friendId));
                    // 2. Create Group Order
                    console.log('\n--- 2. Creating Group Order ---');
                    orderPayload = {
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
                    return [4 /*yield*/, fetch("".concat(API_BASE, "/consumer/order"), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(orderPayload)
                        })];
                case 8:
                    createOrderRes = _a.sent();
                    return [4 /*yield*/, createOrderRes.json()];
                case 9:
                    orderData = _a.sent();
                    orderId = orderData.order.id;
                    console.log("\u2705 Created Group Order: ".concat(orderId, " (Status: ").concat(orderData.order.status, ")"));
                    // 3. Test Invalid Receipt (Random Photo)
                    console.log('\n--- 3. Testing Invalid Receipt (Random Photo) ---');
                    return [4 /*yield*/, fetch("".concat(API_BASE, "/consumer/payment-verification"), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                orderId: orderId,
                                userId: hostId,
                                amountExpected: individualShare,
                                receiptData: 'NOT_A_RECEIPT_JUST_RANDOM_TEXT'
                            })
                        })];
                case 10:
                    invalidReceiptRes = _a.sent();
                    if (invalidReceiptRes.status === 400) {
                        console.log('✅ Correctly rejected invalid receipt. Status:', invalidReceiptRes.status);
                    }
                    else {
                        console.error('❌ Failed. Expected 400 bad request logic.');
                    }
                    // 4. Test Wrong Amount Receipt
                    console.log('\n--- 4. Testing Wrong Amount Receipt ---');
                    return [4 /*yield*/, fetch("".concat(API_BASE, "/consumer/payment-verification"), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                orderId: orderId,
                                userId: hostId,
                                amountExpected: individualShare, // 150
                                receiptData: 'VALID_RECEIPT_50' // Only 50 paid
                            })
                        })];
                case 11:
                    wrongAmountRes = _a.sent();
                    if (wrongAmountRes.status === 400) {
                        console.log('✅ Correctly rejected receipt with wrong amount. Status:', wrongAmountRes.status);
                    }
                    else {
                        console.error('❌ Failed. Expected 400 bad request logic.');
                    }
                    // 5. Test Valid Receipt (Host Pays Their Share)
                    console.log('\n--- 5. Testing Valid Receipt (Host Pays Share) ---');
                    return [4 /*yield*/, fetch("".concat(API_BASE, "/consumer/payment-verification"), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                orderId: orderId,
                                userId: hostId,
                                amountExpected: individualShare, // 150
                                receiptData: 'VALID_RECEIPT_150'
                            })
                        })];
                case 12:
                    validHostRes = _a.sent();
                    return [4 /*yield*/, validHostRes.json()];
                case 13:
                    validHostData = _a.sent();
                    if (validHostRes.ok && validHostData.orderStatus === 'AWAITING_PAYMENT' && !validHostData.allPaid) {
                        console.log('✅ Host payment verified successfully. Order still waiting for friend.');
                    }
                    else {
                        console.error('❌ Failed Host payment verification logic.', validHostData);
                    }
                    // 6. Test Valid Receipt (Friend Pays Their Share - Completing Order)
                    console.log('\n--- 6. Testing Valid Receipt (Friend Pays Share / Group Completion) ---');
                    return [4 /*yield*/, fetch("".concat(API_BASE, "/consumer/payment-verification"), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                orderId: orderId,
                                userId: friendId,
                                amountExpected: individualShare, // 150
                                receiptData: 'VALID_RECEIPT_150'
                            })
                        })];
                case 14:
                    validFriendRes = _a.sent();
                    return [4 /*yield*/, validFriendRes.json()];
                case 15:
                    validFriendData = _a.sent();
                    if (validFriendRes.ok && validFriendData.orderStatus === 'PENDING' && validFriendData.allPaid) {
                        console.log('✅ Friend payment verified successfully.');
                        console.log('✅🎉 GROUP ORDER COMPLETE. Status transitioned to PENDING (Ready for Vendor Terminal).');
                    }
                    else {
                        console.error('❌ Failed Friend payment verification / Order Completion logic.', validFriendData);
                    }
                    // 7. Verify Vendor Terminal Receives Order
                    console.log('\n--- 7. Verifying Vendor Terminal Pipeline ---');
                    return [4 /*yield*/, fetch("".concat(API_BASE, "/vendorData/").concat(vendorId, "/dashboard"))];
                case 16:
                    dashboardRes = _a.sent();
                    return [4 /*yield*/, dashboardRes.json()];
                case 17:
                    dashboardData = _a.sent();
                    incomingOrder = dashboardData.orders.find(function (o) { return o.id === orderId; });
                    if (incomingOrder && incomingOrder.status === 'PENDING') {
                        console.log('✅ VERIFIED: Order successfully routed to the Vendor Dashboard Incoming Queue!');
                    }
                    else {
                        console.error('❌ Failed: Order not found in vendor dashboard or wrong status.');
                    }
                    console.log('\n🏁 Verification Script Complete.');
                    return [3 /*break*/, 19];
                case 18:
                    err_1 = _a.sent();
                    console.error('❌ Test script failed:', err_1);
                    return [3 /*break*/, 19];
                case 19: return [2 /*return*/];
            }
        });
    });
}
runTests();
