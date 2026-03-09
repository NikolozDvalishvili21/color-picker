"use client";

export default function HeroSection() {
  return (
    <section className="relative py-10 sm:py-16">
      <div className="max-w-3xl">
        <div className="animate-bounce-in">
          <span className="inline-block rounded-full border-2 border-neutral-700 bg-neutral-900 px-4 py-1.5 text-xs font-bold text-lime-400 tracking-wide mb-6">
            OKLCH &middot; WCAG SCORED &middot; INSTANT
          </span>
        </div>

        <h1 className="animate-bounce-in delay-100">
          <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]">
            Stop guessing
          </span>
          <span className="block text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mt-1">
            <span className="text-lime-400">colors.</span>
          </span>
        </h1>

        <p className="mt-6 text-neutral-400 text-base sm:text-lg max-w-xl leading-relaxed animate-slide-up delay-200">
          Pick a base color, choose your style, get{" "}
          <span className="text-neutral-200 font-semibold">
            three ranked palettes
          </span>{" "}
          with full accessibility scores. Done.
        </p>
      </div>
    </section>
  );
}
