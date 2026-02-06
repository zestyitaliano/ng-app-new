// src/tools/color-palette-generator/services/geminiService.ts

/**
 * IMPORTANT:
 * Do not call Gemini directly from the browser.
 * Any AI call requiring an API key must live server-side (Vercel Function, Firebase Function, etc.).
 *
 * This stub keeps the frontend build clean and prevents secrets from leaking.
 */
export const extractPaletteFromImage = async (_image: {
  data: string;
  mimeType: string;
}): Promise<string[]> => {
  throw new Error(
    "AI palette extraction is disabled in the frontend build. Implement via a server endpoint.",
  );
};
