import { revalidatePath } from "next/cache";

/** Invalidate cached pages after blog create/update/delete. */
export function revalidateBlogPages() {
  revalidatePath("/blog", "layout");
  revalidatePath("/", "layout");
}

/** Invalidate cached pages after client logo create/delete. */
export function revalidateClientLogoPages() {
  revalidatePath("/clients", "layout");
  revalidatePath("/", "layout");
  revalidatePath("/services", "layout");
}

/** Invalidate cached pages after accreditation create/update/delete. */
export function revalidateAccreditationPages() {
  revalidatePath("/about", "layout");
}
