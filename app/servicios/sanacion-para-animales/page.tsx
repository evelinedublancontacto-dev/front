"use client";
import { motion } from "framer-motion";
import {
  PawPrint,
  Video,
  Clock,
  DollarSign,
  ArrowLeft,
  Phone,
  Star,
  Shield,
  Camera,
  AlertCircle,
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

const requisitos = [
  "Enviar su nombre y una foto donde se vea su carita lo mejor posible. Si tu compañero animal ya trascendió, puede ser la última foto que tienes de él/ella. Si en un caso extremo no tienes foto, hay formas de solucionarlo, pero lo ideal es trabajar con ella.",
  "Se sugiere tener un tema máximo para la sesión. El tiempo es limitado (60 min) y es preferible abordar un solo tema a profundidad.",
  "No es necesario que tu compañero asista al consultorio o esté junto a ti si es consulta online. El proceso puede darse sin importar el lugar donde se encuentre.",
];

const aspectos = [
  "Es necesario que el responsable directo del compañero animal esté de acuerdo, realice la cita y acuda al proceso.",
  "Debemos tener el permiso del responsable, del animal y de sus guías. No trabajamos el animal de un vecino o amigo sin que ellos estén directamente involucrados: puede surgir información personal que debe tratarse con quienes corresponden.",
  "Hay que ser pacientes: no todos los animales están listos para hablar y confiar de inmediato. Algunos tienen historias dolorosas con los humanos. En ocasiones puede tomar más de un contacto acceder a profundidad; también se requiere el permiso del animal.",
  "Se puede realizar sanación y contacto con animales que ya trascendieron; no todos estarán disponibles. Algunos ya encarnaron o no desean conectarse. No realizo procesos que sometan la voluntad de ningún ser.",
  "La sanación apoya sus procesos, pero ellos tienen voluntad: no podemos garantizar cambios como los humanos los queremos. Es una relación con seres con alma, conciencia y autonomía.",
  "Se puede acompañar en el proceso de eutanasia, tanto para tomar la decisión como para acompañar la trascendencia con la familia y el animal.",
  "Medita los temas que deseas abordar. A veces preguntamos sobre aspectos de nuestra sanación y no de la de ellos. Prefiere preguntas desde la perspectiva que beneficia a tu compañero animal.",
  "Con compañeros en situación clínica complicada, debilidad o introversión, sugiero una sanación grabada: envías foto y temas, realizo el proceso en el transcurso de los días, grabo y te envío el día y hora agendada. Así aprovechamos el tiempo aunque no puedan conectarse una hora continua.",
];

const SanacionAnimales = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/sanacion-animales-hero.jpg"
            alt="Sanación para Animales"
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

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ y: [-10, 10, -10], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[10%] w-20 h-20 rounded-full"
            style={{
              background:
                "radial-gradient(circle, hsla(42, 70%, 62%, 0.3), transparent)",
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
                "radial-gradient(circle, hsla(275, 60%, 55%, 0.25), transparent)",
            }}
          />
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-16 right-[25%] w-24 h-24 rounded-full border border-dashed"
            style={{ borderColor: "hsla(42, 70%, 62%, 0.2)" }}
          />
          <TwinkleStars count={15} topMin={10} topRange={80} />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-mystical">
              <PawPrint className="w-10 h-10 text-gold" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl font-bold mb-4"
            style={{ color: "hsl(0 0% 100%)" }}
          >
            Sanación para Animales
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-body text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "hsl(270 30% 85%)" }}
          >
            Comunicación animal · Sanación energética · Guías luminosos
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
              En este servicio, a través de diversas técnicas de{" "}
              <strong className="text-primary">sanación energética</strong>,
              todas ellas luminosas, trabajaremos con las situaciones que tu
              compañero animal necesite.
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
              ¿Qué pasa en una sesión de{" "}
              <span className="text-gradient-gold">Sanación para Animales</span>
              ?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              className="font-body text-muted-foreground leading-relaxed mb-4"
            >
              Al iniciar, me conecto con tu compañero animal y sus guías
              luminosos, me presento con ellos y solicito todos los permisos
              para realizar el trabajo en perfecto orden y sostenidos por la
              luz.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="font-body text-muted-foreground leading-relaxed mb-4"
            >
              Suelo realizar una limpieza energética inicial con palo santo
              para retirar la energía densa y discordante del día a día.
              Comenzamos a interactuar energética e intuitivamente para que se
              sienta cómodo y confiado: cada animal tiene su personalidad;
              avanzamos sin invadir su espacio.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={3}
              className="font-body text-muted-foreground leading-relaxed mb-4"
            >
              La persona nos expone el motivo de la consulta (podemos abordar un
              tema por sesión) y, junto con sus guías, revisamos cómo se siente
              y qué percibe de la situación. La perspectiva de tu compañero es
              importantísima, y también la de sus guías: ellos tienen una visión
              más elevada que permite resolver lo que sostiene el problema.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={4}
              className="font-body text-muted-foreground leading-relaxed mb-6"
            >
              Una vez identificado el origen, se procede a la sanación con la
              técnica que mejor se acomode al proceso.
            </motion.p>
            <motion.div
              variants={fadeUp}
              custom={5}
              className="inline-flex items-center gap-3 bg-primary/10 rounded-xl px-6 py-3 border border-primary/20"
            >
              <span className="text-2xl">🐾</span>
              <p className="font-display text-primary font-semibold">
                Se puede trabajar a distancia: tu animal no necesita estar
                presente.
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
              ¿Qué necesito para la{" "}
              <span className="text-gradient-gold">sesión</span>?
            </motion.h2>
            <ul className="space-y-4">
              {requisitos.map((item, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  custom={i}
                  className="flex gap-3 font-body text-muted-foreground leading-relaxed"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 bg-background rounded-2xl p-8 border border-border"
          >
            <motion.h2
              variants={fadeUp}
              custom={0}
              className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6"
            >
              Aspectos importantes del{" "}
              <span className="text-gradient-gold">proceso</span>
            </motion.h2>
            <ul className="space-y-4">
              {aspectos.map((item, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  custom={Math.min(i, 5)}
                  className="flex gap-3 font-body text-sm text-muted-foreground leading-relaxed"
                >
                  <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
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
              Modalidades del{" "}
              <span className="text-gradient-gold">proceso</span>
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Presencial",
                  desc: "En consultorio. 50-60 minutos. Presentarse puntualmente.",
                },
                {
                  title: "En línea",
                  desc: "Video llamada o llamada por Zoom o Facetime. Enviar previamente nombre, foto y tema. Espacio privado, silencioso, buena conexión, audífonos indispensables. 50-60 minutos.",
                },
                {
                  title: "Sesión grabada",
                  desc: "Se realiza el proceso de forma asíncrona y se envían los audios por WhatsApp el día y hora agendada.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  custom={i}
                  className="p-6 bg-gradient-card rounded-xl border-glow"
                >
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
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
                desc: "Presencial, en línea o sesión grabada",
              },
              {
                icon: Clock,
                title: "Duración",
                desc: "50-60 minutos por sesión",
              },
              {
                icon: Camera,
                title: "Requisitos",
                desc: "Nombre, foto del animal y un tema a trabajar",
              },
              {
                icon: Star,
                title: "¿Quién puede tomarla?",
                desc: "Todas las especies animales, domésticos y exóticos. Vivos o trascendidos.",
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
            className="mb-12 rounded-2xl p-8 border border-primary/20 bg-primary/5"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-primary" />
              <h3 className="font-display text-xl font-semibold text-foreground">
                Citas de urgencia
              </h3>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">
              Una urgencia se considera cuando el animal está en un proceso de
              enfermedad repentina, hay que tomar una decisión de eutanasia en
              las siguientes horas, o hay un viaje inesperado que requiere una
              sanación para contener el trayecto, etc.
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">
                No trabajamos con animales extraviados.
              </strong>{" "}
              Comunícate por llamada telefónica al {contact.phone}.
            </p>
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
                  ¿Cómo agendar?
                </h3>
              </div>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4">
                Puedes llamar por teléfono al{" "}
                <strong className="text-primary">{contact.phone}</strong> donde
                rápida y fácilmente encontraremos un espacio conveniente.
              </p>
              <p className="font-body text-xs text-muted-foreground italic">
                Es indispensable que la persona responsable directa del animal
                sea quien agende su cita personalmente.
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
                  Inversión
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold text-gradient-gold">
                    $700
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
                    USD aprox.
                  </span>
                </div>
                <p className="font-body text-xs text-muted-foreground pt-2 border-t border-border">
                  Depósito bancario, transferencia interbancaria, tiendas Oxxo
                  o PayPal (+7%)
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a href={contact.telUrl}>
              <Button
                size="lg"
                className="font-body text-base px-10 py-6 rounded-full shadow-mystical"
              >
                <Phone className="w-5 h-5 mr-2" />
                Agendar mi cita
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SanacionAnimales;
