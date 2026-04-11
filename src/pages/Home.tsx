import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SiteFooter from "../components/SiteFooter";
import { TOOL_CATALOG, type ToolCardIcon } from "../tools/catalog";
import "./home.css";

type Tool = (typeof TOOL_CATALOG)[number];

const TOOLS: Tool[] = TOOL_CATALOG;
const HERO_CHAIN_COLUMNS = 3;
const HERO_CHAIN_STARTS = [0, 4, 8];
type ChainPhase = "idle" | "animating" | "resetting";

function IconSVG({ kind }: { kind: ToolCardIcon }) {
  const common = {
    stroke: "currentColor",
    fill: "none",
    strokeWidth: 1.8,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
  };

  switch (kind) {
    case "pipette":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M14 4l6 6M8 10l6 6M3 21l6-6m-2-2l5-5 4 4-5 5H7z" />
          <path {...common} d="M16 8l-6 6" />
        </svg>
      );
    case "type":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M4 7V5h16v2" />
          <path {...common} d="M9 19h6" />
          <path {...common} d="M12 5v14" />
        </svg>
      );
    case "mic":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M12 15a4 4 0 0 0 4-4V7a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4z" />
          <path {...common} d="M19 11a7 7 0 0 1-14 0" />
          <path {...common} d="M12 18v4" />
          <path {...common} d="M8 22h8" />
        </svg>
      );
    case "scaling":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M4 20V4h16v16H4z" />
          <path {...common} d="M7 17l10-10" />
          <path {...common} d="M14 7h3v3" />
        </svg>
      );
    case "file":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path {...common} d="M14 2v6h6" />
          <path {...common} d="M8 13h8" />
          <path {...common} d="M8 17h8" />
        </svg>
      );
    case "minimize":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M8 3H3v5" />
          <path {...common} d="M21 16v5h-5" />
          <path {...common} d="M3 8l7-7" />
          <path {...common} d="M21 16l-7 7" />
        </svg>
      );
    case "palette":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M12 22a10 10 0 1 1 0-20c5.5 0 10 3.6 10 8 0 2.2-1.8 4-4 4h-1a2 2 0 0 0-2 2c0 1.1-.9 2-2 2z" />
          <path {...common} d="M7.5 10.5h.01" />
          <path {...common} d="M9.5 7.5h.01" />
          <path {...common} d="M14.5 7.5h.01" />
          <path {...common} d="M16.5 10.5h.01" />
        </svg>
      );
    case "grid":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M4 4h7v7H4z" />
          <path {...common} d="M13 4h7v7h-7z" />
          <path {...common} d="M4 13h7v7H4z" />
          <path {...common} d="M13 13h7v7h-7z" />
        </svg>
      );
    case "library":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M5 19V5h5v14H5z" />
          <path {...common} d="M10 19V8h4v11h-4z" />
          <path {...common} d="M14 19V10h5v9h-5z" />
        </svg>
      );
    case "graph":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M4 19h16" />
          <path {...common} d="M7 16l4-4 3 2 4-6" />
          <path {...common} d="M18 8h2v2" />
        </svg>
      );
    case "layout":
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M4 4h16v16H4z" />
          <path {...common} d="M4 9h16" />
          <path {...common} d="M9 9v11" />
        </svg>
      );
  }
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [chainIndices, setChainIndices] = useState(HERO_CHAIN_STARTS);
  const [chainPhases, setChainPhases] = useState<ChainPhase[]>(["idle", "idle", "idle"]);

  const categories = useMemo(() => {
    return ["All", ...new Set(TOOLS.map((tool) => tool.category).filter(Boolean))];
  }, []);

  const tickerItems = useMemo(() => {
    return [...TOOLS.map((tool) => tool.title), "Open Source Utilities", "No Signups", "Fast Workflows"];
  }, []);

  const heroColumns = useMemo(() => {
    return Array.from({ length: HERO_CHAIN_COLUMNS }, (_, columnIndex) => {
      const currentIndex = chainIndices[columnIndex] ?? columnIndex;

      return {
        current: TOOLS[currentIndex % TOOLS.length],
        next: TOOLS[(currentIndex + 1) % TOOLS.length],
      };
    });
  }, [chainIndices]);

  const visibleTools = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return TOOLS.filter((tool) => {
      const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
      const matchesQuery =
        normalized.length === 0 ||
        tool.title.toLowerCase().includes(normalized) ||
        tool.desc.toLowerCase().includes(normalized) ||
        tool.category.toLowerCase().includes(normalized);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      Array.from({ length: HERO_CHAIN_COLUMNS }, (_, columnIndex) => columnIndex).forEach((columnIndex) => {
        window.setTimeout(() => {
          setChainPhases((current) =>
            current.map((value, index) => (index === columnIndex ? "animating" : value)),
          );

          window.setTimeout(() => {
            setChainIndices((current) =>
              current.map((value, index) =>
                index === columnIndex ? (value + 1) % TOOLS.length : value,
              ),
            );
            setChainPhases((current) =>
              current.map((value, index) => (index === columnIndex ? "resetting" : value)),
            );

            window.setTimeout(() => {
              setChainPhases((current) =>
                current.map((value, index) => (index === columnIndex ? "idle" : value)),
              );
            }, 40);
          }, 540);
        }, columnIndex * 150);
      });
    }, 2600);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="ng-home">
      <header className="ng-header">
        <Link className="ng-brand" to="/">
          <span className="ng-brand__mark" aria-hidden="true">
            NG
          </span>
          <span className="ng-brand__text">No Gatekeeping</span>
        </Link>

        <nav className="ng-nav" aria-label="Primary">
          <a href="#tools">Tools</a>
          <a href="#system">System</a>
          <a href="/blog">Blog</a>
        </nav>

        <a className="ng-header__cta" href="#tools">
          Open Tools
        </a>
      </header>

      <main>
        <section className="hero-shell">
          <div className="hero-stack">
            <div className="hero-copy">
              <div className="eyebrow">Utility Artboard / 2026</div>
              <h1 className="hero-title">
                <span>NO</span>
                <span>GATEKEEPING</span>
              </h1>
              <p className="hero-kicker">
                Fast, direct utilities for image, text, SEO, design, and workflow cleanup.
                Everything is built to get people into a tool quickly.
              </p>

              <div className="hero-actions">
                <a className="hero-action hero-action--primary" href="#tools">
                  View All Tools
                </a>
                <a className="hero-action" href="/tools">
                  Tool Index
                </a>
              </div>
              <div className="hero-rail">
                <div className="hero-rail__line hero-rail__line--blue" />
                <div className="hero-rail__line hero-rail__line--yellow" />
                <div className="hero-rail__line hero-rail__line--red" />
              </div>
            </div>

            <section className="hero-chain-board" aria-label="Featured tools">
              <div className="hero-chain__head">
                <div className="panel-label">Tool Chain</div>
                <p>
                  Three rotating shortcuts, each advancing with a slight delay so the whole board
                  moves like an offset conveyor.
                </p>
              </div>

              <div className="hero-chain-columns">
                {heroColumns.map((column, columnIndex) => (
                  <div className="hero-chain-column" key={`column-${columnIndex}`}>
                    <div className="hero-chain-column__label">
                      Queue {columnIndex + 1}
                    </div>

                    <div className="hero-chain__viewport hero-chain__viewport--single">
                      <div
                        className={`hero-chain__track hero-chain__track--single phase-${chainPhases[columnIndex]}`}
                      >
                        {[column.current, column.next].map((tool, toolIndex) => (
                          <Link
                            key={`${tool.id}-${columnIndex}-${toolIndex}`}
                            to={tool.route}
                            className="hero-chain__item hero-chain__item--single"
                            style={
                              {
                                ["--accent" as "--accent"]: tool.bg,
                              } as React.CSSProperties
                            }
                          >
                            <div className="hero-chain__item-top">
                              <span className="hero-chain__category">{tool.category}</span>
                              <span className="hero-chain__arrow" aria-hidden="true">
                                ↗
                              </span>
                            </div>

                            <div className="hero-chain__item-main">
                              <span className="hero-chain__icon">
                                <IconSVG kind={tool.icon} />
                              </span>
                              <div>
                                <strong>{tool.title}</strong>
                                <p>{tool.desc}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="ticker" aria-label="Tool ticker">
          <div className="ticker__track">
            {[0, 1].map((loop) => (
              <div className="ticker__row" key={loop}>
                {tickerItems.map((item, index) => (
                  <span key={`${loop}-${item}-${index}`}>{item}</span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="tools-shell" id="tools">
          <div className="section-head">
            <div>
              <div className="eyebrow">Filterable Tool Matrix</div>
              <h1>Browse the entire No Gatekeeping stack.</h1>
            </div>

            <p>
              Search by name or category, then jump straight into the tool you need without
              friction.
            </p>
          </div>

          <div className="tool-controls">
            <label className="tool-search">
              <span className="sr-only">Search tools</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tool, keyword, or category"
              />
            </label>

            <div className="tool-filters" role="tablist" aria-label="Tool categories">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={category === activeCategory ? "is-active" : ""}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="tool-grid">
            {visibleTools.map((tool, index) => (
              <Link
                key={tool.id}
                to={tool.route}
                className="tool-card"
                style={
                  {
                    ["--accent" as "--accent"]: tool.bg,
                    ["--card-order" as "--card-order"]: String(index % 6),
                  } as React.CSSProperties
                }
              >
                <div className="tool-card__top">
                  <span className="tool-card__category">{tool.category}</span>
                  <span className="tool-card__arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>

                <div className="tool-card__icon">
                  <IconSVG kind={tool.icon} />
                </div>

                <div className="tool-card__body">
                  <h2>{tool.title}</h2>
                  <p>{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {visibleTools.length === 0 ? (
            <div className="tool-empty">
              <p>No tools match that filter yet. Try another keyword or switch back to All.</p>
            </div>
          ) : null}
        </section>

      </main>

      <SiteFooter className="ng-footer" inverted />
    </div>
  );
}
