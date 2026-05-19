import prisma from "@/lib/prisma";

/** Shown on About if the database has no rows (e.g. fresh server before seed). */
export const FALLBACK_EMPLOYEES = [
  { id: 1, name: "Mr. S. K. Peter ", role: "Managing Director & CEO", image: "/peter k.jpeg", priority: 80 },
  { id: 2, name: "Mrs. Anitha Peter", role: "Director I Operations", image: "/about/anitha-peter.png", priority: 70 },
  { id: 3, name: "Mr. Durai Raj L", role: "Chief Financial Officer", image: "/about/durai.png", priority: 60 },
  { id: 4, name: "Mr. Arul Arumugam", role: "Senior Director", image: "/about/Arul1.jpg", priority: 50 },
  { id: 5, name: "Mr. Sarat Kadambi", role: "Chief Operating Officer", image: "/about/Sarat.jpg", priority: 40 },
  { id: 6, name: "Mr. Vinod Vishwanath", role: "Senior Director I Marine", image: "/about/vinod.webp", priority: 30 },
  { id: 7, name: "Mr. Balu K", role: "Director - Civil", image: "/about/balu.jpg", priority: 20 },
  { id: 8, name: "Mr. Prabhu P", role: "Head -  EHS", image: "/about/prabhu.jpg", priority: 10 },
];

export function resolveEmployeeImageSrc(url) {
  if (!url || typeof url !== "string") return "";
  const u = url.trim();
  if (!u) return "";
  if (u.startsWith("http://") || u.startsWith("https://")) return u;
  if (u.startsWith("/")) return encodeURI(u);
  return encodeURI(`/${u}`);
}

export function serializeEmployee(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    image: row.image ?? null,
    priority: row.priority ?? 0,
    createdAt: row.createdAt instanceof Date ? row.createdAt.toISOString() : row.createdAt,
    updatedAt: row.updatedAt instanceof Date ? row.updatedAt.toISOString() : row.updatedAt,
  };
}

export function serializeEmployees(rows) {
  return (rows || []).map(serializeEmployee);
}

export async function listEmployees() {
  return prisma.employee.findMany({
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
  });
}

/** DB rows, or built-in fallback when empty / unavailable. */
export async function listEmployeesForPublic() {
  try {
    const rows = await listEmployees();
    if (rows.length > 0) return serializeEmployees(rows);
    return FALLBACK_EMPLOYEES;
  } catch {
    return FALLBACK_EMPLOYEES;
  }
}
