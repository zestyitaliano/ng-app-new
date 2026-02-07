import type { ConvertedFont } from "../types";

/**
 * STUB: real font conversion is intentionally disabled for the stabilized build.
 * (Reintroduce with browser-safe libs or move heavy conversion to a server worker.)
 */

export async function convertFont(): Promise<ConvertedFont[]> {
  throw new Error("Font conversion is disabled in the current build.");
}

// Keep legacy names referenced by older UI code:
export async function convertToFormat(): Promise<ConvertedFont[]> {
  return convertFont();
}

export async function downloadConvertedFont(): Promise<void> {
  throw new Error("Font conversion is disabled in the current build.");
}
