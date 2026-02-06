import React, { useMemo, useState } from "react";
import JSZip from "jszip";
import type { ExtractedImage } from "./types";
import { extractImagesFromHtml } from "./utils/extractor";
import { downloadFile, downloadZip } from "./utils/download";
import { fetchPageHtmlViaProxy } from "./services/proxyService";
import { Button } from "../../components/Button";
import { ImageCard } from "../../components/ImageCard";


export default function ImageExtractorTool() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<ExtractionStatus>(ExtractionStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const [images, setImages] = useState<ExtractedImage[]>([]);
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});

  const selectedImages = useMemo(() => {
    const ids = new Set(Object.keys(selectedIds).filter((id) => selectedIds[id]));
    return images.filter((img) => ids.has(img.id));
  }, [images, selectedIds]);

  const hasSelection = selectedImages.length > 0;

  const handleExtract = async () => {
    const trimmed = url.trim();
    if (!trimmed) return;

    setError(null);
    setImages([]);
    setSelectedIds({});
    setStatus(ExtractionStatus.FETCHING_SOURCE);

    try {
      const html = await fetchPageHtmlViaProxy(trimmed);

      setStatus(ExtractionStatus.EXTRACTING_REGEX);

      const extracted = await extractImagesFromHtml(html, trimmed);

      setImages(extracted);

      const initialSelected: Record<string, boolean> = {};
      extracted.forEach((img: ExtractedImage) => {
        // default: select only valid image URLs
        if (img.isValid) initialSelected[img.id] = true;
      });
      setSelectedIds(initialSelected);

      setStatus(ExtractionStatus.COMPLETED);
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Failed to extract images.");
      setStatus(ExtractionStatus.ERROR);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectAll = () => {
    const next: Record<string, boolean> = {};
    images.forEach((img) => {
      if (img.isValid) next[img.id] = true;
    });
    setSelectedIds(next);
  };

  const selectNone = () => {
    setSelectedIds({});
  };

  const handleDownloadSelectedAsZip = async () => {
    if (!hasSelection) return;

    try {
      const zip = new JSZip();

      // Add images
      const tasks = selectedImages.map(async (img, idx) => {
        // Some sites block direct fetch. If it fails, we just skip that item.
        try {
          const res = await fetch(img.url);
          const blob = await res.blob();

          const ext = img.type === "unknown" ? "img" : img.type;
          const filename = `image-${String(idx + 1).padStart(3, "0")}.${ext}`;
          zip.file(filename, blob);
        } catch (e) {
          console.warn("Skipping blocked image:", img.url);
        }
      });

      await Promise.all(tasks);

      await downloadZip(zip, "extracted-images.zip");
    } catch (e) {
      console.error(e);
      setError("ZIP download failed. Some images may be blocked by CORS.");
    }
  };

  const handleDownloadSingle = async (img: ExtractedImage) => {
    try {
      await downloadFile(img.url);
    } catch (e) {
      console.error(e);
      setError("Download failed. This image may be blocked by the source site.");
    }
  };

  const isBusy =
    status === ExtractionStatus.FETCHING_SOURCE ||
    status === ExtractionStatus.EXTRACTING_REGEX ||
    status === ExtractionStatus.VALIDATING;

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight uppercase">
            Image Extractor
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg font-medium max-w-3xl">
            Paste any webpage URL and extract image assets. Select what you want, then download individually or as a ZIP.
          </p>
        </header>

        <div className="bg-offWhite border-2 border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="flex-1 px-4 py-3 border-2 border-slate-200 bg-white focus:border-primary focus:ring-0 focus:outline-none font-medium"
            />
            <Button onClick={handleExtract} disabled={!url.trim() || isBusy} size="lg" variant="primary">
              {isBusy ? "Working..." : "Extract Images"}
            </Button>
          </div>

          {error && (
            <div className="mt-4 p-4 border-l-4 border-accent bg-white text-accent font-bold text-sm">
              {error}
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2 items-center">
            <Button onClick={selectAll} variant="secondary" size="md" disabled={images.length === 0}>
              Select All
            </Button>
            <Button onClick={selectNone} variant="secondary" size="md" disabled={images.length === 0}>
              Select None
            </Button>

            <div className="ml-auto flex gap-2">
              <Button
                onClick={handleDownloadSelectedAsZip}
                variant="outline"
                size="md"
                disabled={!hasSelection}
              >
                Download ZIP
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          {images.length === 0 ? (
            <div className="text-slate-500 text-sm font-medium">
              {status === ExtractionStatus.IDLE ? "No images yet." : "No images found (or blocked)."}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img) => (
                <ImageCard
                  key={img.id}
                  image={img}
                  isSelected={!!selectedIds[img.id]}
                  onToggleSelect={() => toggleSelect(img.id)}
                  onDownload={() => handleDownloadSingle(img)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
