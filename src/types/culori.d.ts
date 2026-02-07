declare module "culori" {
  export type Color = Record<string, unknown>;

  export function converter(mode: string): (color: unknown) => unknown;
  export function formatHex(color: unknown): string;
  export function formatRgb(color: unknown): string;
  export function formatCss(color: unknown): string;
  export function wcagContrast(a: unknown, b: unknown): number;
  export function parse(input: unknown): unknown;
}
