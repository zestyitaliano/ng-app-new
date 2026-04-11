import React from "react";
import { Link } from "react-router-dom";
import type { ToolMeta } from "../tools/types";

type ToolHeaderLiteProps = {
  meta: ToolMeta;
};

export default function ToolHeaderLite({ meta }: ToolHeaderLiteProps) {
  return (
    <div className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <div className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">
            {meta.category}
          </div>
          <div className="truncate text-sm font-bold uppercase tracking-wide text-slate-900">
            {meta.title}
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
          <Link className="transition-colors hover:text-slate-900" to="/tools">
            All Tools
          </Link>
          <Link className="transition-colors hover:text-slate-900" to="/">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
