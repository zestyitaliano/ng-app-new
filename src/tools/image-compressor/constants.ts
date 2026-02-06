import { CompressionSettings } from "./types";

export const DEFAULT_SETTINGS: CompressionSettings = {
  quality: 0.75,
  format: 'original',
  resize: false,
  maxWidth: 1920,
  stripMetadata: true,
};

export const ACCEPTED_FILE_TYPES = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/webp': ['.webp'],
  // GIF is technically accepted by input, but we'll treat it carefully in logic
  'image/gif': ['.gif'],
};

export const MAX_FILE_SIZE_WARNING = 20 * 1024 * 1024; // 20MB
