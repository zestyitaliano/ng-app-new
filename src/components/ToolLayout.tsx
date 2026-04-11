import React from "react";
import { Link } from "react-router-dom";
import type { ToolMeta } from "../tools/types";

type ToolLayoutProps = {
  meta: ToolMeta;
  children: React.ReactNode;
  contentClassName?: string;
};

export default function ToolLayout({
  meta,
  children,
  contentClassName = "max-w-6xl",
}: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-[75px] z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-xs font-black uppercase tracking-[0.24em] text-slate-500 transition-colors hover:text-slate-900"
          >
            No Gatekeeping
          </Link>

          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            <Link className="transition-colors hover:text-slate-900" to="/tools">
              All Tools
            </Link>
            <Link className="transition-colors hover:text-slate-900" to="/">
              Home
            </Link>
          </div>
        </div>
      </header>

      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="space-y-4 border-b border-slate-200 pb-8">
            <div className="inline-flex items-center border border-slate-300 bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-slate-600">
              {meta.category}
            </div>

            <div className="space-y-3">
              <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight text-slate-900 sm:text-5xl">
                {meta.title}
              </h1>
              <p className="max-w-3xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
                {meta.description}
              </p>
            </div>
          </section>

          <section className={`mx-auto w-full ${contentClassName}`}>
            {children}
          </section>
        </div>
      </main>
    </div>
  );
}
