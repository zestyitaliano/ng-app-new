# Tool Completeness Matrix

Last reviewed: 2026-04-11

This matrix tracks whether each registered tool is fully complete in the merged app experience or still has a meaningful gap.

| Tool | Slug | Status | Shell | Notes |
| --- | --- | --- | --- | --- |
| Color Picker | `color-picker` | Fully complete | `ToolLayout` | Route, upload flow, color sampling, and shared shell are wired and passing QA. |
| Case Converter | `case-converter` | Fully complete | `ToolLayout` | Core transforms, copy flow, and route integration are working. |
| Proportion Scaler | `proportion-scaler` | Fully complete | `ToolLayout` | Calculator flow is wired and does not rely on missing services. |
| Image to Text | `image-to-text` | Fully complete | `ToolLayout` | OCR route is wired, build-safe, and covered by browser route QA. |
| Image Compressor | `image-compressor` | Fully complete | `ToolLayout` | Batch flow, download flow, and route integration are active. |
| Color Palette Generator | `color-palette-generator` | Fully complete | Custom | Main palette, visualizer, trending, gradients, and recolor views are wired, and the incomplete AI extraction subfeature has been removed. |
| Vector Vault | `vectorvault` | Fully complete | Custom | Search, editor, and local icon persistence are wired and passing route QA after SVG-path repair. |
| Sitemap Robots Explorer | `sitemap-robots-explorer` | Fully complete | Lite header | Explorer flow is active and integrated into the shared app shell. |
| Modular Wireframe Generator | `modular-wireframe-generator` | Fully complete | Custom | Builder and export flows are active, with export libraries lazy-loaded. |
| Image Converter | `image-converter` | Fully complete | `ToolLayout` | Browser path, server-backed HEIC conversion, and focused HEIC integration coverage are in place. |
| Image Extractor | `image-extractor` | Fully complete | `ToolLayout` | URL extraction and download flows are wired. |
| Font Converter | `font-converter` | Fully complete | `ToolLayout` | Simplified, stable conversion flow is active and no longer depends on trimmed legacy options. |
| Dictate | `dictate` | Fully complete | `ToolLayout` | Speech-to-text, transcript editing, copy, and playback controls are integrated into the shared shell. |
| Campaign URL Architect | `campaign-url-architect` | Fully complete | Lite header | Form flow, history, and URL generation are active. |
| Lorem Ipsum Generator | `lorem-ipsum-generator` | Fully complete | `ToolLayout` | Generator and copy flow are wired and substantive. |

## Summary

- Registered tools: 15
- Fully complete: 15
- Partially complete: 0
