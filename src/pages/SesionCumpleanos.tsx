import { motion } from "framer-motion";
import { Gift, Sparkles, Sun, Heart, DollarSign, ArrowLeft, Phone, Star } from "lucide-react";
import cumpleanosHero from "@/assets/sesion-cumpleanos-hero.jpg";
import sesionImg from "@/assets/sesion-cumpleanos.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }),
};

const SesionCumpleanos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={cumpleanosHero} alt="Sesión de Cumpleaños" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(275,55%,25%,0.88) 0%, hsla(270,30%,12%,0.82) 50%, hsla(275,60%,35%,0.85) 100%)" }} />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div animate={{ y: [-10, 10, -10], scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-20 left-[10%] w-3 h-3 bg-primary/30 rounded-full blur-sm" />
          <motion.div animate={{ y: [10, -10, 10], rotate: [0, 180, 360] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-32 right-[15%] w-4 h-4 border border-primary/20 rounded-full" />
          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-32 left-[20%] w-2 h-2 bg-accent/40 rounded-full" />
          <motion.div animate={{ y: [-5, 15, -5], x: [-5, 5, -5] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-40 left-[60%] w-3 h-3 bg-primary/20 rounded-full blur-sm" />
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-24 right-[30%]">
            <Gift className="w-6 h-6 text-primary/15" />
          </motion.div>
          <motion.div animate={{ rotate: [0, -360] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-28 right-[25%]">
            <Star className="w-5 h-5 text-accent/20" />
          </motion.div>
          {[...Array(8)].map((_, i) => (
            <motion.div key={i} className="absolute w-1 h-1 bg-white/30 rounded-full" style={{ top: `${15 + Math.random() * 70}%`, left: `${5 + Math.random() * 90}%` }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }} />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-body text-sm">
              <ArrowLeft className="w-4 h-4" /> Volver al inicio
            </Link>
          </motion.div>

          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Gift className="w-10 h-10 text-white" />
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-primary-foreground/70 font-body text-sm tracking-[0.2em] uppercase mb-4">
              Servicio Especial
            </motion.p>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              Sesión de <span className="text-gradient-gold">Cumpleaños</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-white/80 font-body max-w-2xl mx-auto leading-relaxed">
              Aprovecha el portal luminoso de tu cumpleaños para sanar y comenzar tu año personal con la mejor energía.
            </motion.p>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,64 C480,120 960,0 1440,64 L1440,120 L0,120 Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Intro with image */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
                <img src={sesionImg} alt="Sesión de cumpleaños" className="rounded-2xl shadow-2xl w-full object-cover aspect-[3/4]" />
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="space-y-6">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Tu Portal <span className="text-gradient-gold">Luminoso</span>
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed text-lg">
                  Tu fecha de cumpleaños es un portal luminoso muy importante. Cinco días antes y diez días después, el flujo de energía para ti es especial.
                </p>
                <p className="text-muted-foreground font-body leading-relaxed">
                  Tu poder para materializar los sueños y sanar se incrementa, por ello te recomiendo aprovechar ese tiempo para hacer una sesión de sanación individual y comenzar tu año personal con la mejor energía.
                </p>
              </motion.div>
            </div>

            {/* What's included */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-20">
              <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
                ¿Qué se hace en <span className="text-gradient-gold">la sesión</span>?
              </h2>

              <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                  { icon: Sparkles, title: "Limpieza de Aura", desc: "Purificación completa de tu campo energético para iniciar tu nuevo ciclo." },
                  { icon: Sun, title: "Armonización de Chakras", desc: "Equilibrio y alineación de tus centros energéticos." },
                  { icon: Heart, title: "Lectura de Oráculo con Ángeles", desc: "Identifica el clima energético de tu año para saber cómo aprovecharlo. No son predicciones." },
                  { icon: Star, title: "Canalización de Baño", desc: "Baño de hierbas o velas para sellar lo trabajado en la sesión." },
                ].map((item, i) => (
                  <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="bg-gradient-card rounded-xl p-6 border-glow">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Pricing */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="max-w-2xl mx-auto text-center mb-16">
              <div className="bg-gradient-card rounded-2xl p-10 border-glow">
                <DollarSign className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">Inversión</h3>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-gradient-gold">$700 MXN</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-3xl font-bold text-gradient-gold">$35 USD</span>
                </div>
                <p className="text-muted-foreground font-body mb-8">
                  Reserva tu cita y dale a cada año un giro extraordinario.
                </p>
                <a href="https://wa.me/5215512345678" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Phone className="w-5 h-5" /> Reservar mi sesión
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SesionCumpleanos;
