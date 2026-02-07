export type FontStatus = "idle" | "ready" | "error";

export type FontMetadata = {
  family?: string;
  fullName?: string;
  postscriptName?: string;
};

export type FontFile = {
  id: string;
  file: File;
  previewUrl: string | null;
  metadata: FontMetadata | null;
  status: FontStatus;
};

export type ConvertedFont = {
  id: string;
  format: string;
  blob: Blob;
  filename: string;
};
