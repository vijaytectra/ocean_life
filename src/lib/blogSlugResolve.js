import prisma from "@/lib/prisma";
import {
  isMysqlBlogEnabled,
  mysqlFindBlogBySlug,
  mysqlSlugExists,
} from "@/lib/mysqlBlog";
import { normalizeBlogSlugInput, slugifyBlog } from "@/lib/blogSlug";

async function prismaSlugExists(slug, excludeId) {
  const row = await prisma.blog.findFirst({
    where: {
      slug,
      ...(excludeId ? { NOT: { id: excludeId } } : {}),
    },
    select: { id: true },
  });
  return Boolean(row);
}

async function slugTaken(slug, excludeId) {
  if (isMysqlBlogEnabled()) {
    return mysqlSlugExists(slug, excludeId);
  }
  return prismaSlugExists(slug, excludeId);
}

/** Pick a unique slug from manual input or title. */
export async function resolveBlogSlug({ title, slug, excludeId }) {
  const base =
    normalizeBlogSlugInput(slug) ||
    slugifyBlog(title) ||
    `post-${Date.now()}`;

  let candidate = base;
  let suffix = 2;
  while (await slugTaken(candidate, excludeId)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  return candidate;
}

export async function getBlogBySlugOrId(identifier) {
  const { getStaticBlogBySlugOrId } = await import("@/lib/staticSiteData");
  return getStaticBlogBySlugOrId(identifier);
}
