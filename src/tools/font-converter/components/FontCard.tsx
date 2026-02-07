import React from "react";
import type { FontFile } from "../types";

type Props = {
  font: FontFile;
  onRemove?: () => void;
};

export const FontCard: React.FC<Props> = ({ font, onRemove }) => {
  return (
    <div className="border rounded-lg p-4 flex items-center justify-between">
      <div className="min-w-0">
        <div className="font-medium truncate">{font.file.name}</div>
        <div className="text-sm text-slate-500">
          {Math.round(font.file.size / 1024)} KB - {font.file.type || "unknown"}
        </div>
      </div>

      {onRemove ? (
        <button
          type="button"
          className="text-sm px-3 py-1 rounded border hover:bg-slate-50"
          onClick={onRemove}
        >
          Remove
        </button>
      ) : null}
    </div>
  );
};

// Provide a default export so existing imports don't break
export default FontCard;
