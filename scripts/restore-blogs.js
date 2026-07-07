#!/usr/bin/env node
/**
 * Restore / upsert blog posts in SQLite (safe to run on server after DB wipe).
 * Usage: node scripts/restore-blogs.js
 */
const { createPrisma } = require("./lib/prisma-client.cjs");
const interiorFitOut = require("./blog-data/interior-fit-out-services");

const prisma = createPrisma();

const DEFAULT_BLOGS = [
  {
    title: "Top 5 Interior Fit-Out Trends in Chennai's Commercial Spaces",
    slug: "top-5-interior-fit-out-trends-in-chennais-commercial-spaces",
    image: "/blog-images/top5.webp",
    status: "published",
    metaTitle: "Top 5 Interior Fit-Out Trends in Chennai's Commercial Spaces | OLIPL",
    metaDesc:
      "Discover Ocean Lifespaces' top 5 commercial interior fit-out trends in Chennai, blending biophilic design, smart tech, and sustainable solutions.",
    content:
      "<p>Explore the latest commercial interior fit-out trends shaping Chennai's workspaces — from biophilic design to smart technology. <a href=\"/blog/top-5-interior-fit-out-trends-in-chennais-commercial-spaces/\">Read the full article</a>.</p>",
  },
  {
    title: "Chennai's Infrastructure Boom: Projects That Will Shape the Next Decade",
    slug: "chennai-infrastructure-boom",
    image: "/blog-images/boom-projects.webp",
    status: "published",
    metaTitle: "Chennai Infrastructure Boom | Ocean Lifespaces",
    metaDesc:
      "Chennai's infrastructure boom — major projects set to transform the city over the next decade.",
    content:
      "<p>Chennai is one of India's fastest-growing urban hubs. <a href=\"/blog/chennai-infrastructure-boom/\">Read the full article</a>.</p>",
  },
  {
    title: "8 Tips to Choose the Best Civil Construction Company in Chennai",
    slug: "best-civil-construction-company-chennai",
    image: "/blog-images/right-civil.webp",
    status: "published",
    metaTitle: "Best Civil Construction Company in Chennai | Ocean Lifespaces",
    metaDesc:
      "Best Civil Construction Company in Chennai – Ocean Lifespaces delivers quality residential & commercial projects with trust, innovation & timely execution.",
    content:
      "<p>Choosing the right civil construction partner is essential for project success. <a href=\"/blog/best-civil-construction-company-chennai/\">Read the full article</a>.</p>",
  },
  interiorFitOut,
];

async function upsertBlog(blog) {
  const existing = await prisma.blog.findFirst({
    where: {
      OR: [{ slug: blog.slug }, { title: blog.title }],
    },
  });

  const data = {
    title: blog.title,
    slug: blog.slug,
    content: blog.content,
    image: blog.image,
    status: blog.status || "published",
    metaTitle: blog.metaTitle || null,
    metaDesc: blog.metaDesc || null,
  };

  if (existing) {
    await prisma.blog.update({ where: { id: existing.id }, data });
    return "updated";
  }
  await prisma.blog.create({ data });
  return "created";
}

async function main() {
  let created = 0;
  let updated = 0;

  for (const blog of DEFAULT_BLOGS) {
    const action = await upsertBlog(blog);
    if (action === "created") created += 1;
    else updated += 1;
    console.log(`${action}: ${blog.slug}`);
  }

  const total = await prisma.blog.count();
  console.log(`\nDone. Created ${created}, updated ${updated}. Total blogs: ${total}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
