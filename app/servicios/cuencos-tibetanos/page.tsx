"use client";
import { motion } from "framer-motion";
import { Music, MapPin, Clock, CalendarCheck, DollarSign, ArrowLeft, Phone, Sparkles, CalendarDays } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { contact } from "@/lib/contact";
import AgendaEnLinea from "@/components/AgendaEnLinea";
import Link from "next/link";
import TwinkleStars from "@/components/TwinkleStars";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }),
};

const CuencosTibetanos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/assets/cuencos-tibetanos-hero.jpg" alt="Cuencos Tibetanos" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(275,55%,25%,0.88) 0%, hsla(270,30%,12%,0.82) 50%, hsla(275,60%,35%,0.85) 100%)" }} />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div animate={{ y: [-10, 10, -10], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 left-[10%] w-20 h-20 rounded-full" style={{ background: "radial-gradient(circle, hsla(42, 70%, 62%, 0.3), transparent)" }} />
          <motion.div animate={{ y: [8, -12, 8], x: [-5, 5, -5] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-28 right-[15%] w-14 h-14 rounded-full" style={{ background: "radial-gradient(circle, hsla(275, 60%, 55%, 0.25), transparent)" }} />
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-16 right-[25%] w-24 h-24 rounded-full border border-dashed" style={{ borderColor: "hsla(42, 70%, 62%, 0.2)" }} />
          <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-32 left-[35%]" />
          <motion.div animate={{ x: [-15, 15, -15] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-28 right-[10%]" />
          <motion.div animate={{ rotate: [45, 225, 45], scale: [1, 1.1, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 left-[40%] w-10 h-10 border-2" style={{ borderColor: "hsla(42, 70%, 62%, 0.2)", transform: "rotate(45deg)" }} />
          <TwinkleStars count={12} topMin={10} topRange={80} />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-mystical">
              <Image
                src="/assets/icons/services/cuencos-tibetanos.svg"
                alt="Cuencos Tibetanos"
                width={48}
                height={48}
                className="w-12 h-12 object-contain filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
              />
            </div>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="font-display text-5xl md:text-7xl font-bold mb-4" style={{ color: "hsl(0 0% 100%)" }}>Cuencos Tibetanos</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }} className="font-body text-lg md:text-xl max-w-2xl mx-auto" style={{ color: "hsl(270 30% 85%)" }}>Sanación sonora · Vibración · Armonización energética</motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z" fill="hsl(270 20% 98%)" />
          </svg>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link href="/#servicios" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body text-sm mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Volver a servicios
          </Link>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-6 mb-16">
            <motion.p variants={fadeUp} custom={0} className="font-body text-lg text-foreground leading-relaxed">
              Los <strong className="text-primary">cuencos tibetanos</strong> son instrumentos milenarios utilizados en prácticas de sanación sonora. Su vibración penetra en cada célula del cuerpo, liberando bloqueos energéticos y restaurando el equilibrio.
            </motion.p>
            <motion.p variants={fadeUp} custom={1} className="font-body text-muted-foreground leading-relaxed">
              La terapia con cuencos tibetanos es un viaje profundo hacia la paz interior, donde las ondas sonoras actúan como un puente entre el cuerpo físico y los cuerpos sutiles.
            </motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-gradient-section rounded-2xl p-8 md:p-12 border border-border mb-12">
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">¿Qué pasa en una sesión de <span className="text-gradient-gold">Cuencos Tibetanos</span>?</motion.h2>
            <motion.p variants={fadeUp} custom={1} className="font-body text-muted-foreground leading-relaxed mb-4">La sesión comienza con una consulta inicial para conocer tu momento presente. Luego, te acuestas cómodamente y los cuencos se colocan directamente sobre tu cuerpo o a su alrededor.</motion.p>
            <motion.p variants={fadeUp} custom={2} className="font-body text-muted-foreground leading-relaxed mb-6">Las vibraciones penetran profundamente, liberando tensiones y permitiendo que tu cuerpo entre en un estado de profunda relajación y sanación.</motion.p>
            <motion.div variants={fadeUp} custom={3} className="inline-flex items-center gap-3 bg-primary/10 rounded-xl px-6 py-3 border border-primary/20">
              <span className="text-2xl">🔔</span>
              <p className="font-display text-primary font-semibold">Experimentarás una relajación profunda desde el inicio.</p>
            </motion.div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: MapPin, title: "Modalidad", desc: "Presencial (únicamente viernes)" },
              { icon: Clock, title: "Duración", desc: "45-60 minutos por sesión" },
              { icon: Sparkles, title: "Beneficios", desc: "Reducción de estrés, mejor sueño, equilibrio energético" },
              { icon: CalendarCheck, title: "¿Quién puede tomarla?", desc: "Cualquier persona, no se requiere experiencia previa" },
            ].map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} custom={i} className="flex gap-4 p-6 bg-background rounded-xl border border-border hover:border-primary/30 hover:shadow-mystical transition-all duration-300">
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 gap-6 mb-16">
            <motion.div variants={fadeUp} custom={0} className="bg-gradient-card rounded-2xl p-8 border-glow">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">¿Cómo agendar?</h3>
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                Puedes comunicarte por <strong className="text-foreground">llamada telefónica</strong> al <strong className="text-primary">771 143 91 16</strong> para encontrar un espacio conveniente.
              </p>
              <AgendaEnLinea />
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="bg-gradient-card rounded-2xl p-8 border-glow">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-gold" />
                <h3 className="font-display text-xl font-semibold text-foreground">Inversión</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-gradient-gold">$600</span>
                  <span className="font-body text-muted-foreground text-sm">MXN</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-xl font-semibold text-foreground">$30</span>
                  <span className="font-body text-muted-foreground text-sm">USD aprox.</span>
                </div>
                <p className="font-body text-xs text-muted-foreground pt-2 border-t border-border">Depósito bancario, transferencia u Oxxo</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={contact.telUrl}>
              <Button size="lg" className="font-body text-base px-10 py-6 rounded-full shadow-mystical">
                <Phone className="w-5 h-5 mr-2" /> Llamar para agendar
              </Button>
            </a>
            <Link href="/citas">
              <Button
                size="lg"
                variant="outline"
                className="font-body text-base px-10 py-6 rounded-full border-primary/40 hover:bg-primary/10"
              >
                <CalendarDays className="w-5 h-5 mr-2" />
                Agendar en línea
              </Button>
            </Link>
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="font-body text-base px-10 py-6 rounded-full flex items-center gap-2"
              >
                <Image
                  src="/assets/icons/whatsapp.png"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
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

export default CuencosTibetanos;
