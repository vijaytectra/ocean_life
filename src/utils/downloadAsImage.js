import { toPng } from "html-to-image";

function slugify(value) {
  return String(value || "enquiry")
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 48);
}

export async function downloadElementAsPng(node, filename) {
  if (!node) throw new Error("Nothing to capture");

  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "#ffffff",
    skipFonts: true,
  });

  const link = document.createElement("a");
  link.download = filename.endsWith(".png") ? filename : `${filename}.png`;
  link.href = dataUrl;
  link.click();
}

export function enquiryImageFilename(enquiry) {
  const date = new Date(enquiry.createdAt).toISOString().slice(0, 10);
  const name = slugify(enquiry.name);
  const type = slugify(enquiry.type);
  return `olipl-enquiry-${type}-${name}-${date}.png`;
}
