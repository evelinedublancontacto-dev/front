"use client";
import { motion } from "framer-motion";
import {
  Gift,
  Sparkles,
  Sun,
  Heart,
  DollarSign,
  ArrowLeft,
  Phone,
  Star,
  Video,
  Clock,
  CalendarCheck,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import TwinkleStars from "@/components/TwinkleStars";
import { contact } from "@/lib/contact";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const SesionCumpleanos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/sesion-cumpleanos-hero.jpg"
            alt="Sesión de Cumpleaños"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, hsla(275,55%,25%,0.88) 0%, hsla(270,30%,12%,0.82) 50%, hsla(275,60%,35%,0.85) 100%)",
            }}
          />
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ y: [-10, 10, -10], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[10%] w-20 h-20 rounded-full"
            style={{
              background:
                "radial-gradient(circle, hsla(42, 70%, 62%, 0.3), transparent)",
            }}
          />
          <motion.div
            animate={{ y: [8, -12, 8], x: [-5, 5, -5] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-28 right-[15%] w-14 h-14 rounded-full"
            style={{
              background:
                "radial-gradient(circle, hsla(275, 60%, 55%, 0.25), transparent)",
            }}
          />
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-16 right-[25%] w-24 h-24 rounded-full border border-dashed"
            style={{ borderColor: "hsla(42, 70%, 62%, 0.2)" }}
          />
          <motion.div
            animate={{ rotate: [0, 60, 0], y: [-5, 5, -5] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-24 left-[12%]"
          >
            <Gift className="w-10 h-10 text-gold/30" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute top-32 left-[35%]"
          >
            <Star className="w-8 h-8 text-white/20" />
          </motion.div>
          <motion.div
            animate={{ x: [-15, 15, -15] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-28 right-[10%]"
          >
            <svg width="100" height="30" viewBox="0 0 100 30" fill="none">
              <path
                d="M0 15C12.5 0 25 30 37.5 15C50 0 62.5 30 75 15C87.5 0 100 30 100 15"
                stroke="hsla(275, 55%, 55%, 0.2)"
                strokeWidth="2"
              />
            </svg>
          </motion.div>
          <TwinkleStars count={15} topMin={10} topRange={80} />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-mystical">
              <Gift className="w-10 h-10 text-gold" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold mb-4"
            style={{ color: "hsl(0 0% 100%)" }}
          >
            Sesión de Cumpleaños
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-body text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "hsl(270 30% 85%)" }}
          >
            Portal luminoso · Sanación · Nuevo ciclo personal
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z"
              fill="hsl(270 20% 98%)"
            />
          </svg>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            href="/#servicios"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body text-sm mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a servicios
          </Link>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 mb-16"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-display text-3xl md:text-4xl font-bold text-foreground"
            >
              Tu Portal <span className="text-gradient-gold">Luminoso</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="font-body text-lg text-foreground leading-relaxed"
            >
              Tu fecha de cumpleaños es un portal luminoso muy importante. Cinco
              días antes y diez días después, el flujo de energía para ti es
              especial.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-body text-muted-foreground leading-relaxed"
            >
              Tu poder para materializar los sueños y sanar se incrementa, por
              ello te recomiendo aprovechar ese tiempo para hacer una sesión de
              sanación individual y comenzar tu año personal con la mejor
              energía.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-section rounded-2xl p-8 md:p-12 border border-border mb-12"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8"
            >
              ¿Qué se hace en{" "}
              <span className="text-gradient-gold">la sesión</span>?
            </motion.h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  icon: Sparkles,
                  title: "Limpieza de Aura",
                  desc: "Purificación completa de tu campo energético para iniciar tu nuevo ciclo.",
                },
                {
                  icon: Sun,
                  title: "Armonización de Chakras",
                  desc: "Equilibrio y alineación de tus centros energéticos.",
                },
                {
                  icon: Heart,
                  title: "Lectura de Oráculo con Ángeles",
                  desc: "Identifica el clima energético de tu año para saber cómo aprovecharlo.",
                },
                {
                  icon: Star,
                  title: "Canalización de Baño",
                  desc: "Baño de hierbas o velas para sellar lo trabajado en la sesión.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  custom={i}
                  className="flex gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {[
              {
                icon: Video,
                title: "Modalidad",
                desc: "Presencial o video llamada (Zoom / Facetime)",
              },
              {
                icon: Clock,
                title: "Duración",
                desc: "50-60 minutos por sesión",
              },
              {
                icon: CalendarCheck,
                title: "¿Cuándo?",
                desc: "Cinco días antes y hasta diez días después de tu cumpleaños",
              },
              {
                icon: Gift,
                title: "¿Quién puede tomarla?",
                desc: "Cualquier persona que desee iniciar su año personal con claridad y sanación",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                className="flex gap-4 p-6 bg-background rounded-xl border border-border hover:border-primary/30 hover:shadow-mystical transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="bg-gradient-card rounded-2xl p-8 border-glow"
            >
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  ¿Cómo agendar?
                </h3>
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                Puedes comunicarte por{" "}
                <strong className="text-foreground">llamada telefónica</strong>{" "}
                al{" "}
                <strong className="text-primary">{contact.phone}</strong> o por
                WhatsApp al mismo número.
              </p>
              <p className="font-body text-xs text-muted-foreground italic">
                Es indispensable que la persona que vaya a tomar la sesión sea
                quien agende su cita personalmente.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              className="bg-gradient-card rounded-2xl p-8 border-glow"
            >
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-gold" />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Inversión
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-gradient-gold">
                    $700
                  </span>
                  <span className="font-body text-muted-foreground text-sm">
                    MXN
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-xl font-semibold text-foreground">
                    $35
                  </span>
                  <span className="font-body text-muted-foreground text-sm">
                    USD aprox.
                  </span>
                </div>
                <p className="font-body text-xs text-muted-foreground pt-2 border-t border-border">
                  Depósito bancario, transferencia interbancaria, tiendas Oxxo
                  o PayPal (+7%)
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href={contact.telUrl}>
              <Button
                size="lg"
                className="font-body text-base px-10 py-6 rounded-full shadow-mystical"
              >
                <Phone className="w-5 h-5 mr-2" />
                Agendar mi cita
              </Button>
            </a>
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="font-body text-base px-10 py-6 rounded-full"
              >
                WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SesionCumpleanos;
