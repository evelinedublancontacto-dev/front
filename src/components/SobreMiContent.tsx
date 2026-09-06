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

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[hsl(270,30%,12%)] via-[hsl(270,30%,16%)] to-background">
        <TwinkleStars count={24} />

        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary/20 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-gold/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-body text-white/70 hover:text-gold transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al inicio</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold-light font-body text-xs font-semibold uppercase tracking-[0.25em] mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Quién Soy</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Eveline <span className="text-gradient-gold">Dublán</span>
            </h1>

            <p className="font-body text-base sm:text-lg md:text-xl text-purple-200/90 max-w-3xl mx-auto leading-relaxed">
              Psicóloga · Tanatóloga · Psicoterapia Ericksoniana · Terapeuta Holística de Humanos y Animales
            </p>
          </motion.div>
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
              <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-primary/15 via-purple-950/20 to-gold/10 border-2 border-gold/40 shadow-xl">
                <div className="flex items-center gap-2 text-gold font-body text-xs uppercase tracking-[0.2em] font-semibold mb-3">
                  <Heart className="w-4 h-4 text-gold fill-gold/20" />
                  <span>Mi Misión</span>
                </div>
                <blockquote className="font-display text-lg sm:text-xl md:text-2xl italic text-foreground font-medium leading-relaxed mb-4">
                  &ldquo;Mi misión es ofrecerte un espacio seguro, compasivo y libre de juicio donde puedas reencontrar tu equilibrio y caminar hacia una vida más plena. Sea este un lugar dedicado a tejer puentes de sanación, claridad y respeto para todos los seres sintientes.&rdquo;
                </blockquote>
                <p className="font-display text-sm tracking-wider uppercase text-gold font-semibold text-right">
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
                  <MessageCircle className="w-4 h-4 text-gold" />
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
