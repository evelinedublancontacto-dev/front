"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CalendarDays, Heart, Sparkles, Moon, ChevronDown, Clock } from "lucide-react";
import TwinkleStars from "@/components/TwinkleStars";

const trustItems = [
  { icon: Sparkles, label: "Terapia Holística" },
  { icon: Heart, label: "Atención Personalizada" },
  { icon: Moon, label: "Espacio Seguro" },
] as const;

const CitasHero = () => {
  const scrollToCalendar = () => {
    document.getElementById("agendar")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-32 pb-28 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/citas-hero-bg.jpg"
          alt="Fondo celestial para reservar cita"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, hsla(275,55%,20%,0.55) 0%, hsla(270,30%,10%,0.4) 42%, hsla(42,45%,30%,0.45) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 45%, hsla(270,30%,8%,0.35) 0%, transparent 70%)",
          }}
        />
      </div>

      <TwinkleStars count={14} topMin={5} topRange={90} />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase mb-5"
          style={{ color: "hsl(42 70% 62%)" }}
        >
          Tu momento de sanación
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-7 border border-white/20 shadow-mystical"
        >
          <CalendarDays className="w-10 h-10 text-gold" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight"
        >
          <span className="text-gradient-gold">Reserva</span>{" "}
          <span style={{ color: "hsl(0 0% 100%)" }}>tu Sesión</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-center justify-center gap-3 sm:gap-4 mb-6"
        >
          <div className="h-px w-10 sm:w-14 bg-gradient-to-r from-transparent to-gold/40" />
          <Clock className="w-4 h-4 text-gold/70" />
          <Moon className="w-4 h-4 text-primary/60" />
          <div className="h-px w-10 sm:w-14 bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
          style={{ color: "hsla(0, 0%, 100%, 0.78)" }}
        >
          Selecciona el servicio, fecha y hora que mejor se adapte a ti. Todos
          los horarios están en{" "}
          <span className="text-gold font-medium">
            hora del centro de México (CDMX)
          </span>
          , porque acompañamos pacientes en distintos países.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
        >
          <button
            type="button"
            onClick={scrollToCalendar}
            className="px-8 py-4 bg-primary hover:bg-purple-glow text-primary-foreground font-body font-semibold rounded-lg transition-all duration-300 shadow-mystical hover:scale-105"
          >
            Agendar ahora
          </button>
          <a
            href="/#servicios"
            className="px-8 py-4 font-body font-semibold rounded-lg transition-all duration-300 hover:bg-white/5"
            style={{
              border: "1px solid hsla(42,70%,62%,0.45)",
              color: "hsl(42 70% 62%)",
            }}
          >
            Ver servicios
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-8 border-t border-white/10"
        >
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/60">
              <Icon className="w-4 h-4 text-gold/80 shrink-0" />
              <span className="text-sm font-body">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={scrollToCalendar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        aria-label="Ir al calendario"
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 text-white/40 hover:text-white/70 transition-colors"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default CitasHero;
