// src/tools/color-picker/ToolComponent.tsx
import React, { useCallback, useState } from "react";
import { ImageUploader } from "./components/ImageUploader";
import { ColorPickerCanvas } from "./components/ColorPickerCanvas";
import { ColorInfo } from "./components/ColorInfo";
import type { ColorData } from "./types";
import { toolMeta } from "./meta";

export default function ToolComponent() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorData | null>(null);
  const [hoverColor, setHoverColor] = useState<ColorData | null>(null);

  const handleImageLoad = useCallback((base64: string) => {
    setImageSrc(base64);
    setSelectedColor(null);
    setHoverColor(null);
  }, []);

  const handleClear = useCallback(() => setSelectedColor(null), []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-extrabold uppercase tracking-tight">
            {toolMeta.title}
          </h1>
          <p className="text-sm text-slate-600">{toolMeta.description}</p>
        </header>

        {!imageSrc ? (
          <ImageUploader onImageLoad={handleImageLoad} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
            <div className="border border-slate-200 bg-white">
              <ColorPickerCanvas
                imageSrc={imageSrc}
                onHoverColorChange={setHoverColor}
                onSelectColor={setSelectedColor}
              />
            </div>

            <div className="space-y-3">
              <ColorInfo
                selectedColor={selectedColor}
                hoverColor={hoverColor}
                onClear={handleClear}
              />

              <button
                className="w-full border-2 border-slate-900 bg-white px-4 py-3 text-sm font-bold uppercase tracking-wide hover:bg-slate-50"
                onClick={() => {
                  setImageSrc(null);
                  setSelectedColor(null);
                  setHoverColor(null);
                }}
              >
                Upload a different image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
