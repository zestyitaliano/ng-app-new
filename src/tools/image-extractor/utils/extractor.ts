import type { ExtractedImage } from "../types";
import {
  checkImageAvailability,
  deduplicateImages,
  findUrlsInText,
} from "./urlHelpers";

export async function extractImagesFromHtml(
  html: string,
  baseUrl: string,
): Promise<ExtractedImage[]> {
  const extracted = deduplicateImages(findUrlsInText(html, baseUrl));

  const validated = await Promise.all(
    extracted.map(async (image) => ({
      ...image,
      isValid: await checkImageAvailability(image.url),
    })),
  );

  return validated;
}
