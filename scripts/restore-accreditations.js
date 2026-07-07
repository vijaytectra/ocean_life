#!/usr/bin/env node
/**
 * Seed accreditations into SQLite when empty.
 * Usage: node scripts/restore-accreditations.js
 */
const { createPrisma } = require("./lib/prisma-client.cjs");

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

const prisma = createPrisma();

async function countRows() {
  if (typeof prisma.accreditation?.count === "function") {
    return prisma.accreditation.count();
  }
  const rows = await prisma.$queryRaw`SELECT COUNT(*) AS count FROM "Accreditation"`;
  return Number(rows[0]?.count ?? 0);
}

async function insertRow(row) {
  if (typeof prisma.accreditation?.create === "function") {
    await prisma.accreditation.create({
      data: {
        title: row.title,
        description: row.description,
        image: row.image,
        priority: row.priority ?? 0,
      },
    });
    return;
  }
  await prisma.$executeRaw`
    INSERT INTO "Accreditation" (title, description, image, priority, updatedAt)
    VALUES (${row.title}, ${row.description}, ${row.image}, ${row.priority ?? 0}, datetime('now'))
  `;
}

async function main() {
  await prisma.$executeRawUnsafe(CREATE_TABLE_SQL);
  const count = await countRows();
  if (count > 0) {
    console.log(`Accreditation table already has ${count} row(s) — nothing to do.`);
    return;
  }

  for (const row of DEFAULT_ACCREDITATIONS) {
    await insertRow(row);
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
