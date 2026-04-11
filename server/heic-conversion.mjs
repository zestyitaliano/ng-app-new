import path from "node:path";
import os from "node:os";
import { execFile as execFileCallback } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { promisify } from "node:util";

import { PDFDocument } from "pdf-lib";
import sharp from "sharp";

const execFile = promisify(execFileCallback);

const TARGETS = {
  jpeg: {
    contentType: "image/jpeg",
    extension: "jpg",
  },
  png: {
    contentType: "image/png",
    extension: "png",
  },
  webp: {
    contentType: "image/webp",
    extension: "webp",
  },
  pdf: {
    contentType: "application/pdf",
    extension: "pdf",
  },
};

const HEIC_TYPES = new Set([
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "image/heif-sequence",
]);

const sanitizeBaseName = (filename) =>
  path
    .basename(filename, path.extname(filename))
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "") || "converted-image";

const writeTempInputFile = async (directory, inputBuffer, filename) => {
  const safeName = `${sanitizeBaseName(filename)}${path.extname(filename) || ".heic"}`;
  const inputPath = path.join(directory, safeName);
  await writeFile(inputPath, inputBuffer);
  return inputPath;
};

const convertWithSips = async (inputBuffer, filename, outputFormat) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "heic-convert-"));

  try {
    const inputPath = await writeTempInputFile(directory, inputBuffer, filename);
    const outputPath = path.join(
      directory,
      `${sanitizeBaseName(filename)}.${outputFormat}`,
    );

    await execFile("/usr/bin/sips", [
      "-s",
      "format",
      outputFormat,
      inputPath,
      "--out",
      outputPath,
    ]);

    return await readFile(outputPath);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
};

const shouldFallbackToSips = (error) => {
  const message =
    error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();

  return (
    message.includes("heif") ||
    message.includes("heic") ||
    message.includes("compression format has not been built in") ||
    message.includes("unsupported image format")
  );
};

export const isHeicLikeFile = ({ filename = "", mimeType = "" }) => {
  const lowerName = filename.toLowerCase();
  return (
    HEIC_TYPES.has(mimeType.toLowerCase()) ||
    lowerName.endsWith(".heic") ||
    lowerName.endsWith(".heif")
  );
};

const renderWithSharp = async (inputBuffer, targetFormat) => {
  try {
    const image = sharp(inputBuffer, { limitInputPixels: false }).rotate();

    if (targetFormat === "jpeg") {
      return image.jpeg({ quality: 92 }).toBuffer();
    }

    if (targetFormat === "png") {
      return image.png().toBuffer();
    }

    if (targetFormat === "webp") {
      return image.webp({ quality: 92 }).toBuffer();
    }
  } catch (error) {
    throw error;
  }

  throw new Error(`Unsupported target format: ${targetFormat}`);
};

const renderPdf = async (inputBuffer, filename) => {
  let jpegBuffer;

  try {
    jpegBuffer = await sharp(inputBuffer, { limitInputPixels: false })
      .rotate()
      .jpeg({ quality: 92 })
      .toBuffer();
  } catch (error) {
    if (!shouldFallbackToSips(error)) {
      throw error;
    }

    jpegBuffer = await convertWithSips(inputBuffer, filename, "jpeg");
  }

  const pdf = await PDFDocument.create();
  const image = await pdf.embedJpg(jpegBuffer);
  const page = pdf.addPage([image.width, image.height]);

  page.drawImage(image, {
    x: 0,
    y: 0,
    width: image.width,
    height: image.height,
  });

  return Buffer.from(await pdf.save());
};

export const convertHeicBuffer = async ({
  inputBuffer,
  targetFormat,
  filename,
}) => {
  const target = TARGETS[targetFormat];
  if (!target) {
    throw new Error("Unsupported target format.");
  }

  let outputBuffer;

  if (targetFormat === "pdf") {
    outputBuffer = await renderPdf(inputBuffer, filename);
  } else {
    try {
      outputBuffer = await renderWithSharp(inputBuffer, targetFormat);
    } catch (error) {
      if (!shouldFallbackToSips(error)) {
        throw error;
      }

      if (targetFormat === "webp") {
        const pngBuffer = await convertWithSips(inputBuffer, filename, "png");
        outputBuffer = await sharp(pngBuffer, { limitInputPixels: false })
          .webp({ quality: 92 })
          .toBuffer();
      } else {
        outputBuffer = await convertWithSips(inputBuffer, filename, targetFormat);
      }
    }
  }

  return {
    buffer: outputBuffer,
    contentType: target.contentType,
    filename: `${sanitizeBaseName(filename)}.${target.extension}`,
  };
};
