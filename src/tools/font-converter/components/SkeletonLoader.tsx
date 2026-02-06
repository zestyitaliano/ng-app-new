import React from "react";

export default function SkeletonLoader({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-12 w-full animate-pulse bg-slate-100 border border-slate-200"
        />
      ))}
    </div>
  );
}
