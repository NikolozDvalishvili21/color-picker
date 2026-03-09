import { converter } from "culori";

const toOklch = converter("oklch");

export type ColorKind = "light" | "dark" | "neutral" | "vivid" | "balanced";

export type ColorMeta = {
  kind: ColorKind;
  lightness: number;
  chroma: number;
  hue: number;
};

export function classifyColor(hex: string): ColorMeta {
  const color = toOklch(hex);

  if (!color) {
    throw new Error(`Invalid color: ${hex}`);
  }

  const lightness = color.l ?? 0.7;
  const chroma = color.c ?? 0.1;
  const hue = color.h ?? 0;

  let kind: ColorKind = "balanced";

  if (lightness >= 0.9) {
    kind = "light";
  } else if (lightness <= 0.25) {
    kind = "dark";
  } else if (chroma <= 0.05) {
    kind = "neutral";
  } else if (chroma >= 0.18) {
    kind = "vivid";
  }

  return {
    kind,
    lightness,
    chroma,
    hue,
  };
}
