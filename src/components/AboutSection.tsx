"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre-mi" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border-glow">
              <Image
                src="/assets/eveline-portrait.jpg"
                alt="Eveline Dublán"
                width={800}
                height={1000}
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-primary/20 rounded-full animate-glow-pulse" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">
              Conóceme
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Soy <span className="text-gradient-purple">Eveline Dublán</span>
            </h2>
            <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
              <p>
                Psicoterapeuta y Terapeuta Holística de Humanos y Animales. Mi
                misión es acompañarte en tu proceso de sanación y florecimiento
                personal.
              </p>
              <p>
                A través de diversas herramientas como la psicoterapia, sanación
                energética, cuencos tibetanos y meditaciones guiadas, te ayudo a
                encontrar el equilibrio entre cuerpo, mente y espíritu.
              </p>
              <p className="text-primary italic font-display text-lg">
                "Cada persona lleva dentro la luz necesaria para sanar. Mi
                trabajo es ayudarte a descubrirla."
              </p>
            </div>
            <a
              href="#contacto"
              className="inline-block mt-8 px-6 py-3 bg-primary text-primary-foreground font-body font-medium rounded-lg transition-all duration-300 hover:bg-purple-glow hover:scale-105"
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
