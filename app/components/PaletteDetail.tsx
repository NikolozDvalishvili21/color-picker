"use client";

import { useState } from "react";
import type { PaletteResult } from "@/src/types/types";
import ColorSwatch from "./ColorSwatch";
import FullPreview from "./FullPreview";

const PALETTE_KEYS: (keyof PaletteResult)[] = [
  "background",
  "surface",
  "border",
  "primary",
  "secondary",
  "accent",
  "text",
  "mutedText",
  "button",
  "buttonText",
];

const LABEL_MAP: Record<keyof PaletteResult, string> = {
  background: "Background",
  surface: "Surface",
  border: "Border",
  primary: "Primary",
  secondary: "Secondary",
  accent: "Accent",
  text: "Text",
  mutedText: "Muted Text",
  button: "Button",
  buttonText: "Button Text",
};

type PaletteDetailProps = {
  palette: PaletteResult;
  rank: number;
};

export default function PaletteDetail({ palette, rank }: PaletteDetailProps) {
  const [jsonCopied, setJsonCopied] = useState(false);

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(palette, null, 2));
    setJsonCopied(true);
    setTimeout(() => setJsonCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Palette #{rank}
          </h2>
          <p className="text-sm text-neutral-500 mt-0.5">
            Click any swatch to copy hex
          </p>
        </div>
        <button
          onClick={handleCopyJson}
          className="self-start sm:self-auto flex items-center gap-2 rounded-lg border-2 border-neutral-700 bg-neutral-800 px-4 py-2 text-xs font-bold text-neutral-300 hover:border-lime-400/50 hover:text-lime-300 transition-all cursor-pointer"
        >
          {jsonCopied ? (
            <span className="text-lime-400">✓ Copied!</span>
          ) : (
            "Export JSON"
          )}
        </button>
      </div>

      {/* Swatches */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
        {PALETTE_KEYS.map((key, i) => (
          <ColorSwatch
            key={key}
            label={LABEL_MAP[key]}
            hex={palette[key]}
            index={i}
          />
        ))}
      </div>

      {/* Full preview */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-lime-400" />
          Live Preview
        </h3>
        <FullPreview palette={palette} />
      </div>
    </div>
  );
}
