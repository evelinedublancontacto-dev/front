import { motion } from "framer-motion";
import { Gem, ArrowLeft } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }),
};

const crystals = [
  { name: "Cuarzo Maestro", props: "Amplifica la energía, claridad mental, conexión con el universo, potencia la intención" },
  { name: "Cuarzo Cristal", props: "Amplifica la energía, claridad mental, conexión con el universo, potencia la intención" },
  { name: "Cuarzo Rosa", props: "Amor incondicional, sanación emocional, armonía en las relaciones, calma y serenidad" },
  { name: "Cuarzo Citrino", props: "Abundancia, prosperidad, confianza en sí mismo, energía positiva" },
  { name: "Cuarzo Amatista", props: "Protección, intuición, conexión con el subconsciente, calma y tranquilidad" },
  { name: "Turmalina Negra", props: "Protección contra la negatividad, absorbe la energía negativa, conexión con la tierra, estabilidad emocional" },
  { name: "Selenita", props: "Limpieza energética, conexión con la luna, intuición, claridad mental" },
  { name: "Cuarzo Lapislázuli", props: "Sabiduría, intuición, conexión con el universo, amplifica la percepción" },
  { name: "Ágata", props: "Estabilidad emocional, calma, protección, conexión con la tierra" },
  { name: "Fluorita", props: "Claridad mental, conexión con el universo, absorbe la energía negativa, calma y serenidad" },
  { name: "Ojo de Tigre", props: "Confianza en sí mismo, energía, pasión, protección y claridad mental" },
  { name: "Obsidiana", props: "Protección, conexión con la tierra, absorbe la energía negativa, claridad mental" },
  { name: "Acerina", props: "Calma, serenidad, conexión con la naturaleza, absorbe la energía negativa" },
  { name: "Turquesa Roja", props: "Pasión, energía, confianza en sí mismo, conexión con el corazón y la tierra" },
  { name: "Aventurina Azul", props: "Calma, serenidad, conexión con la naturaleza, claridad mental y protección" },
  { name: "Aventurina Café", props: "Estabilidad emocional, calma, protección, conexión con la tierra y la naturaleza" },
  { name: "Piedra Luna", props: "Conexión con el sagrado femenino, sanación de útero, amplificación de intuición" },
];

const CuarzosYCristales = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(280,45%,20%,0.92) 0%, hsla(270,30%,10%,0.88) 50%, hsla(290,50%,25%,0.90) 100%)" }} />
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div key={i} className="absolute w-1 h-1 bg-white/30 rounded-full" style={{ top: `${15 + Math.random() * 70}%`, left: `${5 + Math.random() * 90}%` }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }} />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
            <Link to="/luz-de-luna" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-body text-sm">
              <ArrowLeft className="w-4 h-4" /> Volver a Luz de Luna
            </Link>
          </motion.div>

          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Gem className="w-10 h-10 text-white" />
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              Cuarzos y <span className="text-gradient-gold">Cristales</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg text-white/80 font-body max-w-2xl mx-auto leading-relaxed">
              Propiedades mágicas de los cristales y cuarzos para tu práctica espiritual.
            </motion.p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,64 C480,120 960,0 1440,64 L1440,120 L0,120 Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Aquí te presento las propiedades de los cristales y cuarzos para que puedas hacer uso de su poder y conectar con ellos para realizar tus Crystal Grids, tubos canalizadores, resguardos y Spell Jars. Recuerda limpiarlos, intencionarlos y retirarlos a la tierra con agradecimiento cuando hayan cumplido con su misión.
            </p>
          </motion.div>

          {/* Crystal cards */}
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {crystals.map((crystal, i) => (
              <motion.div key={crystal.name} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 6} variants={fadeUp} className="bg-gradient-card rounded-xl p-6 border-glow hover:scale-[1.02] transition-all duration-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Gem className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground">{crystal.name}</h3>
                </div>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{crystal.props}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CuarzosYCristales;
