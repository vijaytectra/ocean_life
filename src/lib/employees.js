import prisma from "@/lib/prisma";
import {
  isMysqlEmployeeEnabled,
  mysqlCreateEmployee,
  mysqlDeleteEmployee,
  mysqlListEmployees,
  mysqlUpdateEmployee,
} from "@/lib/mysqlEmployee";
import {
  FALLBACK_EMPLOYEES,
  serializeEmployee,
  serializeEmployees,
} from "@/lib/employeesShared";

export {
  FALLBACK_EMPLOYEES,
  resolveEmployeeImageSrc,
  serializeEmployee,
  serializeEmployees,
} from "@/lib/employeesShared";

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
  const payload = {
    name: data.name,
    role: data.role,
    image: data.image ?? null,
    priority: data.priority ? parseInt(String(data.priority), 10) : 0,
  };
  if (isMysqlEmployeeEnabled()) {
    return mysqlCreateEmployee(payload);
  }
  return prisma.employee.create({ data: payload });
}

export async function updateEmployee(id, data) {
  const payload = {
    name: data.name,
    role: data.role,
    image: data.image,
    priority:
      data.priority !== undefined
        ? parseInt(String(data.priority), 10)
        : undefined,
  };
  if (isMysqlEmployeeEnabled()) {
    return mysqlUpdateEmployee(id, {
      name: payload.name,
      role: payload.role,
      image: payload.image ?? null,
      priority: payload.priority ?? 0,
    });
  }
  return prisma.employee.update({
    where: { id },
    data: {
      name: payload.name,
      role: payload.role,
      image: payload.image,
      ...(payload.priority !== undefined ? { priority: payload.priority } : {}),
    },
  });
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
