"use client";

export default function Footer() {
  return (
    <footer className="border-t-2 border-neutral-800/80 mt-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <div className="size-4 rounded bg-lime-400/80" />
          <span className="font-bold">&copy; 2026</span>
        </div>
        <span className="text-neutral-600">
          Next.js &middot; OKLCH &middot; TypeScript
        </span>
      </div>
    </footer>
  );
}
