import opentype from "opentype.js";
import ttf2eot from "ttf2eot";
import ttf2woff from "ttf2woff";

import type {
  ConvertedFile,
  FontFormat,
  FontMetadata,
} from "../types";

const getNameValue = (names: Record<string, { en?: string }> | undefined, key: string) =>
  names?.[key]?.en || "";

export const parseFontFile = async (
  file: File,
): Promise<{ font: any; metadata: FontMetadata }> => {
  const buffer = await file.arrayBuffer();

  return new Promise((resolve, reject) => {
    try {
      const font = opentype.parse(buffer);
      const names = font.names as Record<string, { en?: string }> | undefined;

      const metadata: FontMetadata = {
        family: getNameValue(names, "fontFamily"),
        subfamily: getNameValue(names, "fontSubfamily"),
        fullName: getNameValue(names, "fullName"),
        postscriptName: getNameValue(names, "postScriptName"),
        version: getNameValue(names, "version"),
        manufacturer: getNameValue(names, "manufacturer"),
        copyright: getNameValue(names, "copyright"),
        numGlyphs: font.numGlyphs,
      };

      resolve({ font, metadata });
    } catch (error) {
      reject(error);
    }
  });
};

const getFontName = (font: any): string => {
  const names = font.names as Record<string, { en?: string }> | undefined;
  const family = getNameValue(names, "fontFamily") || "font";
  const subfamily = getNameValue(names, "fontSubfamily") || "regular";

  return `${family}-${subfamily}`
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .toLowerCase();
};

const toBlobPart = (buffer: ConvertedFile["buffer"]): BlobPart => {
  if (typeof buffer === "string" || buffer instanceof ArrayBuffer) {
    return buffer;
  }

  return new Uint8Array(buffer);
};

const toUint8Array = (buffer: ArrayBuffer): Uint8Array => new Uint8Array(buffer);

export const convertFont = async (
  font: any,
  format: FontFormat,
): Promise<ConvertedFile> => {
  const buffer = font.toArrayBuffer();
  const fontName = getFontName(font);
  let outputData: ArrayBuffer | Uint8Array | string;

  switch (format) {
    case "ttf":
    case "otf":
      outputData = buffer;
      break;
    case "woff": {
      const result = ttf2woff(toUint8Array(buffer));
      outputData =
        result instanceof Uint8Array ? result : new Uint8Array(result.buffer);
      break;
    }
    case "eot": {
      const result = ttf2eot(toUint8Array(buffer));
      outputData =
        result instanceof Uint8Array ? result : new Uint8Array(result.buffer);
      break;
    }
    default:
      throw new Error(`Format ${format} is not supported.`);
  }

  return {
    buffer: outputData,
    format,
    fileName: `${fontName}.${format}`,
  };
};

export const convertToFormat = async (file: File, format: FontFormat) => {
  const { font } = await parseFontFile(file);
  const converted = await convertFont(font, format);
  const mimeType = `font/${format}`;

  return {
    blob: new Blob([toBlobPart(converted.buffer)], { type: mimeType }),
    filename: converted.fileName,
  };
};

export const downloadConvertedFont = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};
