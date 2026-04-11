export type FontStatus = "idle" | "ready" | "loading" | "error";

export type FontFormat = "ttf" | "otf" | "woff" | "eot";

export type FontMetadata = {
  family?: string;
  subfamily?: string;
  fullName?: string;
  postscriptName?: string;
  version?: string;
  manufacturer?: string;
  copyright?: string;
  numGlyphs?: number;
};

export interface ConvertedFile {
  buffer: ArrayBuffer | Uint8Array | string;
  format: FontFormat;
  fileName: string;
}

export interface ConvertedFont {
  id: string;
  originalName: string;
  format: FontFormat;
  blob: Blob;
  filename: string;
}

export interface FontFile {
  id: string;
  file: File;
  previewUrl: string | null;
  metadata: FontMetadata | null;
  status: FontStatus;
  parsedFont?: any;
  errorMsg?: string;
}

export enum AiActionType {
  PAIRINGS = "PAIRINGS",
  CSS = "CSS",
  VIBE = "VIBE",
}
