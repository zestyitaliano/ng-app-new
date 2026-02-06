// src/tools/color-palette-generator/services/geminiService.ts

/**
 * STUB: AI palette extraction is intentionally disabled.
 *
 * We do NOT call AI providers directly from the browser.
 * Any future AI logic must live behind a server endpoint
 * (Vercel Function, Firebase Function, etc.).
 *
 * This stub exists to:
 * - keep imports stable
 * - unblock builds
 * - avoid shipping secrets to the client
 */
export const extractPaletteFromImage = async (_image: {
  data: string;
  mimeType: string;
}): Promise<string[]> => {
  throw new Error(
    "AI palette extraction is disabled. This feature will be reintroduced via a server API.",
  );
};
