import prisma from "@/lib/prisma";
import { DEFAULT_EMPLOYEES } from "@/lib/defaultEmployees";

/** Insert default management team when Employee table is empty. */
export async function seedDefaultEmployeesIfEmpty() {
  const count = await prisma.employee.count();
  if (count > 0) {
    return { seeded: 0, total: count, skipped: true };
  }

  for (const row of DEFAULT_EMPLOYEES) {
    await prisma.employee.create({
      data: {
        name: row.name,
        role: row.role,
        image: row.image,
        priority: row.priority ?? 0,
      },
    });
  }

  return { seeded: DEFAULT_EMPLOYEES.length, total: DEFAULT_EMPLOYEES.length, skipped: false };
}
