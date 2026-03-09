import { converter, formatHex } from "culori";
import { PaletteInput } from "@/src/types/types";

const toOklch = converter("oklch");

type PaletteResult = {
  background: string;
  surface: string;
  border: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  mutedText: string;
  button: string;
  buttonText: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function shiftColor(
  hex: string,
  lightnessDelta: number,
  chromaMultiplier: number = 1,
) {
  const color = toOklch(hex);

  if (!color) {
    throw new Error(`Invalid color: ${hex}`);
  }

  const next = {
    mode: "oklch" as const,
    l: clamp((color.l ?? 0.7) + lightnessDelta, 0, 1),
    c: clamp((color.c ?? 0.1) * chromaMultiplier, 0, 0.4),
    h: color.h ?? 0,
    alpha: color.alpha,
  };

  return formatHex(next) || hex;
}

export function generatePalette(input: PaletteInput): PaletteResult {
  const { baseColor, theme } = input;

  const isLightTheme = theme === "light";

  return {
    background: isLightTheme
      ? shiftColor(baseColor, 0.18, 0.35)
      : shiftColor(baseColor, -0.45, 0.4),
    surface: isLightTheme
      ? shiftColor(baseColor, 0.12, 0.25)
      : shiftColor(baseColor, -0.35, 0.35),
    border: isLightTheme
      ? shiftColor(baseColor, 0.04, 0.45)
      : shiftColor(baseColor, -0.2, 0.4),
    primary: shiftColor(baseColor, 0, 1),
    secondary: isLightTheme
      ? shiftColor(baseColor, 0.08, 0.7)
      : shiftColor(baseColor, -0.08, 0.7),
    accent: isLightTheme
      ? shiftColor(baseColor, -0.12, 1.1)
      : shiftColor(baseColor, 0.12, 1.05),
    text: isLightTheme ? "#1F1F1F" : "#F5F5F5",
    mutedText: isLightTheme ? "#666666" : "#B3B3B3",
    button: isLightTheme
      ? shiftColor(baseColor, -0.1, 1.05)
      : shiftColor(baseColor, 0.05, 1),
    buttonText: "#FFFFFF",
  };
}
