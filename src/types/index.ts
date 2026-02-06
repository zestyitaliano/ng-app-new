// src/types/index.ts

export type ExtractedImageType =
  | "jpg"
  | "png"
  | "gif"
  | "svg"
  | "webp"
  | "unknown";
export type ExtractedImageSource = "regex" | "ai";

/**
 * Shared type used by shared components (e.g., src/components/ImageCard.tsx).
 * Keep this lightweight: tools can extend/augment locally if needed.
 */
export interface ExtractedImage {
  id: string;
  url: string;

  /**
   * Display label + used for filename extensions in some tools.
   * Your current code expects these exact values.
   */
  type: ExtractedImageType;

  /**
   * Where the image URL came from.
   * ImageCard renders different badges for 'regex' vs others.
   */
  source: ExtractedImageSource;

  /**
   * Indicates the URL passed a validation step (or was assumed valid).
   * ImageCard renders a "BLOCKED" state when false.
   */
  isValid: boolean;
}
