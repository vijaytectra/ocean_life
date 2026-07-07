#!/usr/bin/env node
/**
 * Seed management team into SQLite when empty.
 * Usage: node scripts/restore-employees.js
 */
const { createPrisma } = require("./lib/prisma-client.cjs");
const DEFAULT_EMPLOYEES = require("./employee-data");

const prisma = createPrisma();

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
