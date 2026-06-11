import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Blogs = [
  {
    title: "Top 5 Interior Fit-Out Trends in Chennai’s Commercial Spaces",
    content: "The commercial landscape in Chennai is transforming drastically and is on the rise. With the enormous...",
    image: "/blog-images/top5.webp",
  },
  {
    title: "Chennai’s Infrastructure Boom: Projects That Will Shape the Next Decade",
    content: "Chennai is considered one of the fastest-growing urban hubs in India. The next decade is planned to transform ...",
    image: "/blog-images/boom-projects.webp",
  },
  {
    title: "8 Tips to Choose the Best Civil Construction Company in Chennai",
    content: "It is essential to choose the best civil company for your real estate project. Choosing the right company ...",
    image: "/blog-images/right-civil.webp",
  },
];

const SiteContents = [
  { id: 'counter-employees', type: 'text', value: '650' },
  { id: 'counter-projects', type: 'text', value: '60' },
  { id: 'counter-experience', type: 'text', value: '30' },
  { id: 'counter-ongoing', type: 'text', value: '550' },
  { id: 'home-hero-title', type: 'text', value: 'Delivering Dreams' },
  { id: 'show-floating-enquiry', type: 'text', value: 'true' },
  { id: 'admin-notification-email', type: 'text', value: 'salesinfra@olipl.com' },
];

async function main() {
  console.log("Seeding Blogs and Site Content...");
  
  // Seed Blogs
  for (const blog of Blogs) {
    // avoid exact duplicates
    const exists = await prisma.blog.findFirst({ where: { title: blog.title } });
    if (!exists) {
      await prisma.blog.create({ data: blog });
    }
  }

  // Seed SiteContent
  for (const content of SiteContents) {
    const exists = await prisma.siteContent.findUnique({ where: { id: content.id } });
    if (!exists) {
      await prisma.siteContent.create({ data: content });
    }
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
