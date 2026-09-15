import React from 'react';

/**
 * Motive Care identity mark: an amber drive gear carrying an "MC" monogram.
 * The gear is geometry (no text elements), so it stays crisp at favicon size
 * and never depends on a webfont having loaded.
 */
export function LogoMark({ className = '', spin = true }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Motive Care"
      focusable="false"
    >
      <title>Motive Care</title>
      <path
        d="M 26.03 7.31 L 27.54 1.83 A 30.50 30.50 0 0 1 36.46 1.83 L 37.97 7.31 A 25.40 25.40 0 0 1 43.29 9.25 L 47.98 6.02 A 30.50 30.50 0 0 1 54.81 11.75 L 52.44 16.93 A 25.40 25.40 0 0 1 55.28 21.83 L 60.94 22.37 A 30.50 30.50 0 0 1 62.49 31.15 L 57.35 33.59 A 25.40 25.40 0 0 1 56.37 39.17 L 60.36 43.23 A 30.50 30.50 0 0 1 55.90 50.95 L 50.39 49.52 A 25.40 25.40 0 0 1 46.06 53.16 L 46.51 58.83 A 30.50 30.50 0 0 1 38.13 61.88 L 34.83 57.24 A 25.40 25.40 0 0 1 29.17 57.24 L 25.87 61.88 A 30.50 30.50 0 0 1 17.49 58.83 L 17.94 53.16 A 25.40 25.40 0 0 1 13.61 49.52 L 8.10 50.95 A 30.50 30.50 0 0 1 3.64 43.23 L 7.63 39.17 A 25.40 25.40 0 0 1 6.65 33.59 L 1.51 31.15 A 30.50 30.50 0 0 1 3.06 22.37 L 8.72 21.83 A 25.40 25.40 0 0 1 11.56 16.93 L 9.19 11.75 A 30.50 30.50 0 0 1 16.02 6.02 L 20.71 9.25 A 25.40 25.40 0 0 1 26.03 7.31 Z"
        className={`fill-amber-accent origin-center ${spin ? 'motion-safe:group-hover:animate-gear-spin' : ''}`}
      />
      <circle cx="32" cy="32" r="20.6" className="fill-[#1a1a1a]" />
      <g
        transform="translate(32 32) scale(0.9) translate(-32 -32)"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 40.5 V23.5 L23 32.5 L30 23.5 V40.5" />
        <path d="M47.6 26.4 A7.8 7.8 0 1 0 47.6 37.6" />
      </g>
    </svg>
  );
}

/**
 * Full horizontal lockup: mark + wordmark.
 * `tone` switches the monogram/wordmark colour for dark vs. light surfaces.
 */
export default function Logo({ size = 'md', className = '' }) {
  const markSize = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const wordSize = size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-3xl' : 'text-2xl';

  return (
    <span className={`group inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={`${markSize} text-white shrink-0`} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display ${wordSize} uppercase text-white tracking-[0.06em] group-hover:text-amber-accent transition-colors duration-200`}
        >
          Motive Care
        </span>
        <span className="font-sans text-[0.5rem] uppercase tracking-[0.34em] text-zinc-500 font-bold mt-0.5">
          Auto Repair
        </span>
      </span>
    </span>
  );
}
