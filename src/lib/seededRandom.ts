import type { CSSProperties } from "react";

/** Deterministic pseudo-random in [0, 1) — same output on server and client. */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

/**
 * Redondea un valor antes de escribirlo en un estilo en línea.
 * El navegador vuelve a serializar el atributo `style` con ~6 dígitos
 * significativos, así que `68.12528781620131%` se lee de vuelta como
 * `68.1253%` y React lo reporta como error de hidratación aunque servidor y
 * cliente hayan calculado el mismo número. Con 2 decimales ambas cadenas
 * coinciden, y `Number(...)` quita los ceros de más (4.00 → 4) porque el
 * navegador también los quita.
 */
export function roundForStyle(value: number): number {
  return Number(value.toFixed(2));
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
    top: `${roundForStyle(topMin + seededRandom(base) * topRange)}%`,
    left: `${roundForStyle(leftMin + seededRandom(base + 1) * leftRange)}%`,
    animationDelay: `${roundForStyle(seededRandom(base + 2) * 5)}s`,
    animationDuration: `${roundForStyle(2 + seededRandom(base + 3) * 3)}s`,
  };
}

export function getMotionStarStyle(
  index: number,
  { topMin = 15, topRange = 70, leftMin = 5, leftRange = 90 }: StarStyleOptions = {},
): CSSProperties {
  const base = index * 7919 + 1;
  return {
    top: `${roundForStyle(topMin + seededRandom(base) * topRange)}%`,
    left: `${roundForStyle(leftMin + seededRandom(base + 1) * leftRange)}%`,
  };
}

export function getMotionStarTransition(index: number) {
  const base = index * 7919 + 1;
  return {
    duration: 2 + seededRandom(base + 2) * 3,
    delay: seededRandom(base + 3) * 2,
    repeat: Infinity,
  };
}
