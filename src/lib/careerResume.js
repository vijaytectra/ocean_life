import { access, mkdir, writeFile, unlink } from "fs/promises";
import path from "path";

const RESUME_DIR = path.join(process.cwd(), "public", "uploads", "resumes");
const LEGACY_RESUME_DIR = path.join(process.cwd(), "private", "resumes");
const ALLOWED_EXTENSIONS = new Set([".pdf", ".doc", ".docx"]);
const MAX_BYTES = 5 * 1024 * 1024;

const MIME_BY_EXT = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

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

export function getResumePublicUrl(storedName) {
  const safeName = path.basename(storedName);
  return `/api/resumes/${encodeURIComponent(safeName)}/`;
}

export function getResumeMimeType(storedName) {
  const ext = path.extname(storedName).toLowerCase();
  return MIME_BY_EXT[ext] || "application/octet-stream";
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
    fullName && city ? `${fullName} — ${city}${ext}` : originalName;

  return {
    resumePath: storedName,
    resumeName: displayName,
    resumeUrl: getResumePublicUrl(storedName),
  };
}

export async function findResumeFile(storedName) {
  const safeName = path.basename(storedName);
  const candidates = [
    path.join(RESUME_DIR, safeName),
    path.join(LEGACY_RESUME_DIR, safeName),
  ];

  for (const filePath of candidates) {
    try {
      await access(filePath);
      return filePath;
    } catch {
      // try next location
    }
  }

  return null;
}

export async function deleteResumeFile(storedName) {
  const filePath = await findResumeFile(storedName);
  if (!filePath) return;

  try {
    await unlink(filePath);
  } catch {
    // file may already be missing
  }
}
