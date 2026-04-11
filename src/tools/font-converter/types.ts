export interface FontMetadata {
  family: string;
  subfamily: string;
  fullName: string;
  version: string;
  manufacturer?: string;
  copyright?: string;
  numGlyphs: number;
}

export type FontFormat = 'ttf' | 'otf' | 'woff' | 'woff2' | 'svg' | 'eot';

export interface ConvertedFile {
  buffer: ArrayBuffer | Uint8Array | string; // SVG is string, others binary
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
  previewUrl: string; // Object URL for CSS usage
  metadata: FontMetadata | null;
  status: 'loading' | 'ready' | 'error';
  errorMsg?: string;
  parsedFont?: any; // opentype.Font instance
  selected?: boolean;
}

export enum AiActionType {
  PAIRINGS = 'PAIRINGS',
  CSS = 'CSS',
  VIBE = 'VIBE'
}
