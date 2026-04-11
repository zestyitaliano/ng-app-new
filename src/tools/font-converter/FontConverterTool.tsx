import React, { useEffect, useMemo, useState } from "react";
import { Download, Trash2, Wand2 } from "lucide-react";

import { FontFile, FontFormat, ConvertedFont } from "./types";
import { convertToFormat, downloadConvertedFont } from "./services/fontService";
import { downloadAllAsZip } from "./utils/fileUtils";

import ToolLayout from "../../components/ToolLayout";
import FontUploader from "./components/FontUploader";
import FontPreview from "./components/FontPreview";
import SkeletonLoader from "./components/SkeletonLoader";
import { toolMeta } from "./meta";

const DEFAULT_PREVIEW =
  "The quick brown fox jumps over the lazy dog. 0123456789";

export default function FontConverterTool() {
  const [uploadedFonts, setUploadedFonts] = useState<FontFile[]>([]);
  const [convertedFonts, setConvertedFonts] = useState<ConvertedFont[]>([]);
  const [targetFormat, setTargetFormat] = useState<FontFormat>("woff");
  const [previewText, setPreviewText] = useState(DEFAULT_PREVIEW);

  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const canConvert = uploadedFonts.length > 0 && !isConverting;

  useEffect(() => {
    // If the user changes format, we should consider clearing converted results
    // so they don’t think the list reflects the new format.
    // If you prefer keeping results, remove this.
    setConvertedFonts([]);
  }, [targetFormat]);

  const handleFilesSelected = async (files: FileList) => {
    setError(null);

    const list: FontFile[] = Array.from(files).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      file,
      previewUrl: URL.createObjectURL(file),
      metadata: null,
      status: "ready",
    }));

    // Merge (avoid duplicates)
    setUploadedFonts((prev) => {
      const map = new Map(prev.map((f) => [f.id, f]));
      for (const f of list) map.set(f.id, f);
      return Array.from(map.values());
    });
  };

  const handleClearAll = () => {
    uploadedFonts.forEach((font) => URL.revokeObjectURL(font.previewUrl));
    setUploadedFonts([]);
    setConvertedFonts([]);
    setError(null);
    setConversionProgress(0);
  };

  const handleConvertAll = async () => {
    if (!canConvert) return;

    setIsConverting(true);
    setConversionProgress(0);
    setError(null);
    setConvertedFonts([]);

    try {
      const results: ConvertedFont[] = [];

      for (let i = 0; i < uploadedFonts.length; i++) {
        const font = uploadedFonts[i];
        const converted = await convertToFormat(font.file, targetFormat);

        results.push({
          id: `${font.id}-${targetFormat}`,
          originalName: font.file.name,
          format: targetFormat,
          blob: converted.blob,
          filename: converted.filename,
        });

        setConversionProgress(Math.round(((i + 1) / uploadedFonts.length) * 100));
      }

      setConvertedFonts(results);
    } catch (e: any) {
      setError(e?.message || "Conversion failed.");
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownloadOne = (font: ConvertedFont) => {
    downloadConvertedFont(font.blob, font.filename);
  };

  const handleDownloadZip = async () => {
    if (convertedFonts.length === 0) return;
    await downloadAllAsZip(
      convertedFonts.map((f) => ({ filename: f.filename, blob: f.blob })),
      `converted-fonts-${targetFormat}.zip`
    );
  };

  const formatOptions: FontFormat[] = useMemo(
    () => ["ttf", "otf", "woff", "woff2", "eot"],
    []
  );

  return (
    <ToolLayout meta={toolMeta} contentClassName="max-w-6xl">
      <div className="space-y-6">
        <div className="flex justify-end">
          <button
            onClick={handleClearAll}
            disabled={isConverting || (uploadedFonts.length === 0 && convertedFonts.length === 0)}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-600 disabled:opacity-50"
          >
            <Trash2 size={14} />
            Clear
          </button>
        </div>

        {/* Controls */}
        <div className="bg-white border border-slate-200 p-6 flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
              Target Format
            </label>
            <select
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value as FontFormat)}
              className="w-full p-3 border-2 border-slate-200 bg-white focus:border-slate-900 focus:outline-none"
            >
              {formatOptions.map((fmt) => (
                <option key={fmt} value={fmt}>
                  {fmt.toUpperCase()}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-2">
              Tip: if WOFF2 fails to build, we can disable it until bundling is sorted.
            </p>
          </div>

          <button
            onClick={handleConvertAll}
            disabled={!canConvert}
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 text-xs font-black uppercase tracking-widest disabled:opacity-50"
          >
            <Wand2 size={16} />
            Convert All
          </button>

          <button
            onClick={handleDownloadZip}
            disabled={isConverting || convertedFonts.length === 0}
            className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 bg-white px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-800 hover:border-slate-900 disabled:opacity-50"
          >
            <Download size={16} />
            Download ZIP
          </button>
        </div>

        {error && (
          <div className="border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {isConverting && (
          <div className="bg-white border border-slate-200 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs font-black uppercase tracking-widest text-slate-500">
                Converting…
              </div>
              <div className="text-xs font-black text-slate-900">
                {conversionProgress}%
              </div>
            </div>
            <div className="h-2 bg-slate-100 border border-slate-200">
              <div
                className="h-full bg-slate-900"
                style={{ width: `${conversionProgress}%` }}
              />
            </div>
            <SkeletonLoader rows={4} />
          </div>
        )}

        {/* Uploader + Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FontUploader
            onFilesSelected={handleFilesSelected}
            onClear={handleClearAll}
            selectedCount={uploadedFonts.length}
            isBusy={isConverting}
          />

          <FontPreview
            uploadedFonts={uploadedFonts}
            convertedFonts={convertedFonts}
            previewText={previewText}
            onPreviewTextChange={setPreviewText}
            onDownloadOne={handleDownloadOne}
            onDownloadZip={handleDownloadZip}
            isBusy={isConverting}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
