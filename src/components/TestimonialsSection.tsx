"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Quote, Sparkles, Heart, MessageCircle, CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { contact } from "@/lib/contact";

const categories = [
  { id: "todos", label: "Todas las reseñas" },
  { id: "psicoterapia", label: "Psicoterapia" },
  { id: "sanacion-energetica", label: "Sanación Energética" },
  { id: "animales", label: "Sanación Animal" },
  { id: "holistico", label: "Espiritualidad & Duelo" },
] as const;

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

const SparkleDecor = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 0 14.5 9.5 24 12 14.5 14.5 12 24 9.5 14.5 0 12 9.5 9.5Z" />
  </svg>
);

const whatsappCTAUrl = `${contact.whatsappUrl}?text=${encodeURIComponent(
  "Hola Eveline, leí los testimonios en tu página y me gustaría recibir información para comenzar mi proceso."
)}`;

const TestimonialsSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const filteredTestimonials =
    activeCategory === "todos"
      ? testimonials
      : testimonials.filter((t) => t.category === activeCategory);

  return (
    <section id="testimonios" className="py-24 bg-gradient-section relative overflow-hidden">
      {/* Decorative celestial background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-[8%] w-4 h-4 text-gold animate-twinkle">
          <SparkleDecor className="w-full h-full" />
        </div>
        <div className="absolute top-1/3 right-[5%] w-6 h-6 text-gold-light/70 animate-float">
          <SparkleDecor className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 left-[12%] w-5 h-5 text-primary/40 animate-twinkle">
          <SparkleDecor className="w-full h-full" />
        </div>
        <div className="absolute bottom-10 right-[15%] w-4 h-4 text-gold/60 animate-float">
          <SparkleDecor className="w-full h-full" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={sectionRef}>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-body text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Testimonios & Reseñas</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Palabras del <span className="text-gradient-gold">Corazón</span>
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Experiencias reales de quienes han transformado su bienestar, sanado heridas profundas
            y encontrado paz a través del acompañamiento de Eveline.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-3xl mx-auto">
            {categories.map((category) => {
              const isSelected = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-body font-medium transition-all duration-300 ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-md scale-105"
                      : "bg-white/80 hover:bg-white text-muted-foreground hover:text-foreground border border-border"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredTestimonials.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative bg-gradient-card rounded-2xl p-7 md:p-8 border-glow hover:scale-[1.02] transition-all duration-500 flex flex-col justify-between h-full shadow-sm hover:shadow-mystical"
              >
                {/* Background Watermark Quote */}
                <Quote
                  className="absolute top-6 right-6 w-12 h-12 text-primary/10 pointer-events-none group-hover:text-primary/15 transition-colors"
                  aria-hidden
                />

                <div>
                  {/* Top Bar: Stars + Category Chip */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1 text-gold" aria-label="Calificación 5 de 5 estrellas">
                      {[...Array(item.stars)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <span className="text-[11px] font-body font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/15">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Highlight Motto / Quote */}
                  {item.highlight && (
                    <h3 className="font-display text-base font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                      &ldquo;{item.highlight}&rdquo;
                    </h3>
                  )}

                  {/* Content Paragraphs */}
                  <div className="font-body text-sm text-foreground/80 leading-relaxed space-y-3 mb-6">
                    {item.content.split("\n\n").map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-justify sm:text-left">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Author Info Card Footer */}
                <div className="pt-4 border-t border-border/80 flex items-center gap-3.5">
                  <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-primary to-purple-glow text-white font-display font-semibold text-sm flex items-center justify-center ring-2 ring-gold/40 shadow-sm shrink-0">
                    {getInitials(item.name)}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-sm text-foreground">
                      {item.name}
                    </h4>
                    {item.fullName && item.fullName !== item.name && (
                      <p className="font-body text-xs text-muted-foreground">
                        {item.fullName}
                      </p>
                    )}
                    {item.role && (
                      <p className="font-body text-xs text-primary/90 font-medium">
                        {item.role}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Call to Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-white/90 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-primary/20 shadow-mystical max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
            <Heart className="w-6 h-6 text-primary fill-primary/20" />
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            ¿Lista para comenzar tu camino de sanación?
          </h3>
          <p className="text-muted-foreground font-body text-sm md:text-base max-w-xl mx-auto mb-6 leading-relaxed">
            Permítete recibir el acompañamiento respetuoso, profesional y amoroso que necesitas para volver a ti.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappCTAUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold text-white text-sm transition-all duration-300 shadow-md hover:scale-105"
              style={{ backgroundColor: "#25D366" }}
            >
              <MessageCircle className="w-4 h-4" />
              Escribir por WhatsApp
            </a>
            <Link
              href="/citas"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold bg-primary text-primary-foreground text-sm transition-all duration-300 shadow-mystical hover:bg-purple-glow hover:scale-105"
            >
              <CalendarDays className="w-4 h-4" />
              Agendar una Cita
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
