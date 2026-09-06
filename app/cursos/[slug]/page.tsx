"use client";

import { use, useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Play,
  Pause,
  Volume2,
  VolumeX,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Share2,
  Check,
  Award,
  Users,
  MessageCircle,
  HelpCircle,
  Flame,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Download,
} from "lucide-react";
import Image from "next/image";
import { courses, type Course } from "@/data/courses";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MotionStars from "@/components/MotionStars";
import Link from "next/link";
import { contact } from "@/lib/contact";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function CursoDetalle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const course = courses.find((c) => c.slug === slug);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Curso no encontrado
          </h1>
          <Link href="/cursos" className="text-primary hover:underline font-body">
            Volver a cursos
          </Link>
        </div>
      </div>
    );
  }

  const relatedCourses = courses
    .filter((c) => c.slug !== course.slug)
    .slice(0, 3);

  const whatsappEnrollUrl = `${contact.whatsappUrl}?text=${encodeURIComponent(
    `Hola Eveline, me gustaría inscribirme al curso: "${course.title}". ¿Podrías compartirme información de próximas fechas y proceso de inscripción?`
  )}`;

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Parse bullet points from description if present
  const hasBullets = course.longDescription.includes("•");
  let mainText = course.longDescription;
  let syllabusBullets: string[] = [];

  if (hasBullets) {
    const parts = course.longDescription.split(/(?=•)/);
    mainText = parts[0].replace(/Programa:?/i, "").trim();
    syllabusBullets = parts
      .slice(1)
      .map((b) => b.replace(/^•\s*/, "").trim())
      .filter(Boolean);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 md:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, hsla(275,55%,18%,0.94) 0%, hsla(270,30%,10%,0.92) 50%, hsla(275,60%,28%,0.92) 100%)",
            }}
          />
        </div>
        <MotionStars count={8} />

        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumb Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-white/70 text-sm font-body mb-6 flex-wrap"
          >
            <Link
              href="/cursos"
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Cursos y Talleres
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-gold-light">{course.category}</span>
          </motion.div>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-gold/30 text-gold-light text-xs sm:text-sm font-body font-semibold tracking-wider uppercase mb-5"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>{course.category}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {course.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-white/80 font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8"
            >
              {course.description}
            </motion.p>

            {/* Quick Metadata Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-white/90 font-body text-sm"
            >
              <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                <Clock className="w-4 h-4 text-gold" /> {course.duration}
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                <Play className="w-4 h-4 text-gold" />{" "}
                {typeof course.lessons === "number"
                  ? `${course.lessons} lecciones`
                  : course.lessons}
              </span>
              <span className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                <Award className="w-4 h-4 text-gold" /> Imparte Eveline Dublán
              </span>
            </motion.div>
          </div>
        </div>

        {/* Decorative Wave Transition */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0,32 C480,80 960,0 1440,32 L1440,80 L0,80 Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10 lg:gap-12">
            {/* Left 2 Columns */}
            <div className="lg:col-span-2 space-y-12">
              {/* Featured Mystical Instagram Reel Player */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                variants={fadeUp}
                className="bg-gradient-card rounded-2xl border-glow overflow-hidden shadow-mystical p-6 md:p-8"
              >
                <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Sparkles className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h2 className="font-display text-lg sm:text-xl font-bold text-foreground leading-tight">
                        Reel de Presentación • Estilo Instagram
                      </h2>
                      <p className="text-xs font-body text-muted-foreground">
                        Texto animado por escenas con cuencos sagrados y música mística (sin voz)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold-light border border-gold/20 text-xs font-medium font-body">
                      <Volume2 className="w-3.5 h-3.5" /> 9:16 Vertical
                    </span>
                    {course.previewVideo && (
                      <a
                        href={course.previewVideo}
                        download={`${course.slug}-reel.mp4`}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-medium font-body hover:bg-primary hover:text-white transition-colors"
                        title="Descargar Reel para compartir en Instagram o WhatsApp"
                      >
                        <Download className="w-3.5 h-3.5" /> Descargar Reel
                      </a>
                    )}
                  </div>
                </div>

                {/* Vertical Reel Mockup */}
                <div className="max-w-[340px] sm:max-w-[360px] mx-auto aspect-[9/16] rounded-[2.5rem] p-2 ring-4 ring-gold/40 bg-gradient-to-b from-[#2d1245] to-[#120520] shadow-2xl overflow-hidden relative group">
                  <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-black">
                    {course.previewVideo ? (
                      <video
                        ref={videoRef}
                        src={course.previewVideo}
                        poster={course.image}
                        playsInline
                        loop
                        controls
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted/20">
                        <div className="text-center p-6">
                          <Play className="w-12 h-12 text-primary mx-auto mb-2 opacity-60" />
                          <p className="text-sm text-muted-foreground font-body">
                            Reel de presentación próximamente
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reel description footer */}
                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between flex-wrap gap-3 text-xs font-body text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    ✨ <strong>4 escenas dinámicas:</strong> Gancho • Revelación • Método • Llamado a la acción
                  </span>
                  <span>15 segundos • HD 720x1280</span>
                </div>
              </motion.div>

              {/* Course Long Description */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                variants={fadeUp}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-7 md:p-9 border border-border"
              >
                <div className="flex items-center gap-2 text-primary mb-3">
                  <BookOpen className="w-5 h-5 text-gold" />
                  <span className="font-body text-xs font-bold tracking-widest uppercase">
                    Propósito &amp; Fundamento
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                  Acerca de esta <span className="text-gradient-gold">Formación</span>
                </h2>

                <p className="text-foreground/85 font-body leading-relaxed text-base md:text-lg mb-8">
                  {mainText}
                </p>

                {/* If there are syllabus bullet points in description */}
                {syllabusBullets.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-border">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Flame className="w-4 h-4 text-gold" />
                      Temario &amp; Aspectos que trabajaremos:
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {syllabusBullets.map((bullet, bIdx) => (
                        <div
                          key={bIdx}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-primary/5 border border-primary/10 text-sm font-body text-foreground/90"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Program Content / Modules */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={2}
                variants={fadeUp}
              >
                <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                      Contenido del <span className="text-gradient-gold">Programa</span>
                    </h2>
                    <p className="text-muted-foreground font-body text-sm mt-1">
                      Estructura diseñada paso a paso para tu evolución y aprendizaje
                    </p>
                  </div>
                  <span className="text-xs font-body font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {course.videos.length} {course.videos.length === 1 ? "Sesión" : "Módulos"}
                  </span>
                </div>

                <div className="space-y-4">
                  {course.videos.map((video, i) => (
                    <motion.div
                      key={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i * 0.5}
                      variants={fadeUp}
                      className="bg-gradient-card rounded-xl border-glow p-5 sm:p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-md"
                    >
                      <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
                        <div className="flex items-start sm:items-center gap-3.5">
                          <span className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-glow text-white font-display font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                            {i + 1}
                          </span>
                          <div>
                            <h3 className="font-display text-base sm:text-lg font-semibold text-foreground">
                              {video.title}
                            </h3>
                            <p className="font-body text-xs text-muted-foreground mt-0.5">
                              Acompañamiento guiado paso a paso con Eveline Dublán
                            </p>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/15 shrink-0 self-start sm:self-center">
                          <Clock className="w-3.5 h-3.5 text-gold" /> {video.duration}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* What's Included Grid */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={3}
                variants={fadeUp}
                className="bg-gradient-section rounded-2xl p-7 md:p-8 border border-border"
              >
                <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                  ¿Qué incluye tu participación?
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 font-body text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary font-bold" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Enseñanza Directa y Vivencial</p>
                      <p className="text-xs text-muted-foreground">
                        Impartido directamente por Eveline Dublán en sesiones íntimas y cuidadas.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary font-bold" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Material y Ejercicios Prácticos</p>
                      <p className="text-xs text-muted-foreground">
                        Manuales, rituales precisos y protocolos de aplicación para tu vida diaria.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary font-bold" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Acompañamiento y Resolución de Dudas</p>
                      <p className="text-xs text-muted-foreground">
                        Espacio de preguntas y soporte durante el proceso de aprendizaje.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary font-bold" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Ambiente Seguro y Respetuoso</p>
                      <p className="text-xs text-muted-foreground">
                        Espacio protegido ético, empático y libre de juicios.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Facilitator Bio */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4}
                variants={fadeUp}
                className="bg-white/80 rounded-2xl p-7 md:p-8 border border-border flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-gold/30 shrink-0 shadow-md">
                  <Image
                    src="/assets/evelin-1.jpg"
                    alt="Eveline Dublán"
                    fill
                    className="object-cover object-[center_15%]"
                  />
                </div>
                <div>
                  <span className="text-xs font-body font-semibold tracking-widest uppercase text-primary mb-1 block">
                    Tu Instructora &amp; Guía
                  </span>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    Eveline Dublán
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                    Psicoterapeuta y Terapeuta Holística con más de 19 años de trayectoria.
                    Pionera en Tanatología Animal en México, especialista en sanación energética,
                    árbol genealógico, lectura de oráculos y armonización con cuencos sagrados.
                  </p>
                  <Link
                    href="/#sobre-mi"
                    className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold font-body hover:underline"
                  >
                    Conoce más sobre su trayectoria <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Sticky Enrollment Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                variants={fadeUp}
                className="sticky top-28 space-y-6"
              >
                {/* Main Purchase Card */}
                <div className="bg-gradient-card rounded-2xl border-glow p-7 md:p-8 shadow-mystical">
                  {/* Price Header */}
                  <div className="text-center mb-6 pb-6 border-b border-border">
                    <p className="text-xs font-body font-medium uppercase tracking-wider text-muted-foreground mb-1">
                      Inversión
                    </p>
                    <div className="flex items-baseline justify-center gap-2 mb-1">
                      <span className="text-3xl sm:text-4xl font-bold font-display text-gradient-gold">
                        {course.price}
                      </span>
                    </div>
                    <span className="text-muted-foreground font-body text-xs">
                      Equivalente aproximado: {course.priceUsd}
                    </span>
                  </div>

                  {/* Course Quick Facts */}
                  <div className="space-y-3.5 mb-7">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-foreground/80 font-body text-xs sm:text-sm">
                        Duración: <strong className="text-foreground">{course.duration}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Play className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-foreground/80 font-body text-xs sm:text-sm">
                        Modalidad:{" "}
                        <strong className="text-foreground">
                          {typeof course.lessons === "number"
                            ? `${course.lessons} lecciones`
                            : course.lessons}
                        </strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <BookOpen className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-foreground/80 font-body text-xs sm:text-sm">
                        Material didáctico y soporte
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-foreground/80 font-body text-xs sm:text-sm">
                        Cupo limitado para atención personalizada
                      </span>
                    </div>
                  </div>

                  {/* Primary CTA: WhatsApp Enrollment */}
                  <a
                    href={whatsappEnrollUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full mb-3"
                  >
                    <Button
                      size="lg"
                      className="w-full gap-2.5 font-body font-semibold text-white text-sm shadow-md transition-all duration-300 hover:scale-[1.02] hover:brightness-110"
                      style={{ backgroundColor: "#25D366" }}
                    >
                      <MessageCircle className="w-5 h-5" />
                      Inscribirme por WhatsApp
                    </Button>
                  </a>

                  {/* Secondary Link: Agendar Sesión o Dudas */}
                  <Link href="/contacto" className="block w-full">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full font-body text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    >
                      Tengo dudas sobre este curso
                    </Button>
                  </Link>

                  {/* Share Course Button */}
                  <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                    <span className="text-xs font-body text-muted-foreground">
                      ¿Conoces a alguien que le sirva?
                    </span>
                    <button
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-primary hover:underline"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-600" /> ¡Enlace copiado!
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" /> Compartir curso
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Trust / Guarantee Badge */}
                <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10 text-center">
                  <ShieldCheck className="w-7 h-7 text-primary mx-auto mb-2" />
                  <h4 className="font-display font-semibold text-sm text-foreground mb-1">
                    Inscripción Transparente &amp; Segura
                  </h4>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">
                    Pagos por transferencia bancaria directa en México o PayPal / tarjeta para el extranjero.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related / Other Courses Section */}
      {relatedCourses.length > 0 && (
        <section className="py-20 bg-gradient-section border-t border-border">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-primary font-body text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                Continúa tu aprendizaje
              </p>
              <h2 className="font-display text-3xl font-bold text-foreground">
                Otros Cursos &amp; <span className="text-gradient-gold">Talleres</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {relatedCourses.map((relCourse) => (
                <Link
                  key={relCourse.slug}
                  href={`/cursos/${relCourse.slug}`}
                  className="group bg-gradient-card rounded-2xl border-glow overflow-hidden flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-mystical"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={relCourse.image}
                      alt={relCourse.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-body font-semibold text-gold-light">
                      {relCourse.category}
                    </span>
                    <span className="absolute bottom-3 right-3 text-xs font-body text-white/90">
                      {relCourse.duration}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {relCourse.title}
                      </h3>
                      <p className="font-body text-xs text-muted-foreground line-clamp-2 mb-4">
                        {relCourse.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-gradient-gold">
                        {relCourse.price}
                      </span>
                      <span className="text-xs font-body text-primary font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Ver detalles <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
