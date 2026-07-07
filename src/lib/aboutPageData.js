import { FALLBACK_EMPLOYEES } from "@/lib/employeesShared";
import { DEFAULT_ACCREDITATIONS } from "@/lib/defaultAccreditations";

/** Hardcoded About page content — no database required. */
export const ABOUT_TEAM = FALLBACK_EMPLOYEES;

export const ABOUT_ACCREDITATIONS = DEFAULT_ACCREDITATIONS.map((item, index) => ({
  id: `about-accred-${index}`,
  ...item,
}));
