declare module "culori" {
  export type Color = {
    mode?: string;
    l?: number;
    c?: number;
    h?: number;
    r?: number;
    g?: number;
    b?: number;
    alpha?: number;
  } & Record<string, unknown>;

  export function converter(mode: string): (color: Color | string) => Color;
  export function formatHex(color: Color): string;
  export function formatRgb(color: Color): string;
  export function formatCss(color: Color): string;
  export function wcagContrast(a: Color, b: Color): number;
  export function parse(input: string | Color): Color | null;
}
