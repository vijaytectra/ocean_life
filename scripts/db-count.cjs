#!/usr/bin/env node
/** Print row count for a Prisma table (SQLite file or Turso). Usage: node scripts/db-count.cjs ClientLogo */
const { createPrisma } = require("./lib/prisma-client.cjs");

const table = process.argv[2];
if (!table || !/^[A-Za-z][A-Za-z0-9_]*$/.test(table)) {
  console.error("Usage: node scripts/db-count.cjs <TableName>");
  process.exit(1);
}

async function main() {
  const prisma = createPrisma();
  try {
    const rows = await prisma.$queryRawUnsafe(`SELECT COUNT(*) AS count FROM "${table}"`);
    const count = Number(rows[0]?.count ?? 0);
    console.log(count);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
