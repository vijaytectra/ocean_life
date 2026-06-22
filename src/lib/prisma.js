// Updated to include ClientLogo model
import { PrismaClient } from "@prisma/client";
import { resolveDatabaseUrl } from "@/lib/databaseUrl";

// Always use absolute SQLite path so PM2 / .env relative paths cannot point at a read-only copy.
process.env.DATABASE_URL = resolveDatabaseUrl();

const globalForPrisma = global;

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

globalForPrisma.prisma = prisma;

export default prisma;
