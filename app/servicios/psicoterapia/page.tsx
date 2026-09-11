"use client";
import { motion } from "framer-motion";
import {
  Brain,
  Video,
  Clock,
  Headphones,
  CalendarCheck,
  DollarSign,
  ArrowLeft,
  Phone, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { contact } from "@/lib/contact";
import AgendaEnLinea from "@/components/AgendaEnLinea";
import TwinkleStars from "@/components/TwinkleStars";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const Psicoterapia = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background with hero image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/psicoterapia-hero.jpg"
            alt="Psicoterapia"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, hsla(275,55%,25%,0.88) 0%, hsla(270,30%,12%,0.82) 50%, hsla(275,60%,35%,0.85) 100%)",
            }}
          />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Circles */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 180, 360] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 left-[8%] w-16 h-16 rounded-full border-2"
            style={{ borderColor: "hsla(42, 70%, 62%, 0.3)" }}
          />
          <motion.div
            animate={{ y: [8, -12, 8] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-28 right-[12%] w-10 h-10 rounded-full"
            style={{ background: "hsla(275, 60%, 55%, 0.2)" }}
          />

          {/* Brain outline shapes */}
          <motion.div
            animate={{ y: [-6, 6, -6], x: [-4, 4, -4] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute top-20 right-[25%] w-20 h-20 rounded-2xl border rotate-12"
            style={{ borderColor: "hsla(0, 0%, 100%, 0.1)" }}
          />

          {/* Diamond */}
          <motion.div
            animate={{ rotate: [45, 225, 45], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-24 left-[15%] w-12 h-12 border-2"
            style={{
              borderColor: "hsla(42, 70%, 62%, 0.25)",
              transform: "rotate(45deg)",
            }}
          />

          {/* Plus signs */}
          <motion.div
            animate={{ rotate: [0, 90, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute top-36 left-[30%]"
            style={{ color: "hsla(42, 80%, 62%, 0.35)" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </motion.div>
          <motion.div
            animate={{ rotate: [0, -90, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
            className="absolute bottom-20 right-[20%]"
            style={{ color: "hsla(0, 0%, 100%, 0.25)" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </motion.div>

          {/* Dotted circle */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-16 right-[8%] w-28 h-28 rounded-full border-2 border-dashed"
            style={{ borderColor: "hsla(270, 30%, 65%, 0.2)" }}
          />

          {/* Small filled circles */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-24 left-[50%] w-3 h-3 rounded-full"
            style={{ background: "hsl(42, 70%, 62%)" }}
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.5,
            }}
            className="absolute bottom-32 left-[40%] w-2 h-2 rounded-full"
            style={{ background: "hsl(275, 60%, 65%)" }}
          />

          {/* Triangle */}
          <motion.div
            animate={{ y: [-5, 8, -5], rotate: [0, 15, 0] }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
            className="absolute top-16 left-[65%]"
          >
            <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
              <path
                d="M16 2L30 26H2L16 2Z"
                stroke="hsla(42, 70%, 62%, 0.25)"
                strokeWidth="2"
              />
            </svg>
          </motion.div>

          {/* Wavy line */}
          <motion.div
            animate={{ x: [-10, 10, -10] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-36 left-[5%]"
          >
            <svg width="80" height="20" viewBox="0 0 80 20" fill="none">
              <path
                d="M0 10C10 0 20 20 30 10C40 0 50 20 60 10C70 0 80 20 80 10"
                stroke="hsla(275, 55%, 55%, 0.2)"
                strokeWidth="2"
              />
            </svg>
          </motion.div>

          {/* Stars */}
          <TwinkleStars count={12} topMin={10} topRange={80} />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-mystical">
              <Image
                src="/assets/icons/services/psicoterapia.svg"
                alt="Psicoterapia"
                width={48}
                height={48}
                className="w-12 h-12 object-contain filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
              />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold mb-4"
            style={{ color: "hsl(0 0% 100%)" }}
          >
            Psicoterapia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-body text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "hsl(270 30% 85%)" }}
          >
            Psicoterapia Ericksoniana · Modelo centrado en soluciones · Terapia
            breve
          </motion.p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 40C360 80 720 0 1080 40C1260 60 1380 50 1440 40V80H0V40Z"
              fill="hsl(270 20% 98%)"
            />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Back link */}
          <Link
            href="/#servicios"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body text-sm mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a servicios
          </Link>

          {/* Main description */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 mb-16"
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="font-body text-lg text-foreground leading-relaxed"
            >
              <strong className="text-primary">La Psicoterapia</strong> es un
              proceso que se da entre el Psicoterapeuta y la persona, familia o
              pareja, que desean encontrar o construir nuevas y saludables
              formas de vivir, relacionarse o solucionar conflictos.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="font-body text-muted-foreground leading-relaxed"
            >
              En mi caso particular, trabajo con{" "}
              <strong className="text-foreground">
                Psicoterapia Ericksoniana
              </strong>
              , un modelo centrado en soluciones,{" "}
              <strong className="text-foreground">terapia breve</strong>. Sus
              técnicas son muy variadas, por ejemplo, la Hipnosis, sin embargo
              no es la única, el uso conjunto de varias de ellas, nos permitirá
              ir a la raíz de la situación y resolverla desde ahí, generando
              procesos efectivos, rápidos y amables.
            </motion.p>
          </motion.div>

          {/* ¿Qué pasa en una sesión? */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-section rounded-2xl p-8 md:p-12 border border-border mb-12"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6"
            >
              ¿Qué pasa en una sesión de{" "}
              <span className="text-gradient-gold">Psicoterapia</span>?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="font-body text-muted-foreground leading-relaxed mb-4"
            >
              Lo más importante que ocurre, es que juntos vamos a construir el
              proceso que te permita estar, como para ti es bien,
              saludablemente.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-body text-muted-foreground leading-relaxed mb-6"
            >
              A partir del tema que tu desees trabajar en la sesión,
              realizaremos ejercicios construidos a tu medida, para transformar
              y sanar desde lo más profundo.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={3}
              className="inline-flex items-center gap-3 bg-primary/10 rounded-xl px-6 py-3 border border-primary/20"
            >
              <span className="text-2xl">✨</span>
              <p className="font-display text-primary font-semibold">
                Notarás cambios desde la primera sesión.
              </p>
            </motion.div>
          </motion.div>

          {/* Detalles de la sesión */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {[
              {
                icon: Video,
                title: "Modalidad",
                desc: "Video llamada o llamada de voz en Zoom o Facetime",
              },
              {
                icon: Clock,
                title: "Duración",
                desc: "50-60 minutos por sesión",
              },
              {
                icon: Headphones,
                title: "Requisitos",
                desc: "Espacio privado, silencioso, buena conexión a internet y audífonos (indispensables)",
              },
              {
                icon: CalendarCheck,
                title: "¿Quién puede tomarla?",
                desc: "Personas mayores de 18 años",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                custom={i}
                className="flex gap-4 p-6 bg-background rounded-xl border border-border hover:border-primary/30 hover:shadow-mystical transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Agendar e Inversión */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {/* Cómo agendar */}
            <motion.div
              variants={fadeUp}
              custom={0}
              className="bg-gradient-card rounded-2xl p-8 border-glow"
            >
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  ¿Cómo agendar?
                </h3>
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                Puedes comunicarte por{" "}
                <strong className="text-foreground">llamada telefónica</strong>{" "}
                al <strong className="text-primary">771 143 91 16</strong> donde
                rápida y fácilmente, encontraremos un espacio en la agenda que
                sea conveniente para ambas partes.
              </p>
              <AgendaEnLinea />
              <p className="font-body text-xs text-muted-foreground italic">
                Es indispensable que la persona que vaya a tomar la terapia sea
                quien agende su cita personalmente.
              </p>
            </motion.div>

            {/* Inversión */}
            <motion.div
              variants={fadeUp}
              custom={1}
              className="bg-gradient-card rounded-2xl p-8 border-glow"
            >
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-gold" />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Inversión
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-gradient-gold">
                    $600
                  </span>
                  <span className="font-body text-muted-foreground text-sm">
                    MXN
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-xl font-semibold text-foreground">
                    $36
                  </span>
                  <span className="font-body text-muted-foreground text-sm">
                    USD
                  </span>
                </div>
                <p className="font-body text-xs text-muted-foreground pt-2 border-t border-border">
                  Depósito bancario, transferencia interbancaria, tiendas Oxxo o
                  PayPal (+7%)
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href={contact.telUrl}>
              <Button
                size="lg"
                className="font-body text-base px-10 py-6 rounded-full shadow-mystical"
              >
                <Phone className="w-5 h-5 mr-2" />
                Llamar para agendar
              </Button>
            </a>
            <Link href="/citas">
              <Button
                size="lg"
                variant="outline"
                className="font-body text-base px-10 py-6 rounded-full border-primary/40 hover:bg-primary/10"
              >
                <CalendarDays className="w-5 h-5 mr-2" />
                Agendar en línea
              </Button>
            </Link>
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="font-body text-base px-10 py-6 rounded-full flex items-center gap-2"
              >
                <Image
                  src="/assets/icons/whatsapp.png"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
                WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Psicoterapia;
