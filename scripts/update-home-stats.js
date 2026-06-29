#!/usr/bin/env node
/**
 * Sync homepage stats copy in SiteContent (production DB may still have old values).
 * Usage: node scripts/update-home-stats.js
 */
const path = require("path");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");

function resolveDatabaseUrl() {
  const raw = (process.env.DATABASE_URL || "file:./prisma/dev.db").trim();
  if (!raw.startsWith("file:")) return raw;
  let filePath = raw.slice(5).split("?")[0];
  if (filePath !== ":memory:" && !path.isAbsolute(filePath)) {
    filePath = path.join(process.cwd(), filePath.replace(/^\.\//, ""));
  }
  const prismaDb = path.join(process.cwd(), "prisma", "dev.db");
  const rootDevDb = path.join(process.cwd(), "dev.db");
  if (filePath === rootDevDb && fs.existsSync(prismaDb)) {
    const rootStat = fs.existsSync(rootDevDb) ? fs.statSync(rootDevDb) : null;
    if (!rootStat || rootStat.size === 0) filePath = prismaDb;
  }
  return `file:${filePath}`;
}

process.env.DATABASE_URL = resolveDatabaseUrl();
const prisma = new PrismaClient();

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
