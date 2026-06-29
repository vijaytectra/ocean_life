import prisma from "@/lib/prisma";
import { ensureAccreditationTable } from "@/lib/ensureAccreditationTable";

function hasDelegate() {
  return typeof prisma.accreditation?.findMany === "function";
}

function normalizeRow(row) {
  if (!row) return row;
  return {
    ...row,
    id: Number(row.id),
    priority: Number(row.priority ?? 0),
  };
}

export async function countAccreditations() {
  await ensureAccreditationTable();
  if (hasDelegate()) {
    return prisma.accreditation.count();
  }
  const rows = await prisma.$queryRaw`SELECT COUNT(*) AS count FROM "Accreditation"`;
  return Number(rows[0]?.count ?? 0);
}

export async function findAllAccreditations() {
  await ensureAccreditationTable();
  if (hasDelegate()) {
    return prisma.accreditation.findMany({
      orderBy: [{ priority: "desc" }, { createdAt: "asc" }],
    });
  }
  const rows = await prisma.$queryRaw`
    SELECT id, title, description, image, priority, createdAt, updatedAt
    FROM "Accreditation"
    ORDER BY priority DESC, createdAt ASC
  `;
  return rows.map(normalizeRow);
}

export async function findAccreditationById(id) {
  await ensureAccreditationTable();
  if (hasDelegate()) {
    return prisma.accreditation.findUnique({ where: { id } });
  }
  const rows = await prisma.$queryRaw`
    SELECT id, title, description, image, priority, createdAt, updatedAt
    FROM "Accreditation"
    WHERE id = ${id}
    LIMIT 1
  `;
  return normalizeRow(rows[0]) ?? null;
}

export async function insertAccreditation(data) {
  await ensureAccreditationTable();
  if (hasDelegate()) {
    return prisma.accreditation.create({ data });
  }
  await prisma.$executeRaw`
    INSERT INTO "Accreditation" (title, description, image, priority, updatedAt)
    VALUES (${data.title}, ${data.description}, ${data.image}, ${data.priority ?? 0}, datetime('now'))
  `;
  const rows = await prisma.$queryRaw`SELECT last_insert_rowid() AS id`;
  const newId = Number(rows[0]?.id);
  return findAccreditationById(newId);
}

export async function updateAccreditationRow(id, data) {
  await ensureAccreditationTable();
  if (hasDelegate()) {
    return prisma.accreditation.update({ where: { id }, data });
  }
  await prisma.$executeRaw`
    UPDATE "Accreditation"
    SET title = ${data.title},
        description = ${data.description},
        image = ${data.image},
        priority = ${data.priority ?? 0},
        updatedAt = datetime('now')
    WHERE id = ${id}
  `;
  return findAccreditationById(id);
}

export async function deleteAccreditationRow(id) {
  await ensureAccreditationTable();
  if (hasDelegate()) {
    await prisma.accreditation.delete({ where: { id } });
    return;
  }
  await prisma.$executeRaw`DELETE FROM "Accreditation" WHERE id = ${id}`;
}
