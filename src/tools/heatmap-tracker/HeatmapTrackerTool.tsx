import React, { useEffect, useMemo, useRef, useState } from "react";
import { Download, Sparkles, Trash2, Upload } from "lucide-react";
import ToolLayout from "../../components/ToolLayout";
import { toolMeta } from "./meta";

type HeatPoint = {
  id: string;
  x: number;
  y: number;
  weight: number;
};

const SURFACE_WIDTH = 1200;
const SURFACE_HEIGHT = 720;

function drawHeatmap(
  canvas: HTMLCanvasElement,
  points: HeatPoint[],
  backgroundUrl: string | null,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f4f4f4";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (backgroundUrl) {
    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      renderHeat(ctx, points);
    };
    image.src = backgroundUrl;
    return;
  }

  renderHeat(ctx, points);
}

function renderHeat(ctx: CanvasRenderingContext2D, points: HeatPoint[]) {
  for (const point of points) {
    const gradient = ctx.createRadialGradient(
      point.x,
      point.y,
      0,
      point.x,
      point.y,
      56,
    );
    gradient.addColorStop(0, `rgba(255, 89, 94, ${Math.min(point.weight, 1)})`);
    gradient.addColorStop(0.35, "rgba(255, 202, 58, 0.55)");
    gradient.addColorStop(1, "rgba(25, 130, 196, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 56, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function HeatmapTrackerTool() {
  const [points, setPoints] = useState<HeatPoint[]>([]);
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [recordMode, setRecordMode] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawHeatmap(canvas, points, backgroundUrl);
  }, [backgroundUrl, points]);

  const stats = useMemo(() => {
    const averageWeight =
      points.length > 0
        ? (
            points.reduce((sum, point) => sum + point.weight, 0) / points.length
          ).toFixed(2)
        : "0.00";

    return {
      points: points.length,
      averageWeight,
    };
  }, [points]);

  function handleCanvasClick(event: React.MouseEvent<HTMLCanvasElement>) {
    if (!recordMode) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * SURFACE_WIDTH;
    const y = ((event.clientY - rect.top) / rect.height) * SURFACE_HEIGHT;

    setPoints((current) => [
      ...current,
      {
        id: `${Date.now()}-${current.length}`,
        x,
        y,
        weight: 0.4 + Math.random() * 0.6,
      },
    ]);
  }

  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setBackgroundUrl(url);
  }

  function seedDemoData() {
    const generated = Array.from({ length: 24 }, (_, index) => ({
      id: `seed-${index}`,
      x: 140 + ((index * 37) % 840),
      y: 120 + ((index * 61) % 460),
      weight: 0.35 + ((index % 5) * 0.14),
    }));
    setPoints(generated);
  }

  function clearAll() {
    setPoints([]);
    setBackgroundUrl(null);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(points, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "heatmap-points.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <ToolLayout meta={toolMeta} contentClassName="max-w-7xl">
      <div className="space-y-6">
        <section className="ng-card grid gap-6 p-6 lg:grid-cols-[minmax(0,1.1fr)_340px]">
          <div className="space-y-4">
            <div className="ng-eyebrow">Frontend-Only MVP</div>
            <h2 className="text-3xl font-extrabold uppercase tracking-[-0.06em]">
              Prototype Heatmaps Without a Backend
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-[var(--ng-text-muted)]">
              This version is intentionally creative and local-first: upload a
              screenshot, click to place hotspots, seed demo sessions, and export
              the event map. It works fully on the frontend, but true
              cross-visitor analytics still needs a collector endpoint or hosted
              store.
            </p>

            <div className="flex flex-wrap gap-3">
              <label className="ng-button ng-button-outline cursor-pointer gap-2">
                <Upload className="h-4 w-4" />
                Upload Screenshot
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                />
              </label>

              <button
                className="ng-button ng-button-secondary gap-2"
                onClick={seedDemoData}
                type="button"
              >
                <Sparkles className="h-4 w-4" />
                Seed Demo Data
              </button>

              <button
                className="ng-button ng-button-outline gap-2"
                onClick={exportJson}
                type="button"
              >
                <Download className="h-4 w-4" />
                Export JSON
              </button>

              <button
                className="ng-button ng-button-outline gap-2"
                onClick={clearAll}
                type="button"
              >
                <Trash2 className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="ng-panel">
              <div className="ng-eyebrow text-[var(--ng-text)]">
                Recorded Points
              </div>
              <p className="mt-3 text-3xl font-extrabold tracking-[-0.06em]">
                {stats.points}
              </p>
            </div>
            <div className="ng-panel bg-[var(--ng-accent-yellow)]">
              <div className="ng-eyebrow text-[var(--ng-text)]">
                Average Intensity
              </div>
              <p className="mt-3 text-3xl font-extrabold tracking-[-0.06em]">
                {stats.averageWeight}
              </p>
            </div>
            <button
              className={
                recordMode
                  ? "ng-button ng-button-primary w-full py-3"
                  : "ng-button ng-button-outline w-full py-3"
              }
              onClick={() => setRecordMode((current) => !current)}
              type="button"
            >
              {recordMode ? "Recording Clicks" : "Preview Only"}
            </button>
          </div>
        </section>

        <section className="ng-card p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <div className="ng-eyebrow">Interactive Surface</div>
              <h3 className="mt-2 text-2xl font-extrabold uppercase tracking-[-0.05em]">
                Click The Canvas To Add Heat
              </h3>
            </div>
            <div className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--ng-text-muted)]">
              {SURFACE_WIDTH} × {SURFACE_HEIGHT}
            </div>
          </div>

          <div className="overflow-hidden border-2 border-[var(--ng-border)] bg-[var(--ng-panel)]">
            <canvas
              ref={canvasRef}
              className="block h-auto w-full cursor-crosshair"
              height={SURFACE_HEIGHT}
              onClick={handleCanvasClick}
              width={SURFACE_WIDTH}
            />
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <article className="ng-panel">
            <div className="ng-eyebrow text-[var(--ng-text)]">Frontend Only</div>
            <h4 className="mt-3 text-xl font-extrabold uppercase tracking-[-0.04em]">
              Works Today
            </h4>
            <p className="mt-3 text-sm leading-6">
              Record clicks in local state or localStorage, overlay them on a
              screenshot, and export the event payload as JSON.
            </p>
          </article>

          <article className="ng-panel bg-[var(--ng-accent-yellow)]">
            <div className="ng-eyebrow text-[var(--ng-text)]">
              Creative Middle Ground
            </div>
            <h4 className="mt-3 text-xl font-extrabold uppercase tracking-[-0.04em]">
              Beacon To A Tiny Store
            </h4>
            <p className="mt-3 text-sm leading-6">
              Keep the tracker script frontend-first, then send events with
              `navigator.sendBeacon()` to a tiny edge endpoint, Supabase, Firebase,
              Sheets, or KV.
            </p>
          </article>

          <article className="ng-panel">
            <div className="ng-eyebrow text-[var(--ng-text)]">
              Real Product Version
            </div>
            <h4 className="mt-3 text-xl font-extrabold uppercase tracking-[-0.04em]">
              Needs A Collector
            </h4>
            <p className="mt-3 text-sm leading-6">
              True cross-user heatmaps need shared storage, URL normalization,
              viewport scaling, and session aggregation. The client alone cannot
              do that across visitors.
            </p>
          </article>
        </section>
      </div>
    </ToolLayout>
  );
}
