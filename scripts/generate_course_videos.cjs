const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');

const coursesData = [
  {
    slug: "arbol-genealogico",
    image: "arbol-genealogico.jpg",
    category: "ANCESTROS",
    titleLine1: "Análisis y Sanación Profunda",
    titleLine2: "de Tu Árbol Genealógico",
    highlights: "Identifica dobles • Secretos familiares • Rituales de corte de patrones",
    duration: "1 sesión presencial",
    freq: 432,
    bowlFreqs: [216, 324, 432]
  },
  {
    slug: "sanacion-con-velas",
    image: "sanacion-velas.jpg",
    category: "VELAS Y MAGIA",
    titleLine1: "Rituales de Sanación",
    titleLine2: "con Velas Sagradas",
    highlights: "Fuego sagrado • Activación de rituales • Lectura de restos de cera",
    duration: "3 sesiones en línea",
    freq: 528,
    bowlFreqs: [264, 396, 528]
  },
  {
    slug: "sanacion-para-animales",
    image: "sanacion-animales.jpg",
    category: "SANACIÓN ANIMAL",
    titleLine1: "Sanación Holística y Energética",
    titleLine2: "para Animales",
    highlights: "Conexión de corazón • Chakras • Tanatología y sanación de trauma",
    duration: "6 módulos sincrónicos",
    freq: 432,
    bowlFreqs: [216, 288, 432]
  },
  {
    slug: "sanacion-y-florecimiento",
    image: "sanacion-florecimiento.jpg",
    category: "SAGRADO FEMENINO",
    titleLine1: "Sanación y Florecimiento",
    titleLine2: "del Sagrado Femenino",
    highlights: "Energía uterina • Linaje ancestral • Diosas y poder femenino",
    duration: "9 módulos presenciales",
    freq: 417,
    bowlFreqs: [208, 312, 417]
  },
  {
    slug: "taller-de-angeles",
    image: "taller-angeles.jpg",
    category: "ENERGÍA ANGELICAL",
    titleLine1: "Taller de Ángeles",
    titleLine2: "Conexión y Sanación de Luz",
    highlights: "Construcción de altar • Canalización de luz • Burbujas de protección",
    duration: "1 sesión presencial",
    freq: 741,
    bowlFreqs: [370, 555, 741]
  },
  {
    slug: "taller-de-abundancia",
    image: "taller-abundancia.jpg",
    category: "PROSPERIDAD",
    titleLine1: "Taller de Abundancia",
    titleLine2: "y Prosperidad Consciente",
    highlights: "Desbloqueo de contratos familiares • Conexión con el sustento divino",
    duration: "2 sesiones Zoom en vivo",
    freq: 528,
    bowlFreqs: [264, 396, 528]
  },
  {
    slug: "lectura-de-oraculo",
    image: "lectura-oraculo.jpg",
    category: "ORÁCULOS E INTUICIÓN",
    titleLine1: "Taller de Lectura",
    titleLine2: "de Oráculos Sagrados",
    highlights: "Consagración de cartas • Tiradas sagradas • Canalización certera",
    duration: "2 sesiones intensivas",
    freq: 741,
    bowlFreqs: [370, 432, 741]
  },
  {
    slug: "cortar-lazos-con-tu-ex",
    image: "cortar-lazos.jpg",
    category: "RELACIONES Y ENERGÍA",
    titleLine1: "Cortar Lazos con tu Ex",
    titleLine2: "Recuperación de tu Energía",
    highlights: "Corte de lazos emocionales y sexuales • Recupera tu vitalidad",
    duration: "1 sesión en línea",
    freq: 396,
    bowlFreqs: [198, 297, 396]
  },
  {
    slug: "sanacion-del-linaje-materno",
    image: "linaje-materno.jpg",
    category: "ANCESTRAS Y MATRIZ",
    titleLine1: "Sanación Profunda",
    titleLine2: "del Linaje Materno",
    highlights: "7 generaciones en tu útero • Reconciliación • Límites y perdón",
    duration: "1 sesión sagrada",
    freq: 432,
    bowlFreqs: [216, 324, 432]
  },
  {
    slug: "sanacion-del-linaje-paterno",
    image: "linaje-paterno.jpg",
    category: "CANAL SOLAR Y RECONOCIMIENTO",
    titleLine1: "Sanación Profunda",
    titleLine2: "del Linaje Paterno",
    highlights: "Canal derecho • Prosperidad, profesión y sagrado masculino",
    duration: "1 sesión sagrada",
    freq: 528,
    bowlFreqs: [264, 396, 528]
  },
  {
    slug: "vidas-pasadas",
    image: "vidas-pasadas.jpg",
    category: "REGRESIÓN Y ALMA",
    titleLine1: "Taller de Vidas Pasadas",
    titleLine2: "y Regresión Consciente",
    highlights: "Sonido armónico de Cuencos Tibetanos • Contratos y lecciones de alma",
    duration: "1 sesión con cuencos",
    freq: 432,
    bowlFreqs: [108, 216, 432]
  }
];

const videosDir = path.join(__dirname, '../public/assets/courses/videos');
const coursesImgDir = path.join(__dirname, '../public/assets/courses');

if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

function generateAudio(course, outputPath) {
  const pythonScript = `
import wave, struct, math

sample_rate = 44100
duration = 14.0
total_samples = int(sample_rate * duration)
f_root = ${course.freq}
b_freqs = ${JSON.stringify(course.bowlFreqs)}

def bowl_strike(t, f0, strike_time, decay=4.2):
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
    amp = math.exp(-dt / 1.6)
    return amp * 0.3 * (math.sin(2 * math.pi * f0 * dt) + 0.25 * math.sin(2 * math.pi * f0 * 2.01 * dt))

left = []
right = []

for i in range(total_samples):
    t = i / sample_rate
    fade_in = min(1.0, t / 1.5)
    fade_out = min(1.0, (duration - t) / 2.0)
    fade = fade_in * fade_out

    # Root drone
    drone = (
        0.35 * math.sin(2 * math.pi * (f_root / 4.0) * t) +
        0.30 * math.sin(2 * math.pi * (f_root / 2.0) * t + 0.2) +
        0.20 * math.sin(2 * math.pi * (f_root * 0.75) * t + 0.4)
    )

    # Ambient pad harmonic
    lfo = 0.5 + 0.5 * math.sin(2 * math.pi * 0.18 * t)
    pad = (
        0.18 * math.sin(2 * math.pi * f_root * t) +
        0.14 * math.sin(2 * math.pi * (f_root * 1.25) * t + 0.5) +
        0.12 * math.sin(2 * math.pi * (f_root * 1.5) * t + 1.0)
    ) * lfo

    # Bowls
    b1 = bowl_strike(t, b_freqs[0], 0.3, 5.2)
    b2 = bowl_strike(t, b_freqs[1], 4.2, 4.8)
    b3 = bowl_strike(t, b_freqs[2], 8.2, 5.0)
    bowls = (b1 + b2 + b3) * 0.75

    # Chimes / crystal
    c1 = bell_ping(t, f_root * 4.0, 1.8)
    c2 = bell_ping(t, f_root * 5.0, 6.2)
    c3 = bell_ping(t, f_root * 6.0, 10.2)
    chimes = (c1 + c2 + c3) * 0.35

    sig_l = (drone * 0.9 + pad * 0.8 + bowls * 0.95 + chimes * 0.7) * fade
    sig_r = (drone * 0.9 + pad * 1.1 + bowls * 0.85 + chimes * 1.2) * fade

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

async function generateOverlay(course, outputPath) {
  const svg = `<svg width='1280' height='720' viewBox='0 0 1280 720' xmlns='http://www.w3.org/2000/svg'>
  <defs>
    <linearGradient id='bgGrad' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0%' stop-color='#160824' stop-opacity='0.75'/>
      <stop offset='45%' stop-color='#12041c' stop-opacity='0.45'/>
      <stop offset='75%' stop-color='#0f0318' stop-opacity='0.78'/>
      <stop offset='100%' stop-color='#090110' stop-opacity='0.96'/>
    </linearGradient>
    <filter id='dropShadow' x='-10%' y='-10%' width='120%' height='120%'>
      <feDropShadow dx='0' dy='4' stdDeviation='8' flood-color='#000000' flood-opacity='0.85'/>
    </filter>
  </defs>

  <!-- Mystical gradient overlay -->
  <rect width='100%' height='100%' fill='url(#bgGrad)'/>

  <!-- Top Pill Badge -->
  <g transform='translate(640, 115)'>
    <rect x='-110' y='-20' width='220' height='40' rx='20' fill='#ffffff' fill-opacity='0.12' stroke='#f59e0b' stroke-width='1.5'/>
    <text x='0' y='6' font-family='Arial, sans-serif' font-size='13' font-weight='700' letter-spacing='3.5' fill='#fcd34d' text-anchor='middle'>${course.category}</text>
  </g>

  <!-- Decorative Sparkles -->
  <g fill='#fcd34d' opacity='0.7'>
    <circle cx='180' cy='180' r='3'/>
    <circle cx='1100' cy='220' r='4'/>
    <circle cx='160' cy='520' r='3.5'/>
    <circle cx='1120' cy='500' r='3'/>
  </g>

  <!-- Course Title -->
  <g filter='url(#dropShadow)'>
    <text x='640' y='275' font-family='Arial, sans-serif' font-size='40' font-weight='bold' fill='#ffffff' text-anchor='middle'>
      ${course.titleLine1}
    </text>
    <text x='640' y='332' font-family='Arial, sans-serif' font-size='40' font-weight='bold' fill='#fcd34d' text-anchor='middle'>
      ${course.titleLine2}
    </text>
  </g>

  <!-- Key Highlights -->
  <g transform='translate(640, 420)' filter='url(#dropShadow)'>
    <text x='0' y='0' font-family='Arial, sans-serif' font-size='17' font-weight='500' fill='#f3e8ff' text-anchor='middle' letter-spacing='0.5'>
      ${course.highlights}
    </text>
  </g>

  <!-- Bottom Brand, Duration & Eveline Dublán -->
  <g transform='translate(640, 615)' filter='url(#dropShadow)'>
    <line x1='-160' y1='-32' x2='160' y2='-32' stroke='#f59e0b' stroke-width='1' stroke-opacity='0.45'/>
    <text x='0' y='-10' font-family='Arial, sans-serif' font-size='20' font-weight='700' fill='#ffffff' text-anchor='middle' letter-spacing='2.5'>
      EVELINE DUBLÁN
    </text>
    <text x='0' y='18' font-family='Arial, sans-serif' font-size='15' font-weight='500' fill='#fcd34d' text-anchor='middle'>
      Psicoterapeuta &amp; Terapeuta Holística • ${course.duration}
    </text>
  </g>
</svg>`;

  await sharp(Buffer.from(svg)).png().toFile(outputPath);
}

async function run() {
  console.log(`Starting generation of 11 course preview videos with mystical music...`);

  for (let i = 0; i < coursesData.length; i++) {
    const course = coursesData[i];
    console.log(`[${i + 1}/11] Processing ${course.slug}...`);

    const imagePath = path.join(coursesImgDir, course.image);
    const audioPath = path.join(videosDir, `audio_${course.slug}.wav`);
    const overlayPath = path.join(videosDir, `overlay_${course.slug}.png`);
    const outputVideoPath = path.join(videosDir, `${course.slug}.mp4`);

    if (!fs.existsSync(imagePath)) {
      console.error(`Image not found: ${imagePath}`);
      continue;
    }

    // 1. Generate custom mystical audio
    generateAudio(course, audioPath);

    // 2. Generate PNG overlay
    await generateOverlay(course, overlayPath);

    // 3. Render video with ffmpeg
    const ffmpegCmd = `ffmpeg -y \
      -loop 1 -t 14 -i "${imagePath}" \
      -loop 1 -t 14 -i "${overlayPath}" \
      -i "${audioPath}" \
      -filter_complex "[0:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.0008,1.12)':d=350:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1280x720:fps=25[bg];[bg][1:v]overlay=0:0[composed];[composed]fade=t=in:st=0:d=1,fade=t=out:st=12.5:d=1.5[v]" \
      -map "[v]" -map 2:a \
      -c:v libx264 -pix_fmt yuv420p -preset fast -crf 23 \
      -c:a aac -b:a 192k \
      -shortest -movflags +faststart \
      "${outputVideoPath}"`;

    execSync(ffmpegCmd, { stdio: 'pipe' });

    // Cleanup temp files
    if (fs.existsSync(audioPath)) fs.unlinkSync(audioPath);
    if (fs.existsSync(overlayPath)) fs.unlinkSync(overlayPath);

    const stats = fs.statSync(outputVideoPath);
    console.log(`✓ Completed: ${course.slug}.mp4 (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
  }

  console.log('All 11 course videos generated successfully!');
}

run().catch(console.error);
