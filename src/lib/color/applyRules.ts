import { PaletteInput } from "@/src/types/types";

export type PaletteResult = {
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

function mergePalette(
  palette: PaletteResult,
  updates: Partial<PaletteResult>,
): PaletteResult {
  return {
    ...palette,
    ...updates,
  };
}

export function applyWebsiteTypeRules(
  palette: PaletteResult,
  input: PaletteInput,
): PaletteResult {
  const { websiteType } = input;

  switch (websiteType) {
    case "ecommerce":
      return mergePalette(palette, {
        button: palette.accent,
      });

    case "fintech":
      return mergePalette(palette, {
        accent: palette.secondary,
        button: palette.primary,
      });

    case "beauty":
      return mergePalette(palette, {
        border: palette.secondary,
      });

    case "gaming":
      return mergePalette(palette, {
        button: palette.accent,
        border: palette.primary,
      });

    case "portfolio":
      return mergePalette(palette, {
        button: palette.primary,
      });

    case "saas":
      return mergePalette(palette, {
        button: palette.primary,
        border: palette.secondary,
      });

    default:
      return palette;
  }
}

export function applyVibeRules(
  palette: PaletteResult,
  input: PaletteInput,
): PaletteResult {
  const { vibe } = input;

  switch (vibe) {
    case "minimal":
      return mergePalette(palette, {
        accent: palette.secondary,
        border: palette.surface,
      });

    case "luxury":
      return mergePalette(palette, {
        button: palette.primary,
        border: palette.secondary,
      });

    case "playful":
      return mergePalette(palette, {
        button: palette.accent,
      });

    case "bold":
      return mergePalette(palette, {
        button: palette.accent,
        border: palette.primary,
      });

    case "calm":
      return mergePalette(palette, {
        accent: palette.secondary,
        button: palette.secondary,
      });

    case "modern":
    default:
      return palette;
  }
}
