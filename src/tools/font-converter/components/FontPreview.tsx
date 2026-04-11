import React from "react";
import { Download } from "lucide-react";

import type { ConvertedFont, FontFile } from "../types";

type Props = {
  uploadedFonts: FontFile[];
  convertedFonts: ConvertedFont[];
  targetFormat: string;
  onDownloadOne: (font: ConvertedFont) => void;
  onDownloadZip: () => void;
  isBusy?: boolean;
};

export default function FontPreview({
  uploadedFonts,
  convertedFonts,
  targetFormat,
  onDownloadOne,
  onDownloadZip,
  isBusy,
}: Props) {
  return (
    <div className="space-y-6">
      <div className="border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">
          Batch Summary
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="border border-slate-200 p-4">
            <div className="text-xs font-black uppercase tracking-widest text-slate-500">
              Uploaded
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900">
              {uploadedFonts.length}
            </div>
          </div>
          <div className="border border-slate-200 p-4">
            <div className="text-xs font-black uppercase tracking-widest text-slate-500">
              Converted
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900">
              {convertedFonts.length}
            </div>
          </div>
          <div className="border border-slate-200 p-4">
            <div className="text-xs font-black uppercase tracking-widest text-slate-500">
              Output Format
            </div>
            <div className="mt-2 text-2xl font-black text-slate-900">
              {targetFormat.toUpperCase()}
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-600">
          This simplified version focuses on stable batch conversion and downloads,
          rather than in-app font previewing.
        </p>
      </div>

      <div className="border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">
          Uploaded Files
        </h2>

        {uploadedFonts.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            No fonts uploaded yet.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {uploadedFonts.map((font) => (
              <div
                key={font.id}
                className="flex items-center justify-between gap-4 border border-slate-200 p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-black text-slate-900">
                    {font.file.name}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                    {(font.file.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">
            Converted Files
          </h2>
          <button
            type="button"
            onClick={onDownloadZip}
            disabled={isBusy || convertedFonts.length === 0}
            className="inline-flex items-center gap-2 bg-slate-900 px-4 py-3 text-xs font-black uppercase tracking-widest text-white disabled:opacity-50"
          >
            <Download size={14} />
            Download ZIP
          </button>
        </div>

        {convertedFonts.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">
            Convert your uploaded files to generate downloads.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {convertedFonts.map((font) => (
              <div
                key={font.id}
                className="flex items-center justify-between gap-4 border border-slate-200 p-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-black text-slate-900">
                    {font.originalName}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                    {font.format.toUpperCase()} | {font.filename}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onDownloadOne(font)}
                  disabled={isBusy}
                  className="inline-flex shrink-0 items-center gap-2 bg-slate-900 px-4 py-3 text-xs font-black uppercase tracking-widest text-white disabled:opacity-50"
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
