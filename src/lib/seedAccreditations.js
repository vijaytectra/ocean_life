import prisma from "@/lib/prisma";
import { DEFAULT_ACCREDITATIONS } from "@/lib/defaultAccreditations";
import { ensureAccreditationTable } from "@/lib/ensureAccreditationTable";

/** Insert default accreditations when the table is empty. */
export async function seedDefaultAccreditationsIfEmpty() {
  await ensureAccreditationTable();
  const count = await prisma.accreditation.count();
  if (count > 0) {
    return { seeded: 0, total: count, skipped: true };
  }

  for (const row of DEFAULT_ACCREDITATIONS) {
    await prisma.accreditation.create({
      data: {
        title: row.title,
        description: row.description,
        image: row.image,
        priority: row.priority ?? 0,
      },
    });
  }

  return {
    seeded: DEFAULT_ACCREDITATIONS.length,
    total: DEFAULT_ACCREDITATIONS.length,
    skipped: false,
  };
}
