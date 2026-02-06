import React, { useMemo, useState } from "react";
import FontCard from "./FontCard";
import { FontFile, ConvertedFont } from "../types";

type Props = {
  uploadedFonts: FontFile[];
  convertedFonts: ConvertedFont[];
  previewText: string;
  onPreviewTextChange: (text: string) => void;
  onDownloadOne: (font: ConvertedFont) => void;
  onDownloadZip: () => void;
  isBusy?: boolean;
};

export default function FontPreview({
  uploadedFonts,
  convertedFonts,
  previewText,
  onPreviewTextChange,
  onDownloadOne,
  onDownloadZip,
  isBusy,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return convertedFonts;
    return convertedFonts.filter((f) =>
      (f.originalName || "").toLowerCase().includes(q)
    );
  }, [convertedFonts, search]);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 p-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">
          Preview
        </h2>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
              Preview Text
            </label>
            <textarea
              value={previewText}
              onChange={(e) => onPreviewTextChange(e.target.value)}
              className="w-full h-28 p-4 border-2 border-slate-200 bg-white focus:border-slate-900 focus:outline-none"
              spellCheck={false}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
              Search
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 border-2 border-slate-200 bg-white focus:border-slate-900 focus:outline-none"
              placeholder="Filter by filename…"
            />

            <div className="mt-4 flex gap-2">
              <button
                onClick={onDownloadZip}
                disabled={isBusy || convertedFonts.length === 0}
                className="w-full bg-slate-900 text-white px-4 py-3 text-xs font-black uppercase tracking-widest disabled:opacity-50"
              >
                Download ZIP
              </button>
            </div>

            <div className="mt-3 text-xs text-slate-500">
              Uploaded: <span className="font-bold">{uploadedFonts.length}</span> • Converted:{" "}
              <span className="font-bold">{convertedFonts.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-6">
        <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">
          Converted Fonts
        </h2>

        {filtered.length === 0 ? (
          <p className="text-sm text-slate-500 mt-4">No converted fonts yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {filtered.map((f) => (
              <FontCard
                key={f.id}
                font={f}
                previewText={previewText}
                onDownload={() => onDownloadOne(f)}
                disabled={isBusy}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
