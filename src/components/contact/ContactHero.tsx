"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Moon } from "lucide-react";
import TwinkleStars from "@/components/TwinkleStars";

const ContactHero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/assets/hero-bg.jpg"
          alt="Fondo celestial místico"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsla(270,30%,12%,0.6) 0%, hsla(270,30%,12%,0.75) 100%)",
          }}
        />
      </div>

      <TwinkleStars count={16} />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-mystical"
        >
          <Mail className="w-10 h-10 text-gold" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase mb-4"
          style={{ color: "hsl(42 70% 62%)" }}
        >
          Estoy aquí para ti
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight"
        >
          <span style={{ color: "hsl(0 0% 100%)" }}>Comienza tu </span>
          <span className="text-gradient-gold">Transformación</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-center justify-center gap-4 mb-5"
        >
          <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent to-gold/40" />
          <Moon className="w-4 h-4 text-gold/70" />
          <div className="h-px w-12 sm:w-16 bg-gradient-to-l from-transparent to-gold/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="font-body text-lg md:text-xl leading-relaxed"
          style={{ color: "hsla(0, 0%, 100%, 0.78)" }}
        >
          Escríbeme, llámame o agenda tu sesión. Responderé con la atención y el
          cuidado que mereces en tu camino de sanación.
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 leading-[0]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default ContactHero;
