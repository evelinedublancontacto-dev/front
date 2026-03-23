import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Clock, Star } from "lucide-react";

const meditations = [
  { title: "Meditación de Protección", duration: "15 min", level: "Todos los niveles" },
  { title: "Conexión con tu Ser Interior", duration: "20 min", level: "Intermedio" },
  { title: "Sanación del Corazón", duration: "25 min", level: "Todos los niveles" },
  { title: "Limpieza Energética", duration: "18 min", level: "Principiante" },
];

const MeditationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="meditaciones" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">Meditaciones</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Luz de <span className="text-gradient-purple">Luna</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">Meditaciones guiadas para nutrir tu alma y conectar con la energía universal.</p>
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {meditations.map((med, i) => (
            <motion.div
              key={med.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="flex items-center gap-5 bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 group cursor-pointer shadow-sm"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Play className="w-5 h-5 text-primary ml-0.5" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{med.title}</h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {med.duration}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {med.level}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeditationsSection;
