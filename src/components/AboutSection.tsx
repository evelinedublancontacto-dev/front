"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { seededRandom } from "@/lib/seededRandom";

const SparkleStar = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 0 14.5 9.5 24 12 14.5 14.5 12 24 9.5 14.5 0 12 9.5 9.5Z" />
  </svg>
);

const BurstStar = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 2l1.8 5.5L19 9l-5.2 1.5L12 16l-1.8-5.5L5 9l5.2-1.5Z M12 18l.9 2.7L15.6 22l-2.7-.8L12 22l-.9-2.7L8.4 22l2.7-.8Z" />
  </svg>
);

const CrescentMoon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
  </svg>
);

type DecorKind = "sparkle" | "burst" | "moon" | "dot" | "ring";

type CelestialDecor = {
  kind: DecorKind;
  top: string;
  left: string;
  size: number;
  delay: number;
  duration: number;
  colorClass: string;
};

function buildDecorations(count: number, seed: number, palette: string[]): CelestialDecor[] {
  const kinds: DecorKind[] = ["sparkle", "burst", "moon", "dot", "ring", "sparkle", "burst"];

  return Array.from({ length: count }, (_, i) => {
    const base = (i + seed) * 7919 + 1;
    return {
      kind: kinds[Math.floor(seededRandom(base) * kinds.length)],
      top: `${seededRandom(base + 1) * 88 + 2}%`,
      left: `${seededRandom(base + 2) * 88 + 2}%`,
      size: 6 + seededRandom(base + 3) * 18,
      delay: seededRandom(base + 4) * 2.5,
      duration: 2.2 + seededRandom(base + 5) * 3.5,
      colorClass: palette[Math.floor(seededRandom(base + 6) * palette.length)],
    };
  });
}

const portraitDecor = buildDecorations(14, 3, [
  "text-gold",
  "text-gold-light/90",
  "text-gold/70",
  "text-primary/50",
  "text-primary/35",
]);

const textDecor = buildDecorations(10, 19, [
  "text-gold",
  "text-gold-light/85",
  "text-gold/65",
  "text-primary/45",
]);

const curatedPortraitDecor: CelestialDecor[] = [
  { kind: "sparkle", top: "2%", left: "6%", size: 18, delay: 0, duration: 3, colorClass: "text-gold" },
  { kind: "burst", top: "8%", left: "78%", size: 22, delay: 0.6, duration: 3.8, colorClass: "text-gold-light/90" },
  { kind: "moon", top: "82%", left: "80%", size: 16, delay: 1.1, duration: 5, colorClass: "text-gold/80" },
  { kind: "sparkle", top: "72%", left: "4%", size: 12, delay: 0.3, duration: 2.6, colorClass: "text-gold/75" },
  { kind: "ring", top: "18%", left: "88%", size: 10, delay: 1.4, duration: 4.2, colorClass: "border-gold/55" },
  { kind: "dot", top: "42%", left: "0%", size: 8, delay: 0.8, duration: 3.2, colorClass: "bg-gold/60" },
  { kind: "moon", top: "6%", left: "42%", size: 14, delay: 1.8, duration: 4.8, colorClass: "text-primary/40" },
  { kind: "burst", top: "88%", left: "28%", size: 20, delay: 0.5, duration: 3.4, colorClass: "text-gold" },
];

const curatedTextDecor: CelestialDecor[] = [
  { kind: "sparkle", top: "2%", left: "88%", size: 14, delay: 0.2, duration: 2.8, colorClass: "text-gold" },
  { kind: "moon", top: "38%", left: "94%", size: 12, delay: 1.2, duration: 4.5, colorClass: "text-gold/70" },
  { kind: "burst", top: "78%", left: "72%", size: 16, delay: 0.7, duration: 3.1, colorClass: "text-gold-light/80" },
  { kind: "sparkle", top: "92%", left: "18%", size: 10, delay: 0.4, duration: 2.4, colorClass: "text-primary/45" },
  { kind: "dot", top: "86%", left: "42%", size: 6, delay: 1.5, duration: 3.6, colorClass: "bg-gold/55" },
  { kind: "moon", top: "90%", left: "58%", size: 13, delay: 0.9, duration: 5.2, colorClass: "text-gold/65" },
];

function DecorIcon({ decor }: { decor: CelestialDecor }) {
  const { kind, size, colorClass } = decor;

  if (kind === "dot") {
    return (
      <div
        className={`rounded-full ${colorClass}`}
        style={{ width: size, height: size }}
      />
    );
  }

  if (kind === "ring") {
    return (
      <div
        className={`rounded-full border-2 ${colorClass}`}
        style={{ width: size, height: size }}
      />
    );
  }

  const className = `${colorClass} w-full h-full`;

  if (kind === "burst") return <BurstStar className={className} />;
  if (kind === "moon") return <CrescentMoon className={className} />;
  return <SparkleStar className={className} />;
}

function AnimatedCelestialField({
  decorations,
  className,
}: {
  decorations: CelestialDecor[];
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className ?? ""}`}>
      {decorations.map((decor, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: decor.top,
            left: decor.left,
            width: decor.size,
            height: decor.size,
          }}
          animate={{
            opacity: decor.kind === "dot" || decor.kind === "ring" ? [0.4, 0.95, 0.4] : [0.3, 1, 0.3],
            scale: [0.8, 1.15, 0.8],
            y: [0, decor.kind === "moon" ? -5 : -8, 0],
            rotate:
              decor.kind === "moon"
                ? [-8, 10, -8]
                : decor.kind === "sparkle"
                  ? [0, 25, 0]
                  : [0, 12, 0],
          }}
          transition={{
            duration: decor.duration,
            delay: decor.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <DecorIcon decor={decor} />
        </motion.div>
      ))}
    </div>
  );
}

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const allPortraitDecor = [...curatedPortraitDecor, ...portraitDecor];
  const allTextDecor = [...curatedTextDecor, ...textDecor];

  return (
    <section id="sobre-mi" className="py-24 bg-background relative overflow-hidden">
      <AnimatedCelestialField
        decorations={buildDecorations(6, 42, ["text-primary/25", "text-gold/40"])}
        className="opacity-60"
      />

      <div className="container mx-auto px-6 relative">
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center py-8 min-h-[380px] sm:min-h-[440px] md:min-h-[500px]"
          >
            <AnimatedCelestialField decorations={allPortraitDecor} />

            <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[26rem] md:h-[26rem] lg:w-[28rem] lg:h-[28rem] z-10">
              <div
                className="absolute inset-0 rounded-full shadow-lg"
                style={{
                  background:
                    "radial-gradient(circle at 35% 25%, hsl(42 80% 72%) 0%, transparent 45%), radial-gradient(circle at 70% 80%, hsl(38 50% 35%) 0%, transparent 40%), linear-gradient(145deg, hsl(42 65% 58%) 0%, hsl(42 70% 48%) 45%, hsl(38 55% 38%) 100%)",
                }}
              />
              <div className="absolute inset-0 rounded-full overflow-hidden ring-2 ring-gold/20">
                <Image
                  src="/assets/evelin-1.jpg"
                  alt="Eveline Dublán"
                  width={640}
                  height={640}
                  className="w-full h-full object-cover object-[center_15%] scale-110"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center md:text-left relative min-h-[320px] py-4"
          >
            <AnimatedCelestialField decorations={allTextDecor} />

            <p className="relative z-10 font-body text-lg md:text-xl italic text-foreground/90 leading-relaxed mb-6">
              &ldquo;Soy Psicoterapeuta y Terapeuta Holística de Humanos y
              Animales.&rdquo;
            </p>
            <p className="relative z-10 font-body text-muted-foreground leading-relaxed mb-8">
              Quiero acompañarte en tu proceso de sanación y florecimiento, para
              que encuentres el equilibrio entre cuerpo, mente y espíritu y
              descubras la luz que llevas dentro.
            </p>
            <p className="relative z-10 font-display text-foreground font-medium tracking-wide mb-10">
              &mdash; Eveline Dublán &mdash;
            </p>
            <div className="relative z-10 flex flex-col items-center md:items-start gap-6">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-10 py-3.5 bg-primary text-primary-foreground font-body font-medium rounded-full transition-all duration-300 hover:bg-purple-glow hover:scale-105 shadow-mystical"
              >
                Conóceme
              </a>
              <div className="relative w-48 h-10">
                <AnimatedCelestialField
                  decorations={[
                    { kind: "sparkle", top: "20%", left: "5%", size: 14, delay: 0, duration: 2.5, colorClass: "text-gold" },
                    { kind: "burst", top: "10%", left: "38%", size: 18, delay: 0.5, duration: 3.2, colorClass: "text-gold-light/85" },
                    { kind: "moon", top: "25%", left: "62%", size: 12, delay: 0.9, duration: 4.6, colorClass: "text-gold/70" },
                    { kind: "sparkle", top: "15%", left: "82%", size: 10, delay: 0.3, duration: 2.2, colorClass: "text-primary/40" },
                    { kind: "dot", top: "55%", left: "22%", size: 5, delay: 1.1, duration: 3.4, colorClass: "bg-gold/50" },
                    { kind: "moon", top: "50%", left: "48%", size: 11, delay: 0.6, duration: 5, colorClass: "text-gold/60" },
                    { kind: "sparkle", top: "45%", left: "70%", size: 8, delay: 1.3, duration: 2.8, colorClass: "text-gold/75" },
                  ]}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
