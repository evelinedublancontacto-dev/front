import { motion } from "framer-motion";
import { Music, Users, User, Hand, MapPin, DollarSign, ArrowLeft, Phone } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import cuencoImg from "@/assets/cuencos-tibetanos.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }),
};

const CuencosTibetanos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(275,55%,25%,0.88) 0%, hsla(270,30%,12%,0.82) 50%, hsla(275,60%,35%,0.85) 100%)" }} />
        </div>

        {/* Floating elements - sound wave themed */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Sound wave rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: ring * 0.8 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                width: `${ring * 120}px`,
                height: `${ring * 120}px`,
                borderColor: `hsla(42, 70%, 62%, ${0.2 / ring})`,
              }}
            />
          ))}

          {/* Musical note paths */}
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[12%]"
          >
            <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
              <ellipse cx="8" cy="28" rx="8" ry="6" stroke="hsla(42, 70%, 62%, 0.3)" strokeWidth="2" />
              <line x1="16" y1="28" x2="16" y2="4" stroke="hsla(42, 70%, 62%, 0.3)" strokeWidth="2" />
              <path d="M16 4C20 4 26 8 26 14" stroke="hsla(42, 70%, 62%, 0.3)" strokeWidth="2" />
            </svg>
          </motion.div>

          {/* Vibration waves */}
          <motion.div
            animate={{ x: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-28 left-[8%]"
          >
            <svg width="100" height="40" viewBox="0 0 100 40" fill="none">
              <path d="M0 20C5 5 10 35 15 20C20 5 25 35 30 20C35 5 40 35 45 20C50 5 55 35 60 20C65 5 70 35 75 20C80 5 85 35 90 20C95 5 100 35 100 20" stroke="hsla(275, 55%, 55%, 0.2)" strokeWidth="1.5" />
            </svg>
          </motion.div>

          {/* Bowl shape */}
          <motion.div
            animate={{ y: [-5, 5, -5], rotate: [-3, 3, -3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-24 right-[15%]"
          >
            <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
              <path d="M4 8C4 8 8 28 24 28C40 28 44 8 44 8" stroke="hsla(42, 70%, 62%, 0.25)" strokeWidth="2" strokeLinecap="round" />
              <line x1="2" y1="8" x2="46" y2="8" stroke="hsla(42, 70%, 62%, 0.2)" strokeWidth="1.5" />
            </svg>
          </motion.div>

          {/* Rotating circle */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-[10%] w-24 h-24 rounded-full border-2 border-dashed"
            style={{ borderColor: "hsla(270, 30%, 65%, 0.15)" }}
          />

          {/* Diamond */}
          <motion.div
            animate={{ rotate: [45, 225, 45], scale: [1, 1.1, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-24 left-[35%] w-10 h-10 border-2"
            style={{ borderColor: "hsla(42, 70%, 62%, 0.2)", transform: "rotate(45deg)" }}
          />

          {/* Stars */}
          {[...Array(12)].map((_, i) => (
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
              <Music className="w-10 h-10 text-gold" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold mb-4"
            style={{ color: "hsl(0 0% 100%)" }}
          >
            Cuencos Tibetanos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-body text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "hsl(270 30% 85%)" }}
          >
            Sanación a través de vibraciones armónicas · Meditación · Relajación profunda
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
          <Link to="/#servicios" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body text-sm mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver a servicios
          </Link>

          {/* Main description with image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-5 gap-8 items-start mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="md:col-span-2">
              <img
                src={cuencoImg}
                alt="Cuencos Tibetanos"
                className="rounded-2xl w-full object-cover shadow-mystical border border-border"
              />
            </motion.div>
            <div className="md:col-span-3 space-y-6">
              <motion.p variants={fadeUp} custom={0} className="font-body text-lg text-foreground leading-relaxed">
                <strong className="text-primary">Los cuencos tibetanos son vasijas de bronce forjadas a mano</strong>, a través de su sonido armónico, emiten vibraciones que sanan y producen beneficios a nivel físico, emocional, psicológico y energético.
              </motion.p>
              <motion.p variants={fadeUp} custom={1} className="font-body text-muted-foreground leading-relaxed">
                Induciéndonos a estados profundos de consciencia en bienestar, los cuencos propician la <strong className="text-foreground">meditación, relajación y sanación</strong>.
              </motion.p>
              <motion.p variants={fadeUp} custom={2} className="font-body text-muted-foreground leading-relaxed">
                Se ha observado que la terapia con cuencos logra sanar procesos depresivos, miedos, ansiedad, dificultades para dormir, mejora la concentración, creatividad, además de permitirles conectar con su propio sonido interno y la armonía del universo.
              </motion.p>
            </div>
          </motion.div>

          {/* ¿Qué pasa en una sesión? */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-section rounded-2xl p-8 md:p-12 border border-border mb-12"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              ¿Qué pasa en una sesión con <span className="text-gradient-gold">Cuencos Tibetanos</span>?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="font-body text-muted-foreground leading-relaxed mb-8">
              Existen diversas formas de sanar con estos instrumentos:
            </motion.p>

            <div className="space-y-6">
              {/* Armonización grupal */}
              <motion.div variants={fadeUp} custom={2} className="flex gap-4 p-6 bg-background rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">Armonización Grupal</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-2">
                    Recostados sobre el piso, se colocan cuencos frente al grupo, que al ser sonados, producirán un efecto profundo de sanación, equilibrando su sistema nervioso y disminuyendo niveles de estrés.
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs font-body text-primary">
                    <span className="bg-primary/10 px-3 py-1 rounded-full">60 minutos</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full">Ropa cómoda</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full">Tapete/cobija</span>
                  </div>
                </div>
              </motion.div>

              {/* Armonización individual */}
              <motion.div variants={fadeUp} custom={3} className="flex gap-4 p-6 bg-background rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">Armonización Individual</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-2">
                    Recostado sobre el piso o en cama terapéutica, se colocan cuencos rodeándote y sobre tu cuerpo. Al ser sonados, vivirás la experiencia de la vibración de manera directa y profunda, experimentando una relajación y sanación profunda.
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs font-body text-primary">
                    <span className="bg-primary/10 px-3 py-1 rounded-full">40-50 minutos</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full">Ropa cómoda</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full">Calcetas</span>
                  </div>
                </div>
              </motion.div>

              {/* Masaje con cuencos */}
              <motion.div variants={fadeUp} custom={4} className="flex gap-4 p-6 bg-background rounded-xl border border-border">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Hand className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-2">Masaje con Cuencos</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-2">
                    Recostado sobre la cama terapéutica, arropado con una cobija, se colocan cuencos a nivel de corazón y vientre. Los cuencos se van golpeando gentilmente, permitiendo que experimentes una sanación y alineación de centros energéticos.
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs font-body text-primary">
                    <span className="bg-primary/10 px-3 py-1 rounded-full">40-50 minutos</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full">Ropa cómoda</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full">Calcetas</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Detalles */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="flex gap-4 p-6 bg-background rounded-xl border border-border hover:border-primary/30 hover:shadow-mystical transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">Modalidad</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">Exclusivamente presencial</p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeUp}
              custom={1}
              className="flex gap-4 p-6 bg-background rounded-xl border border-border hover:border-primary/30 hover:shadow-mystical transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground mb-1">¿Quién puede tomarla?</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">Personas mayores de 15 años (menores acompañados por sus padres). También puede aplicarse en animales.</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Inversión */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            <motion.div variants={fadeUp} custom={0} className="bg-gradient-card rounded-2xl p-8 border-glow">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">¿Cómo agendar?</h3>
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                Puedes comunicarte por <strong className="text-foreground">llamada telefónica</strong> al <strong className="text-primary">771 143 91 16</strong> donde rápida y fácilmente, encontraremos un espacio en la agenda que sea conveniente para ambas partes.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="bg-gradient-card rounded-2xl p-8 border-glow">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-gold" />
                <h3 className="font-display text-xl font-semibold text-foreground">Inversión</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-body text-xs text-muted-foreground mb-1">Sesión individual</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-gradient-gold">$600</span>
                    <span className="font-body text-muted-foreground text-sm">MXN</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="font-body text-xs text-muted-foreground">
                    Sesión grupal: Dependiendo del tamaño del grupo y ubicación.
                  </p>
                </div>
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

export default CuencosTibetanos;
