"use client";
import { motion } from "framer-motion";
import { Sparkles, Video, Clock, CalendarCheck, Camera, DollarSign, ArrowLeft, Phone } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }),
};

const SanacionEnergetica = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/assets/sanacion-energetica-hero.jpg" alt="Sanación Energética" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(275,55%,25%,0.88) 0%, hsla(270,30%,12%,0.82) 50%, hsla(275,60%,35%,0.85) 100%)" }} />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Energy orbs */}
          <motion.div
            animate={{ y: [-10, 10, -10], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[10%] w-20 h-20 rounded-full"
            style={{ background: "radial-gradient(circle, hsla(42, 70%, 62%, 0.3), transparent)" }}
          />
          <motion.div
            animate={{ y: [8, -12, 8], x: [-5, 5, -5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-28 right-[15%] w-14 h-14 rounded-full"
            style={{ background: "radial-gradient(circle, hsla(275, 60%, 55%, 0.25), transparent)" }}
          />

          {/* Sparkle paths */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-16 right-[25%] w-24 h-24 rounded-full border border-dashed"
            style={{ borderColor: "hsla(42, 70%, 62%, 0.2)" }}
          />

          {/* Hexagon */}
          <motion.div
            animate={{ rotate: [0, 60, 0], y: [-5, 5, -5] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-24 left-[12%]"
          >
            <svg width="40" height="36" viewBox="0 0 40 36" fill="none">
              <path d="M20 2L38 10V26L20 34L2 26V10L20 2Z" stroke="hsla(42, 70%, 62%, 0.25)" strokeWidth="2" />
            </svg>
          </motion.div>

          {/* Lotus-like shape */}
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-32 left-[35%]"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="6" stroke="hsla(0, 0%, 100%, 0.2)" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="12" stroke="hsla(42, 70%, 62%, 0.15)" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* Energy wave */}
          <motion.div
            animate={{ x: [-15, 15, -15] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-28 right-[10%]"
          >
            <svg width="100" height="30" viewBox="0 0 100 30" fill="none">
              <path d="M0 15C12.5 0 25 30 37.5 15C50 0 62.5 30 75 15C87.5 0 100 30 100 15" stroke="hsla(275, 55%, 55%, 0.2)" strokeWidth="2" />
            </svg>
          </motion.div>

          {/* Diamond */}
          <motion.div
            animate={{ rotate: [45, 225, 45], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-[40%] w-10 h-10 border-2"
            style={{ borderColor: "hsla(42, 70%, 62%, 0.2)", transform: "rotate(45deg)" }}
          />

          {/* Stars */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gold-light animate-twinkle"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-mystical">
              <Sparkles className="w-10 h-10 text-gold" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold mb-4"
            style={{ color: "hsl(0 0% 100%)" }}
          >
            Sanación Energética
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-body text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "hsl(270 30% 85%)" }}
          >
            Reiki · Flores de Bach · Ángeles · Oráculos · Chamanismo y Magia
          </motion.p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z" fill="hsl(270 20% 98%)" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">

          {/* Back link */}
          <Link href="/#servicios" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body text-sm mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver a servicios
          </Link>

          {/* Main description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="font-body text-lg text-foreground leading-relaxed">
              En este servicio encontrarás un conjunto de técnicas de <strong className="text-primary">sanación energética</strong>, todas ellas luminosas, que te permitirán sanar profundamente.
            </motion.p>
            <motion.p variants={fadeUp} custom={1} className="font-body text-muted-foreground leading-relaxed">
              De forma particular, trabajo con <strong className="text-foreground">Reiki</strong>, <strong className="text-foreground">Flores de Bach</strong>, <strong className="text-foreground">Ángeles</strong>, <strong className="text-foreground">Oráculos</strong>, <strong className="text-foreground">Técnicas de Chamanismo</strong> y <strong className="text-foreground">Magia</strong>.
            </motion.p>
          </motion.div>

          {/* ¿Qué pasa en una sesión? */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-section rounded-2xl p-8 md:p-12 border border-border mb-12"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              ¿Qué pasa en una sesión de <span className="text-gradient-gold">Sanación Energética</span>?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="font-body text-muted-foreground leading-relaxed mb-4">
              Al llegar, se realiza una limpieza con alguna planta, por ejemplo, palo santo o salvia blanca, esto con el propósito de retirar la energía densa y discordante del día a día, así como de las personas a tu alrededor.
            </motion.p>
            <motion.p variants={fadeUp} custom={2} className="font-body text-muted-foreground leading-relaxed mb-4">
              Después, la persona expone su motivo de consulta, a partir de ello trabajaremos toda la sesión, pero con una variante muy importante: contactaré con tus <strong className="text-foreground">Ángeles de corazón puro</strong>, serán ellos quienes nos indiquen lo que hay que sanar en ti. Su perspectiva es mucho más elevada y nos permitirá resolver aquello que sostiene el problema.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="font-body text-muted-foreground leading-relaxed mb-6">
              Una vez identificado el origen, se procede a la sanación con la o las técnicas que mejor se acomoden al proceso.
            </motion.p>
            <motion.div variants={fadeUp} custom={4} className="inline-flex items-center gap-3 bg-primary/10 rounded-xl px-6 py-3 border border-primary/20">
              <span className="text-2xl">✨</span>
              <p className="font-display text-primary font-semibold">Sanación guiada por tus Ángeles de corazón puro.</p>
            </motion.div>
          </motion.div>

          {/* Detalles de la sesión */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {[
              { icon: Video, title: "Modalidad", desc: "Video llamada o llamada de voz en Zoom o Facetime" },
              { icon: Clock, title: "Duración", desc: "50-60 minutos por sesión" },
              { icon: Camera, title: "Requisitos", desc: "Enviar previamente una foto de cuerpo entero reciente. Espacio privado, silencioso, buena conexión a internet y audífonos (indispensables)" },
              { icon: CalendarCheck, title: "¿Quién puede tomarla?", desc: "Personas mayores de 18 años" },
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
                  <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Agendar e Inversión */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {/* Cómo agendar */}
            <motion.div variants={fadeUp} custom={0} className="bg-gradient-card rounded-2xl p-8 border-glow">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">¿Cómo agendar?</h3>
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                Puedes comunicarte por <strong className="text-foreground">llamada telefónica</strong> al <strong className="text-primary">771 143 91 16</strong> donde rápida y fácilmente, encontraremos un espacio en la agenda que sea conveniente para ambas partes.
              </p>
              <p className="font-body text-xs text-muted-foreground italic">
                Es indispensable que la persona que vaya a tomar la terapia sea quien agende su cita personalmente.
              </p>
            </motion.div>

            {/* Inversión */}
            <motion.div variants={fadeUp} custom={1} className="bg-gradient-card rounded-2xl p-8 border-glow">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-gold" />
                <h3 className="font-display text-xl font-semibold text-foreground">Inversión</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-gradient-gold">$700</span>
                  <span className="font-body text-muted-foreground text-sm">MXN</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-xl font-semibold text-foreground">$35</span>
                  <span className="font-body text-muted-foreground text-sm">USD aprox.</span>
                </div>
                <p className="font-body text-xs text-muted-foreground pt-2 border-t border-border">
                  Depósito bancario, transferencia interbancaria, tiendas Oxxo o PayPal (+7%)
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a href="tel:+527711439116">
              <Button size="lg" className="font-body text-base px-10 py-6 rounded-full shadow-mystical">
                <Phone className="w-5 h-5 mr-2" />
                Agendar mi cita
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SanacionEnergetica;
