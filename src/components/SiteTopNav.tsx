import React from "react";
import { Link } from "react-router-dom";
import { FEATURED_TOOL_LINKS } from "../tools/featuredLinks";

type SiteTopNavProps = {
  className?: string;
};

export default function SiteTopNav({ className = "" }: SiteTopNavProps) {
  return (
    <header
      className={`sticky top-0 z-40 border-b-2 border-[#111111] bg-white/95 backdrop-blur ${className}`.trim()}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.22em] text-[#111111]"
        >
          <span className="inline-grid h-10 w-10 place-items-center border-2 border-[#111111] bg-[#ffca3a] text-[#111111]">
            NG
          </span>
          <span>No Gatekeeping</span>
        </Link>

        <nav className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.18em] text-[rgba(17,17,17,0.68)] sm:gap-6">
          <Link className="transition-colors hover:text-[#111111]" to="/">
            Home
          </Link>
          <Link className="transition-colors hover:text-[#111111]" to="/tools">
            All Tools
          </Link>
          {FEATURED_TOOL_LINKS.map((tool) => (
            <Link
              key={tool.slug}
              className="hidden transition-colors hover:text-[#111111] xl:inline"
              to={`/tools/${tool.slug}`}
            >
              {tool.label}
            </Link>
          ))}
          <Link className="transition-colors hover:text-[#111111]" to="/blog">
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
