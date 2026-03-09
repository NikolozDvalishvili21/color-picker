"use client";

export default function Header() {
  return (
    <header className="relative z-10 border-b-2 border-neutral-800/80">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-5 sm:px-8 py-4">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-lime-400 flex items-center justify-center -rotate-3 hover:rotate-3 transition-transform">
            <span className="text-black font-black text-sm">N</span>
          </div>
          <span className="text-lg font-extrabold tracking-tight text-white">
            Nikoloz Dvalishvili
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-[10px] font-bold text-neutral-500 tracking-[0.25em] uppercase">
            Palette Generator
          </span>
          <span className="inline-block size-1.5 rounded-full bg-lime-400" />
        </div>
      </div>
    </header>
  );
}
