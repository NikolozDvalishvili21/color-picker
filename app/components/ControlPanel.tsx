"use client";

import type { WebsiteType, Vibe, ThemeMode } from "@/src/types/types";

const WEBSITE_TYPES: WebsiteType[] = [
  "ecommerce",
  "portfolio",
  "saas",
  "fintech",
  "beauty",
  "gaming",
];

const VIBES: Vibe[] = [
  "modern",
  "minimal",
  "luxury",
  "playful",
  "bold",
  "calm",
];

const WEBSITE_EMOJIS: Record<WebsiteType, string> = {
  ecommerce: "🛒",
  portfolio: "🎨",
  saas: "⚡",
  fintech: "💳",
  beauty: "✨",
  gaming: "🎮",
};

const VIBE_EMOJIS: Record<Vibe, string> = {
  modern: "🔷",
  minimal: "◻️",
  luxury: "👑",
  playful: "🎈",
  bold: "🔥",
  calm: "🌿",
};

type ControlPanelProps = {
  baseColor: string;
  websiteType: WebsiteType;
  vibe: Vibe;
  theme: ThemeMode;
  onBaseColorChange: (color: string) => void;
  onWebsiteTypeChange: (type: WebsiteType) => void;
  onVibeChange: (vibe: Vibe) => void;
  onThemeChange: (theme: ThemeMode) => void;
  onGenerate: () => void;
};

export default function ControlPanel({
  baseColor,
  websiteType,
  vibe,
  theme,
  onBaseColorChange,
  onWebsiteTypeChange,
  onVibeChange,
  onThemeChange,
  onGenerate,
}: ControlPanelProps) {
  return (
    <section className="animate-slide-up delay-300">
      <div className="rounded-2xl border-2 border-neutral-800 bg-neutral-900/70 p-5 sm:p-8 space-y-7">
        {/* Color picker */}
        <div className="space-y-3">
          <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
            Base Color
          </label>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative group">
              <div
                className="absolute -inset-1.5 rounded-xl opacity-40 blur-lg group-hover:opacity-70 transition-opacity"
                style={{ backgroundColor: baseColor }}
              />
              <input
                type="color"
                value={baseColor}
                onChange={(e) => onBaseColorChange(e.target.value)}
                className="relative size-12 sm:size-14 rounded-xl cursor-pointer border-2 border-neutral-700 bg-transparent p-0.5 hover:border-neutral-500"
              />
            </div>
            <div className="flex-1 flex items-center rounded-xl border-2 border-neutral-800 bg-neutral-950 px-4 py-3">
              <span className="text-neutral-600 text-sm font-bold mr-1">#</span>
              <input
                type="text"
                value={baseColor.replace("#", "").toUpperCase()}
                onChange={(e) => {
                  const val = e.target.value
                    .replace(/[^0-9a-fA-F]/g, "")
                    .slice(0, 6);
                  onBaseColorChange(`#${val}`);
                }}
                className="flex-1 bg-transparent text-sm sm:text-base font-mono text-neutral-200 outline-none tracking-[0.2em]"
                maxLength={6}
              />
            </div>
          </div>
        </div>

        {/* Website type */}
        <div className="space-y-3">
          <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
            Website Type
          </label>
          <div className="flex flex-wrap gap-2">
            {WEBSITE_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => onWebsiteTypeChange(t)}
                className={`group flex items-center gap-1.5 rounded-lg border-2 px-3 py-2 text-sm font-semibold cursor-pointer transition-all hover:-translate-y-0.5 active:translate-y-0 ${
                  websiteType === t
                    ? "border-lime-400/50 bg-lime-400/10 text-lime-300"
                    : "border-neutral-800 bg-neutral-950 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300"
                }`}
              >
                <span className="text-sm group-hover:animate-wiggle">
                  {WEBSITE_EMOJIS[t]}
                </span>
                <span className="capitalize">{t}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Vibe */}
        <div className="space-y-3">
          <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
            Vibe
          </label>
          <div className="flex flex-wrap gap-2">
            {VIBES.map((v) => (
              <button
                key={v}
                onClick={() => onVibeChange(v)}
                className={`group flex items-center gap-1.5 rounded-lg border-2 px-3 py-2 text-sm font-semibold cursor-pointer transition-all hover:-translate-y-0.5 active:translate-y-0 ${
                  vibe === v
                    ? "border-orange-400/50 bg-orange-400/10 text-orange-300"
                    : "border-neutral-800 bg-neutral-950 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300"
                }`}
              >
                <span className="text-sm group-hover:animate-wiggle">
                  {VIBE_EMOJIS[v]}
                </span>
                <span className="capitalize">{v}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Theme + Generate */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
          <div className="space-y-3">
            <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
              Theme
            </label>
            <div className="flex rounded-lg border-2 border-neutral-800 bg-neutral-950 p-1">
              <button
                onClick={() => onThemeChange("light")}
                className={`flex items-center justify-center gap-1.5 rounded-md px-4 sm:px-5 py-2.5 text-sm font-semibold cursor-pointer flex-1 sm:flex-initial ${
                  theme === "light"
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                ☀️ Light
              </button>
              <button
                onClick={() => onThemeChange("dark")}
                className={`flex items-center justify-center gap-1.5 rounded-md px-4 sm:px-5 py-2.5 text-sm font-semibold cursor-pointer flex-1 sm:flex-initial ${
                  theme === "dark"
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                🌙 Dark
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-end">
            <button
              onClick={onGenerate}
              className="w-full sm:w-auto rounded-lg border-2 border-lime-400 bg-lime-400 px-8 py-3.5 text-sm font-black text-black cursor-pointer hover:bg-lime-300 hover:border-lime-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
            >
              Generate Palettes →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
