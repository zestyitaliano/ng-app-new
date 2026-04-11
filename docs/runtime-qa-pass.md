# Runtime QA Pass

This pass is for route-by-route runtime validation of the merged app, with two goals:

1. catch UX inconsistencies that are easy to miss in build-only validation
2. decide whether custom tools should stay custom, get a lighter shared treatment, or be simplified

## Run It

1. Start the app with `npm run dev`.
2. In another terminal, print the route checklist with `npm run qa:routes`.
3. Visit each route in the order listed in `qa/route-runtime-manifest.json`.
4. For each route, record:
   - visible UX issues
   - console/runtime errors
   - broken flows
   - mobile layout issues
   - whether the route should stay custom, keep the current shared shell, or be simplified

## Core Checks For Every Route

- The route loads without crashing or blank states.
- The top-level shell feels consistent with the rest of the app.
- The primary action is obvious within 3 seconds.
- Empty, loading, success, and error states all make sense.
- Interactive controls are keyboard- and mobile-usable.
- There are no obvious visual regressions between desktop and mobile widths.
- There are no console errors during the main user flow.

## Shell Decision Rules

- `full_layout`
  Use when the tool is mostly a single-task workflow and benefits from standard app framing.

- `lite_header`
  Use when the tool still behaves like its own mini app but should remain visibly connected to the larger product.

- `custom_app`
  Keep only when the route genuinely needs its own navigation model, workspace, or multi-surface behavior.

## Locked Decisions

Browser pass status as of 2026-04-11:

- `14/14` routes passed the Playwright runtime sweep
- route artifacts were captured in `qa/artifacts/route-runtime`
- `vectorvault` no longer throws the SVG path runtime error
- `font-converter` was simplified and revalidated

Keep `ToolLayout`:

- `case-converter`
- `color-picker`
- `proportion-scaler`
- `image-to-text`
- `image-compressor`
- `image-converter`
- `image-extractor`
- `lorem-ipsum-generator`
- `font-converter`

Keep `lite_header`:

- `campaign-url-architect`
- `sitemap-robots-explorer`

Keep custom:

- `color-palette-generator`
- `vectorvault`
- `modular-wireframe-generator`

Notes:

- `font-converter` is no longer a “review for simplification” route. The simpler batch workflow is now the baseline.
- `vectorvault` remains custom, but its default icon data should be treated as part of runtime QA because malformed SVG paths can break rendering without TypeScript catching them.

## Source Of Truth

- Route manifest: [`qa/route-runtime-manifest.json`](/Users/steele/Desktop/nogatekeeping%20codex/qa/route-runtime-manifest.json)
- CLI checklist: [`scripts/route-runtime-qa.mjs`](/Users/steele/Desktop/nogatekeeping%20codex/scripts/route-runtime-qa.mjs)
