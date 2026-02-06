export interface OCRWord {
  text: string;
  confidence: number;
}

export interface OCRLine {
  text: string;
  words: OCRWord[];
}

export interface OCRResult {
  text: string;
  confidence: number;
  lines: OCRLine[];
}

export type ProcessingStatus = 'idle' | 'processing' | 'success' | 'error';

export interface LanguageOption {
  code: string;
  label: string;
}

// Augment window to include Tesseract since we load it via CDN
declare global {
  interface Window {
    Tesseract: any;
  }
}