let tesseractPromise: Promise<void> | null = null;

export function loadTesseract(): Promise<void> {
  // Already loaded
  if (typeof window !== "undefined" && (window as any).Tesseract) {
    return Promise.resolve();
  }

  // In-flight
  if (tesseractPromise) return tesseractPromise;

  tesseractPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-ngk="tesseract"]',
    );

    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Tesseract script.")),
      );
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    script.async = true;
    script.defer = true;
    script.dataset.ngk = "tesseract";

    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Tesseract script."));
    document.head.appendChild(script);
  });

  return tesseractPromise;
}
