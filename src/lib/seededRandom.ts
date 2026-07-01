import type { CSSProperties } from "react";

/** Deterministic pseudo-random in [0, 1) — same output on server and client. */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export type StarStyleOptions = {
  topMin?: number;
  topRange?: number;
  leftMin?: number;
  leftRange?: number;
};

export function getTwinkleStarStyle(
  index: number,
  { topMin = 0, topRange = 100, leftMin = 0, leftRange = 100 }: StarStyleOptions = {},
): CSSProperties {
  const base = index * 7919 + 1;
  return {
    top: `${topMin + seededRandom(base) * topRange}%`,
    left: `${leftMin + seededRandom(base + 1) * leftRange}%`,
    animationDelay: `${seededRandom(base + 2) * 5}s`,
    animationDuration: `${2 + seededRandom(base + 3) * 3}s`,
  };
}

export function getMotionStarStyle(
  index: number,
  { topMin = 15, topRange = 70, leftMin = 5, leftRange = 90 }: StarStyleOptions = {},
): CSSProperties {
  const base = index * 7919 + 1;
  return {
    top: `${topMin + seededRandom(base) * topRange}%`,
    left: `${leftMin + seededRandom(base + 1) * leftRange}%`,
  };
}

export function getMotionStarTransition(index: number) {
  const base = index * 7919 + 1;
  return {
    duration: 2 + seededRandom(base + 2) * 3,
    delay: seededRandom(base + 3) * 2,
    repeat: Infinity as const,
  };
}
