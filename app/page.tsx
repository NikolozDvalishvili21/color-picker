"use client";

import { useRef, useState } from "react";
import { generatePaletteVariants } from "@/src/lib/color/generatePaletteVariants";
import type {
  PaletteInput,
  PaletteResult,
  WebsiteType,
  Vibe,
  ThemeMode,
} from "@/src/types/types";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ControlPanel from "./components/ControlPanel";
import PaletteCard from "./components/PaletteCard";
import PaletteDetail from "./components/PaletteDetail";
import Footer from "./components/Footer";

export default function Home() {
  const [baseColor, setBaseColor] = useState("#6d28d9");
  const [websiteType, setWebsiteType] = useState<WebsiteType>("saas");
  const [vibe, setVibe] = useState<Vibe>("modern");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [palettes, setPalettes] = useState<PaletteResult[] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGenerate = () => {
    const input: PaletteInput = { baseColor, websiteType, vibe, theme };
    const results = generatePaletteVariants(input);
    setPalettes(results);
    setSelectedIndex(0);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const selectedPalette = palettes?.[selectedIndex] ?? null;

  return (
    <div className="min-h-screen dot-grid">
      <Header />

      <main className="mx-auto max-w-6xl px-5 sm:px-8 py-6 sm:py-10 space-y-14 sm:space-y-20">
        <HeroSection />

        <ControlPanel
          baseColor={baseColor}
          websiteType={websiteType}
          vibe={vibe}
          theme={theme}
          onBaseColorChange={setBaseColor}
          onWebsiteTypeChange={setWebsiteType}
          onVibeChange={setVibe}
          onThemeChange={setTheme}
          onGenerate={handleGenerate}
        />

        {/* Results */}
        {palettes && palettes.length > 0 && (
          <section
            ref={resultsRef}
            className="space-y-10 sm:space-y-14 scroll-mt-6"
          >
            {/* Section title */}
            <div className="animate-bounce-in">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Your Top Palettes
              </h2>
              <p className="text-neutral-500 text-sm mt-1">
                Ranked by accessibility &amp; contrast — click to explore
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {palettes.map((palette, i) => (
                <PaletteCard
                  key={i}
                  palette={palette}
                  rank={i + 1}
                  selected={selectedIndex === i}
                  onSelect={() => setSelectedIndex(i)}
                  index={i}
                />
              ))}
            </div>

            {/* Detail */}
            {selectedPalette && (
              <PaletteDetail
                palette={selectedPalette}
                rank={selectedIndex + 1}
              />
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
