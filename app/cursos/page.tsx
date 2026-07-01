"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Play, ArrowLeft, Search } from "lucide-react";
import Image from "next/image";
import { courses, courseCategories } from "@/data/courses";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import MotionStars from "@/components/MotionStars";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }),
};

const Cursos = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = courses.filter((c) => {
    const matchCategory = activeCategory === "Todos" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/assets/hero-bg.jpg" alt="" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(275,55%,25%,0.90) 0%, hsla(270,30%,12%,0.85) 50%, hsla(275,60%,35%,0.88) 100%)" }} />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <MotionStars count={8} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
            <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-body text-sm">
              <ArrowLeft className="w-4 h-4" /> Volver al inicio
            </Link>
          </motion.div>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <BookOpen className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
              Explora Nuestros <span className="text-gradient-gold">Cursos</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-white/80 font-body max-w-2xl mx-auto leading-relaxed">
              Aprende a tu ritmo con cursos diseñados para acompañarte en tu camino de crecimiento y sanación espiritual.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0,64 C480,120 960,0 1440,64 L1440,120 L0,120 Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gradient-card border border-border font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="flex flex-wrap justify-center gap-3 mb-12">
              {["Todos", ...courseCategories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-gradient-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((course, i) => (
                <motion.div key={course.slug} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i % 6} variants={fadeUp}>
                  <Link href={`/cursos/${course.slug}`} className="block group">
                    <div className="bg-gradient-card rounded-2xl border-glow overflow-hidden hover:scale-[1.02] transition-all duration-500">
                      <div className="relative aspect-square overflow-hidden">
                        <Image src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" width={600} height={600} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-body font-medium bg-primary/90 text-primary-foreground">
                          {course.category}
                        </span>
                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs font-body">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                          <span className="flex items-center gap-1"><Play className="w-3.5 h-3.5" /> {course.lessons} Lecciones</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{course.title}</h3>
                        <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4 line-clamp-2">{course.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-gradient-gold">{course.price}</span>
                          <span className="text-xs text-muted-foreground font-body">{course.priceUsd}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground font-body text-lg">No se encontraron cursos con esos criterios.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cursos;
