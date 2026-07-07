#!/usr/bin/env node
/** Push Prisma schema to local SQLite or Turso (reads TURSO_* / DATABASE_URL from environment). */
const { execSync } = require("child_process");
const { prismaCliDatabaseUrl } = require("./lib/prisma-client.cjs");

const url = prismaCliDatabaseUrl();
process.env.DATABASE_URL = url;

execSync("npx prisma db push", { stdio: "inherit", env: process.env });
execSync("npx prisma generate", { stdio: "inherit", env: process.env });

console.log(
  url.startsWith("libsql")
    ? "Schema synced to Turso."
    : "Schema synced to local SQLite."
);
