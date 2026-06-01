import { mkdir, writeFile } from "fs/promises";
import path from "path";

const RESUME_DIR = path.join(process.cwd(), "private", "resumes");
const ALLOWED_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);
const MAX_BYTES = 5 * 1024 * 1024;

function slugPart(value) {
  return (value || "")
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

/** ATS-friendly stored name: Name-City-timestamp.ext (not generic resume-*.ext) */
export function buildResumeStoredName(fullName, city, ext) {
  const namePart = slugPart(fullName) || "Applicant";
  const cityPart = slugPart(city) || "City";
  const stamp = Date.now();
  return `${namePart}-${cityPart}-${stamp}${ext}`;
}

export async function saveResumeFile(file, { fullName, city } = {}) {
  if (!file || typeof file.arrayBuffer !== "function") {
    throw new Error("Resume file is required");
  }

  const originalName = file.name || "resume";
  const ext = path.extname(originalName).toLowerCase();

  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error("Resume must be PDF, DOC, or DOCX");
  }

  const bytes = await file.arrayBuffer();
  if (bytes.byteLength > MAX_BYTES) {
    throw new Error("Resume must be 5 MB or smaller");
  }

  await mkdir(RESUME_DIR, { recursive: true });

  const storedName = buildResumeStoredName(fullName, city, ext);
  const storedPath = path.join(RESUME_DIR, storedName);

  await writeFile(storedPath, Buffer.from(bytes));

  const displayName =
    fullName && city
      ? `${fullName} — ${city}${ext}`
      : originalName;

  return {
    resumePath: storedName,
    resumeName: displayName,
  };
}

export function getResumeAbsolutePath(storedName) {
  const safeName = path.basename(storedName);
  return path.join(RESUME_DIR, safeName);
}
