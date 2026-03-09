"use client";

import type { PaletteResult } from "@/src/types/types";

type FullPreviewProps = {
  palette: PaletteResult;
};

export default function FullPreview({ palette }: FullPreviewProps) {
  return (
    <div className="animate-slide-up delay-200">
      <div
        className="rounded-xl border-2 overflow-hidden"
        style={{
          backgroundColor: palette.background,
          borderColor: palette.border,
        }}
      >
        {/* Browser dots */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-b-2"
          style={{
            borderColor: palette.border,
            backgroundColor: palette.surface,
          }}
        >
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-red-500/70" />
            <div className="size-2.5 rounded-full bg-yellow-500/70" />
            <div className="size-2.5 rounded-full bg-green-500/70" />
          </div>
          <div
            className="flex-1 mx-4 sm:mx-12 rounded-md py-1 px-3 text-center text-[10px] sm:text-[11px]"
            style={{
              backgroundColor: palette.background,
              color: palette.mutedText,
            }}
          >
            yourbrand.com
          </div>
        </div>

        {/* Nav */}
        <div
          className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 border-b-2"
          style={{ borderColor: palette.border }}
        >
          <span
            className="font-extrabold text-base sm:text-lg tracking-tight"
            style={{ color: palette.primary }}
          >
            YourBrand
          </span>
          <div className="flex items-center gap-3 sm:gap-6">
            <span
              className="hidden sm:inline text-sm font-medium"
              style={{ color: palette.text }}
            >
              Products
            </span>
            <span
              className="hidden md:inline text-sm"
              style={{ color: palette.mutedText }}
            >
              About
            </span>
            <span
              className="hidden md:inline text-sm"
              style={{ color: palette.mutedText }}
            >
              Blog
            </span>
            <span
              className="rounded-md px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold"
              style={{
                backgroundColor: palette.button,
                color: palette.buttonText,
              }}
            >
              Get Started
            </span>
          </div>
        </div>

        {/* Hero */}
        <div className="px-4 sm:px-8 py-8 sm:py-14 text-center space-y-4">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight"
            style={{ color: palette.text }}
          >
            Build something incredible
          </h2>
          <p
            className="max-w-md mx-auto text-sm sm:text-base leading-relaxed"
            style={{ color: palette.mutedText }}
          >
            A modern platform to launch, scale, and grow. Designed for teams
            that move fast.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
            <span
              className="rounded-md px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold"
              style={{
                backgroundColor: palette.button,
                color: palette.buttonText,
              }}
            >
              Start Free Trial
            </span>
            <span
              className="rounded-md px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-bold border-2"
              style={{
                color: palette.accent,
                borderColor: palette.accent,
              }}
            >
              Learn More
            </span>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 px-4 sm:px-8 pb-6 sm:pb-8">
          {[
            {
              title: "Analytics",
              icon: "📊",
              desc: "Real-time insights to track growth and spot opportunities.",
            },
            {
              title: "Automation",
              icon: "⚡",
              desc: "Streamline your workflow with powerful integrations.",
            },
            {
              title: "Security",
              icon: "🔒",
              desc: "Enterprise-grade protection for your data.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border-2 p-4 sm:p-5 space-y-2"
              style={{
                backgroundColor: palette.surface,
                borderColor: palette.border,
              }}
            >
              <div
                className="size-8 rounded-md flex items-center justify-center text-sm"
                style={{
                  backgroundColor: palette.accent,
                  color: palette.buttonText,
                }}
              >
                {item.icon}
              </div>
              <h3 className="font-bold text-sm" style={{ color: palette.text }}>
                {item.title}
              </h3>
              <p
                className="text-xs leading-relaxed"
                style={{ color: palette.mutedText }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
