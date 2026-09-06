"use client";
import { motion } from "framer-motion";
import {
  Flame,
  Video,
  Clock,
  DollarSign,
  ArrowLeft,
  Phone,
  Star,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import TwinkleStars from "@/components/TwinkleStars";
import { contact } from "@/lib/contact";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
};

const temas = [
  "Corte de lazos profundo con relaciones finalizadas (parejas, amistades, trabajos, etc.)",
  "Sanación de linajes femenino y masculino",
  "Apertura de caminos",
  "Sanación de tu niña interior",
  "Sanación de abundancia",
  "Retiro de hechicería",
  "Sanación para animales",
  "Desbloqueo de situaciones",
  "Sanar heridas emocionales",
  "Y muchísimo más",
];

const SanacionConVelas = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/sanacion-con-velas-hero-bg.jpg"
            alt="Sanación con Velas"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, hsla(275,55%,25%,0.45) 0%, hsla(270,30%,12%,0.55) 50%, hsla(25,60%,25%,0.50) 100%)",
            }}
          />
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ y: [-10, 10, -10], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[10%] w-20 h-20 rounded-full"
            style={{
              background:
                "radial-gradient(circle, hsla(42, 70%, 62%, 0.35), transparent)",
            }}
          />
          <motion.div
            animate={{ y: [8, -12, 8], x: [-5, 5, -5] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-28 right-[15%] w-14 h-14 rounded-full"
            style={{
              background:
                "radial-gradient(circle, hsla(25, 80%, 55%, 0.25), transparent)",
            }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-28 right-[20%]"
          >
            <Flame className="w-10 h-10 text-gold/40" />
          </motion.div>
          <TwinkleStars count={14} topMin={10} topRange={80} />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-mystical">
              <Image
                src="/assets/icons/services/sanacion-con-velas.svg"
                alt="Sanación con Velas"
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
            Sanación con Velas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-body text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "hsl(270 30% 85%)" }}
          >
            Fuego sagrado · Ritual a distancia · Transmutación luminosa
          </motion.p>
        </div>

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

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            href="/#servicios"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-body text-sm mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a servicios
          </Link>

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
              Las velas son instrumentos poderosos energéticamente. Incluyen
              casi todos los elementos de la rueda medicinal y su conexión con
              la energía universal es profunda y naturalmente luminosa.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="font-body text-muted-foreground leading-relaxed"
            >
              Sanar con velas es una práctica ancestral, proviene de la sanación
              con fuego, el elemento que es solo luz, no tiene sombra, y que
              trabaja transmutando lo denso en ligero. Realizar sanación con
              velas es una opción profunda y poderosa para generar cambios en
              las personas y situaciones.
            </motion.p>
          </motion.div>

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
              ¿Cómo funciona una{" "}
              <span className="text-gradient-gold">Sanación con Velas</span>?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="font-body text-muted-foreground leading-relaxed mb-4"
            >
              Una vez agendada tu cita y establecido el objetivo de la
              sanación, diseño un ritual de velas a la medida de lo que
              necesitas, lo intenciono y realizo desde mi consultorio.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-body text-muted-foreground leading-relaxed mb-4"
            >
              La sanación puede durar desde dos horas hasta quince horas. Por
              ello, mientras se realiza, tomo video de algunos momentos del
              proceso y, al finalizar, te los envío, así como uno donde te
              explico la lectura final de los restos.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={3}
              className="font-body text-muted-foreground leading-relaxed mb-6"
            >
              A partir de ese resultado, tomamos decisiones sobre los pasos
              siguientes en tu proceso: puede ser una sanación energética u otra
              sanación con velas, según cada caso.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={4}
              className="inline-flex items-center gap-3 bg-primary/10 rounded-xl px-6 py-3 border border-primary/20"
            >
              <Flame className="w-5 h-5 text-primary shrink-0" />
              <p className="font-display text-primary font-semibold">
                Siempre a distancia y asíncronas: no pueden ser presenciales
                por el tiempo que tarda en consumirse la vela.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6"
            >
              Algunos temas que se pueden{" "}
              <span className="text-gradient-gold">manejar</span>
            </motion.h2>
            <ul className="space-y-3 mb-6">
              {temas.map((tema, i) => (
                <motion.li
                  key={tema}
                  variants={fadeUp}
                  custom={Math.min(i, 5)}
                  className="flex gap-3 font-body text-muted-foreground"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{tema}</span>
                </motion.li>
              ))}
            </ul>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-body text-muted-foreground leading-relaxed mb-4"
            >
              Casi cualquier tema energético puede trabajarse con velas y en
              combinación con los procesos de sanación espiritual.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={3}
              className="font-body text-sm text-muted-foreground leading-relaxed italic border-l-2 border-primary/40 pl-4"
            >
              Todos los rituales se trabajan desde lo más luminoso, siempre
              atendiendo las leyes universales: bajo ninguna circunstancia se
              realiza algún proceso que interfiera con el libre albedrío de
              alguien (sin importar su edad o condición médica), ni evitando
              causas y efectos de decisiones tomadas.
            </motion.p>
          </motion.div>

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
                desc: "A distancia, asíncrona (desde el consultorio)",
              },
              {
                icon: Clock,
                title: "Duración",
                desc: "De 2 a 15 horas (según el ritual)",
              },
              {
                icon: Star,
                title: "¿Quién puede tomarla?",
                desc: "Cualquier persona humana o animal. Menores y animales: con tutores o mapaternidades que gestionen el proceso.",
              },
              {
                icon: Flame,
                title: "Entrega",
                desc: "Videos del proceso y lectura final de los restos",
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

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="bg-gradient-card rounded-2xl p-8 border-glow"
            >
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  ¿Cómo agendar sesión?
                </h3>
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                Si es la primera vez que realizas un contacto conmigo, es
                indispensable que llames por teléfono al{" "}
                <strong className="text-primary">{contact.phone}</strong> y
                agendes tu cita. Si es subsecuente, puedes enviar un WhatsApp al
                mismo número.
              </p>
              <p className="font-body text-xs text-muted-foreground italic">
                Será un gusto acompañarte en todos los procesos de sanación que
                tengas.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={1}
              className="bg-gradient-card rounded-2xl p-8 border-glow"
            >
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-6 h-6 text-gold" />
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Costo de la sesión
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-gradient-gold">
                    $800
                  </span>
                  <span className="font-body text-muted-foreground text-sm">
                    MXN
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-xl font-semibold text-foreground">
                    $45
                  </span>
                  <span className="font-body text-muted-foreground text-sm">
                    USD
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

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

export default SanacionConVelas;
