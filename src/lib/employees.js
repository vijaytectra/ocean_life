import prisma from "@/lib/prisma";
import {
  isMysqlEmployeeEnabled,
  mysqlCreateEmployee,
  mysqlDeleteEmployee,
  mysqlGetEmployeeById,
  mysqlListEmployees,
  mysqlUpdateEmployee,
} from "@/lib/mysqlEmployee";
import {
  FALLBACK_EMPLOYEES,
  normalizeEmployeeImagePath,
  serializeEmployee,
  serializeEmployees,
} from "@/lib/employeesShared";

export {
  FALLBACK_EMPLOYEES,
  normalizeEmployeeImagePath,
  resolveEmployeeImageSrc,
  serializeEmployee,
  serializeEmployees,
} from "@/lib/employeesShared";

function parsePriority(value) {
  const parsed = parseInt(String(value ?? 0), 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function buildEmployeePayload(data) {
  return {
    name: String(data.name ?? "").trim(),
    role: String(data.role ?? "").trim(),
    image: data.image ? normalizeEmployeeImagePath(data.image) : null,
    priority: parsePriority(data.priority),
  };
}

export function isEmployeeMysqlActive() {
  return isMysqlEmployeeEnabled();
}

export async function listEmployees() {
  if (isMysqlEmployeeEnabled()) {
    return mysqlListEmployees();
  }
  return prisma.employee.findMany({
    orderBy: [{ priority: "desc" }, { createdAt: "desc" }],
  });
}

export async function createEmployee(data) {
  const payload = buildEmployeePayload(data);
  if (!payload.name || !payload.role) {
    const err = new Error("Name and role are required");
    err.status = 400;
    throw err;
  }
  if (isMysqlEmployeeEnabled()) {
    return mysqlCreateEmployee(payload);
  }
  return prisma.employee.create({ data: payload });
}

export async function updateEmployee(id, data) {
  if (!Number.isInteger(id) || id < 1) {
    const err = new Error("Invalid employee id");
    err.status = 400;
    throw err;
  }

  const payload = buildEmployeePayload(data);
  if (!payload.name || !payload.role) {
    const err = new Error("Name and role are required");
    err.status = 400;
    throw err;
  }

  if (isMysqlEmployeeEnabled()) {
    const existing = await mysqlGetEmployeeById(id);
    if (!existing) {
      const err = new Error("Employee not found");
      err.status = 404;
      throw err;
    }
    return mysqlUpdateEmployee(id, payload);
  }

  try {
    return await prisma.employee.update({
      where: { id },
      data: payload,
    });
  } catch (error) {
    if (error?.code === "P2025") {
      const err = new Error("Employee not found");
      err.status = 404;
      throw err;
    }
    throw error;
  }
}

export async function deleteEmployee(id) {
  if (isMysqlEmployeeEnabled()) {
    await mysqlDeleteEmployee(id);
    return;
  }
  await prisma.employee.delete({ where: { id } });
}

/** DB rows, or built-in fallback when empty / unavailable. */
export async function listEmployeesForPublic() {
  try {
    const rows = await listEmployees();
    if (rows.length > 0) return serializeEmployees(rows);
    return FALLBACK_EMPLOYEES;
  } catch (err) {
    console.error("listEmployeesForPublic:", err);
    return FALLBACK_EMPLOYEES;
  }
}
