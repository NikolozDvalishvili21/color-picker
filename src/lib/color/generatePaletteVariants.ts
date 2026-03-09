import { converter, formatHex } from "culori";
import type { PaletteInput, PaletteResult } from "@/src/types/types";
import { generatePalette } from "./generatePalette";
import { scorePalette } from "./scorePalette";

const toOklch = converter("oklch");

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function adjustColor(
  hex: string,
  lightnessDelta: number,
  chromaMultiplier: number,
): string {
  const color = toOklch(hex);
  if (!color) return hex;

  const adjusted = {
    mode: "oklch" as const,
    l: clamp((color.l ?? 0.5) + lightnessDelta, 0, 1),
    c: clamp((color.c ?? 0) * chromaMultiplier, 0, 0.4),
    h: color.h ?? 0,
  };

  return formatHex(adjusted) || hex;
}

type VariantConfig = {
  accentLightness: number;
  accentChroma: number;
  backgroundLightness: number;
  buttonLightness: number;
  buttonChroma: number;
  secondaryChroma: number;
};

const VARIANT_CONFIGS: VariantConfig[] = [
  // Variant 1: Stronger accent, slightly lighter background
  {
    accentLightness: -0.02,
    accentChroma: 1.15,
    backgroundLightness: 0.02,
    buttonLightness: 0,
    buttonChroma: 1,
    secondaryChroma: 1,
  },
  // Variant 2: Higher button contrast, muted secondary
  {
    accentLightness: 0,
    accentChroma: 1,
    backgroundLightness: 0,
    buttonLightness: -0.06,
    buttonChroma: 1.1,
    secondaryChroma: 0.85,
  },
  // Variant 3: Softer accent, darker background, bolder button
  {
    accentLightness: 0.03,
    accentChroma: 0.88,
    backgroundLightness: -0.03,
    buttonLightness: -0.04,
    buttonChroma: 1.12,
    secondaryChroma: 1.05,
  },
  // Variant 4: Vivid accent, higher secondary intensity
  {
    accentLightness: -0.03,
    accentChroma: 1.25,
    backgroundLightness: 0.01,
    buttonLightness: -0.02,
    buttonChroma: 1.05,
    secondaryChroma: 1.2,
  },
  // Variant 5: Subtle overall — restrained accent, lighter button, muted secondary
  {
    accentLightness: 0.02,
    accentChroma: 0.8,
    backgroundLightness: 0.03,
    buttonLightness: 0.04,
    buttonChroma: 0.9,
    secondaryChroma: 0.75,
  },
];

function applyVariant(
  base: PaletteResult,
  config: VariantConfig,
): PaletteResult {
  return {
    ...base,
    accent: adjustColor(
      base.accent,
      config.accentLightness,
      config.accentChroma,
    ),
    background: adjustColor(base.background, config.backgroundLightness, 1),
    button: adjustColor(
      base.button,
      config.buttonLightness,
      config.buttonChroma,
    ),
    secondary: adjustColor(base.secondary, 0, config.secondaryChroma),
  };
}

export function generatePaletteVariants(input: PaletteInput): PaletteResult[] {
  const basePalette = generatePalette(input);

  const candidates: PaletteResult[] = [
    basePalette,
    ...VARIANT_CONFIGS.map((config) => applyVariant(basePalette, config)),
  ];

  const scored = candidates
    .map((palette) => ({ palette, score: scorePalette(palette).score }))
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map((entry) => entry.palette);
}
