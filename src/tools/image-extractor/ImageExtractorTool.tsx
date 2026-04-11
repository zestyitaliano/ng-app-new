import React, { useMemo, useState } from "react";
import JSZip from "jszip";

import { Button } from "../../components/Button";
import { ImageCard } from "../../components/ImageCard";
import ToolLayout from "../../components/ToolLayout";
import { toolMeta } from "./meta";
import { fetchPageHtmlViaProxy } from "./services/proxyService";
import { ExtractionStatus, type ExtractedImage } from "./types";
import { downloadFile, downloadZip } from "./utils/download";
import { extractImagesFromHtml } from "./utils/extractor";

export default function ImageExtractorTool() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<ExtractionStatus>(ExtractionStatus.IDLE);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<ExtractedImage[]>([]);
  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({});

  const selectedImages = useMemo(() => {
    const ids = new Set(
      Object.keys(selectedIds).filter((id) => selectedIds[id]),
    );
    return images.filter((image) => ids.has(image.id));
  }, [images, selectedIds]);

  const hasSelection = selectedImages.length > 0;

  const handleExtract = async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      return;
    }

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
      extracted.forEach((image) => {
        if (image.isValid) {
          initialSelected[image.id] = true;
        }
      });
      setSelectedIds(initialSelected);
      setStatus(ExtractionStatus.COMPLETED);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Failed to extract images.";
      setError(message);
      setStatus(ExtractionStatus.ERROR);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectAll = () => {
    const next: Record<string, boolean> = {};
    images.forEach((image) => {
      if (image.isValid) {
        next[image.id] = true;
      }
    });
    setSelectedIds(next);
  };

  const selectNone = () => {
    setSelectedIds({});
  };

  const handleDownloadSelectedAsZip = async () => {
    if (!hasSelection) {
      return;
    }

    try {
      const zip = new JSZip();

      await Promise.all(
        selectedImages.map(async (image, index) => {
          try {
            const response = await fetch(image.url);
            const blob = await response.blob();
            const ext = image.type === "unknown" ? "img" : image.type;
            const filename = `image-${String(index + 1).padStart(3, "0")}.${ext}`;
            zip.file(filename, blob);
          } catch {
            console.warn("Skipping blocked image:", image.url);
          }
        }),
      );

      await downloadZip(zip, "extracted-images.zip");
    } catch {
      setError("ZIP download failed. Some images may be blocked by CORS.");
    }
  };

  const handleDownloadSingle = async (image: ExtractedImage) => {
    try {
      await downloadFile(image.url);
    } catch {
      setError("Download failed. This image may be blocked by the source site.");
    }
  };

  const isBusy =
    status === ExtractionStatus.FETCHING_SOURCE ||
    status === ExtractionStatus.EXTRACTING_REGEX ||
    status === ExtractionStatus.VALIDATING;

  return (
    <ToolLayout meta={toolMeta} contentClassName="max-w-6xl">
      <div>
        <div className="border-2 border-slate-200 bg-offWhite p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com/page"
              className="flex-1 border-2 border-slate-200 bg-white px-4 py-3 font-medium focus:border-primary focus:outline-none focus:ring-0"
            />
            <Button
              onClick={handleExtract}
              disabled={!url.trim() || isBusy}
              size="lg"
              variant="primary"
            >
              {isBusy ? "Working..." : "Extract Images"}
            </Button>
          </div>

          {error ? (
            <div className="mt-4 border-l-4 border-accent bg-white p-4 text-sm font-bold text-accent">
              {error}
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button
              onClick={selectAll}
              variant="secondary"
              size="md"
              disabled={images.length === 0}
            >
              Select All
            </Button>
            <Button
              onClick={selectNone}
              variant="secondary"
              size="md"
              disabled={images.length === 0}
            >
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
            <div className="text-sm font-medium text-slate-500">
              {status === ExtractionStatus.IDLE
                ? "No images yet."
                : "No images found (or blocked)."}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={[
                    "border-2 transition-colors",
                    selectedIds[image.id]
                      ? "border-primary"
                      : "border-transparent",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={() => toggleSelect(image.id)}
                    className="block w-full text-left"
                  >
                    <ImageCard image={image} />
                  </button>

                  <div className="mt-2">
                    <Button
                      onClick={() => handleDownloadSingle(image)}
                      variant="outline"
                      size="md"
                      className="w-full"
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
