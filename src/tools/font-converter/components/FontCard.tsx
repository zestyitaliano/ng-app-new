import React from "react";

import type { FontFile } from "../types";

type Props = {
  font: FontFile;
  onRemove?: () => void;
};

export const FontCard: React.FC<Props> = ({ font, onRemove }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="min-w-0">
        <div className="truncate font-medium">{font.file.name}</div>
        <div className="text-sm text-slate-500">
          {Math.round(font.file.size / 1024)} KB | {font.file.type || "unknown"}
        </div>
      </div>

      {onRemove ? (
        <button
          type="button"
          className="rounded border px-3 py-1 text-sm hover:bg-slate-50"
          onClick={onRemove}
        >
          Remove
        </button>
      ) : null}
    </div>
  );
};

export default FontCard;
