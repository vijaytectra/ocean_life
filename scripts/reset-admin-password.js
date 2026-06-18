#!/usr/bin/env node
/**
 * Reset or create the admin user (production-safe; does not touch logos/content).
 * Usage on server:
 *   ADMIN_PASSWORD='YourNewPassword' sudo -u oceanweb node scripts/reset-admin-password.js
 */
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const USERNAME = process.env.ADMIN_USERNAME || "admin";
const EMAIL = process.env.ADMIN_EMAIL || "admin@olipl.com";
const PASSWORD = process.env.ADMIN_PASSWORD;

async function main() {
  if (!PASSWORD || PASSWORD.length < 6) {
    console.error(
      "Set ADMIN_PASSWORD (min 6 chars), e.g.:\n  ADMIN_PASSWORD='YourPass' node scripts/reset-admin-password.js"
    );
    process.exit(1);
  }

  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: { name: "Admin" },
  });

  await prisma.role.upsert({
    where: { name: "Editor" },
    update: {},
    create: { name: "Editor" },
  });

  const user = await prisma.user.upsert({
    where: { username: USERNAME },
    update: {
      password: PASSWORD,
      name: "Super Admin",
      email: EMAIL,
      roleId: adminRole.id,
      status: "active",
    },
    create: {
      username: USERNAME,
      password: PASSWORD,
      name: "Super Admin",
      email: EMAIL,
      roleId: adminRole.id,
      status: "active",
    },
  });

  const count = await prisma.user.count();
  console.log("Admin login restored.");
  console.log(`  Users in database: ${count}`);
  console.log(`  Username: ${user.username}`);
  console.log(`  Email: ${user.email}`);
  console.log(`  Status: ${user.status}`);
  console.log("Log in at /admin/login/ with the password you set in ADMIN_PASSWORD.");
}

main()
  .catch((err) => {
    console.error("Reset failed:", err.message);
    if (err.message?.includes("no such table")) {
      console.error("Run first: npx prisma db push");
    }
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
