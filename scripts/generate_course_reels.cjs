const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');

const reelsData = [
  {
    slug: "arbol-genealogico",
    image: "arbol-genealogico.jpg",
    kicker: "ANCESTROS & LINAJE",
    freq: 432,
    bowlFreqs: [216, 288, 324, 432],
    footer: "Eveline Dublán • 1 sesión presencial",
    scenes: [
      {
        titleLine1: "¿Sientes que repites",
        titleLine2: "patrones familiares?",
        subLine1: "Cargas, miedos o bloqueos repetitivos",
        subLine2: "tienen su origen en tu raíz ancestral."
      },
      {
        titleLine1: "Análisis y Sanación de",
        titleLine2: "Tu Árbol Genealógico",
        subLine1: "Identifica tus dobles en el árbol,",
        subLine2: "secretos y lealtades invisibles."
      },
      {
        titleLine1: "Rituales Precisos",
        titleLine2: "de Corte y Liberación",
        subLine1: "Ejercicios vivenciales para tomar tu lugar",
        subLine2: "y sanar tu linaje con amor."
      },
      {
        titleLine1: "✨ Sana tu Historia ✨",
        titleLine2: "Inscríbete Hoy",
        subLine1: "Escríbenos por WhatsApp",
        subLine2: "Aparta tu lugar con Eveline Dublán"
      }
    ]
  },
  {
    slug: "sanacion-con-velas",
    image: "sanacion-velas.jpg",
    kicker: "FUEGO SAGRADO & MAGIA",
    freq: 528,
    bowlFreqs: [264, 330, 396, 528],
    footer: "Eveline Dublán • 3 sesiones en línea",
    scenes: [
      {
        titleLine1: "El fuego sagrado transmuta",
        titleLine2: "lo más denso de tu vida",
        subLine1: "Aprende a conectar con la energía de las velas",
        subLine2: "para abrir caminos y sanar."
      },
      {
        titleLine1: "Rituales de Sanación",
        titleLine2: "con Velas Sagradas",
        subLine1: "Magia, intención y protocolos de luz",
        subLine2: "para transformar tu frecuencia energética."
      },
      {
        titleLine1: "Lectura e Interpretación",
        titleLine2: "de Restos de Cera",
        subLine1: "Descubre qué te dicen las formas y restos",
        subLine2: "y cómo cerrar tus rituales con poder."
      },
      {
        titleLine1: "✨ Enciende tu Propia Luz ✨",
        titleLine2: "Inscríbete Hoy",
        subLine1: "Escríbenos por WhatsApp",
        subLine2: "Incluye grupo de seguimiento continuo"
      }
    ]
  },
  {
    slug: "sanacion-para-animales",
    image: "sanacion-animales.jpg",
    kicker: "SANACIÓN ANIMAL & EMPATÍA",
    freq: 432,
    bowlFreqs: [216, 288, 360, 432],
    footer: "Eveline Dublán • 6 módulos sincrónicos",
    scenes: [
      {
        titleLine1: "Tus animales sienten todo",
        titleLine2: "lo que tú estás viviendo",
        subLine1: "Ellos absorben energías de su entorno",
        subLine2: "y también necesitan sanar sus emociones."
      },
      {
        titleLine1: "Sanación Holística y",
        titleLine2: "Energética para Animales",
        subLine1: "Conecta de corazón a corazón",
        subLine2: "con perros, gatos y otras especies."
      },
      {
        titleLine1: "Chakras, Duelo y",
        titleLine2: "Tanatología Animal",
        subLine1: "Sanación de trauma, corte de cordones",
        subLine2: "y acompañamiento en su trascendencia."
      },
      {
        titleLine1: "✨ Sé su Canal de Luz ✨",
        titleLine2: "Inscríbete Hoy",
        subLine1: "Escríbenos por WhatsApp",
        subLine2: "Pionera en Tanatología Animal en México"
      }
    ]
  },
  {
    slug: "sanacion-y-florecimiento",
    image: "sanacion-florecimiento.jpg",
    kicker: "SAGRADO FEMENINO",
    freq: 417,
    bowlFreqs: [208, 260, 312, 417],
    footer: "Eveline Dublán • 9 módulos presenciales",
    scenes: [
      {
        titleLine1: "En tu matriz habita la memoria",
        titleLine2: "de 7 generaciones",
        subLine1: "Herencias, dolores y dones de tus ancestras",
        subLine2: "aguardan en tu sagrado femenino."
      },
      {
        titleLine1: "Curso de Sanación y",
        titleLine2: "Florecimiento Femenino",
        subLine1: "Un viaje iniciático de 9 meses",
        subLine2: "para reconciliarte con tu linaje."
      },
      {
        titleLine1: "Diosas, Energía Uterina",
        titleLine2: "y Oráculos Vivientes",
        subLine1: "Sexualidad sagrada y reconexión",
        subLine2: "con tu verdadero poder personal."
      },
      {
        titleLine1: "✨ Florece en tu Esencia ✨",
        titleLine2: "Inscríbete Hoy",
        subLine1: "Escríbenos por WhatsApp",
        subLine2: "Presencial en Pachuca • Cupo limitado"
      }
    ]
  },
  {
    slug: "taller-de-angeles",
    image: "taller-angeles.jpg",
    kicker: "ENERGÍA ANGELICAL",
    freq: 741,
    bowlFreqs: [370, 444, 555, 741],
    footer: "Eveline Dublán • 1 sesión presencial",
    scenes: [
      {
        titleLine1: "¿Sientes el llamado",
        titleLine2: "de los seres de luz?",
        subLine1: "Los Ángeles son frecuencias puras de amor",
        subLine2: "listas para acompañarte sin dogmas."
      },
      {
        titleLine1: "Taller de Ángeles:",
        titleLine2: "Conexión de Luz Sagrada",
        subLine1: "Aprende a contactar su verdadera esencia",
        subLine2: "y canalizar su vibración sanadora."
      },
      {
        titleLine1: "Altares y Burbujas",
        titleLine2: "de Protección de Luz",
        subLine1: "Técnicas para proteger tu hogar, plantas,",
        subLine2: "animales y elevar tu vibración diaria."
      },
      {
        titleLine1: "✨ Camina en su Guía ✨",
        titleLine2: "Inscríbete Hoy",
        subLine1: "Escríbenos por WhatsApp",
        subLine2: "Incluye todo tu material de trabajo"
      }
    ]
  },
  {
    slug: "taller-de-abundancia",
    image: "taller-abundancia.jpg",
    kicker: "PROSPERIDAD CONSCIENTE",
    freq: 528,
    bowlFreqs: [264, 330, 396, 528],
    footer: "Eveline Dublán • 2 clases Zoom en vivo",
    scenes: [
      {
        titleLine1: "¿Sientes que el dinero",
        titleLine2: "se bloquea en tu vida?",
        subLine1: "Mandatos y lealtades inconscientes",
        subLine2: "pueden estar frenando tu prosperidad."
      },
      {
        titleLine1: "Taller de Abundancia",
        titleLine2: "y Prosperidad 💎✨",
        subLine1: "Revisa, limpia y reactiva tu aparato",
        subLine2: "energético de abundancia y merecimiento."
      },
      {
        titleLine1: "Disuelve Contratos",
        titleLine2: "y Deudas Kármicas",
        subLine1: "Alinea tu vasija receptora y reconecta",
        subLine2: "con el flujo del sustento divino."
      },
      {
        titleLine1: "✨ Ábrete a Recibir ✨",
        titleLine2: "Inscríbete Hoy",
        subLine1: "Escríbenos por WhatsApp",
        subLine2: "Incluye 15 días de seguimiento en WhatsApp"
      }
    ]
  },
  {
    slug: "lectura-de-oraculo",
    image: "lectura-oraculo.jpg",
    kicker: "ORÁCULOS & INTUICIÓN",
    freq: 741,
    bowlFreqs: [370, 462, 555, 741],
    footer: "Eveline Dublán • 2 sesiones presenciales",
    scenes: [
      {
        titleLine1: "Tu alma conoce todas",
        titleLine2: "las respuestas que buscas",
        subLine1: "Aprende a decodificar los símbolos",
        subLine2: "y mensajes del universo a través de oráculos."
      },
      {
        titleLine1: "Taller de Lectura",
        titleLine2: "de Oráculos Sagrados",
        subLine1: "El arte de la lectura intuitiva y consciente",
        subLine2: "con ética, respeto y profundidad."
      },
      {
        titleLine1: "Tiradas, Consagración",
        titleLine2: "y Canalización Certera",
        subLine1: "Apertura de canales, protección energética",
        subLine2: "y formulación de preguntas adecuadas."
      },
      {
        titleLine1: "✨ Despierta tu Clarividencia ✨",
        titleLine2: "Inscríbete Hoy",
        subLine1: "Escríbenos por WhatsApp",
        subLine2: "Incluye oráculo físico, tapete y cristales"
      }
    ]
  },
  {
    slug: "cortar-lazos-con-tu-ex",
    image: "cortar-lazos.jpg",
    kicker: "LIBERACIÓN ENERGÉTICA",
    freq: 396,
    bowlFreqs: [198, 247, 297, 396],
    footer: "Eveline Dublán • 1 sesión en línea",
    scenes: [
      {
        titleLine1: "¿Sientes que una expareja",
        titleLine2: "sigue drenando tu energía?",
        subLine1: "Los lazos emocionales y sexuales",
        subLine2: "no desaparecen solos con el tiempo."
      },
      {
        titleLine1: "Cortar Lazos con tu Ex:",
        titleLine2: "Cierre Energético y Vital",
        subLine1: "Recupera los fragmentos de alma que dejaste",
        subLine2: "y devuélvele al otro lo que no te pertenece."
      },
      {
        titleLine1: "Limpia tu Energía Sexual",
        titleLine2: "y Abre Nuevos Caminos",
        subLine1: "Ritual profundo de corte para sanar",
        subLine2: "y permitir la llegada de un amor sano."
      },
      {
        titleLine1: "✨ Recupera tu Libertad ✨",
        titleLine2: "Inscríbete Hoy",
        subLine1: "Escríbenos por WhatsApp",
        subLine2: "Taller vivencial de profunda transmutación"
      }
    ]
  },
  {
    slug: "sanacion-del-linaje-materno",
    image: "linaje-materno.jpg",
    kicker: "LINAJE MATERNO & ANCESTRAS",
    freq: 432,
    bowlFreqs: [216, 270, 324, 432],
    footer: "Eveline Dublán • 1 sesión sagrada",
    scenes: [
      {
        titleLine1: "La relación con tu madre",
        titleLine2: "es tu portal al merecimiento",
        subLine1: "En tu vientre vive la historia y los anhelos",
        subLine2: "de todas las mujeres que te precedieron."
      },
      {
        titleLine1: "Sanación Profunda del",
        titleLine2: "Linaje Materno",
        subLine1: "Sana el vínculo sagrado con mamá y abuelas",
        subLine2: "para recuperar tu fuerza nutricia."
      },
      {
        titleLine1: "Límites Amorosos",
        titleLine2: "y Bendición de Raíz",
        subLine1: "Ritual de reconciliación y corte de mandatos",
        subLine2: "honrando su luz y soltando sus cargas."
      },
      {
        titleLine1: "✨ Honra tu Historia Sagrada ✨",
        titleLine2: "Inscríbete Hoy",
        subLine1: "Escríbenos por WhatsApp",
        subLine2: "Acompañamiento respetuoso y compasivo"
      }
    ]
  },
  {
    slug: "sanacion-del-linaje-paterno",
    image: "linaje-paterno.jpg",
    kicker: "CANAL SOLAR & FUERZA",
    freq: 528,
    bowlFreqs: [264, 330, 396, 528],
    footer: "Eveline Dublán • 1 sesión sagrada",
    scenes: [
      {
        titleLine1: "Tu padre rige tu fuerza,",
        titleLine2: "dinero y determinación",
        subLine1: "El canal derecho gobierna tu capacidad",
        subLine2: "de poner límites y triunfar en el mundo."
      },
      {
        titleLine1: "Sanación Profunda del",
        titleLine2: "Linaje Paterno",
        subLine1: "Reconcíliate con la energía del padre",
        subLine2: "y activa tu canal solar de manifestación."
      },
      {
        titleLine1: "Ancestros Masculinos",
        titleLine2: "Luminosos y Protección",
        subLine1: "Sana heridas del pasado y recupera",
        subLine2: "el impulso para alcanzar tus metas."
      },
      {
        titleLine1: "✨ Despliega tu Fuerza Vital ✨",
        titleLine2: "Inscríbete Hoy",
        subLine1: "Escríbenos por WhatsApp",
        subLine2: "Sesión intensiva y transformadora"
      }
    ]
  },
  {
    slug: "vidas-pasadas",
    image: "vidas-pasadas.jpg",
    kicker: "REGRESIÓN & ALMA",
    freq: 432,
    bowlFreqs: [108, 162, 216, 432],
    footer: "Eveline Dublán • 1 sesión con cuencos",
    scenes: [
      {
        titleLine1: "¿Por qué hay miedos o vínculos",
        titleLine2: "que desafían toda lógica?",
        subLine1: "Muchas respuestas yacen en experiencias",
        subLine2: "y contratos pactados en encarnaciones pasadas."
      },
      {
        titleLine1: "Taller de Vidas Pasadas",
        titleLine2: "y Regresión Consciente",
        subLine1: "Un viaje protegido y seguro hacia el pasado",
        subLine2: "para desbloquear entendimiento y paz."
      },
      {
        titleLine1: "Vibración Sagrada de",
        titleLine2: "Cuencos Tibetanos",
        subLine1: "El sonido armónico de los cuencos induce",
        subLine2: "a un estado de regresión lúcida y sanadora."
      },
      {
        titleLine1: "✨ Libera el Pasado y Evoluciona ✨",
        titleLine2: "Inscríbete Hoy",
        subLine1: "Escríbenos por WhatsApp",
        subLine2: "Sesión vivencial guiada por Eveline Dublán"
      }
    ]
  }
];

const videosDir = path.join(__dirname, '../public/assets/courses/videos');
const coursesImgDir = path.join(__dirname, '../public/assets/courses');

// 1. Generate custom mystical audio with 4 timed bowl strikes for each scene
function generateAudio(course, outputPath) {
  const pythonScript = `
import wave, struct, math

sample_rate = 44100
duration = 15.0
total_samples = int(sample_rate * duration)
f_root = ${course.freq}
b_freqs = ${JSON.stringify(course.bowlFreqs)}

def bowl_strike(t, f0, strike_time, decay=4.0):
    dt = t - strike_time
    if dt < 0: return 0.0
    amp = math.exp(-dt / decay)
    s1 = math.sin(2 * math.pi * f0 * dt)
    s2 = 0.45 * math.sin(2 * math.pi * (f0 * 2.71) * dt)
    s3 = 0.22 * math.sin(2 * math.pi * (f0 * 4.76) * dt)
    beat = 1.0 + 0.12 * math.sin(2 * math.pi * 2.2 * dt)
    return amp * (s1 + s2 + s3) * beat

def bell_ping(t, f0, strike_time):
    dt = t - strike_time
    if dt < 0: return 0.0
    amp = math.exp(-dt / 1.5)
    return amp * 0.28 * (math.sin(2 * math.pi * f0 * dt) + 0.25 * math.sin(2 * math.pi * f0 * 2.01 * dt))

left = []
right = []

for i in range(total_samples):
    t = i / sample_rate
    fade_in = min(1.0, t / 1.0)
    fade_out = min(1.0, (duration - t) / 1.5)
    fade = fade_in * fade_out

    # Continuous root drone
    drone = (
        0.35 * math.sin(2 * math.pi * (f_root / 4.0) * t) +
        0.30 * math.sin(2 * math.pi * (f_root / 2.0) * t + 0.2) +
        0.20 * math.sin(2 * math.pi * (f_root * 0.75) * t + 0.4)
    )

    # Ambient pad harmonic
    lfo = 0.5 + 0.5 * math.sin(2 * math.pi * 0.15 * t)
    pad = (
        0.18 * math.sin(2 * math.pi * f_root * t) +
        0.14 * math.sin(2 * math.pi * (f_root * 1.25) * t + 0.5) +
        0.12 * math.sin(2 * math.pi * (f_root * 1.5) * t + 1.0)
    ) * lfo

    # 4 Strikes timed to each scene's entrance
    b1 = bowl_strike(t, b_freqs[0], 0.2, 4.5)   # Scene 1: Hook
    b2 = bowl_strike(t, b_freqs[1], 3.8, 4.5)   # Scene 2: Title
    b3 = bowl_strike(t, b_freqs[2], 7.6, 4.5)   # Scene 3: Method
    b4 = bowl_strike(t, b_freqs[3], 11.4, 4.5)  # Scene 4: CTA
    bowls = (b1 + b2 + b3 + b4) * 0.8

    # Chimes / crystal pings
    c1 = bell_ping(t, f_root * 4.0, 1.2)
    c2 = bell_ping(t, f_root * 5.0, 5.2)
    c3 = bell_ping(t, f_root * 4.5, 9.0)
    c4 = bell_ping(t, f_root * 6.0, 12.6)
    chimes = (c1 + c2 + c3 + c4) * 0.35

    sig_l = (drone * 0.85 + pad * 0.8 + bowls * 0.95 + chimes * 0.7) * fade
    sig_r = (drone * 0.85 + pad * 1.1 + bowls * 0.85 + chimes * 1.2) * fade

    left.append(sig_l)
    right.append(sig_r)

max_val = max(max(abs(x) for x in left), max(abs(x) for x in right), 0.001)
left_norm = [int((x / max_val) * 28000) for x in left]
right_norm = [int((x / max_val) * 28000) for x in right]

with wave.open('${outputPath}', 'w') as wav:
    wav.setnchannels(2)
    wav.setsampwidth(2)
    wav.setframerate(sample_rate)
    frames = bytearray()
    for l, r in zip(left_norm, right_norm):
        frames.extend(struct.pack('<hh', l, r))
    wav.writeframes(frames)
`;
  const tempScript = path.join(videosDir, `temp_${course.slug}.py`);
  fs.writeFileSync(tempScript, pythonScript);
  execSync(`python3 "${tempScript}"`);
  if (fs.existsSync(tempScript)) fs.unlinkSync(tempScript);
}

// 2. Generate a single scene SVG overlay (720x1280 vertical Reel format)

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

async function renderSceneOverlay(course, scene, step, outputPath) {
  const svg = `<svg width='720' height='1280' viewBox='0 0 720 1280' xmlns='http://www.w3.org/2000/svg'>
    <defs>
      <linearGradient id='bgGrad' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='0%' stop-color='#0c0316' stop-opacity='0.88'/>
        <stop offset='25%' stop-color='#190827' stop-opacity='0.42'/>
        <stop offset='75%' stop-color='#150621' stop-opacity='0.58'/>
        <stop offset='100%' stop-color='#08020d' stop-opacity='0.96'/>
      </linearGradient>
      <filter id='shadow' x='-10%' y='-10%' width='120%' height='120%'>
        <feDropShadow dx='0' dy='4' stdDeviation='10' flood-color='#000000' flood-opacity='0.95'/>
      </filter>
    </defs>

    <!-- Dark gradient overlay -->
    <rect width='100%' height='100%' fill='url(#bgGrad)'/>

    <!-- Header: Reel Kicker Badge -->
    <g transform='translate(360, 130)' filter='url(#shadow)'>
      <rect x='-140' y='-22' width='280' height='44' rx='22' fill='#1e0c33' fill-opacity='0.9' stroke='#f59e0b' stroke-width='1.5'/>
      <text x='0' y='6' font-family='Arial, sans-serif' font-size='13' font-weight='700' letter-spacing='3.5' fill='#fde047' text-anchor='middle'>
        ${escapeXml(course.kicker)}
      </text>
    </g>

    <!-- Center Card: Kinetic Content -->
    <g transform='translate(360, 600)' filter='url(#shadow)'>
      <!-- Card background -->
      <rect x='-300' y='-220' width='600' height='440' rx='28' fill='#170826' fill-opacity='0.86' stroke='#9333ea' stroke-opacity='0.45' stroke-width='1.5'/>

      <!-- Step Indicator Dots -->
      <g transform='translate(0, -170)'>
        <circle cx='-36' cy='0' r='4.5' fill='${step === 1 ? "#fde047" : "#ffffff"}' fill-opacity='${step === 1 ? 1 : 0.25}'/>
        <circle cx='-12' cy='0' r='4.5' fill='${step === 2 ? "#fde047" : "#ffffff"}' fill-opacity='${step === 2 ? 1 : 0.25}'/>
        <circle cx='12' cy='0' r='4.5' fill='${step === 3 ? "#fde047" : "#ffffff"}' fill-opacity='${step === 3 ? 1 : 0.25}'/>
        <circle cx='36' cy='0' r='4.5' fill='${step === 4 ? "#fde047" : "#ffffff"}' fill-opacity='${step === 4 ? 1 : 0.25}'/>
      </g>

      <!-- Title Lines -->
      <text x='0' y='-65' font-family='Arial, sans-serif' font-size='30' font-weight='700' fill='#ffffff' text-anchor='middle'>
        ${escapeXml(scene.titleLine1)}
      </text>
      <text x='0' y='-15' font-family='Arial, sans-serif' font-size='32' font-weight='700' fill='#fde047' text-anchor='middle'>
        ${escapeXml(scene.titleLine2)}
      </text>

      <!-- Decorative Divider -->
      <line x1='-60' y1='25' x2='60' y2='25' stroke='#f59e0b' stroke-width='1.5' stroke-opacity='0.5'/>

      <!-- Subtitle Lines -->
      <text x='0' y='65' font-family='Arial, sans-serif' font-size='17' font-weight='500' fill='#f3e8ff' text-anchor='middle'>
        ${escapeXml(scene.subLine1)}
      </text>
      <text x='0' y='100' font-family='Arial, sans-serif' font-size='17' font-weight='500' fill='#f3e8ff' text-anchor='middle'>
        ${escapeXml(scene.subLine2)}
      </text>
    </g>

    <!-- Footer: Eveline Dublán & Sound -->
    <g transform='translate(360, 1140)' filter='url(#shadow)'>
      <line x1='-140' y1='-35' x2='140' y2='-35' stroke='#f59e0b' stroke-width='1' stroke-opacity='0.45'/>
      <text x='0' y='-10' font-family='Arial, sans-serif' font-size='22' font-weight='700' fill='#ffffff' text-anchor='middle' letter-spacing='3'>
        EVELINE DUBLÁN
      </text>
      <text x='0' y='22' font-family='Arial, sans-serif' font-size='14' font-weight='500' fill='#fde047' text-anchor='middle'>
        ${escapeXml(course.footer)}
      </text>
      <g transform='translate(0, 52)'>
        <rect x='-130' y='-14' width='260' height='28' rx='14' fill='#000000' fill-opacity='0.65'/>
        <text x='0' y='4' font-family='Arial, sans-serif' font-size='11' fill='#d8b4fe' text-anchor='middle'>
          ♫ Frecuencia ${course.freq} Hz • Sin Voz
        </text>
      </g>
    </g>
  </svg>`;

  await sharp(Buffer.from(svg)).png().toFile(outputPath);
}

async function run() {
  console.log('Generating 11 Instagram Reel-style course videos with kinetic typography...');

  for (let i = 0; i < reelsData.length; i++) {
    const course = reelsData[i];
    console.log(`[${i + 1}/11] Creating Reel for: ${course.slug}...`);

    const imagePath = path.join(coursesImgDir, course.image);
    const audioPath = path.join(videosDir, `audio_${course.slug}.wav`);
    const s1Path = path.join(videosDir, `s1_${course.slug}.png`);
    const s2Path = path.join(videosDir, `s2_${course.slug}.png`);
    const s3Path = path.join(videosDir, `s3_${course.slug}.png`);
    const s4Path = path.join(videosDir, `s4_${course.slug}.png`);
    const outputVideoPath = path.join(videosDir, `${course.slug}.mp4`);

    if (!fs.existsSync(imagePath)) {
      console.error(`Image not found: ${imagePath}`);
      continue;
    }

    // 1. Generate timed audio
    generateAudio(course, audioPath);

    // 2. Generate 4 scene overlays
    await renderSceneOverlay(course, course.scenes[0], 1, s1Path);
    await renderSceneOverlay(course, course.scenes[1], 2, s2Path);
    await renderSceneOverlay(course, course.scenes[2], 3, s3Path);
    await renderSceneOverlay(course, course.scenes[3], 4, s4Path);

    // 3. Composite with ffmpeg (720x1280 9:16 vertical Reel with scene fades)
    const ffmpegCmd = `ffmpeg -y \
      -loop 1 -t 15 -i "${imagePath}" \
      -loop 1 -t 15 -i "${s1Path}" \
      -loop 1 -t 15 -i "${s2Path}" \
      -loop 1 -t 15 -i "${s3Path}" \
      -loop 1 -t 15 -i "${s4Path}" \
      -i "${audioPath}" \
      -filter_complex "\
        [0:v]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,zoompan=z='min(zoom+0.0006,1.15)':d=375:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=720x1280:fps=25[bg]; \
        [1:v]fade=t=in:st=0.2:d=0.4:alpha=1,fade=t=out:st=3.4:d=0.4:alpha=1[s1]; \
        [2:v]fade=t=in:st=3.8:d=0.4:alpha=1,fade=t=out:st=7.2:d=0.4:alpha=1[s2]; \
        [3:v]fade=t=in:st=7.6:d=0.4:alpha=1,fade=t=out:st=11.0:d=0.4:alpha=1[s3]; \
        [4:v]fade=t=in:st=11.4:d=0.4:alpha=1,fade=t=out:st=14.3:d=0.6:alpha=1[s4]; \
        [bg][s1]overlay=0:0[b1]; \
        [b1][s2]overlay=0:0[b2]; \
        [b2][s3]overlay=0:0[b3]; \
        [b3][s4]overlay=0:0[out_v]" \
      -map "[out_v]" -map 5:a \
      -c:v libx264 -pix_fmt yuv420p -preset fast -crf 23 \
      -c:a aac -b:a 192k \
      -shortest -movflags +faststart \
      "${outputVideoPath}"`;

    execSync(ffmpegCmd, { stdio: 'pipe' });

    // Cleanup temp files
    if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);
    if (fs.existsSync(s1Path)) fs.unlinkSync(s1Path);
    if (fs.existsSync(s2Path)) fs.unlinkSync(s2Path);
    if (fs.existsSync(s3Path)) fs.unlinkSync(s3Path);
    if (fs.existsSync(s4Path)) fs.unlinkSync(s4Path);

    const stats = fs.statSync(outputVideoPath);
    console.log(`✓ Reel created: ${course.slug}.mp4 (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
  }

  console.log('All 11 Reels generated successfully!');
}

run().catch(console.error);
