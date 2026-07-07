import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { resolveDatabaseUrl } from "@/lib/databaseUrl";

function isTursoConfigured() {
  return Boolean(
    process.env.TURSO_DATABASE_URL?.trim() && process.env.TURSO_AUTH_TOKEN?.trim()
  );
}

function createPrismaClient() {
  if (isTursoConfigured()) {
    const libsql = createClient({
      url: process.env.TURSO_DATABASE_URL.trim(),
      authToken: process.env.TURSO_AUTH_TOKEN.trim(),
    });
    return new PrismaClient({ adapter: new PrismaLibSql(libsql) });
  }

  process.env.DATABASE_URL = resolveDatabaseUrl();
  return new PrismaClient();
}

const globalForPrisma = global;

export const prisma = globalForPrisma.prisma ?? createPrismaClient();
globalForPrisma.prisma = prisma;

export default prisma;

export { isTursoConfigured };
