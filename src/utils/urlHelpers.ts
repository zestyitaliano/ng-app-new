// src/utils/urlHelpers.ts

/**
 * Attempts to parse width/height from common URL patterns to reduce layout shift.
 * Supports:
 * - path hints: /image_800x600.jpg, /800x600/image.jpg
 * - query params: ?w=800&h=600, ?width=800&height=600, etc.
 */
export const getEstimatedDimensions = (
  url: string,
): { width: number; height: number } | null => {
  try {
    const lower = String(url || "").toLowerCase();

    // 1) Dimensions in filename/path: 800x600
    // Avoid tiny false positives by requiring at least 2 digits.
    const dimMatch = lower.match(/[-/_](\d{2,})x(\d{2,})(?:[-/_.]|$)/);
    if (dimMatch) {
      const width = parseInt(dimMatch[1], 10);
      const height = parseInt(dimMatch[2], 10);
      if (
        Number.isFinite(width) &&
        Number.isFinite(height) &&
        width > 0 &&
        height > 0
      ) {
        return { width, height };
      }
    }

    // 2) Dimensions in query params
    // Examples: ?w=800&h=600, ?width=800&height=600, ?resize=800&height=600, etc.
    const widthMatch = lower.match(
      /[?&](?:w|width|width_px|resize)[:=_]?(\d+)/,
    );
    const heightMatch = lower.match(/[?&](?:h|height|height_px)[:=_]?(\d+)/);

    if (widthMatch && heightMatch) {
      const width = parseInt(widthMatch[1], 10);
      const height = parseInt(heightMatch[1], 10);
      if (
        Number.isFinite(width) &&
        Number.isFinite(height) &&
        width > 0 &&
        height > 0
      ) {
        return { width, height };
      }
    }
  } catch {
    // no-op
  }

  return null;
};
