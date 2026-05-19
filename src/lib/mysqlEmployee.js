import mysql from "mysql2/promise";

const globalForMysql = globalThis;

/**
 * MySQL for `Employee` (management team).
 *
 * Set `MYSQL_EMPLOYEE_URL` — or reuse `MYSQL_BLOG_URL` if same database.
 * Optional: `MYSQL_EMPLOYEE_TABLE` (default `Employee`), `MYSQL_EMPLOYEE_SNAKE_COLUMNS=true`
 */

function connectionUrl() {
  const dedicated = process.env.MYSQL_EMPLOYEE_URL?.trim();
  if (dedicated) return dedicated;
  return process.env.MYSQL_BLOG_URL?.trim() || "";
}

function isPlaceholderUrl(url) {
  if (!url) return true;
  return (
    url.includes("USER:PASSWORD") ||
    url.includes("@HOST:") ||
    url.includes("YOUR_DATABASE")
  );
}

function useSnakeColumns() {
  const v = process.env.MYSQL_EMPLOYEE_SNAKE_COLUMNS;
  return v === "1" || v === "true" || v === "yes";
}

function tableName() {
  const t = process.env.MYSQL_EMPLOYEE_TABLE?.trim();
  return t && /^[a-zA-Z0-9_]+$/.test(t) ? t : "Employee";
}

function selectExpr() {
  if (useSnakeColumns()) {
    return [
      "`id`",
      "`name`",
      "`role`",
      "`image`",
      "`priority`",
      "`created_at` AS `createdAt`",
      "`updated_at` AS `updatedAt`",
    ].join(", ");
  }
  return [
    "`id`",
    "`name`",
    "`role`",
    "`image`",
    "`priority`",
    "`createdAt`",
    "`updatedAt`",
  ].join(", ");
}

export function isMysqlEmployeeEnabled() {
  const url = connectionUrl();
  return Boolean(url) && !isPlaceholderUrl(url);
}

export function getMysqlEmployeePool() {
  if (!isMysqlEmployeeEnabled()) return null;
  if (globalForMysql.__mysqlEmployeePool) return globalForMysql.__mysqlEmployeePool;
  const pool = mysql.createPool({
    uri: connectionUrl(),
    waitForConnections: true,
    connectionLimit: Number(process.env.MYSQL_EMPLOYEE_POOL_SIZE || 10),
    maxIdle: 8,
    idleTimeout: 60000,
    enableKeepAlive: true,
  });
  globalForMysql.__mysqlEmployeePool = pool;
  return pool;
}

function rowToEmployee(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    image: row.image ?? null,
    priority: row.priority ?? 0,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function mysqlListEmployees() {
  const pool = getMysqlEmployeePool();
  if (!pool) throw new Error("MySQL employee pool not configured");
  const t = tableName();
  const orderCol = useSnakeColumns() ? "`priority` DESC, `created_at` DESC" : "`priority` DESC, `createdAt` DESC";
  const [rows] = await pool.execute(
    `SELECT ${selectExpr()} FROM \`${t}\` ORDER BY ${orderCol}`
  );
  return (rows || []).map(rowToEmployee);
}

export async function mysqlGetEmployeeById(id) {
  const pool = getMysqlEmployeePool();
  if (!pool) throw new Error("MySQL employee pool not configured");
  const t = tableName();
  const [rows] = await pool.execute(
    `SELECT ${selectExpr()} FROM \`${t}\` WHERE \`id\` = ? LIMIT 1`,
    [id]
  );
  return rowToEmployee(rows?.[0]);
}

export async function mysqlCreateEmployee({ name, role, image, priority }) {
  const pool = getMysqlEmployeePool();
  if (!pool) throw new Error("MySQL employee pool not configured");
  const t = tableName();
  const p = priority ?? 0;

  if (useSnakeColumns()) {
    const [result] = await pool.execute(
      `INSERT INTO \`${t}\` (\`name\`, \`role\`, \`image\`, \`priority\`, \`created_at\`, \`updated_at\`)
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))`,
      [name, role, image ?? null, p]
    );
    return mysqlGetEmployeeById(result.insertId);
  }

  const [result] = await pool.execute(
    `INSERT INTO \`${t}\` (\`name\`, \`role\`, \`image\`, \`priority\`, \`createdAt\`, \`updatedAt\`)
     VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))`,
    [name, role, image ?? null, p]
  );
  return mysqlGetEmployeeById(result.insertId);
}

export async function mysqlUpdateEmployee(id, { name, role, image, priority }) {
  const pool = getMysqlEmployeePool();
  if (!pool) throw new Error("MySQL employee pool not configured");
  const t = tableName();

  if (useSnakeColumns()) {
    await pool.execute(
      `UPDATE \`${t}\` SET \`name\` = ?, \`role\` = ?, \`image\` = ?, \`priority\` = ?, \`updated_at\` = CURRENT_TIMESTAMP(3) WHERE \`id\` = ?`,
      [name, role, image ?? null, priority ?? 0, id]
    );
  } else {
    await pool.execute(
      `UPDATE \`${t}\` SET \`name\` = ?, \`role\` = ?, \`image\` = ?, \`priority\` = ?, \`updatedAt\` = CURRENT_TIMESTAMP(3) WHERE \`id\` = ?`,
      [name, role, image ?? null, priority ?? 0, id]
    );
  }
  return mysqlGetEmployeeById(id);
}

export async function mysqlDeleteEmployee(id) {
  const pool = getMysqlEmployeePool();
  if (!pool) throw new Error("MySQL employee pool not configured");
  const t = tableName();
  await pool.execute(`DELETE FROM \`${t}\` WHERE \`id\` = ?`, [id]);
}
