const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const username = 'admin';

  // Create default roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: { name: 'Admin' }
  });

  await prisma.role.upsert({
    where: { name: 'Editor' },
    update: {},
    create: { name: 'Editor' }
  });

  // Create/Update Admin User
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {
      password: 'password123',
      name: 'Super Admin',
      roleId: adminRole.id,
      email: 'admin@olipl.com',
      mobile: '9876543210',
      status: 'active'
    },
    create: {
      username: 'admin',
      password: 'password123',
      name: 'Super Admin',
      roleId: adminRole.id,
      email: 'admin@olipl.com',
      mobile: '9876543210',
      status: 'active'
    },
  });

  console.log(`Admin user created/updated: ${username}`);

  // Seed Client Logos
  const logos = [
    "/clients/1.webp", "/clients/2.webp", "/clients/3.webp", "/clients/4.webp", "/clients/5.webp",
    "/clients/6.webp", "/clients/7.webp", "/clients/8.webp", "/clients/9.webp", "/clients/10.webp",
    "/clients/11.webp", "/clients/12.webp", "/clients/13.webp", "/clients/14.webp", "/clients/15.webp",
    "/clients/16.webp", "/clients/17.webp", "/clients/18.webp", "/clients/19.webp", "/clients/20.webp",
    "/clients/21.webp", "/clients/22.webp", "/clients/23.webp", "/clients/24.webp", "/clients/25.webp",
    "/clients/26.webp", "/clients/27.webp", "/clients/28.webp", "/clients/29.webp", "/clients/30.webp",
    "/clients/31.webp", "/clients/32.webp", "/clients/33.webp", "/clients/34.webp", "/clients/35.webp",
  ];

  const ongoingLogos = [
    "/clients/on5.webp", "/clients/on7.webp", "/clients/on11.webp",
    "/logo/workday.jpeg", "/logo/alldigi.svg", "/logo/accenture.jpeg",
    "/logo/rsp.jpeg", "/logo/nametech.jpeg", "/logo/IIT HYDERABAD.jpeg",
    "/logo/sifi.jpeg", "/logo/st_telemedia.webp", "/logo/IRON MOUNTAIN.jpeg",
    "/logo/CITY UNION BANK.png",
  ];

  const currentCount = await prisma.clientLogo.count();
  if (currentCount === 0) {
    console.log("Seeding client logos...");
    for (const img of logos) {
      await prisma.clientLogo.create({ data: { image: img, category: 'corporate' } });
    }
    for (const img of ongoingLogos) {
      await prisma.clientLogo.create({ data: { image: img, category: 'ongoing' } });
    }
    console.log("Client logos seeded.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
