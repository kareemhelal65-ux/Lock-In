import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function test() {
    const user = await prisma.user.findFirst();
    const vendor = await prisma.vendor.findFirst();
    const order = await prisma.order.create({
        data: {
            orderNumber: "TEST-100",
            totalAmount: 410,
            hostId: user.id,
            vendorId: vendor.id,
            status: "AWAITING_PAYMENT"
        }
    });

    const pOrder = await prisma.participantOrder.create({
        data: {
            orderId: order.id,
            userId: user.id,
            shareAmount: 205,
            sawaSubsidy: 0,
            hasPaid: false
        }
    });

    const card = await prisma.card.findFirst({ where: { perkCode: 'SAWA_DISCOUNT' } });
    const uCard = await prisma.userCard.create({
        data: {
            userId: user.id,
            cardId: card.id,
            isUsed: false
        }
    });

    // Mock Express Request
    const reqBody = {
        orderId: order.id,
        userId: user.id,
        amountExpected: 174.25,
        receiptData: "test_url",
        perkUserCardId: uCard.id
    };

    let newSawaSubsidy = pOrder.sawaSubsidy;
    if (reqBody.perkUserCardId) {
        const activeUserCard = await prisma.userCard.findUnique({
            where: { id: reqBody.perkUserCardId },
            include: { card: true }
        });

        if (activeUserCard && !activeUserCard.isUsed) {
            const perk = activeUserCard.card.perkCode;
            if (perk === 'SAWA_DISCOUNT') {
                newSawaSubsidy = pOrder.shareAmount * 0.15;
            }
        }
    }

    await prisma.participantOrder.update({
        where: { id: pOrder.id },
        data: {
            hasPaid: true,
            paymentScreenshotUrl: reqBody.receiptData,
            sawaSubsidy: newSawaSubsidy
        }
    });

    const result = await prisma.participantOrder.findUnique({ where: { id: pOrder.id } });
    console.log("Sawa Subsidy DB Value:", result.sawaSubsidy);
}
test().catch(console.error).finally(() => prisma.$disconnect());
