"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Heart,
  PawPrint,
  Brain,
  GraduationCap,
  Clock,
  ArrowLeft,
  Calendar,
  MessageCircle,
  ShieldCheck,
  Award,
  Compass,
  Moon,
  Quote,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TwinkleStars from "@/components/TwinkleStars";
import { contact } from "@/lib/contact";

const credentials = [
  {
    icon: GraduationCap,
    title: "Psicóloga",
    institution: "Egresada de la UAEH",
  },
  {
    icon: Award,
    title: "Tanatóloga",
    institution: "Certificada por AMTAC",
  },
  {
    icon: Brain,
    title: "Psicoterapia Ericksoniana",
    institution: "Formación en el CEM",
  },
  {
    icon: PawPrint,
    title: "Terapeuta Holística & Animal",
    institution: "Técnicas para humanos y animales",
  },
  {
    icon: Clock,
    title: "20 Años de Experiencia",
    institution: "Acompañando a seres sintientes",
  },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Espacio Seguro e Inclusivo",
    description:
      "Terapia con perspectiva de género, perspectiva de clase, antigordofobia, no especista y de inclusión activa a la comunidad LGBTTTIQ+.",
  },
  {
    icon: PawPrint,
    title: "Pionera en Duelo Animal en México",
    description:
      "Pionera en el trabajo terapéutico con duelo por la pérdida de un compañero animal, actas de voluntad anticipada y mensajes intuitivos.",
  },
  {
    icon: Compass,
    title: "Claridad y Nuevos Órdenes Internos",
    description:
      "Acompañamiento profundo para ordenar lo que sientes y piensas, construyendo una realidad más sana, consciente y plena.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export default function SobreMiContent() {
  const whatsappUrl = `${contact.whatsappUrl}?text=${encodeURIComponent(
    "Hola Eveline, me gustaría recibir más información sobre tus sesiones y acompañamiento terapéutico."
  )}`;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Hero Header with Background Image */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Image with mystical overlays */}
        <div className="absolute inset-0">
          <Image
            src="/assets/sobre-mi-hero-bg.jpg"
            alt="Fondo celestial místico para Sobre Mí"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(115deg, hsla(275,55%,18%,0.72) 0%, hsla(270,30%,10%,0.55) 45%, hsla(42,45%,25%,0.6) 100%)",
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

        <TwinkleStars count={18} topMin={5} topRange={90} />

        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl pb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-body text-white/80 hover:text-gold transition-colors duration-200 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/15 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al inicio</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-mystical"
          >
            <Sparkles className="w-10 h-10 text-gold" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase mb-4"
            style={{ color: "hsl(42 70% 62%)" }}
          >
            Quién Soy · Mi Camino & Misión
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight"
          >
            <span style={{ color: "hsl(0 0% 100%)" }}>Eveline </span>
            <span className="text-gradient-gold">Dublán</span>
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
            className="font-body text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "hsla(0, 0%, 100%, 0.88)" }}
          >
            Psicóloga · Tanatóloga · Psicoterapia Ericksoniana · Terapeuta Holística de Humanos y Animales
          </motion.p>
        </div>

        {/* Wave transition divider to content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 leading-[0]">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full"
            preserveAspectRatio="none"
            style={{ height: "48px" }}
          >
            <path
              d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Main Bio Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Portrait & Credentials */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 flex flex-col items-center"
            >
              {/* Portrait photo */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mb-8">
                <div
                  className="absolute inset-0 rounded-full shadow-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 25%, hsl(42 80% 72%) 0%, transparent 45%), radial-gradient(circle at 70% 80%, hsl(38 50% 35%) 0%, transparent 40%), linear-gradient(145deg, hsl(42 65% 58%) 0%, hsl(42 70% 48%) 45%, hsl(38 55% 38%) 100%)",
                  }}
                />
                <div className="absolute inset-0 rounded-full overflow-hidden ring-4 ring-gold/30">
                  <Image
                    src="/assets/evelin-1.jpg"
                    alt="Eveline Dublán"
                    width={640}
                    height={640}
                    className="w-full h-full object-cover object-[center_15%] scale-110"
                    priority
                  />
                </div>
              </div>

              {/* Credentials list */}
              <div className="w-full space-y-3">
                <p className="text-xs font-body font-semibold tracking-[0.2em] uppercase text-primary mb-3 text-center lg:text-left">
                  Credenciales & Formación
                </p>
                {credentials.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <motion.div
                      key={c.title}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={fadeUp}
                      className="flex items-center gap-3.5 p-3.5 rounded-xl bg-card border border-border/70 hover:border-gold/40 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-gold">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-body font-semibold text-sm text-foreground">
                          {c.title}
                        </p>
                        <p className="font-body text-xs text-muted-foreground">
                          {c.institution}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column: Complete Biography */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-7 space-y-8"
            >
              <div>
                <span className="text-primary font-body text-xs font-semibold tracking-[0.2em] uppercase mb-2 block">
                  Mi Trayectoria
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Acompañando tu camino de <span className="text-gradient-gold">sanación y consciencia</span>
                </h2>
                <div className="space-y-6 font-body text-base md:text-lg leading-relaxed text-muted-foreground">
                  <p className="text-foreground/90 font-medium">
                    Soy Eveline Dublán, psicóloga (egresada de la UAEH), tanatóloga (AMTAC) y con formación en psicoterapia Ericksoniana (CEM). A la par, me he formado durante muchísimo tiempo como terapeuta holística y sanadora, tanto en técnicas para humanos como para animales. Tengo veinte años de experiencia acompañando a los seres sintientes en sus caminos de sanación y en la exploración de sus historias, ayudándoles a generar claridad en lo que piensan y sienten, y creando nuevos órdenes internos que les permitan formar una realidad más sana y consciente de sí mismos y de sus vidas.
                  </p>
                  <p>
                    Mi consultorio, tanto presencial como en línea, es un espacio donde se imparte terapia con perspectiva de género, perspectiva de clase, antigordofobia, no especista y de inclusión a la comunidad LGBTTTIQ+. Me especializo en terapias individuales, así como en talleres de desarrollo personal y temas espirituales. Fui pionera en México en el trabajo con duelo por pérdida de un compañero animal, así como en el acta de voluntad anticipada sobre enfermedad y muerte, y en el primer podcast donde se incluían mensajes intuitivos de animales.
                  </p>
                </div>
              </div>

              {/* Mission Statement Card */}
              <div className="relative p-6 sm:p-8 rounded-2xl bg-card border-l-4 border-l-gold border-y border-r border-border/80 shadow-sm overflow-hidden">
                <Quote
                  className="absolute top-4 right-5 w-12 h-12 text-primary/10 pointer-events-none"
                  aria-hidden
                />
                <div className="flex items-center gap-2 text-gold font-body text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                  <Heart className="w-4 h-4 text-gold fill-gold/20" />
                  <span>Mi Misión</span>
                </div>
                <blockquote className="font-display text-lg sm:text-xl md:text-2xl italic text-foreground font-medium leading-relaxed mb-4 relative z-10">
                  &ldquo;Mi misión es ofrecerte un espacio seguro, compasivo y libre de juicio donde puedas reencontrar tu equilibrio y caminar hacia una vida más plena. Sea este un lugar dedicado a tejer puentes de sanación, claridad y respeto para todos los seres sintientes.&rdquo;
                </blockquote>
                <p className="font-display text-sm tracking-wider uppercase text-gold font-semibold text-right relative z-10">
                  &mdash; Eveline Dublán
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/citas"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-body font-medium rounded-full transition-all duration-300 hover:bg-purple-glow hover:scale-105 shadow-mystical"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Agendar Cita</span>
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-gold/40 text-foreground font-body font-medium transition-all duration-300 hover:bg-gold/10 hover:border-gold"
                >
                  <Image
                    src="/assets/icons/whatsapp.png"
                    alt="WhatsApp"
                    width={18}
                    height={18}
                    className="w-4.5 h-4.5 object-contain"
                  />
                  <span>Escríbeme por WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-16 bg-gradient-section border-t border-border/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-primary font-body text-xs font-semibold tracking-[0.2em] uppercase mb-2 block">
              Valores & Enfoque
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Pilares de mi <span className="text-gradient-gold">Acompañamiento</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="p-6 rounded-2xl bg-card border border-border/70 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-gold flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-foreground mb-2">
                    {pillar.title}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
