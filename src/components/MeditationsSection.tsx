"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Headphones, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MeditationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="meditaciones" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-primary font-body text-sm tracking-[0.2em] uppercase mb-3">
            Meditaciones
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Luz de <span className="text-gradient-purple">Luna</span>
          </h2>
          <p className="text-muted-foreground font-body max-w-2xl mx-auto">
            Meditaciones guiadas para nutrir tu alma y conectar con la energía
            universal. Encuentra el catálogo completo en la sección de
            Meditaciones.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Headphones className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground font-body mb-8">
            Protección, conexión interior, sanación del corazón, limpieza
            energética y más series guiadas te esperan.
          </p>
          <Link href="/meditaciones">
            <Button
              size="lg"
              className="rounded-full font-body gap-2 shadow-mystical"
            >
              Ver meditaciones
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MeditationsSection;
