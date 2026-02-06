import { OCRResult, OCRLine } from "../types";
import { loadTesseract } from "../utils/loadTesseract";

export const recognizeText = async (
  imageFile: File,
  language: string,
  onProgress: (progress: number) => void,
): Promise<OCRResult> => {
  await loadTesseract();

  const Tesseract = (window as any).Tesseract;
  if (!Tesseract) {
    throw new Error("Tesseract library not loaded.");
  }

  try {
    const result = await Tesseract.recognize(imageFile, language, {
      logger: (m: any) => {
        if (m?.status === "recognizing text") {
          const p = typeof m.progress === "number" ? m.progress : 0;
          onProgress(Math.floor(p * 100));
        }
      },
    });

    const lines: OCRLine[] = (result?.data?.lines ?? []).map((line: any) => ({
      text: line.text,
      words: (line.words ?? []).map((word: any) => ({
        text: word.text,
        confidence: word.confidence,
      })),
    }));

    return {
      text: result?.data?.text ?? "",
      confidence: result?.data?.confidence ?? 0,
      lines,
    };
  } catch (error) {
    console.error("OCR Error:", error);
    throw new Error("Failed to process image.");
  }
};
