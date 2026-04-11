import React from "react";
import { Upload, X } from "lucide-react";

type Props = {
  onFilesSelected: (files: FileList) => void;
  onClear: () => void;
  selectedCount: number;
  isBusy?: boolean;
};

export default function FontUploader({
  onFilesSelected,
  onClear,
  selectedCount,
  isBusy,
}: Props) {
  return (
    <div className="bg-white border border-slate-200 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">
            Upload Fonts
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Upload TTF, OTF, WOFF, or EOT files for batch conversion.
          </p>
        </div>

        {selectedCount > 0 && (
          <button
            onClick={onClear}
            disabled={isBusy}
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-red-600 disabled:opacity-50"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      <label className="mt-5 block border-2 border-dashed border-slate-200 p-8 text-center cursor-pointer hover:border-slate-400 transition">
        <div className="mx-auto w-fit bg-slate-900 text-white p-3">
          <Upload size={18} />
        </div>
        <div className="mt-3 text-sm font-bold text-slate-800">
          Click to upload fonts
        </div>
        <div className="text-xs text-slate-500 mt-1">
          {selectedCount > 0 ? `${selectedCount} file(s) selected` : "No files selected"}
        </div>

        <input
          type="file"
          multiple
          accept=".ttf,.otf,.woff,.eot"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              onFilesSelected(e.target.files);
            }
          }}
        />
      </label>
    </div>
  );
}
