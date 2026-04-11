import React from "react";
import { Link } from "react-router-dom";

type SiteFooterProps = {
  className?: string;
  inverted?: boolean;
};

export default function SiteFooter({
  className = "",
  inverted = false,
}: SiteFooterProps) {
  const shellClass = inverted
    ? "border-t-2 border-[#111111] bg-[#efefef] text-[#111111]"
    : "border-t border-slate-200 bg-white text-slate-900";

  const mutedClass = inverted ? "text-[rgba(17,17,17,0.72)]" : "text-slate-500";
  const linkClass = inverted
    ? "text-[#111111] transition-opacity hover:opacity-70"
    : "text-slate-700 transition-colors hover:text-slate-900";

  return (
    <footer className={`${shellClass} ${className}`.trim()}>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(0,1fr))] lg:px-8">
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.22em]"
          >
            <span className="inline-grid h-11 w-11 place-items-center border-2 border-current bg-[#ffca3a] text-[#111111]">
              NG
            </span>
            <span>No Gatekeeping</span>
          </Link>

          <p className={`max-w-md text-sm leading-6 ${mutedClass}`}>
            Utility-first tools for image, text, SEO, and design work. Built to get people into the right tool fast.
          </p>
        </div>

        <div className="space-y-4">
          <div className="text-xs font-black uppercase tracking-[0.22em]">Explore</div>
          <nav className={`grid gap-3 text-sm font-bold uppercase tracking-[0.14em] ${mutedClass}`}>
            <Link className={linkClass} to="/">
              Home
            </Link>
            <Link className={linkClass} to="/tools">
              All Tools
            </Link>
            <Link className={linkClass} to="/blog">
              Blog
            </Link>
          </nav>
        </div>

        <div className="space-y-4">
          <div className="text-xs font-black uppercase tracking-[0.22em]">Info</div>
          <div className={`grid gap-3 text-sm leading-6 ${mutedClass}`}>
            <p>About: no-gatekeeping utilities for practical everyday work.</p>
            <p>Contact: blog and site contact details can live here next.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
