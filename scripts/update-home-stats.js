#!/usr/bin/env node
/**
 * Sync homepage stats copy in SiteContent (production DB may still have old values).
 * Usage: node scripts/update-home-stats.js
 */
const { createPrisma } = require("./lib/prisma-client.cjs");

const prisma = createPrisma();

const UPDATES = [
  { id: "counter-employees", type: "text", value: "750" },
  { id: "home-hero-title", type: "text", value: "Delivering Excellence" },
  { id: "site-logo-footer", type: "image", value: "/logo/ocean_footer.png" },
];

async function main() {
  for (const row of UPDATES) {
    await prisma.siteContent.upsert({
      where: { id: row.id },
      update: { value: row.value, type: row.type },
      create: row,
    });
    console.log(`updated: ${row.id} -> ${row.value}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
