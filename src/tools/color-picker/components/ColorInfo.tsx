import React, { useState } from "react";
import { ColorData } from "../types";
import { Copy, Check, Trash2, Crosshair } from "lucide-react";
import { Button } from "../../../components/Button";

interface ColorInfoProps {
  selectedColor: ColorData | null;
  hoverColor: ColorData | null;
  onClear: () => void;
}

export const ColorInfo: React.FC<ColorInfoProps> = ({
  selectedColor,
  hoverColor,
  onClear,
}) => {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const displayColor = selectedColor || hoverColor;

  const handleCopy = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  if (!displayColor && !selectedColor) {
    return (
      <div className="bg-white border border-slate-200 p-12 text-center text-slate-400">
        <Crosshair className="w-12 h-12 mx-auto mb-4 opacity-20" />
        <p className="font-bold uppercase tracking-wide">
          Click the image to lock a color
        </p>
      </div>
    );
  }

  const isPlaceholder = !selectedColor;

  return (
    <div className="bg-white border border-slate-200 p-6 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h2 className="text-xl font-extrabold text-slate-900 uppercase tracking-tight">
          Selected Color{" "}
          <span className="font-normal text-slate-400 ml-2 text-base">
            {isPlaceholder ? "(Preview)" : ""}
          </span>
        </h2>

        {!isPlaceholder && (
          <Button
            variant="outline"
            onClick={onClear}
            className="py-1 px-4 text-xs"
            title="Clear selected color"
          >
            <Trash2 className="w-3 h-3 mr-2" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Swatch */}
        <div className="flex-shrink-0">
          <div
            className="w-40 h-40 shadow-inner border-2 border-slate-100 transition-colors duration-75"
            style={{ backgroundColor: displayColor?.hex || "#ffffff" }}
          />
        </div>

        {/* Values */}
        <div className="flex-grow space-y-4">
          {displayColor && (
            <>
              {/* HEX */}
              <div className="group relative">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">
                  HEX
                </label>
                <div className="flex">
                  <div className="flex-grow font-mono text-xl font-bold p-3 bg-offwhite border-y border-l border-slate-200 text-slate-900">
                    {displayColor.hex}
                  </div>
                  <button
                    onClick={() => handleCopy(displayColor.hex, "hex")}
                    className="px-6 bg-slate-100 hover:bg-secondary1 hover:text-slate-900 border border-slate-200 flex items-center justify-center transition-colors"
                    title="Copy HEX"
                    type="button"
                  >
                    {copiedFormat === "hex" ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* RGB */}
              <div className="group relative">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">
                  RGB
                </label>
                <div className="flex">
                  <div className="flex-grow font-mono text-sm font-medium p-3 bg-offwhite border-y border-l border-slate-200 text-slate-700">
                    {displayColor.rgb}
                  </div>
                  <button
                    onClick={() => handleCopy(displayColor.rgb, "rgb")}
                    className="px-6 bg-slate-100 hover:bg-secondary1 hover:text-slate-900 border border-slate-200 flex items-center justify-center transition-colors"
                    title="Copy RGB"
                    type="button"
                  >
                    {copiedFormat === "rgb" ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>

              {/* HSL */}
              <div className="group relative">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 block">
                  HSL
                </label>
                <div className="flex">
                  <div className="flex-grow font-mono text-sm font-medium p-3 bg-offwhite border-y border-l border-slate-200 text-slate-700">
                    {displayColor.hsl}
                  </div>
                  <button
                    onClick={() => handleCopy(displayColor.hsl, "hsl")}
                    className="px-6 bg-slate-100 hover:bg-secondary1 hover:text-slate-900 border border-slate-200 flex items-center justify-center transition-colors"
                    title="Copy HSL"
                    type="button"
                  >
                    {copiedFormat === "hsl" ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-slate-500" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
