import React from "react";
import type { ToolMeta } from "./types";

// meta imports (cheap, sync)
import { toolMeta as caseConverter } from "./case-converter/meta";
import { toolMeta as imageConverter } from "./image-converter/meta";
import { toolMeta as campaignUrlArchitect } from "./campaign-url-architect/meta";
import { toolMeta as colorPicker } from "./color-picker/meta";
import { toolMeta as colorPaletteGenerator } from "./color-palette-generator/meta";
import { toolMeta as dictate } from "./dictate/meta";
import { toolMeta as dnsChecker } from "./dns-checker/meta";
import { toolMeta as fontConverter } from "./font-converter/meta";
import { toolMeta as imageCompressor } from "./image-compressor/meta";
import { toolMeta as imageExtractor } from "./image-extractor/meta";
import { toolMeta as imageToTextGenerator } from "./image-to-text-converter/meta";
import { toolMeta as loremIpsumGenerator } from "./lorem-ipsum-generator/meta";
import { toolMeta as modularWireframeGenerator } from "./modular-wireframe-generator/meta";
import { toolMeta as proportionScaler } from "./proportion-scaler/meta";
import { toolMeta as redirectAnalyzer } from "./redirect-analyzer/meta";
import { toolMeta as sitemapRobotsExplorer } from "./sitemap-robots-explorer/meta";
import { toolMeta as vectorVault } from "./vectorvault/meta";

export type ToolDefinition = {
  meta: ToolMeta;
  Component: React.LazyExoticComponent<React.ComponentType<any>>;
};

type ToolModule = {
  default?: React.ComponentType<any>;
  // allow any named exports without fighting TS inference
  [key: string]: any;
};

/**
 * React.lazy requires a DEFAULT export.
 * This helper allows a safe fallback to a named export if default is missing.
 *
 * IMPORTANT: `namedExportFallback` is a string on purpose — TS often infers the module
 * type as only `{ default: ... }`, which would otherwise force `"default"` only.
 */
function lazyTool(
  importer: () => Promise<ToolModule>,
  namedExportFallback: string,
) {
  return React.lazy(async () => {
    const mod = await importer();
    const Component = mod.default ?? mod[namedExportFallback];

    if (!Component) {
      throw new Error(
        `Tool module is missing a default export and named export "${namedExportFallback}".`,
      );
    }

    return { default: Component };
  });
}

// lazy component imports (code-split per tool)
const CaseConverterTool = lazyTool(
  () => import("./case-converter/CaseConverterTool"),
  "CaseConverterTool",
);

const ImageConverterTool = lazyTool(
  () => import("./image-converter/ImageConverterTool"),
  "ImageConverterTool",
);

const CampaignUrlArchitectTool = lazyTool(
  () => import("./campaign-url-architect/CampaignUrlArchitectTool"),
  "CampaignUrlArchitectTool",
);

const ColorPickerTool = lazyTool(
  () => import("./color-picker/ColorPickerTool"),
  "ColorPickerTool",
);

const ColorPaletteGeneratorTool = lazyTool(
  () => import("./color-palette-generator/ColorPaletteGeneratorTool"),
  "ColorPaletteGeneratorTool",
);

const FontConverterTool = lazyTool(
  () => import("./font-converter/FontConverterTool"),
  "FontConverterTool",
);

const DictateTool = lazyTool(
  () => import("./dictate/DictateTool"),
  "DictateTool",
);

const DnsCheckerTool = lazyTool(
  () => import("./dns-checker/DnsCheckerTool"),
  "DnsCheckerTool",
);

const ImageCompressorTool = lazyTool(
  () => import("./image-compressor/ImageCompressorTool"),
  "ImageCompressorTool",
);

const ImageExtractorTool = lazyTool(
  () => import("./image-extractor/ImageExtractorTool"),
  "ImageExtractorTool",
);

const ImageToTextGeneratorTool = lazyTool(
  () => import("./image-to-text-converter/ImageToTextGeneratorTool"),
  "ImageToTextGeneratorTool",
);

const LoremIpsumGeneratorTool = lazyTool(
  () => import("./lorem-ipsum-generator/LoremIpsumGeneratorTool"),
  "LoremIpsumGeneratorTool",
);

const ModularWireframeGeneratorTool = lazyTool(
  () => import("./modular-wireframe-generator/ModularWireframeGeneratorTool"),
  "ModularWireframeGeneratorTool",
);

const ProportionScalerTool = lazyTool(
  () => import("./proportion-scaler/ProportionScalerTool"),
  "ProportionScalerTool",
);

const RedirectAnalyzerTool = lazyTool(
  () => import("./redirect-analyzer/RedirectAnalyzerTool"),
  "RedirectAnalyzerTool",
);

const SitemapRobotsExplorerTool = lazyTool(
  () => import("./sitemap-robots-explorer/SitemapRobotsExplorerTool"),
  "SitemapRobotsExplorerTool",
);

const VectorVaultTool = lazyTool(
  () => import("./vectorvault/VectorVaultTool"),
  "VectorVaultTool",
);

export const TOOLS: ToolDefinition[] = [
  { meta: imageConverter, Component: ImageConverterTool },
  { meta: campaignUrlArchitect, Component: CampaignUrlArchitectTool },
  { meta: caseConverter, Component: CaseConverterTool },
  { meta: colorPicker, Component: ColorPickerTool },
  { meta: colorPaletteGenerator, Component: ColorPaletteGeneratorTool },
  { meta: dictate, Component: DictateTool },
  { meta: dnsChecker, Component: DnsCheckerTool },
  { meta: fontConverter, Component: FontConverterTool },
  { meta: imageCompressor, Component: ImageCompressorTool },
  { meta: imageExtractor, Component: ImageExtractorTool },
  { meta: imageToTextGenerator, Component: ImageToTextGeneratorTool },
  { meta: loremIpsumGenerator, Component: LoremIpsumGeneratorTool },
  { meta: modularWireframeGenerator, Component: ModularWireframeGeneratorTool },
  { meta: proportionScaler, Component: ProportionScalerTool },
  { meta: redirectAnalyzer, Component: RedirectAnalyzerTool },
  { meta: sitemapRobotsExplorer, Component: SitemapRobotsExplorerTool },
  { meta: vectorVault, Component: VectorVaultTool },
];

export const TOOLS_BY_SLUG = Object.fromEntries(
  TOOLS.map((t) => [t.meta.slug, t]),
) as Record<string, ToolDefinition>;
