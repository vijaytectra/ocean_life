/** Browser-based background removal for logo uploads (runs locally, no API key). */
export async function removeImageBackground(source, onProgress) {
  const { removeBackground } = await import("@imgly/background-removal");

  return removeBackground(source, {
    output: {
      format: "image/png",
      quality: 1,
    },
    progress: (_key, current, total) => {
      if (onProgress && total > 0) {
        onProgress(Math.min(100, Math.round((current / total) * 100)));
      }
    },
  });
}

export function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read processed image"));
    reader.readAsDataURL(blob);
  });
}
