import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Members = [
  {
    image: "/peter k.jpeg",
    name: "Mr. S. K. Peter ",
    role: "Managing Director & CEO",
    priority: 80,
  },
  {
    image: "/about/anitha-peter.png",
    name: "Mrs. Anitha Peter",
    role: "Director I Operations",
    priority: 70,
  },
  {
    image: "/about/durai.png",
    name: "Mr. Durai Raj L",
    role: "Chief Financial Officer",
    priority: 60,
  },
  {
    image: "/about/Arul1.jpg",
    name: "Mr. Arul Arumugam",
    role: "Senior Director",
    priority: 50,
  },
  {
    image: "/about/Sarat.jpg",
    name: "Mr. Sarat Kadambi",
    role: "Chief Operating Officer",
    priority: 40,
  },
  {
    image: "/about/vinod.webp",
    name: "Mr. Vinod Vishwanath",
    role: "Senior Director I Marine",
    priority: 30,
  },
  {
    image: "/about/balu.jpg",
    name: "Mr. Balu K",
    role: "Director - Civil",
    priority: 20,
  },
  {
    image: "/about/prabhu.jpg",
    name: "Mr. Prabhu P",
    role: "Head -  EHS",
    priority: 10,
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
        priority: member.priority,
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
