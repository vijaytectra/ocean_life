import { DEFAULT_ACCREDITATIONS } from "@/lib/defaultAccreditations";
import {
  countAccreditations,
  insertAccreditation,
} from "@/lib/accreditationStore";

/** Insert default accreditations when the table is empty. */
export async function seedDefaultAccreditationsIfEmpty() {
  const count = await countAccreditations();
  if (count > 0) {
    return { seeded: 0, total: count, skipped: true };
  }

  for (const row of DEFAULT_ACCREDITATIONS) {
    await insertAccreditation({
      title: row.title,
      description: row.description,
      image: row.image,
      priority: row.priority ?? 0,
    });
  }

  return {
    seeded: DEFAULT_ACCREDITATIONS.length,
    total: DEFAULT_ACCREDITATIONS.length,
    skipped: false,
  };
}
