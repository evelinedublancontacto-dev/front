"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image - hero keeps dark/mystical */}
      <div className="absolute inset-0">
        <Image
          src="/assets/hero-bg.jpg"
          alt="Fondo celestial místico"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsla(270,30%,12%,0.55) 0%, hsla(270,30%,12%,0.7) 100%)",
          }}
        />
      </div>

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold-light animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-body text-sm tracking-[0.3em] uppercase mb-4"
          style={{ color: "hsl(42 70% 62%)" }}
        >
          Psicoterapeuta & Terapeuta Holística
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="text-gradient-gold">Eveline</span>{" "}
          <span style={{ color: "hsl(0 0% 100%)" }}>Dublán</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center mb-8"
        >
          <Image
            src="/assets/logos/imago-logo.png"
            alt="Imago"
            width={200}
            height={64}
            className="h-16 w-auto object-contain"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "hsl(270 30% 85%)" }}
        >
          Sanación y Florecimiento para Humanos y Animales. Descubre el camino
          hacia tu equilibrio interior.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#servicios"
            className="px-8 py-4 bg-primary hover:bg-purple-glow text-primary-foreground font-body font-semibold rounded-lg transition-all duration-300 shadow-mystical hover:scale-105"
          >
            Ver Servicios
          </a>
          <a
            href="#contacto"
            className="px-8 py-4 font-body font-semibold rounded-lg transition-all duration-300"
            style={{
              border: "1px solid hsla(42,70%,62%,0.5)",
              color: "hsl(42 70% 62%)",
            }}
          >
            Contacto
          </a>
        </motion.div>
      </div>

      {/* Wave divider to white */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
            fill="hsl(270 20% 98%)"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
