import prisma from "@/lib/prisma";

/** Create Accreditation table when prisma db push did not run (SQLite). */
export async function ensureAccreditationTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Accreditation" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "title" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "image" TEXT NOT NULL,
      "priority" INTEGER NOT NULL DEFAULT 0,
      "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
