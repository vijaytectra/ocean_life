import mysql from "mysql2/promise";

const globalForMysql = globalThis;

/**
 * MySQL for `Blog` only — set `MYSQL_BLOG_URL` (e.g. `mysql://user:pass@host:3306/dbname`).
 * When unset, blog routes keep using Prisma (e.g. SQLite dev).
 *
 * Optional:
 * - `MYSQL_BLOG_TABLE` — table name (default `Blog`)
 * - `MYSQL_BLOG_SNAKE_COLUMNS=true` — DB uses snake_case (`meta_title`, `created_at`, …)
 */

function snakeColumnsEnabled() {
  const v = process.env.MYSQL_BLOG_SNAKE_COLUMNS;
  return v === "1" || v === "true" || v === "yes";
}

function tableName() {
  const t = process.env.MYSQL_BLOG_TABLE?.trim();
  return t && /^[a-zA-Z0-9_]+$/.test(t) ? t : "Blog";
}

function selectExpr() {
  if (snakeColumnsEnabled()) {
    return [
      "`id`",
      "`title`",
      "`content`",
      "`image`",
      "`status`",
      "`meta_title` AS `metaTitle`",
      "`meta_desc` AS `metaDesc`",
      "`created_at` AS `createdAt`",
      "`updated_at` AS `updatedAt`",
    ].join(", ");
  }
  return [
    "`id`",
    "`title`",
    "`content`",
    "`image`",
    "`status`",
    "`metaTitle`",
    "`metaDesc`",
    "`createdAt`",
    "`updatedAt`",
  ].join(", ");
}

/** True only when a real MySQL URL is configured (not .env placeholders). */
export function isMysqlBlogEnabled() {
  const url = process.env.MYSQL_BLOG_URL?.trim();
  if (!url) return false;
  const placeholderPattern = /USER:PASSWORD@HOST|YOUR_DATABASE|mysql:\/\/user:pass@host/i;
  return !placeholderPattern.test(url);
}

export function getMysqlBlogPool() {
  if (!isMysqlBlogEnabled()) return null;
  if (globalForMysql.__mysqlBlogPool) return globalForMysql.__mysqlBlogPool;
  const pool = mysql.createPool({
    uri: process.env.MYSQL_BLOG_URL.trim(),
    waitForConnections: true,
    connectionLimit: Number(process.env.MYSQL_BLOG_POOL_SIZE || 10),
    maxIdle: 8,
    idleTimeout: 60000,
    enableKeepAlive: true,
  });
  globalForMysql.__mysqlBlogPool = pool;
  return pool;
}

function rowToBlog(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    image: row.image ?? null,
    status: row.status ?? "published",
    metaTitle: row.metaTitle ?? null,
    metaDesc: row.metaDesc ?? null,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function mysqlListBlogs() {
  const pool = getMysqlBlogPool();
  if (!pool) throw new Error("MySQL blog pool not configured");
  const t = tableName();
  const [rows] = await pool.execute(`SELECT ${selectExpr()} FROM \`${t}\` ORDER BY ${
    snakeColumnsEnabled() ? "`created_at`" : "`createdAt`"
  } DESC`);
  return (rows || []).map(rowToBlog);
}

export async function mysqlGetBlogById(id) {
  const pool = getMysqlBlogPool();
  if (!pool) throw new Error("MySQL blog pool not configured");
  const t = tableName();
  const [rows] = await pool.execute(`SELECT ${selectExpr()} FROM \`${t}\` WHERE \`id\` = ? LIMIT 1`, [id]);
  const row = rows?.[0];
  return rowToBlog(row);
}

export async function mysqlCreateBlog({ title, content, image, metaTitle, metaDesc, status }) {
  const pool = getMysqlBlogPool();
  if (!pool) throw new Error("MySQL blog pool not configured");
  const t = tableName();
  const snake = snakeColumnsEnabled();

  if (snake) {
    const [result] = await pool.execute(
      `INSERT INTO \`${t}\` (\`title\`, \`content\`, \`image\`, \`status\`, \`meta_title\`, \`meta_desc\`, \`created_at\`, \`updated_at\`)
       VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))`,
      [title, content, image ?? null, status, metaTitle ?? null, metaDesc ?? null]
    );
    const insertId = result.insertId;
    return mysqlGetBlogById(insertId);
  }

  const [result] = await pool.execute(
    `INSERT INTO \`${t}\` (\`title\`, \`content\`, \`image\`, \`status\`, \`metaTitle\`, \`metaDesc\`, \`createdAt\`, \`updatedAt\`)
     VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3))`,
    [title, content, image ?? null, status, metaTitle ?? null, metaDesc ?? null]
  );
  const insertId = result.insertId;
  return mysqlGetBlogById(insertId);
}

export async function mysqlUpdateBlog(id, { title, content, image, metaTitle, metaDesc, status }) {
  const pool = getMysqlBlogPool();
  if (!pool) throw new Error("MySQL blog pool not configured");
  const t = tableName();
  const snake = snakeColumnsEnabled();

  if (snake) {
    await pool.execute(
      `UPDATE \`${t}\` SET \`title\` = ?, \`content\` = ?, \`image\` = ?, \`status\` = ?, \`meta_title\` = ?, \`meta_desc\` = ?, \`updated_at\` = CURRENT_TIMESTAMP(3) WHERE \`id\` = ?`,
      [title, content, image ?? null, status, metaTitle ?? null, metaDesc ?? null, id]
    );
  } else {
    await pool.execute(
      `UPDATE \`${t}\` SET \`title\` = ?, \`content\` = ?, \`image\` = ?, \`status\` = ?, \`metaTitle\` = ?, \`metaDesc\` = ?, \`updatedAt\` = CURRENT_TIMESTAMP(3) WHERE \`id\` = ?`,
      [title, content, image ?? null, status, metaTitle ?? null, metaDesc ?? null, id]
    );
  }
  return mysqlGetBlogById(id);
}

export async function mysqlDeleteBlog(id) {
  const pool = getMysqlBlogPool();
  if (!pool) throw new Error("MySQL blog pool not configured");
  const t = tableName();
  await pool.execute(`DELETE FROM \`${t}\` WHERE \`id\` = ?`, [id]);
}

export async function mysqlBlogCount() {
  const pool = getMysqlBlogPool();
  if (!pool) throw new Error("MySQL blog pool not configured");
  const t = tableName();
  const [[row]] = await pool.query(`SELECT COUNT(*) AS c FROM \`${t}\``);
  return Number(row?.c ?? 0);
}
