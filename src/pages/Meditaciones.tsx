import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause, Volume2, Headphones, Heart, Sparkles, Moon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Meditation {
  title: string;
  audioUrl: string;
}

interface MeditationSection {
  title: string;
  icon: React.ReactNode;
  color: string;
  meditations: Meditation[];
}

const sections: MeditationSection[] = [
  {
    title: "Detox Emocional",
    icon: <Heart className="w-6 h-6" />,
    color: "from-pink-500/20 to-primary/20",
    meditations: [
      { title: "Día 1 – Miedo", audioUrl: "https://archive.org/download/SanarATuNinaInterior1/Detox%20emocional.%20Di%CC%81a%201_%20miedo.mp3" },
      { title: "Día 2 – Alegría", audioUrl: "https://archive.org/download/SanarATuNinaInterior1/Detox%20emocional.%20Di%CC%81a%202_%20Alegri%CC%81a.mp3" },
      { title: "Día 3 – Tristeza", audioUrl: "https://archive.org/download/SanarATuNinaInterior1/Detox%20emocional.%20Di%CC%81a%203_%20Tristeza.mp3" },
      { title: "Día 4 – Enojo", audioUrl: "https://archive.org/download/SanarATuNinaInterior1/Detox%20emocional.%20Di%CC%81a%204_%20enojo.mp3" },
      { title: "Día 5 – Amor", audioUrl: "https://archive.org/download/SanarATuNinaInterior1/Detox%20emocional.%20Di%CC%81a%205_%20amor.mp3" },
    ],
  },
  {
    title: "Chakras",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-violet-500/20 to-indigo-500/20",
    meditations: [
      { title: "Anahata (4° Chakra)", audioUrl: "https://archive.org/download/SanarATuNinaInterior1/Chakra%204_%20ANAHATA.mp3" },
      { title: "Vishudda (5° Chakra)", audioUrl: "https://archive.org/download/SanarATuNinaInterior1/Chakra%205_%20VISHUDDA.mp3" },
      { title: "Ajna (6° Chakra)", audioUrl: "https://archive.org/download/SanarATuNinaInterior1/Chakra%206_%20AJNA.mp3" },
      { title: "Sahasrara (7° Chakra)", audioUrl: "https://archive.org/download/SanarATuNinaInterior1/Chakra%207_%20Sahasrara.mp3" },
    ],
  },
  {
    title: "Sanar",
    icon: <Moon className="w-6 h-6" />,
    color: "from-emerald-500/20 to-teal-500/20",
    meditations: [
      { title: "Sanar Sagrado Femenino", audioUrl: "https://archive.org/download/SanarATuNinaInterior1/Sanar%20Sagrado%20Femenino.mp3" },
      { title: "Sanar A Tu Niña Interior 1", audioUrl: "https://archive.org/download/SanarATuNinaInterior1/Sanar%20A%20Tu%20Nin%CC%83a%20Interior%201.mp3" },
      { title: "Sanar A Tu Niño-a Interior 2", audioUrl: "https://archive.org/download/SanarATuNinaInterior1/Sanar%20A%20Tu%20Nin%CC%83o-a%20Interior%202.mp3" },
    ],
  },
];

const AudioPlayer = ({ meditation, index }: { meditation: Meditation; index: number }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pos * duration;
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
    >
      <audio
        ref={audioRef}
        src={meditation.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center flex-shrink-0 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-primary" />
          ) : (
            <Play className="w-5 h-5 text-primary ml-0.5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <h4 className="font-display text-base font-semibold text-foreground truncate mb-2">
            {meditation.title}
          </h4>

          <div
            className="w-full h-2 bg-muted rounded-full cursor-pointer overflow-hidden"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground font-body">{formatTime(currentTime)}</span>
            <span className="text-xs text-muted-foreground font-body">{duration ? formatTime(duration) : "--:--"}</span>
          </div>
        </div>

        <Volume2 className="w-4 h-4 text-muted-foreground flex-shrink-0 hidden sm:block" />
      </div>
    </motion.div>
  );
};

const MeditationSectionBlock = ({ section, sectionIndex }: { section: MeditationSection; sectionIndex: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-primary`}>
          {section.icon}
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">{section.title}</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {section.meditations.map((med, i) => (
          <AudioPlayer key={med.title} meditation={med} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

const Meditaciones = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/10 to-background" />

        {/* Animated orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10 blur-2xl"
            style={{
              width: 60 + i * 40,
              height: 60 + i * 40,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Sound wave lines */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 mx-1 bg-primary rounded-full"
              animate={{
                height: [20, 40 + Math.random() * 60, 20],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.12,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-5 py-2 mb-6">
              <Headphones className="w-4 h-4 text-primary" />
              <span className="text-sm font-body text-primary font-medium">Meditaciones Guiadas</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Viaje al <span className="text-gradient-purple">Interior</span>
            </h1>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-lg leading-relaxed">
              Meditaciones y ejercicios para nutrir tu alma y acompañarte en tu proceso de crecimiento personal.
            </p>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" className="w-full">
            <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,35 1440,30 L1440,60 L0,60 Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Reciprocidad Sagrada */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-8 md:p-10 text-center"
          >
            <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-4">
              🙏 Reciprocidad Sagrada
            </h2>
            <p className="text-muted-foreground font-body leading-relaxed">
              Esta sección se trabaja por <strong className="text-foreground">"Reciprocidad sagrada"</strong>, eso significa que al realizar el ejercicio te pido que continúes con el flujo de energía y ofrezcas, a la causa que elijas, una bendición. Por ejemplo: donar una hora de tu tiempo a una fundación, donar dinero a una asociación, regalar ropa, tiempo, etc. Es muy importante que este flujo de energía vaya más allá de tu círculo conocido.
            </p>
            <p className="text-muted-foreground font-body mt-4 italic">
              ¡Disfruta los ejercicios y buen viaje al interior!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meditation Sections */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          {sections.map((section, i) => (
            <MeditationSectionBlock key={section.title} section={section} sectionIndex={i} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Meditaciones;
