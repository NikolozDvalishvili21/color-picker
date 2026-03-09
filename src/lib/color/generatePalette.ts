import { converter, formatHex } from "culori";
import { PaletteInput } from "@/src/types/types";
import { classifyColor } from "./classifyColor";
import { applyVibeRules, applyWebsiteTypeRules } from "./applyRules";

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
): string {
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
  const meta = classifyColor(baseColor);

  let palette: PaletteResult;

  if (meta.kind === "light") {
    palette = {
      background: isLightTheme ? baseColor : shiftColor(baseColor, -0.75, 0.3),
      surface: isLightTheme ? "#FFFFFF" : shiftColor(baseColor, -0.65, 0.25),
      border: isLightTheme
        ? shiftColor(baseColor, -0.08, 0.8)
        : shiftColor(baseColor, -0.45, 0.35),
      primary: shiftColor(baseColor, -0.28, 2.4),
      secondary: shiftColor(baseColor, -0.18, 1.8),
      accent: shiftColor(baseColor, -0.38, 2.8),
      text: isLightTheme ? "#2A2723" : "#F7F4EF",
      mutedText: isLightTheme ? "#6F685F" : "#CFC7BD",
      button: shiftColor(baseColor, -0.32, 2.5),
      buttonText: "#FFFFFF",
    };
  } else if (meta.kind === "dark") {
    palette = {
      background: isLightTheme ? shiftColor(baseColor, 0.82, 0.12) : baseColor,
      surface: isLightTheme
        ? shiftColor(baseColor, 0.72, 0.16)
        : shiftColor(baseColor, 0.08, 0.8),
      border: isLightTheme
        ? shiftColor(baseColor, 0.58, 0.2)
        : shiftColor(baseColor, 0.18, 0.7),
      primary: shiftColor(baseColor, 0.35, 1.4),
      secondary: shiftColor(baseColor, 0.22, 1.15),
      accent: shiftColor(baseColor, 0.42, 1.55),
      text: isLightTheme ? "#191919" : "#F5F5F5",
      mutedText: isLightTheme ? "#5E5E5E" : "#B8B8B8",
      button: shiftColor(baseColor, 0.3, 1.35),
      buttonText: "#FFFFFF",
    };
  } else if (meta.kind === "neutral") {
    palette = {
      background: isLightTheme
        ? shiftColor(baseColor, 0.22, 0.2)
        : shiftColor(baseColor, -0.42, 0.35),
      surface: isLightTheme
        ? shiftColor(baseColor, 0.16, 0.16)
        : shiftColor(baseColor, -0.32, 0.3),
      border: isLightTheme
        ? shiftColor(baseColor, 0.04, 0.45)
        : shiftColor(baseColor, -0.14, 0.4),
      primary: shiftColor(baseColor, -0.12, 1.8),
      secondary: shiftColor(baseColor, 0.02, 1.15),
      accent: shiftColor(baseColor, -0.2, 2.1),
      text: isLightTheme ? "#222222" : "#F3F3F3",
      mutedText: isLightTheme ? "#686868" : "#B5B5B5",
      button: shiftColor(baseColor, -0.16, 1.9),
      buttonText: "#FFFFFF",
    };
  } else if (meta.kind === "vivid") {
    palette = {
      background: isLightTheme
        ? shiftColor(baseColor, 0.34, 0.16)
        : shiftColor(baseColor, -0.56, 0.22),
      surface: isLightTheme
        ? shiftColor(baseColor, 0.26, 0.14)
        : shiftColor(baseColor, -0.44, 0.2),
      border: isLightTheme
        ? shiftColor(baseColor, 0.08, 0.35)
        : shiftColor(baseColor, -0.22, 0.3),
      primary: baseColor,
      secondary: shiftColor(baseColor, 0.12, 0.7),
      accent: shiftColor(baseColor, -0.14, 1.15),
      text: isLightTheme ? "#1E1E1E" : "#FAFAFA",
      mutedText: isLightTheme ? "#666666" : "#B8B8B8",
      button: shiftColor(baseColor, -0.08, 1.05),
      buttonText: "#FFFFFF",
    };
  } else {
    palette = {
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

  palette = applyWebsiteTypeRules(palette, input);
  palette = applyVibeRules(palette, input);

  return palette;
}
