import { motion } from "framer-motion";
import { Brain, Video, Clock, Headphones, CalendarCheck, DollarSign, ArrowLeft, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }),
};

const Psicoterapia = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-deep/90 via-primary/80 to-purple-glow/70" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gold/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-lavender/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20">
              <Brain className="w-10 h-10 text-gold" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Psicoterapia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-body text-white/80 text-lg max-w-2xl mx-auto"
          >
            Psicoterapia Ericksoniana · Modelo centrado en soluciones · Terapia breve
          </motion.p>
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

          {/* Main description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 mb-16"
          >
            <motion.p variants={fadeUp} custom={0} className="font-body text-lg text-foreground leading-relaxed">
              <strong className="text-primary">La Psicoterapia</strong> es un proceso que se da entre el Psicoterapeuta y la persona, familia o pareja, que desean encontrar o construir nuevas y saludables formas de vivir, relacionarse o solucionar conflictos.
            </motion.p>
            <motion.p variants={fadeUp} custom={1} className="font-body text-muted-foreground leading-relaxed">
              En mi caso particular, trabajo con <strong className="text-foreground">Psicoterapia Ericksoniana</strong>, un modelo centrado en soluciones, <strong className="text-foreground">terapia breve</strong>. Sus técnicas son muy variadas, por ejemplo, la Hipnosis, sin embargo no es la única, el uso conjunto de varias de ellas, nos permitirá ir a la raíz de la situación y resolverla desde ahí, generando procesos efectivos, rápidos y amables.
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
              ¿Qué pasa en una sesión de <span className="text-gradient-gold">Psicoterapia</span>?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="font-body text-muted-foreground leading-relaxed mb-4">
              Lo más importante que ocurre, es que juntos vamos a construir el proceso que te permita estar, como para ti es bien, saludablemente.
            </motion.p>
            <motion.p variants={fadeUp} custom={2} className="font-body text-muted-foreground leading-relaxed mb-6">
              A partir del tema que tu desees trabajar en la sesión, realizaremos ejercicios construidos a tu medida, para transformar y sanar desde lo más profundo.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="inline-flex items-center gap-3 bg-primary/10 rounded-xl px-6 py-3 border border-primary/20">
              <span className="text-2xl">✨</span>
              <p className="font-display text-primary font-semibold">Notarás cambios desde la primera sesión.</p>
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
              { icon: Headphones, title: "Requisitos", desc: "Espacio privado, silencioso, buena conexión a internet y audífonos (indispensables)" },
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
                  <span className="font-display text-3xl font-bold text-gradient-gold">$600</span>
                  <span className="font-body text-muted-foreground text-sm">MXN</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-xl font-semibold text-foreground">$36</span>
                  <span className="font-body text-muted-foreground text-sm">USD</span>
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

export default Psicoterapia;
