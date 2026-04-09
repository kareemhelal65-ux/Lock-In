import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log('📊 Generating User Cohort Retention Metrics...');

    const now = new Date();
    // We'll calculate for the last 4 weeks
    for (let i = 4; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - (i * 7 + now.getDay()));
        weekStart.setHours(0, 0, 0, 0);
        
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        
        const weekLabel = `W${5-i} (${weekStart.toLocaleString('default', { month: 'short' })})`;

        // 1. Find users who signed up in this week (The Cohort)
        const cohortUsers = await prisma.user.findMany({
            where: { createdAt: { gte: weekStart, lt: weekEnd } },
            select: { id: true, createdAt: true }
        });

        if (cohortUsers.length === 0) {
            console.log(`skipping ${weekLabel} - no users`);
            continue;
        }

        const cohortIds = cohortUsers.map(u => u.id);

        // Fetch ALL orders from these users once to avoid N+1
        const allCohortOrders = await prisma.order.findMany({
            where: { hostId: { in: cohortIds } },
            select: { hostId: true, createdAt: true }
        });

        // 2. Calculate Day 1 Retention (Active between 24h-48h after signup)
        let day1Count = 0;
        for (const user of cohortUsers) {
            const d1Start = new Date(user.createdAt);
            d1Start.setDate(d1Start.getDate() + 1);
            const d1End = new Date(d1Start);
            d1End.setDate(d1End.getDate() + 2);

            const hasOrder = allCohortOrders.some(o => 
                o.hostId === user.id && o.createdAt >= d1Start && o.createdAt < d1End
            );
            if (hasOrder) day1Count++;
        }

        // 3. Calculate Day 7 Retention (Active between 6-8 days after signup)
        let day7Count = 0;
        for (const user of cohortUsers) {
            const d7Start = new Date(user.createdAt);
            d7Start.setDate(d7Start.getDate() + 7);
            const d7End = new Date(d7Start);
            d7End.setDate(d7End.getDate() + 8);

            const hasOrder = allCohortOrders.some(o => 
                o.hostId === user.id && o.createdAt >= d7Start && o.createdAt < d7End
            );
            if (hasOrder) day7Count++;
        }

        // 4. Calculate Day 30 Retention (Active between 28-32 days after signup)
        let day30Count = 0;
        if (i >= 4) {
             for (const user of cohortUsers) {
                const d30Start = new Date(user.createdAt);
                d30Start.setDate(d30Start.getDate() + 30);
                const d30End = new Date(d30Start);
                d30End.setDate(d30End.getDate() + 31);

                const hasOrder = allCohortOrders.some(o => 
                    o.hostId === user.id && o.createdAt >= d30Start && o.createdAt < d30End
                );
                if (hasOrder) day30Count++;
            }
        }

        const day1Rate = (day1Count / cohortUsers.length) * 100;
        const day7Rate = (day7Count / cohortUsers.length) * 100;
        const day30Rate = (day30Count / cohortUsers.length) * 100;

        await prisma.userCohort.upsert({
            where: { date: weekStart },
            update: { 
                weekLabel, 
                day1Rate, 
                day7Rate, 
                day30Rate,
                updatedAt: new Date()
            },
            create: { 
                date: weekStart, 
                weekLabel, 
                day1Rate, 
                day7Rate, 
                day30Rate 
            }
        });
        
        console.log(`✅ Saved cohort: ${weekLabel} - D1: ${day1Rate.toFixed(1)}%, D7: ${day7Rate.toFixed(1)}%`);
    }

    console.log('🏁 Cohort generation complete!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
