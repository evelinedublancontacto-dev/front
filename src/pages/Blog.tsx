import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts, categories } from "@/data/blogPosts";
import heroBg from "@/assets/hero-bg.jpg";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered =
    activeCategory === "Todos"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  const categoryColors: Record<string, string> = {
    Psicoterapia: "bg-primary/15 text-primary",
    Meditación: "bg-accent/15 text-accent",
    "Sanación Energética": "bg-purple-glow/15 text-purple-glow",
    Bienestar: "bg-gold/15 text-gold",
    Animales: "bg-lavender/15 text-lavender",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero header */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt=""
            width={1920}
            height={600}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, hsla(270,30%,12%,0.7) 0%, hsla(270,30%,12%,0.85) 100%)",
            }}
          />
        </div>

        {/* Floating shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [0, 360] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[10%] w-14 h-14 rounded-full border-2"
            style={{ borderColor: "hsla(42,70%,62%,0.25)" }}
          />
          <motion.div
            animate={{ y: [6, -10, 6], scale: [1, 1.15, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-32 right-[12%] w-20 h-20 rounded-full"
            style={{ background: "hsla(275,55%,45%,0.08)" }}
          />
          <motion.div
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-24 left-[20%] w-24 h-24 rounded-full border border-dashed"
            style={{ borderColor: "hsla(42,70%,62%,0.15)" }}
          />
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gold-light animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="w-4 h-4" style={{ color: "hsl(42 70% 62%)" }} />
            <span
              className="font-body text-sm tracking-[0.25em] uppercase"
              style={{ color: "hsl(42 70% 62%)" }}
            >
              Reflexiones & Bienestar
            </span>
            <Sparkles className="w-4 h-4" style={{ color: "hsl(42 70% 62%)" }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-display text-4xl md:text-6xl font-bold mb-4"
          >
            <span className="text-gradient-gold">Blog</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-body text-lg max-w-2xl mx-auto"
            style={{ color: "hsl(270 30% 80%)" }}
          >
            Artículos sobre psicoterapia, meditación, sanación energética y
            herramientas para tu bienestar integral.
          </motion.p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
              fill="hsl(270 20% 98%)"
            />
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-6 -mt-6 relative z-20">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-mystical"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block h-full bg-card rounded-2xl border border-border overflow-hidden hover:shadow-mystical hover:border-primary/20 transition-all duration-500"
              >
                {/* Color banner placeholder */}
                <div
                  className="h-48 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--gold) / 0.1))`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles
                      className="w-10 h-10 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                      style={{ color: "hsl(var(--primary))" }}
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-body font-semibold ${
                        categoryColors[post.category] ?? "bg-muted text-muted-foreground"
                      }`}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 font-body text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString("es-MX", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-1 font-body text-sm font-medium text-primary group-hover:gap-2 transition-all duration-300">
                    Leer más <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center font-body text-muted-foreground py-20">
            No hay artículos en esta categoría aún.
          </p>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
