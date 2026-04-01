import { motion } from "framer-motion";
import { PawPrint, Video, Clock, CalendarCheck, Camera, DollarSign, ArrowLeft, Phone, AlertTriangle } from "lucide-react";
import animalesHero from "@/assets/sanacion-animales-hero.jpg";
import sanacionAnimalesImg from "@/assets/sanacion-animales.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }),
};

const SanacionAnimales = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={animalesHero} alt="Sanación para Animales" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(275,55%,25%,0.88) 0%, hsla(270,30%,12%,0.82) 50%, hsla(275,60%,35%,0.85) 100%)" }} />
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-16 right-[25%] w-24 h-24 rounded-full border border-dashed"
            style={{ borderColor: "hsla(42, 70%, 62%, 0.2)" }}
          />

          {/* Paw print path */}
          <motion.div
            animate={{ y: [-5, 8, -5], rotate: [0, 10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute top-16 left-[65%]"
          >
            <PawPrint className="w-8 h-8" style={{ color: "hsla(42, 70%, 62%, 0.25)" }} />
          </motion.div>

          <motion.div
            animate={{ rotate: [45, 225, 45], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-24 left-[15%] w-12 h-12 border-2"
            style={{ borderColor: "hsla(42, 70%, 62%, 0.25)", transform: "rotate(45deg)" }}
          />

          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-16 right-[8%] w-28 h-28 rounded-full border-2 border-dashed"
            style={{ borderColor: "hsla(270, 30%, 65%, 0.2)" }}
          />

          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-24 left-[50%] w-3 h-3 rounded-full"
            style={{ background: "hsl(42, 70%, 62%)" }}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            className="absolute bottom-32 left-[40%] w-2 h-2 rounded-full"
            style={{ background: "hsl(275, 60%, 65%)" }}
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
              <PawPrint className="w-10 h-10 text-gold" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold mb-4"
            style={{ color: "hsl(0 0% 100%)" }}
          >
            Sanación para Animales
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-body text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "hsla(0, 0%, 100%, 0.75)" }}
          >
            Sanación energética luminosa para tu compañero animal
          </motion.p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z" fill="hsl(var(--background))" />
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
            <div className="md:col-span-3 space-y-6">
              <motion.p variants={fadeUp} custom={0} className="font-body text-lg text-foreground leading-relaxed">
                En este servicio, a través de diversas técnicas de <strong className="text-primary">sanación energética</strong>, todas ellas luminosas, trabajaremos con las situaciones que tu compañero animal necesite.
              </motion.p>
            </div>
            <motion.div variants={fadeUp} custom={1} className="md:col-span-2">
              <img
                src={sanacionAnimalesImg}
                alt="Sanación para animales"
                className="rounded-2xl shadow-mystical w-full object-cover border border-border"
              />
            </motion.div>
          </motion.div>

          {/* ¿Qué pasa en una sesión? */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-section rounded-2xl p-8 md:p-12 border border-border mb-12"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              ¿Qué pasa en una sesión de <span className="text-gradient-gold">Sanación para Animales</span>?
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="font-body text-muted-foreground leading-relaxed mb-4">
              Al iniciar, me conecto con tu compañero animal y sus guías luminosos, me presento con ellos y solicito todos los permisos para realizar el trabajo en perfecto orden y sostenidos por la luz.
            </motion.p>
            <motion.p variants={fadeUp} custom={2} className="font-body text-muted-foreground leading-relaxed mb-4">
              Suelo realizar una limpieza energética inicial con palo santo con el propósito de retirar la energía densa y discordante del día a día.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="font-body text-muted-foreground leading-relaxed mb-4">
              Comenzamos a interactuar energética e intuitivamente con tu compañero animal para que se sienta cómodo y confiado. Ellos, al igual que nosotros, tienen personalidades variadas, algunos tímidos, otros extrovertidos, por ello, debemos ir acercándonos poco a poco.
            </motion.p>
            <motion.p variants={fadeUp} custom={4} className="font-body text-muted-foreground leading-relaxed mb-4">
              Después, la persona nos expone el motivo de la consulta para su compañero animal y junto con sus guías, vamos revisando e interactuando con él/ella para saber cómo se siente, qué percibe de la situación que está viviendo, de su familia, etc.
            </motion.p>
            <motion.p variants={fadeUp} custom={5} className="font-body text-muted-foreground leading-relaxed mb-6">
              Una vez identificado el origen, se procede a la sanación con la técnica que mejor se acomode al proceso.
            </motion.p>
            <motion.div variants={fadeUp} custom={6} className="inline-flex items-center gap-3 bg-primary/10 rounded-xl px-6 py-3 border border-primary/20">
              <span className="text-2xl">🐾</span>
              <p className="font-display text-primary font-semibold">Sanación guiada por los guías luminosos de tu compañero animal.</p>
            </motion.div>
          </motion.div>

          {/* ¿Qué necesito? */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
              ¿Qué necesito para la sesión?
            </motion.h2>
            <div className="space-y-4">
              {[
                "Enviar su nombre y una foto donde se vea su carita lo mejor posible. Si tu compañero animal ya trascendió, puede ser la última foto que tienes de él/ella.",
                "Se sugiere tener un tema máximo para la sesión. Es preferible abordar un solo tema y trabajarlo a profundidad.",
                "No es necesario que tu compañero asista al consultorio o esté junto a ti si es consulta online. El proceso puede darse sin importar el lugar donde se encuentre.",
              ].map((text, i) => (
                <motion.div key={i} variants={fadeUp} custom={i + 1} className="flex gap-3 p-4 bg-background rounded-xl border border-border">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-display text-sm font-bold text-primary">{i + 1}</span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Aspectos importantes */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-section rounded-2xl p-8 md:p-12 border border-border mb-12"
          >
            <motion.h2 variants={fadeUp} custom={0} className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <AlertTriangle className="w-7 h-7 text-gold" />
              Aspectos importantes del proceso
            </motion.h2>
            <div className="space-y-4">
              {[
                "Para realizar el proceso, es necesario que el responsable directo del compañero animal esté de acuerdo, realice la cita y acuda al proceso.",
                "Debemos tener el permiso del responsable, del animal y de sus guías. No podemos invadir la privacidad de otros.",
                "Hay que ser pacientes, no todos los animales están listos para hablar y confiar inmediatamente. Algunos tienen historias dolorosas con los humanos.",
                "Se puede realizar sanación y contacto con animales que ya trascendieron, sin embargo, no todos pueden estar disponibles. No se realiza ningún proceso donde se vea sometida la voluntad de ningún ser.",
                "La sanación tiene el objetivo de apoyar sus procesos, pero ellos también tienen voluntad y pueden elegir caminos diferentes.",
                "Se puede acompañar en el proceso de eutanasia, tanto para tomar la decisión como para acompañar la trascendencia.",
                "Con compañeros animales con situación clínica complicada, se sugiere una sesión grabada para mayor flexibilidad.",
              ].map((text, i) => (
                <motion.div key={i} variants={fadeUp} custom={i + 1} className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Detalles de la sesión */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {[
              { icon: Video, title: "Modalidades", desc: "Presencial (en pausa temporal), Online por Zoom o Facetime, y Sesión grabada (audios por WhatsApp)" },
              { icon: Clock, title: "Duración", desc: "50-60 minutos por sesión" },
              { icon: Camera, title: "Requisitos", desc: "Enviar nombre y foto del compañero animal. Espacio privado, silencioso, buena conexión a internet y audífonos" },
              { icon: CalendarCheck, title: "¿Quién puede tomarla?", desc: "Todas las especies animales, domésticos y exóticos. Vivos o trascendidos." },
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
            <motion.div variants={fadeUp} custom={0} className="bg-gradient-card rounded-2xl p-8 border-glow">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">¿Cómo agendar?</h3>
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                Puedes llamar por teléfono al <strong className="text-primary">771 143 91 16</strong> donde rápida y fácilmente, encontraremos un espacio en la agenda.
              </p>
              <p className="font-body text-xs text-muted-foreground italic">
                Es indispensable que el responsable directo del animal sea quien agende su cita personalmente.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} custom={1} className="bg-gradient-card rounded-2xl p-8 border-glow">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-gold" />
                <h3 className="font-display text-xl font-semibold text-foreground">Inversión</h3>
              </div>
              <div className="space-y-3">
                <p className="font-body text-xs text-muted-foreground mb-2">Únicamente servicio online</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-gradient-gold">$700</span>
                  <span className="font-body text-muted-foreground text-sm">MXN</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-xl font-semibold text-foreground">$36</span>
                  <span className="font-body text-muted-foreground text-sm">USD</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Urgencias */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary/5 rounded-2xl p-8 border border-primary/20 mb-16"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-gold" />
              Citas de urgencia
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-2">
              Una urgencia se considera cuando el animal se encuentra en un proceso de enfermedad repentina, que tengamos que tomar una decisión de eutanasia en las siguientes horas, o un viaje inesperado que requiera una sanación.
            </p>
            <p className="font-body text-sm text-muted-foreground font-medium">
              No trabajamos con animales extraviados. Comunicarse por llamada telefónica al mismo número.
            </p>
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

export default SanacionAnimales;
