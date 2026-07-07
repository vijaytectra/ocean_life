const path = require("path");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const { PrismaLibSql } = require("@prisma/adapter-libsql");
const { createClient } = require("@libsql/client");

function resolveSqliteDatabaseUrl() {
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

function isTursoConfigured() {
  return Boolean(
    process.env.TURSO_DATABASE_URL?.trim() && process.env.TURSO_AUTH_TOKEN?.trim()
  );
}

/** Prisma client for Node scripts (local SQLite or Turso). */
function createPrisma() {
  if (isTursoConfigured()) {
    const libsql = createClient({
      url: process.env.TURSO_DATABASE_URL.trim(),
      authToken: process.env.TURSO_AUTH_TOKEN.trim(),
    });
    return new PrismaClient({ adapter: new PrismaLibSql(libsql) });
  }

  process.env.DATABASE_URL = resolveSqliteDatabaseUrl();
  return new PrismaClient();
}

/** DATABASE_URL for `prisma db push` CLI (Turso or local file). */
function prismaCliDatabaseUrl() {
  if (isTursoConfigured()) {
    const url = process.env.TURSO_DATABASE_URL.trim();
    const token = process.env.TURSO_AUTH_TOKEN.trim();
    if (url.includes("authToken=")) return url;
    const join = url.includes("?") ? "&" : "?";
    return `${url}${join}authToken=${token}`;
  }
  return resolveSqliteDatabaseUrl();
}

module.exports = {
  createPrisma,
  isTursoConfigured,
  prismaCliDatabaseUrl,
  resolveSqliteDatabaseUrl,
};
