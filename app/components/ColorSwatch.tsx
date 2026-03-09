"use client";

import { useState } from "react";

type ColorSwatchProps = {
  label: string;
  hex: string;
  index: number;
};

export default function ColorSwatch({ label, hex, index }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="group flex items-center gap-3 rounded-lg border-2 border-neutral-800 bg-neutral-950 px-3 py-3 hover:border-neutral-600 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer animate-bounce-in"
      style={{ animationDelay: `${index * 40 + 300}ms` }}
    >
      <div
        className="size-9 sm:size-10 rounded-md shrink-0 border border-white/5 group-hover:scale-110 transition-transform"
        style={{ backgroundColor: hex }}
      />
      <div className="flex flex-col items-start min-w-0">
        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
          {label}
        </span>
        <span className="text-xs sm:text-sm font-mono text-neutral-300 tracking-wider group-hover:text-white transition-colors">
          {copied ? (
            <span className="text-lime-400 font-bold">Copied!</span>
          ) : (
            hex.toUpperCase()
          )}
        </span>
      </div>
    </button>
  );
}
