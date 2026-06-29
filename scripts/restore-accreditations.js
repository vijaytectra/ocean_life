#!/usr/bin/env node
/**
 * Seed accreditations into SQLite when empty.
 * Usage: node scripts/restore-accreditations.js
 */
const path = require("path");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");

const DEFAULT_ACCREDITATIONS = [
  {
    title: "IMS",
    description: `ISO 9001:2015 - Quality <br>
ISO 14001:2015 - EMS <br>
ISO 45001:2018 Certified for Occupational Health and Safety Management System.`,
    image: "/about/awr-2.png.webp",
    priority: 60,
  },
  {
    title: "CCR A- / STABLE RATING",
    description:
      "CRISIL has upgraded our corporate credit rating to CCR A Stable from CCR BBB+/Positive.",
    image: "/about/awr-1.png.webp",
    priority: 50,
  },
  {
    title: "D&B D-U-N-S",
    description:
      "Ocean has been evaluated and is now part of the Dun & Bradstreet Global Database.",
    image: "/about/awr-3.png.webp",
    priority: 40,
  },
  {
    title: "IGBC",
    description: "Ocean is a member of Indian Green Building Council.",
    image: "/about/awr-4.png.webp",
    priority: 30,
  },
  {
    title: "ESA License",
    description:
      "Ocean has an in-house electrical team and SA grade license to carry out electrical works of any kind.",
    image: "/about/awr-8.png.webp",
    priority: 20,
  },
  {
    title: "FIDIC",
    description: "Ocean is a member of the Consulting Engineers Association of India.",
    image: "/about/awr-9.png.webp",
    priority: 10,
  },
];

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS "Accreditation" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "priority" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`;

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

async function main() {
  await prisma.$executeRawUnsafe(CREATE_TABLE_SQL);
  const count = await prisma.accreditation.count();
  if (count > 0) {
    console.log(`Accreditation table already has ${count} row(s) — nothing to do.`);
    return;
  }

  for (const row of DEFAULT_ACCREDITATIONS) {
    await prisma.accreditation.create({
      data: {
        title: row.title,
        description: row.description,
        image: row.image,
        priority: row.priority ?? 0,
      },
    });
    console.log(`created: ${row.title}`);
  }

  console.log(`\nDone. Seeded ${DEFAULT_ACCREDITATIONS.length} accreditations.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
