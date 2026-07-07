#!/usr/bin/env node
/**
 * Restore client logos from public/clients/ and public/logo/ into SQLite.
 * Safe to run anytime — skips logos already in the database.
 *
 * On server: node scripts/restore-logos.js
 */
const fs = require("fs");
const path = require("path");
const { createPrisma } = require("./lib/prisma-client.cjs");

const prisma = createPrisma();

const IMAGE_EXT = /\.(webp|png|jpe?g|svg)$/i;
const SKIP_FILES = new Set(["client_bg.png"]);

/** Fallback if folders are missing (matches files in repo). */
const FALLBACK_CORPORATE = [
  "/clients/1.webp", "/clients/2.webp", "/clients/3.webp", "/clients/4.webp", "/clients/5.webp",
  "/clients/6.webp", "/clients/7.webp", "/clients/8.webp", "/clients/9.webp", "/clients/10.webp",
  "/clients/11.webp", "/clients/12.webp", "/clients/13.webp", "/clients/14.webp", "/clients/15.webp",
  "/clients/16.webp", "/clients/17.webp", "/clients/18.webp", "/clients/19.webp", "/clients/20.webp",
  "/clients/21.webp", "/clients/22.webp", "/clients/23.webp", "/clients/24.webp", "/clients/25.webp",
  "/clients/26.webp", "/clients/27.webp", "/clients/28.webp", "/clients/29.webp", "/clients/30.webp",
  "/clients/31.webp", "/clients/32.webp", "/clients/33.webp", "/clients/34.webp", "/clients/35.webp",
];

const FALLBACK_ONGOING = [
  "/clients/on5.webp", "/clients/on7.webp", "/clients/on11.webp",
  "/logo/workday.png", "/logo/alldigi.svg", "/logo/accenture.png",
  "/logo/rsp.jpeg", "/logo/nametech.jpeg", "/logo/IIT HYDERABAD.png",
  "/logo/sifi.webp", "/logo/sifi.png", "/logo/st_telemedia.webp", "/logo/IRON MOUNTAIN.png",
  "/logo/CITY UNION BANK.png",
];

function scanPublicDir(subdir, urlPrefix, filter = () => true) {
  const dir = path.join(process.cwd(), "public", subdir);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => IMAGE_EXT.test(file) && filter(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `${urlPrefix}/${file}`);
}

function fileExists(publicPath) {
  const rel = publicPath.replace(/^\//, "");
  return fs.existsSync(path.join(process.cwd(), "public", rel));
}

async function main() {
  const corporate = scanPublicDir(
    "clients",
    "/clients",
    (f) => !SKIP_FILES.has(f) && !f.startsWith("on")
  );
  const ongoing = [
    ...scanPublicDir("clients", "/clients", (f) => f.startsWith("on")),
    ...scanPublicDir("logo", "/logo", (f) => !f.includes("anitha peter old")),
  ];

  const ongoingUnique = [...new Set(ongoing)];

  let corpList = corporate.length > 0 ? corporate : FALLBACK_CORPORATE;
  let ongList = ongoingUnique.length > 0 ? ongoingUnique : FALLBACK_ONGOING;

  corpList = corpList.filter(fileExists);
  ongList = ongList.filter(fileExists);
  const existing = await prisma.clientLogo.findMany({
    select: { image: true, category: true },
  });
  const seen = new Set(existing.map((r) => `${r.category}:${r.image}`));

  let added = 0;
  for (const image of corpList) {
    const key = `corporate:${image}`;
    if (seen.has(key)) continue;
    await prisma.clientLogo.create({ data: { image, category: "corporate" } });
    seen.add(key);
    added += 1;
  }
  for (const image of ongList) {
    const key = `ongoing:${image}`;
    if (seen.has(key)) continue;
    await prisma.clientLogo.create({ data: { image, category: "ongoing" } });
    seen.add(key);
    added += 1;
  }

  const total = await prisma.clientLogo.count();
  const corporateCount = await prisma.clientLogo.count({ where: { category: "corporate" } });
  const ongoingCount = await prisma.clientLogo.count({ where: { category: "ongoing" } });

  console.log(`Added ${added} logo(s). Total: ${total} (corporate: ${corporateCount}, ongoing: ${ongoingCount})`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
