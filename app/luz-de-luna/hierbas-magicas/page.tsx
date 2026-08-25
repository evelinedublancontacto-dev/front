"use client";
import { motion } from "framer-motion";
import { Leaf, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import MotionStars from "@/components/MotionStars";
import { herbs } from "@/data/herbs";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08 },
  }),
};

const HierbasMagicas = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/hierbas-magicas-hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, hsla(140,35%,18%,0.45) 0%, hsla(270,30%,10%,0.55) 50%, hsla(160,40%,20%,0.50) 100%)",
            }}
          />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <MotionStars count={8} />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <Link
              href="/luz-de-luna"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-body text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Volver a Luz de Luna
            </Link>
          </motion.div>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
            >
              <Leaf className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Hierbas <span className="text-gradient-gold">Mágicas</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-white/80 font-body max-w-2xl mx-auto leading-relaxed"
            >
              Selección de hierbas poderosas, ancestrales y mágicas para tu
              práctica espiritual.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0,64 C480,120 960,0 1440,64 L1440,120 L0,120 Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Aquí te comparto una selección de hierbas poderosas que aportan su
              medicina para sanar. Recuerda siempre despertarlas y utilizarlas
              con respeto y ética.
            </p>
          </motion.div>
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {herbs.map((herb, i) => (
              <motion.div
                key={herb.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i % 6}
                variants={fadeUp}
                className="bg-gradient-card rounded-xl p-6 border-glow hover:scale-[1.02] transition-all duration-500"
              >
                <div className="mb-4 overflow-hidden rounded-lg aspect-[4/3] bg-primary/10 relative">
                  {herb.image ? (
                    <Image
                      src={herb.image}
                      alt={herb.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Leaf className="w-10 h-10 text-primary/40" />
                    </div>
                  )}
                </div>
                <h3 className="font-display text-base font-semibold text-foreground mb-2">
                  {herb.name}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {herb.props}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HierbasMagicas;
