import fs from "fs";
import path from "path";

/** Resolve SQLite DATABASE_URL to an absolute file path (required for reliable writes in PM2). */
export function resolveDatabaseUrl() {
  const raw = (process.env.DATABASE_URL || "file:./prisma/dev.db").trim();

  if (!raw.startsWith("file:")) {
    return raw;
  }

  let filePath = raw.slice(5);
  const queryIndex = filePath.indexOf("?");
  const query = queryIndex >= 0 ? filePath.slice(queryIndex) : "";
  if (queryIndex >= 0) {
    filePath = filePath.slice(0, queryIndex);
  }

  if (filePath === ":memory:") {
    return raw;
  }

  if (!path.isAbsolute(filePath)) {
    filePath = path.join(process.cwd(), filePath.replace(/^\.\//, ""));
  }

  // Legacy misconfig: file:./dev.db at project root while real DB is prisma/dev.db
  const prismaDb = path.join(process.cwd(), "prisma", "dev.db");
  const rootDevDb = path.join(process.cwd(), "dev.db");
  if (filePath === rootDevDb && fs.existsSync(prismaDb)) {
    const rootStat = fs.existsSync(rootDevDb) ? fs.statSync(rootDevDb) : null;
    if (!rootStat || rootStat.size === 0) {
      filePath = prismaDb;
    }
  }

  return `file:${filePath}${query}`;
}
