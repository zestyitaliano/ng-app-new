import React, { useEffect, useMemo, useState } from "react";
import { Download, Trash2, Wand2 } from "lucide-react";

import ToolLayout from "../../components/ToolLayout";
import FontPreview from "./components/FontPreview";
import FontUploader from "./components/FontUploader";
import SkeletonLoader from "./components/SkeletonLoader";
import { toolMeta } from "./meta";
import { convertToFormat, downloadConvertedFont } from "./services/fontService";
import type { ConvertedFont, FontFile, FontFormat } from "./types";
import { downloadAllAsZip } from "./utils/fileUtils";

export default function FontConverterTool() {
  const [uploadedFonts, setUploadedFonts] = useState<FontFile[]>([]);
  const [convertedFonts, setConvertedFonts] = useState<ConvertedFont[]>([]);
  const [targetFormat, setTargetFormat] = useState<FontFormat>("woff");
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const canConvert = uploadedFonts.length > 0 && !isConverting;

  useEffect(() => {
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

    setUploadedFonts((prev) => {
      const map = new Map(prev.map((font) => [font.id, font]));
      for (const font of list) {
        map.set(font.id, font);
      }
      return Array.from(map.values());
    });
  };

  const handleClearAll = () => {
    uploadedFonts.forEach((font) => {
      if (font.previewUrl) {
        URL.revokeObjectURL(font.previewUrl);
      }
    });

    setUploadedFonts([]);
    setConvertedFonts([]);
    setError(null);
    setConversionProgress(0);
  };

  const handleConvertAll = async () => {
    if (!canConvert) {
      return;
    }

    setIsConverting(true);
    setConversionProgress(0);
    setError(null);
    setConvertedFonts([]);

    try {
      const results: ConvertedFont[] = [];

      for (let index = 0; index < uploadedFonts.length; index += 1) {
        const font = uploadedFonts[index];
        const converted = await convertToFormat(font.file, targetFormat);

        results.push({
          id: `${font.id}-${targetFormat}`,
          originalName: font.file.name,
          format: targetFormat,
          blob: converted.blob,
          filename: converted.filename,
        });

        setConversionProgress(
          Math.round(((index + 1) / uploadedFonts.length) * 100),
        );
      }

      setConvertedFonts(results);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Conversion failed.";
      setError(message);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownloadOne = (font: ConvertedFont) => {
    downloadConvertedFont(font.blob, font.filename);
  };

  const handleDownloadZip = async () => {
    if (convertedFonts.length === 0) {
      return;
    }

    await downloadAllAsZip(
      convertedFonts.map((font) => ({
        filename: font.filename,
        blob: font.blob,
      })),
      `converted-fonts-${targetFormat}.zip`,
    );
  };

  const formatOptions: FontFormat[] = useMemo(
    () => ["woff", "ttf", "otf", "eot"],
    [],
  );

  return (
    <ToolLayout meta={toolMeta} contentClassName="max-w-6xl">
      <div className="space-y-6">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleClearAll}
            disabled={
              isConverting ||
              (uploadedFonts.length === 0 && convertedFonts.length === 0)
            }
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-600 disabled:opacity-50"
          >
            <Trash2 size={14} />
            Clear
          </button>
        </div>

        <div className="flex flex-col gap-4 border border-slate-200 bg-white p-6 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">
              Target Format
            </label>
            <select
              value={targetFormat}
              onChange={(event) =>
                setTargetFormat(event.target.value as FontFormat)
              }
              className="w-full border-2 border-slate-200 bg-white p-3 focus:border-slate-900 focus:outline-none"
            >
              {formatOptions.map((format) => (
                <option key={format} value={format}>
                  {format.toUpperCase()}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-slate-500">
              Stable formats only: WOFF, TTF, OTF, and EOT.
            </p>
          </div>

          <button
            type="button"
            onClick={handleConvertAll}
            disabled={!canConvert}
            className="inline-flex items-center justify-center gap-2 bg-slate-900 px-6 py-3 text-xs font-black uppercase tracking-widest text-white disabled:opacity-50"
          >
            <Wand2 size={16} />
            Convert All
          </button>

          <button
            type="button"
            onClick={handleDownloadZip}
            disabled={isConverting || convertedFonts.length === 0}
            className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 bg-white px-6 py-3 text-xs font-black uppercase tracking-widest text-slate-800 hover:border-slate-900 disabled:opacity-50"
          >
            <Download size={16} />
            Download ZIP
          </button>
        </div>

        {error ? (
          <div className="border-l-4 border-red-500 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {isConverting ? (
          <div className="space-y-3 border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="text-xs font-black uppercase tracking-widest text-slate-500">
                Converting...
              </div>
              <div className="text-xs font-black text-slate-900">
                {conversionProgress}%
              </div>
            </div>
            <div className="h-2 border border-slate-200 bg-slate-100">
              <div
                className="h-full bg-slate-900"
                style={{ width: `${conversionProgress}%` }}
              />
            </div>
            <SkeletonLoader rows={4} />
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FontUploader
            onFilesSelected={handleFilesSelected}
            onClear={handleClearAll}
            selectedCount={uploadedFonts.length}
            isBusy={isConverting}
          />

          <FontPreview
            uploadedFonts={uploadedFonts}
            convertedFonts={convertedFonts}
            targetFormat={targetFormat}
            onDownloadOne={handleDownloadOne}
            onDownloadZip={handleDownloadZip}
            isBusy={isConverting}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
