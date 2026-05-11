import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Members = [
  {
    image: "/peter k.jpeg",
    name: "Mr. S. K. Peter ",
    role: "Managing Director & CEO",
  },
  {
    image: "/about/anitha-peter.png",
    name: "Mrs. Anitha Peter",
    role: "Director I Operations",
  },
  {
    image: "/about/Sarat.jpg",
    name: "Mr. Sarat Kadambi",
    role: "Chief Operating Officer",
  },
  {
    image: "/about/durai.png",
    name: "Mr. Durai Raj L",
    role: "Chief Financial Officer",
  },
  {
    image: "/about/Arul1.jpg",
    name: "Mr. Arul Arumugam",
    role: "Senior Director",
  },
  {
    image: "/about/vinod.webp",
    name: "Mr. Vinod Vishwanath",
    role: "Senior Director I Marine",
  },
  {
    image: "/about/balu.jpg",
    name: "Mr. Balu K",
    role: "Director - Civil",
  },
  {
    image: "/about/prabhu.jpg",
    name: "Mr. Prabhu P",
    role: "Head -  EHS",
  },
];

async function main() {
  console.log("Seeding existing employees...");
  // Clear existing to avoid duplicates if run multiple times
  await prisma.employee.deleteMany();
  
  for (const member of Members) {
    await prisma.employee.create({
      data: {
        name: member.name,
        role: member.role,
        image: member.image,
      }
    });
  }
  console.log("Seeding complete!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
