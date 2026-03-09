import type { PaletteResult } from "./applyRules";

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");

  const normalized =
    clean.length === 3
      ? clean
          .split("")
          .map((char) => char + char)
          .join("")
      : clean;

  const value = Number.parseInt(normalized, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function channelToLinear(channel: number) {
  const value = channel / 255;
  return value <= 0.03928
    ? value / 12.92
    : Math.pow((value + 0.055) / 1.055, 2.4);
}

function getLuminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);

  const rLin = channelToLinear(r);
  const gLin = channelToLinear(g);
  const bLin = channelToLinear(b);

  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

function getContrastRatio(color1: string, color2: string) {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

export function scorePalette(palette: PaletteResult) {
  let score = 0;

  const textContrast = getContrastRatio(palette.text, palette.background);
  const mutedTextContrast = getContrastRatio(
    palette.mutedText,
    palette.background,
  );
  const buttonContrast = getContrastRatio(
    palette.buttonText,
    palette.button,
  );
  const surfaceContrast = getContrastRatio(palette.text, palette.surface);
  const borderContrast = getContrastRatio(palette.border, palette.background);

  // Main readable text
  if (textContrast >= 7) score += 30;
  else if (textContrast >= 4.5) score += 24;
  else if (textContrast >= 3) score += 12;

  // Muted text should still be readable enough
  if (mutedTextContrast >= 4.5) score += 20;
  else if (mutedTextContrast >= 3) score += 12;
  else if (mutedTextContrast >= 2) score += 6;

  // Buttons must be clearly readable
  if (buttonContrast >= 7) score += 25;
  else if (buttonContrast >= 4.5) score += 20;
  else if (buttonContrast >= 3) score += 10;

  // Text on surface/cards
  if (surfaceContrast >= 7) score += 15;
  else if (surfaceContrast >= 4.5) score += 10;
  else if (surfaceContrast >= 3) score += 5;

  // Border should not disappear completely
  if (borderContrast >= 1.5) score += 10;
  else if (borderContrast >= 1.2) score += 5;

  return {
    score,
    metrics: {
      textContrast: Number(textContrast.toFixed(2)),
      mutedTextContrast: Number(mutedTextContrast.toFixed(2)),
      buttonContrast: Number(buttonContrast.toFixed(2)),
      surfaceContrast: Number(surfaceContrast.toFixed(2)),
      borderContrast: Number(borderContrast.toFixed(2)),
    },
  };
}