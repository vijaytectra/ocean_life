import prisma from "@/lib/prisma";
import { DEFAULT_ACCREDITATIONS } from "@/lib/defaultAccreditations";
import { ensureAccreditationTable } from "@/lib/ensureAccreditationTable";

function parsePriority(value) {
  const parsed = parseInt(String(value ?? 0), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function serializeAccreditation(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    image: row.image,
    priority: row.priority ?? 0,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export function serializeAccreditations(rows) {
  return rows.map(serializeAccreditation);
}

function buildPayload(data) {
  return {
    title: String(data.title ?? "").trim(),
    description: String(data.description ?? "").trim(),
    image: String(data.image ?? "").trim(),
    priority: parsePriority(data.priority),
  };
}

export async function listAccreditations() {
  await ensureAccreditationTable();
  return prisma.accreditation.findMany({
    orderBy: [{ priority: "desc" }, { createdAt: "asc" }],
  });
}

export async function listAccreditationsForPublic() {
  const rows = await listAccreditations();
  if (rows.length > 0) {
    return serializeAccreditations(rows);
  }
  return DEFAULT_ACCREDITATIONS.map((item, index) => ({
    id: `fallback-${index}`,
    ...item,
  }));
}

export async function createAccreditation(data) {
  await ensureAccreditationTable();
  const payload = buildPayload(data);
  if (!payload.title || !payload.description || !payload.image) {
    const err = new Error("Title, description, and image are required");
    err.status = 400;
    throw err;
  }
  return prisma.accreditation.create({ data: payload });
}

export async function updateAccreditation(id, data) {
  if (!Number.isInteger(id) || id < 1) {
    const err = new Error("Invalid accreditation id");
    err.status = 400;
    throw err;
  }

  const existing = await prisma.accreditation.findUnique({ where: { id } });
  if (!existing) {
    const err = new Error("Accreditation not found");
    err.status = 404;
    throw err;
  }

  const payload = buildPayload(data);
  if (!payload.title || !payload.description || !payload.image) {
    const err = new Error("Title, description, and image are required");
    err.status = 400;
    throw err;
  }

  return prisma.accreditation.update({
    where: { id },
    data: payload,
  });
}

export async function deleteAccreditation(id) {
  if (!Number.isInteger(id) || id < 1) {
    const err = new Error("Invalid accreditation id");
    err.status = 400;
    throw err;
  }

  const existing = await prisma.accreditation.findUnique({ where: { id } });
  if (!existing) {
    const err = new Error("Accreditation not found");
    err.status = 404;
    throw err;
  }

  await prisma.accreditation.delete({ where: { id } });
}
