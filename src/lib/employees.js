import prisma from "@/lib/prisma";
import {
  FALLBACK_EMPLOYEES,
  serializeEmployee,
  serializeEmployees,
} from "@/lib/employeesShared";

export { FALLBACK_EMPLOYEES, resolveEmployeeImageSrc, serializeEmployee, serializeEmployees } from "@/lib/employeesShared";

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
