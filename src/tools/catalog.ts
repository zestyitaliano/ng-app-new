import { TOOLS as REGISTERED_TOOLS } from "./registry";

export type ToolCardIcon =
  | "pipette"
  | "type"
  | "mic"
  | "scaling"
  | "file"
  | "minimize"
  | "palette"
  | "grid"
  | "library"
  | "graph"
  | "layout";

export type ToolPresentation = {
  id: string;
  title: string;
  desc: string;
  category: string;
  route: string;
  bg: string;
  fg: string;
  icon: ToolCardIcon;
  col?: number;
  row?: number;
};

type ToolVisualConfig = Pick<
  ToolPresentation,
  "bg" | "fg" | "icon" | "col" | "row"
>;

const DEFAULT_VISUALS: Record<string, ToolVisualConfig> = {
  Text: {
    bg: "#5dcbf0",
    fg: "#202c39",
    icon: "type",
    col: 1,
    row: 1,
  },
  Images: {
    bg: "#8ac926",
    fg: "#202c39",
    icon: "file",
    col: 1,
    row: 1,
  },
  URLs: {
    bg: "#1982c4",
    fg: "#ffffff",
    icon: "graph",
    col: 1,
    row: 1,
  },
  SEO: {
    bg: "#1982c4",
    fg: "#ffffff",
    icon: "graph",
    col: 1,
    row: 1,
  },
  Design: {
    bg: "#ff595e",
    fg: "#ffffff",
    icon: "palette",
    col: 1,
    row: 1,
  },
  Other: {
    bg: "#202c39",
    fg: "#ffffff",
    icon: "layout",
    col: 1,
    row: 1,
  },
};

const TOOL_VISUALS: Record<string, ToolVisualConfig> = {
  "campaign-url-architect": {
    bg: "#1982c4",
    fg: "#ffffff",
    icon: "graph",
  },
  "case-converter": {
    bg: "#5dcbf0",
    fg: "#202c39",
    icon: "type",
  },
  "color-palette-generator": {
    bg: "#ff595e",
    fg: "#ffffff",
    icon: "palette",
    col: 2,
  },
  "color-picker": {
    bg: "#1982c4",
    fg: "#ffffff",
    icon: "pipette",
    col: 2,
    row: 2,
  },
  dictate: {
    bg: "#ffca3a",
    fg: "#202c39",
    icon: "mic",
  },
  "font-converter": {
    bg: "#ef476f",
    fg: "#ffffff",
    icon: "type",
  },
  "image-compressor": {
    bg: "#6a4c93",
    fg: "#ffffff",
    icon: "minimize",
  },
  "image-converter": {
    bg: "#577590",
    fg: "#ffffff",
    icon: "file",
  },
  "image-extractor": {
    bg: "#43aa8b",
    fg: "#ffffff",
    icon: "graph",
  },
  "image-to-text": {
    bg: "#8ac926",
    fg: "#202c39",
    icon: "file",
    row: 2,
  },
  "lorem-ipsum-generator": {
    bg: "#f4a261",
    fg: "#202c39",
    icon: "type",
  },
  "modular-wireframe-generator": {
    bg: "#ff595e",
    fg: "#ffffff",
    icon: "layout",
  },
  "proportion-scaler": {
    bg: "#202c39",
    fg: "#ffffff",
    icon: "scaling",
  },
  "sitemap-robots-explorer": {
    bg: "#1982c4",
    fg: "#ffffff",
    icon: "graph",
  },
  vectorvault: {
    bg: "#ffca3a",
    fg: "#202c39",
    icon: "library",
    col: 2,
  },
};

const TOOL_ORDER = [
  "color-picker",
  "case-converter",
  "proportion-scaler",
  "image-to-text",
  "image-compressor",
  "color-palette-generator",
  "vectorvault",
  "sitemap-robots-explorer",
  "modular-wireframe-generator",
  "image-converter",
  "image-extractor",
  "font-converter",
  "dictate",
  "campaign-url-architect",
  "lorem-ipsum-generator",
];

export const TOOL_CATALOG: ToolPresentation[] = [...REGISTERED_TOOLS]
  .sort((a, b) => {
    const aIndex = TOOL_ORDER.indexOf(a.meta.slug);
    const bIndex = TOOL_ORDER.indexOf(b.meta.slug);
    const safeA = aIndex === -1 ? TOOL_ORDER.length : aIndex;
    const safeB = bIndex === -1 ? TOOL_ORDER.length : bIndex;

    return safeA - safeB || a.meta.title.localeCompare(b.meta.title);
  })
  .map(({ meta }) => {
    const visuals = TOOL_VISUALS[meta.slug] ?? DEFAULT_VISUALS[meta.category];

    return {
      id: meta.slug,
      title: meta.title,
      desc: meta.description,
      category: meta.category,
      route: `/tools/${meta.slug}`,
      ...visuals,
    };
  });
