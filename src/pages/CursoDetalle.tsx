import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Play, BookOpen, Phone, CheckCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { courses } from "@/data/courses";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }),
};

const CursoDetalle = () => {
  const { slug } = useParams<{ slug: string }>();
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Curso no encontrado</h1>
          <Link to="/cursos" className="text-primary hover:underline font-body">Volver a cursos</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={course.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, hsla(275,55%,25%,0.92) 0%, hsla(270,30%,12%,0.88) 50%, hsla(275,60%,35%,0.90) 100%)" }} />
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div key={i} className="absolute w-1 h-1 bg-white/30 rounded-full" style={{ top: `${15 + Math.random() * 70}%`, left: `${5 + Math.random() * 90}%` }} animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }} transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }} />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6">
            <Link to="/cursos" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-body text-sm">
              <ArrowLeft className="w-4 h-4" /> Volver a cursos
            </Link>
          </motion.div>

          <div className="max-w-4xl mx-auto text-center">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-body mb-6">
              {course.category}
            </motion.span>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              {course.title}
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex items-center justify-center gap-6 text-white/80 font-body text-sm">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {course.duration}</span>
              <span className="flex items-center gap-2"><Play className="w-4 h-4" /> {course.lessons} Lecciones</span>
            </motion.div>
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
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp}>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">Acerca del Curso</h2>
                <p className="text-muted-foreground font-body leading-relaxed text-lg">{course.longDescription}</p>
              </motion.div>

              {/* Video Lessons */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Contenido del <span className="text-gradient-gold">Curso</span>
                </h2>

                <div className="space-y-4">
                  {course.videos.map((video, i) => (
                    <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="bg-gradient-card rounded-xl border-glow overflow-hidden">
                      {/* Video embed placeholder */}
                      {video.url ? (
                        <div className="aspect-video">
                          <iframe
                            src={video.url}
                            title={video.title}
                            className="w-full h-full"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-muted/30 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                              <Play className="w-8 h-8 text-primary" />
                            </div>
                            <p className="text-muted-foreground font-body text-sm">Video próximamente</p>
                          </div>
                        </div>
                      )}

                      <div className="p-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                            {i + 1}
                          </span>
                          <h3 className="font-display text-base font-semibold text-foreground">{video.title}</h3>
                        </div>
                        <span className="text-muted-foreground font-body text-sm flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {video.duration}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeUp} className="sticky top-28">
                <div className="bg-gradient-card rounded-2xl border-glow p-8">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-3xl font-bold text-gradient-gold">{course.price}</span>
                    </div>
                    <span className="text-muted-foreground font-body text-sm">{course.priceUsd}</span>
                  </div>

                  <div className="space-y-4 mb-8">
                    {[
                      { icon: Clock, text: `Duración: ${course.duration}` },
                      { icon: Play, text: `${course.lessons} lecciones en video` },
                      { icon: BookOpen, text: "Acceso de por vida" },
                      { icon: CheckCircle, text: "Certificado de finalización" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground font-body text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <a href="https://wa.me/5215512345678" target="_blank" rel="noopener noreferrer" className="block">
                    <Button size="lg" className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Phone className="w-5 h-5" /> Inscribirme
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CursoDetalle;
