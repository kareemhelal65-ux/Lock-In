import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log("Updating vendor assets...");
    const updatedVendorsLogo = await prisma.vendor.updateMany({
        where: { image: '/placeholder-logo.jpg' },
        data: { image: 'https://placehold.co/400x400/1D1D20/b0f200?text=VENDOR' }
    });
    console.log(`Updated ${updatedVendorsLogo.count} vendor logos.`);

    const updatedVendorsBanner = await prisma.vendor.updateMany({
        where: { bannerImage: '/placeholder-banner.jpg' },
        data: { bannerImage: 'https://placehold.co/1200x400/1D1D20/808080?text=BANNER' }
    });
    console.log(`Updated ${updatedVendorsBanner.count} vendor banners.`);

    console.log("Updating menu items...");
    const updatedItems = await prisma.menuItem.updateMany({
        where: { image: '/placeholder-item.jpg' },
        data: { image: 'https://placehold.co/400x400/1a1a1a/4d4d4d?text=NO+IMAGE' }
    });
    console.log(`Updated ${updatedItems.count} menu items.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
