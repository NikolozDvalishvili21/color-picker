"use client";

import type { PaletteResult } from "@/src/types/types";

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

type PaletteCardProps = {
  palette: PaletteResult;
  rank: number;
  selected: boolean;
  onSelect: () => void;
  index: number;
};

export default function PaletteCard({
  palette,
  rank,
  selected,
  onSelect,
  index,
}: PaletteCardProps) {
  const rankLabels = ["1st", "2nd", "3rd"];

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`group relative w-full text-left rounded-xl border-2 cursor-pointer outline-none animate-bounce-in transition-all duration-300 hover:-translate-y-1 active:translate-y-0 ${
        selected
          ? "border-lime-400/60 bg-neutral-900 shadow-[0_0_30px_-6px_rgba(163,230,53,0.2)]"
          : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-600"
      }`}
      style={{ animationDelay: `${index * 100 + 200}ms` }}
    >
      {/* Rank tag */}
      <div className="absolute -top-3 left-4 z-10">
        <span
          className={`inline-block rounded-md border-2 px-2.5 py-0.5 text-[11px] font-black tracking-wide ${
            rank === 1
              ? "border-lime-400/50 bg-lime-400/15 text-lime-300"
              : "border-neutral-700 bg-neutral-800 text-neutral-400"
          }`}
        >
          {rankLabels[rank - 1] ?? `${rank}th`}
          {rank === 1 && " ★"}
        </span>
      </div>

      {/* Color bar */}
      <div className="flex h-14 sm:h-16 overflow-hidden rounded-t-[10px]">
        {PALETTE_KEYS.map((key, i) => (
          <div
            key={key}
            className="flex-1 transition-all duration-300"
            style={{
              backgroundColor: palette[key],
              transitionDelay: `${i * 15}ms`,
            }}
          />
        ))}
      </div>

      {/* Mini preview */}
      <div className="p-4">
        <div
          className="rounded-lg p-3 space-y-2.5 border-2"
          style={{
            backgroundColor: palette.background,
            borderColor: palette.border,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold" style={{ color: palette.text }}>
              Preview
            </span>
            <span
              className="text-[9px] font-bold uppercase tracking-wider"
              style={{ color: palette.mutedText }}
            >
              Live
            </span>
          </div>

          <div
            className="rounded-md p-2"
            style={{ backgroundColor: palette.surface }}
          >
            <span
              className="text-[11px] font-semibold"
              style={{ color: palette.primary }}
            >
              Primary element
            </span>
          </div>

          <div className="flex gap-1.5">
            <span
              className="rounded-md px-2.5 py-1 text-[11px] font-bold inline-block"
              style={{
                backgroundColor: palette.button,
                color: palette.buttonText,
              }}
            >
              Button
            </span>
            <span
              className="rounded-md px-2.5 py-1 text-[11px] font-bold inline-block border-2"
              style={{
                color: palette.accent,
                borderColor: palette.accent,
              }}
            >
              Accent
            </span>
          </div>
        </div>
      </div>

      {/* Selection dot */}
      {selected && (
        <div className="absolute top-4 right-4 size-3 rounded-full bg-lime-400 animate-pop" />
      )}
    </div>
  );
}
