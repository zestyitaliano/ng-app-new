import React, { useCallback, useMemo, useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import ToolLayout from "../../components/ToolLayout";
import { toolMeta } from "./meta";

type UploadFile = {
  file: File;
  id: string;
  name: string;
  size: number;
  type: string;
};

type CompressedImage = {
  id: string;
  originalName: string;
  compressedName: string;
  blob: Blob;
  size: number;
  savings: number;
  originalSize: number;
};

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

function fileId(): string {
  return Math.random().toString(36).slice(2, 11);
}

async function compressImageFile(
  file: File,
  quality: number,
  maxWidth: number,
  maxHeight: number
): Promise<Blob> {
  const img = new Image();
  const imgUrl = URL.createObjectURL(file);

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imgUrl;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get canvas context");

  let { width, height } = img;

  // Resize while preserving aspect ratio
  if (width > maxWidth || height > maxHeight) {
    const ratio = Math.min(maxWidth / width, maxHeight / height);
    width = Math.round(width * ratio);
    height = Math.round(height * ratio);
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  // Output type: keep PNG if source is PNG, otherwise use JPEG (smaller)
  const isPng = file.type === "image/png";
  const outType = isPng ? "image/png" : "image/jpeg";

  const blob: Blob = await new Promise((resolve) => {
    canvas.toBlob(
      (b) => resolve(b || file),
      outType,
      outType === "image/jpeg" ? quality : undefined
    );
  });

  URL.revokeObjectURL(imgUrl);
  return blob;
}

export default function ImageCompressorTool() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [quality, setQuality] = useState(0.8);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [maxHeight, setMaxHeight] = useState(1080);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressedImages, setCompressedImages] = useState<CompressedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const totalOriginalSize = useMemo(
    () => files.reduce((sum, f) => sum + f.size, 0),
    [files]
  );

  const totalCompressedSize = useMemo(
    () => compressedImages.reduce((sum, img) => sum + img.size, 0),
    [compressedImages]
  );

  const totalSavingsPercent = useMemo(() => {
    if (totalOriginalSize === 0 || totalCompressedSize === 0) return 0;
    return Math.round(((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100);
  }, [totalOriginalSize, totalCompressedSize]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []);
    setError(null);

    const valid = selected.filter((f) => f.type.startsWith("image/"));
    if (valid.length !== selected.length) {
      setError("Some files were skipped. Only image files are supported.");
    }

    const newFiles: UploadFile[] = valid.map((file) => ({
      file,
      id: fileId(),
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    event.target.value = "";
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setFiles([]);
    setCompressedImages([]);
    setError(null);
  }, []);

  const compressAll = useCallback(async () => {
    if (files.length === 0) return;

    setIsCompressing(true);
    setError(null);
    setCompressedImages([]);

    try {
      const results: CompressedImage[] = [];

      for (const f of files) {
        const blob = await compressImageFile(f.file, quality, maxWidth, maxHeight);

        const compressedName = f.name.replace(/\.(png|jpg|jpeg|webp)$/i, "") + "-compressed" +
          (blob.type === "image/png" ? ".png" : ".jpg");

        const savings = Math.round(((f.size - blob.size) / f.size) * 100);

        results.push({
          id: fileId(),
          originalName: f.name,
          compressedName,
          blob,
          size: blob.size,
          savings,
          originalSize: f.size,
        });
      }

      setCompressedImages(results);
    } catch (e: any) {
      setError(e?.message || "Compression failed. Please try again.");
    } finally {
      setIsCompressing(false);
    }
  }, [files, quality, maxWidth, maxHeight]);

  const downloadImage = useCallback((img: CompressedImage) => {
    saveAs(img.blob, img.compressedName);
  }, []);

  const downloadAllAsZip = useCallback(async () => {
    if (compressedImages.length === 0) return;

    const zip = new JSZip();
    compressedImages.forEach((img) => {
      zip.file(img.compressedName, img.blob);
    });

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "compressed-images.zip");
  }, [compressedImages]);

  return (
    <ToolLayout meta={toolMeta} contentClassName="max-w-5xl">
      <div>
        <div className="bg-offWhite border-2 border-slate-100 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <label className="text-sm font-bold uppercase tracking-wide text-slate-800">
                Quality
              </label>
              <input
                type="range"
                min={0.3}
                max={1}
                step={0.05}
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                className="w-full"
              />
              <span className="text-sm font-bold text-slate-800 w-12 text-right">
                {Math.round(quality * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm font-bold uppercase tracking-wide text-slate-800">
                Max W
              </label>
              <input
                type="number"
                value={maxWidth}
                onChange={(e) => setMaxWidth(parseInt(e.target.value || "0", 10))}
                className="border-2 border-slate-200 bg-white px-3 py-2 font-bold text-slate-800 w-full focus:border-primary focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm font-bold uppercase tracking-wide text-slate-800">
                Max H
              </label>
              <input
                type="number"
                value={maxHeight}
                onChange={(e) => setMaxHeight(parseInt(e.target.value || "0", 10))}
                className="border-2 border-slate-200 bg-white px-3 py-2 font-bold text-slate-800 w-full focus:border-primary focus:ring-0 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <label className="inline-flex items-center gap-2 px-4 py-2 border-2 border-slate-200 bg-white font-bold text-slate-800 cursor-pointer hover:border-primary transition">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              Upload Images
            </label>

            <div className="flex gap-3">
              <button
                onClick={compressAll}
                disabled={files.length === 0 || isCompressing}
                className="px-5 py-2 border-2 border-transparent bg-primary text-white font-bold uppercase tracking-wide disabled:opacity-40"
              >
                {isCompressing ? "Compressing..." : "Compress"}
              </button>

              <button
                onClick={clearAll}
                disabled={files.length === 0 && compressedImages.length === 0}
                className="px-5 py-2 border-2 border-slate-300 bg-transparent text-slate-800 font-bold uppercase tracking-wide hover:bg-white disabled:opacity-40"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600 font-medium">
            Uploaded: <span className="font-bold text-slate-800">{files.length}</span> · Size:{" "}
            <span className="font-bold text-slate-800">{formatFileSize(totalOriginalSize)}</span>
            {compressedImages.length > 0 && (
              <>
                {" "}
                · Compressed:{" "}
                <span className="font-bold text-slate-800">
                  {formatFileSize(totalCompressedSize)}
                </span>{" "}
                · Savings:{" "}
                <span className="font-bold text-slate-800">{totalSavingsPercent}%</span>
              </>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 border-2 border-red-200 bg-red-50 text-red-700 font-bold text-sm">
              {error}
            </div>
          )}
        </div>

        {files.length > 0 && (
          <section className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-800 mb-3">
              Uploaded Images
            </h2>
            <div className="space-y-2">
              {files.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between border-2 border-slate-100 bg-white px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 truncate">{f.name}</div>
                    <div className="text-xs text-slate-500 font-medium">
                      {formatFileSize(f.size)}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(f.id)}
                    className="px-3 py-1.5 border-2 border-slate-200 font-bold text-slate-700 hover:border-red-300 hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {compressedImages.length > 0 && (
          <section>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-800">
                Compressed Images
              </h2>
              <button
                onClick={downloadAllAsZip}
                className="px-5 py-2 border-2 border-transparent bg-slate-900 text-white font-bold uppercase tracking-wide"
              >
                Download ZIP
              </button>
            </div>

            <div className="space-y-2">
              {compressedImages.map((img) => (
                <div
                  key={img.id}
                  className="flex items-center justify-between border-2 border-slate-100 bg-white px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-slate-900 truncate">{img.compressedName}</div>
                    <div className="text-xs text-slate-500 font-medium">
                      {formatFileSize(img.size)} · Saved {img.savings}%
                    </div>
                  </div>

                  <button
                    onClick={() => downloadImage(img)}
                    className="px-4 py-2 border-2 border-primary bg-primary text-white font-bold uppercase tracking-wide hover:bg-primaryHover"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </ToolLayout>
  );
}
