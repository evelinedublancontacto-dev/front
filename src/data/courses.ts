export interface Course {
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  duration: string;
  lessons: number;
  price: string;
  priceUsd: string;
  image: string;
  videos: { title: string; url: string; duration: string }[];
}

export const courses: Course[] = [
  {
    slug: "sanacion-energetica-basica",
    title: "Sanación Energética Básica",
    category: "Sanación",
    description: "Aprende las bases de la sanación energética y cómo canalizar energía para tu bienestar y el de los demás.",
    longDescription: "En este curso aprenderás los fundamentos de la sanación energética, incluyendo la limpieza de aura, armonización de chakras y técnicas de canalización. Ideal para quienes inician su camino en las terapias holísticas.",
    duration: "8 h",
    lessons: 10,
    price: "$500 MXN",
    priceUsd: "$28 USD",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=600&fit=crop",
    videos: [
      { title: "Introducción a la sanación energética", url: "", duration: "45 min" },
      { title: "El campo áurico y los chakras", url: "", duration: "50 min" },
      { title: "Técnicas de limpieza energética", url: "", duration: "55 min" },
    ],
  },
  {
    slug: "meditacion-guiada-avanzada",
    title: "Meditación Guiada Avanzada",
    category: "Meditación",
    description: "Profundiza en técnicas de meditación para conectar con tu esencia y expandir tu consciencia.",
    longDescription: "Un curso diseñado para quienes ya tienen práctica meditativa y desean profundizar. Exploraremos meditaciones con visualización, respiración consciente, conexión con guías espirituales y estados expandidos de consciencia.",
    duration: "6 h",
    lessons: 8,
    price: "$400 MXN",
    priceUsd: "$22 USD",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&h=600&fit=crop",
    videos: [
      { title: "Fundamentos de la meditación profunda", url: "", duration: "40 min" },
      { title: "Meditación con visualización creativa", url: "", duration: "50 min" },
      { title: "Conexión con guías espirituales", url: "", duration: "45 min" },
    ],
  },
  {
    slug: "cuencos-tibetanos-terapeuticos",
    title: "Cuencos Tibetanos Terapéuticos",
    category: "Sonido",
    description: "Descubre el poder sanador de los cuencos tibetanos y aprende a utilizarlos en sesiones terapéuticas.",
    longDescription: "Aprende a seleccionar, limpiar y utilizar cuencos tibetanos para sesiones de sanación sonora. Incluye teoría de las vibraciones, técnicas de percusión, y cómo diseñar una sesión completa de sonoterapia.",
    duration: "10 h",
    lessons: 12,
    price: "$600 MXN",
    priceUsd: "$33 USD",
    image: "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?w=600&h=600&fit=crop",
    videos: [
      { title: "Historia y origen de los cuencos", url: "", duration: "35 min" },
      { title: "Selección y limpieza de cuencos", url: "", duration: "40 min" },
      { title: "Técnicas de percusión básicas", url: "", duration: "50 min" },
    ],
  },
  {
    slug: "cristales-y-cuarzos",
    title: "Cristales y Cuarzos para Sanación",
    category: "Cristales",
    description: "Conoce las propiedades mágicas de los cristales y aprende a crear Crystal Grids poderosos.",
    longDescription: "Un recorrido completo por el mundo de los cristales: desde identificar y limpiar cada piedra hasta crear Crystal Grids con intención. Aprenderás sobre las propiedades energéticas de más de 15 cuarzos y cómo integrarlos en tu práctica espiritual.",
    duration: "7 h",
    lessons: 9,
    price: "$450 MXN",
    priceUsd: "$25 USD",
    image: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=600&h=600&fit=crop",
    videos: [
      { title: "Introducción al mundo de los cristales", url: "", duration: "40 min" },
      { title: "Limpieza e intención de piedras", url: "", duration: "45 min" },
      { title: "Diseñando tu primer Crystal Grid", url: "", duration: "55 min" },
    ],
  },
  {
    slug: "psicoterapia-holistica",
    title: "Psicoterapia Holística Integral",
    category: "Psicoterapia",
    description: "Integra herramientas de psicoterapia con enfoques holísticos para un acompañamiento más completo.",
    longDescription: "Este curso combina técnicas de psicoterapia tradicional con enfoques holísticos como la sanación energética, la meditación y el trabajo con el cuerpo. Ideal para terapeutas que desean ampliar su práctica.",
    duration: "12 h",
    lessons: 15,
    price: "$700 MXN",
    priceUsd: "$38 USD",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=600&fit=crop",
    videos: [
      { title: "Psicoterapia y espiritualidad", url: "", duration: "50 min" },
      { title: "El cuerpo como mapa emocional", url: "", duration: "55 min" },
      { title: "Herramientas integradoras", url: "", duration: "60 min" },
    ],
  },
  {
    slug: "sanacion-animal-energetica",
    title: "Sanación Energética para Animales",
    category: "Animales",
    description: "Aprende a canalizar energía de sanación para el bienestar de tus compañeros animales.",
    longDescription: "Los animales también se benefician de la sanación energética. Aprende a percibir el campo energético animal, a realizar limpiezas y armonizaciones, y a comunicarte intuitivamente con ellos.",
    duration: "5 h",
    lessons: 7,
    price: "$350 MXN",
    priceUsd: "$20 USD",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop",
    videos: [
      { title: "El campo energético animal", url: "", duration: "35 min" },
      { title: "Técnicas de sanación a distancia", url: "", duration: "40 min" },
      { title: "Comunicación intuitiva", url: "", duration: "45 min" },
    ],
  },
];

export const courseCategories = [...new Set(courses.map((c) => c.category))];
