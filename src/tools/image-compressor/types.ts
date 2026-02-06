export type OutputFormat = 'original' | 'image/webp' | 'image/jpeg';

export interface CompressionSettings {
  quality: number; // 0.1 to 1.0 (mapped from 10-95)
  format: OutputFormat;
  resize: boolean;
  maxWidth: number;
  stripMetadata: boolean;
}

export type ProcessingStatus = 'idle' | 'pending' | 'processing' | 'done' | 'error';

export interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
  originalSize: number;
  compressedSize?: number;
  compressedBlob?: Blob;
  status: ProcessingStatus;
  error?: string;
  warning?: string;
  extension: string;
}

export interface CompressionResult {
  blob: Blob;
  width: number;
  height: number;
  warning?: string;
}