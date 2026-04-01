import { motion } from "framer-motion";
import { Moon, BookOpen, Gem, Leaf, Flame, Wand2, Sparkles, Star, ArrowLeft } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import luzDeLunaLogo from "@/assets/luz-de-luna-logo.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }),
};

const spaces = [
  {
    icon: BookOpen,
    title: "Espacio de Lectura, Oráculos y Meditación",
    desc: "Libros mágicos, oráculos de distintas autoras, cojines suaves y zafus. Consulta literatura, realiza preguntas a los oráculos y canaliza el diseño de tus objetos mágicos. Los objetos de este espacio son exclusivos de consulta en el lugar.",
  },
  {
    icon: Gem,
    title: "Cuarzos",
    desc: "Selección de cuarzos limpios y energizados, listos para vibrar contigo de forma individual, unirse a un grupo de piedras, integrarse a tus brisas o formar parte de tu nueva Crystal Grid.",
  },
  {
    icon: Leaf,
    title: "Hierbas Mágicas",
    desc: "Conviértete en bruja o brujo verde. Hierbas y esencias herbales listas para crear resguardos energéticos, baños de limpieza, sanación, abundancia, coronas y escobas para el hogar.",
  },
  {
    icon: Sparkles,
    title: "Crystal Grids",
    desc: "Rejillas de madera, símbolos sagrados, cuarzos, aceites e inciensos dan vida a tu práctica para sanar, limpiar, proteger y abrir caminos. Puedes elegir rejillas probadas o diseñar la tuya.",
  },
  {
    icon: Star,
    title: "Brisas y Pociones",
    desc: "La alquimia y la magia se unen para crear brisas de protección, sanación, armonización, limpieza energética, amor propio, creatividad y concentración.",
  },
  {
    icon: Flame,
    title: "Velas",
    desc: "De miel, cera de miel, soya y coco. Vístelas con hierbas y miel, dibuja símbolos, báñalas en aceite, envuélvelas en hojas y corta cordones con el trabajo del fuego.",
  },
  {
    icon: Wand2,
    title: "Mesa de Trabajo",
    desc: "Conecta con tus guías y guardianas para dar vida a tu objeto de poder. Comparte experiencias, historias mágicas y cuentos Zen, o trabaja en silencio.",
  },
  {
    icon: Moon,
    title: "Artículos Mágicos",
    desc: "Coronas de protección, campanas, spell jars, escobas de hierbas, coronas de cuarzo, stickers de sellos, sigilos y símbolos mágicos. Nuevas creaciones luna a luna.",
  },
];

const LuzDeLuna = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(250,40%,15%,0.92) 0%, hsla(270,30%,10%,0.88) 50%, hsla(260,50%,20%,0.90) 100%)" }} />
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute top-20 right-[20%]">
            <Moon className="w-8 h-8 text-primary/15" />
          </motion.div>
          <motion.div animate={{ y: [-10, 10, -10], scale: [1, 1.3, 1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-32 left-[15%] w-3 h-3 bg-primary/30 rounded-full blur-sm" />
          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-36 right-[30%] w-2 h-2 bg-accent/40 rounded-full" />
          {[...Array(10)].map((_, i) => (
            <motion.div key={i} className="absolute w-1 h-1 bg-white/30 rounded-full" style={{ top: `${10 + Math.random() * 75}%`, left: `${5 + Math.random() * 90}%` }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }} />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-body text-sm">
              <ArrowLeft className="w-4 h-4" /> Volver al inicio
            </Link>
          </motion.div>

          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <img src={luzDeLunaLogo} alt="Luz de Luna" className="w-48 h-auto mx-auto mb-8 drop-shadow-2xl" />
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              Luz de <span className="text-gradient-gold">Luna</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-white/80 font-body max-w-3xl mx-auto leading-relaxed">
              Tienda y espacio de conexión espiritual que se manifiesta físicamente una luna al mes para recibir a quienes buscan objetos de poder para su práctica espiritual.
            </motion.p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,64 C480,120 960,0 1440,64 L1440,120 L0,120 Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Description */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              <em>Luz de Luna</em> es una tienda y espacio de conexión espiritual que existe todo el mes, pero que se manifiesta físicamente una luna al mes. Los objetos pueden estar diseñados y manifestados por la creadora, Eveline Dublán, o bien, las personas pueden venir a canalizarlos, diseñarlos, elaborarlos y consagrarlos en la tienda. No es solamente una tienda, sino un lugar de creación y acompañamiento.
            </p>
          </motion.div>

          {/* Spaces grid */}
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Espacios de la <span className="text-gradient-gold">Tienda</span>
            </motion.h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {spaces.map((space, i) => (
                <motion.div key={space.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="bg-gradient-card rounded-xl p-6 border-glow hover:scale-[1.02] transition-all duration-500">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <space.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-2">{space.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{space.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Link to Cuarzos */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="text-center mt-16">
            <Link to="/luz-de-luna/cuarzos-y-cristales">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Gem className="w-5 h-5" /> Ver Guía de Cuarzos y Cristales
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LuzDeLuna;
