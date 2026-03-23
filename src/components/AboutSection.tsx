import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import evelineImg from "@/assets/eveline-portrait.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre-mi" className="py-24 bg-gradient-mystical relative">
      <div className="container mx-auto px-6">
        <div ref={ref} className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border-glow">
              <img
                src={evelineImg}
                alt="Eveline Dublán"
                loading="lazy"
                width={800}
                height={1000}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-accent/30 rounded-full animate-glow-pulse" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-accent font-body text-sm tracking-[0.2em] uppercase mb-3">
              Conóceme
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Soy <span className="text-gradient-purple">Eveline Dublán</span>
            </h2>
            <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
              <p>
                Psicoterapeuta y Terapeuta Holística de Humanos y Animales. Mi misión es 
                acompañarte en tu proceso de sanación y florecimiento personal.
              </p>
              <p>
                A través de diversas herramientas como la psicoterapia, sanación energética, 
                cuencos tibetanos y meditaciones guiadas, te ayudo a encontrar el equilibrio 
                entre cuerpo, mente y espíritu.
              </p>
              <p className="text-accent italic font-display text-lg">
                "Cada persona lleva dentro la luz necesaria para sanar. 
                Mi trabajo es ayudarte a descubrirla."
              </p>
            </div>
            <a
              href="#contacto"
              className="inline-block mt-8 px-6 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-body font-medium rounded-lg transition-all duration-300 border border-border hover:border-accent/30"
            >
              Agenda tu Sesión
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
