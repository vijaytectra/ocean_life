#!/usr/bin/env node
/**
 * Seed management team into SQLite when empty.
 * Usage: node scripts/restore-employees.js
 */
const path = require("path");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const DEFAULT_EMPLOYEES = require("./employee-data");

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
  const count = await prisma.employee.count();
  if (count > 0) {
    console.log(`Employee table already has ${count} row(s) — nothing to do.`);
    return;
  }

  for (const row of DEFAULT_EMPLOYEES) {
    await prisma.employee.create({
      data: {
        name: row.name,
        role: row.role,
        image: row.image,
        priority: row.priority ?? 0,
      },
    });
    console.log(`created: ${row.name.trim()}`);
  }

  console.log(`\nDone. Seeded ${DEFAULT_EMPLOYEES.length} team members.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
