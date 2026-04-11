import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TOOL_CATALOG, type ToolCardIcon } from "../tools/catalog";
import "./home.css";

type Tool = {
  id: string;
  title: string;
  desc?: string;
  category?: string;
  href?: string; // not used anymore (we use route instead)
  route: string; // NEW: real route like "/tools/image-converter"
  bg: string;
  fg: string;
  col?: number;
  row?: number;
  icon: ToolCardIcon;
};

const TOOLS: Tool[] = TOOL_CATALOG;

function enterVectorForIndex(index: number) {
  let x = 0,
    y = 0;
  const distance = 420;
  const mod4 = index % 4;

  if (mod4 === 0) {
    x = -distance;
    y = 120;
  } else if (mod4 === 3) {
    x = distance;
    y = 120;
  } else if (mod4 === 1) {
    x = -120;
    y = distance;
  } else {
    x = 120;
    y = -distance;
  }

  if (index % 5 === 0) y += 60;
  return { x, y };
}

function groupByCategory(items: Tool[]) {
  const map = new Map<string, Tool[]>();
  items.forEach((t) => {
    const key = t.category || "Other";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(t);
  });
  return map;
}

function IconSVG({ kind, color }: { kind: Tool["icon"]; color: string }) {
  const common = {
    stroke: color,
    fill: "none",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (kind) {
    case "pipette":
      return (
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path {...common} d="M14 4l6 6M8 10l6 6M3 21l6-6m-2-2l5-5 4 4-5 5H7z" />
          <path {...common} d="M16 8l-6 6" />
        </svg>
      );
    case "type":
      return (
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path {...common} d="M4 7V5h16v2" />
          <path {...common} d="M9 19h6" />
          <path {...common} d="M12 5v14" />
        </svg>
      );
    case "scaling":
      return (
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path {...common} d="M4 20V4h16v16H4z" />
          <path {...common} d="M7 17l10-10" />
          <path {...common} d="M14 7h3v3" />
        </svg>
      );
    case "file":
      return (
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path {...common} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path {...common} d="M14 2v6h6" />
          <path {...common} d="M8 13h8" />
          <path {...common} d="M8 17h8" />
        </svg>
      );
    case "minimize":
      return (
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path {...common} d="M8 3H3v5" />
          <path {...common} d="M21 16v5h-5" />
          <path {...common} d="M3 8l7-7" />
          <path {...common} d="M21 16l-7 7" />
        </svg>
      );
    case "palette":
      return (
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path {...common} d="M12 22a10 10 0 1 1 0-20c5.5 0 10 3.6 10 8 0 2.2-1.8 4-4 4h-1a2 2 0 0 0-2 2c0 1.1-.9 2-2 2z" />
          <path {...common} d="M7.5 10.5h.01" />
          <path {...common} d="M9.5 7.5h.01" />
          <path {...common} d="M14.5 7.5h.01" />
          <path {...common} d="M16.5 10.5h.01" />
        </svg>
      );
    case "grid":
      return (
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path {...common} d="M4 4h7v7H4z" />
          <path {...common} d="M13 4h7v7h-7z" />
          <path {...common} d="M4 13h7v7H4z" />
          <path {...common} d="M13 13h7v7h-7z" />
        </svg>
      );
    case "library":
      return (
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <svg viewBox="0 0 24 24" width="28" height="28" fill={color} opacity={0.85}>
            <path d="M12 21s-7-4.4-7-11a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 6.6-7 11-7 11z" />
          </svg>
          <svg viewBox="0 0 24 24" width="28" height="28" fill={color} style={{ marginTop: -6 }}>
            <path d="M12 2l2.9 6 6.6.6-5 4.3 1.5 6.4L12 16.9 6 19.3l1.5-6.4-5-4.3 6.6-.6L12 2z" />
          </svg>
          <svg viewBox="0 0 24 24" width="28" height="28" fill={color} opacity={0.85}>
            <path d="M7 18a4 4 0 0 1 0-8 5 5 0 0 1 9.5-1.5A4 4 0 1 1 17 18H7z" />
          </svg>
        </div>
      );
    case "graph":
      return (
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path {...common} d="M6 3v6" />
          <path {...common} d="M12 3v10" />
          <path {...common} d="M18 3v4" />
          <path {...common} d="M6 9h6" />
          <path {...common} d="M12 13h6" />
          <path {...common} d="M18 7l-3 3" />
        </svg>
      );
    case "layout":
    default:
      return (
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path {...common} d="M4 4h16v16H4z" />
          <path {...common} d="M4 9h16" />
          <path {...common} d="M9 9v11" />
        </svg>
      );
  }
}

export default function Home() {
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false); // scroll-to-open state

  const toolSearchRef = useRef<HTMLInputElement | null>(null);

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TOOLS;
    return TOOLS.filter((t) => {
      return (
        (t.title || "").toLowerCase().includes(q) ||
        (t.desc || "").toLowerCase().includes(q) ||
        (t.category || "").toLowerCase().includes(q)
      );
    });
  }, [query]);

  const megaGroups = useMemo(() => {
    const grouped = groupByCategory(filteredTools);
    return [...grouped.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [filteredTools]);

  useEffect(() => {
    const threshold = 30;
    const onScroll = () => setIsOpen(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMegaOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!isMegaOpen) return;
    // Lock scroll while mega is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus search
    setTimeout(() => toolSearchRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMegaOpen]);

  const openMega = () => setIsMegaOpen(true);
  const closeMega = () => setIsMegaOpen(false);
  const toggleMega = () => setIsMegaOpen((v) => !v);

  return (
    <div className={`ng-home ${isOpen ? "is-open" : ""}`}>
      {/* NAV */}
      <header className="site-header">
        <nav className="nav" aria-label="Primary">
          <Link className="brand" to="/">
            <span className="brand-mark" />
            <span className="brand-name">No Gatekeeping</span>
          </Link>

          <button
            className="nav-toggle"
            onClick={toggleMega}
            aria-expanded={isMegaOpen}
            aria-controls="megaMenu"
          >
            <span className="sr-only">Open menu</span>
            <span className="burger" aria-hidden="true" />
          </button>

          <div className="nav-links">
            <a href="#tools">Tools</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="nav-actions">
            <button
              className="tools-button"
              onClick={openMega}
              aria-expanded={isMegaOpen}
              aria-controls="megaMenu"
            >
              Browse Tools
            </button>
          </div>
        </nav>

        {/* MEGA MENU */}
        <div className="mega" id="megaMenu" hidden={!isMegaOpen}>
          <div className="mega-inner">
            <div className="mega-head">
              <div>
                <div className="mega-title">Tools</div>
                <div className="mega-subtitle">Jump to any tool instantly.</div>
              </div>
              <button className="mega-close" onClick={closeMega} aria-label="Close menu">
                ✕
              </button>
            </div>

            <div className="mega-search">
              <input
                ref={toolSearchRef}
                type="search"
                placeholder="Search tools..."
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="mega-grid">
              {megaGroups.map(([cat, items]) => (
                <div className="mega-group" key={cat}>
                  <h3>{cat}</h3>
                  <div className="mega-links">
                    {items.map((t) => (
                      <Link
                        key={t.id}
                        className="mega-link"
                        to={t.route}
                        onClick={closeMega}
                      >
                        <span>{t.title}</span>
                        <small>↗</small>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Backdrop */}
        <div className="backdrop" hidden={!isMegaOpen} onClick={closeMega} />
      </header>

      {/* Fake scroll track (lets you “scroll to open”) */}
      <main className="scroll-track ui" id="uiRoot">
        <div className="viewport">
          {/* HERO */}
          <header className="hero" id="hero">
            <div className="hero-inner">
              <h1>
                Create<span className="accent">More</span>
              </h1>
              <p>
                Essential tools for creatives. <span className="accent-soft">All for free.</span>
              </p>
            </div>
          </header>

          {/* Scroll hint */}
          <div className="scroll-hint" id="scrollHint">
            <span>Scroll to Open</span>
            <svg className="chev" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* GRID */}
          <section className="grid-layer" id="tools">
            <div className="grid-scroll">
              <div className="grid-wrap">
                <div className="grid">
                  {TOOLS.map((t, i) => {
                    const vec = enterVectorForIndex(i);
                    const style = {
                      // Desktop spans
                      ["--col-span" as any]: String(t.col ?? 1),
                      ["--row-span" as any]: String(t.row ?? 1),
                      // Entry vectors
                      ["--enter-x" as any]: `${vec.x}px`,
                      ["--enter-y" as any]: `${vec.y}px`,
                      animationDelay: `${(i * 0.06).toFixed(2)}s`,
                    } as React.CSSProperties;

                    return (
                      <div className={`tile ${isOpen ? "is-visible" : ""}`} style={style} key={t.id}>
                        <Link
                          className="card"
                          to={t.route}
                          style={{ background: t.bg, color: t.fg }}
                        >
                          <div className="top-row">
                            <div className="icon">
                              <IconSVG kind={t.icon} color={t.fg} />
                            </div>
                            <div className="arrow" aria-hidden="true">
                              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                                <path
                                  d="M7 17L17 7"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M10 7h7v7"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>

                          <div className="content">
                            <h2>{t.title}</h2>
                            {t.desc ? <p>{t.desc}</p> : null}
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Optional extra page sections */}
      <section className="page-section" id="about">
        <div className="page-wrap">
          <h2>About</h2>
          <p>Add your site copy here.</p>
        </div>
      </section>

      <section className="page-section" id="contact">
        <div className="page-wrap">
          <h2>Contact</h2>
          <p>Add your contact / waitlist section here.</p>
        </div>
      </section>
    </div>
  );
}
