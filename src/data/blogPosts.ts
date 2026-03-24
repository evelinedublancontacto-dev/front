export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
}

export const categories = [
  "Todos",
  "Psicoterapia",
  "Meditación",
  "Sanación Energética",
  "Bienestar",
  "Animales",
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "El poder de la hipnoterapia Ericksoniana en la sanación emocional",
    slug: "hipnoterapia-ericksoniana-sanacion-emocional",
    excerpt:
      "Descubre cómo la hipnoterapia Ericksoniana puede ayudarte a acceder a recursos internos profundos para sanar heridas emocionales y transformar patrones limitantes.",
    content: `La hipnoterapia Ericksoniana es un enfoque terapéutico que utiliza el trance natural para acceder al inconsciente y facilitar cambios profundos. A diferencia de la hipnosis clásica, este método es permisivo, respetuoso y se adapta a las necesidades únicas de cada persona.

## ¿Cómo funciona?

Milton Erickson creía que cada persona tiene dentro de sí todos los recursos necesarios para resolver sus problemas. El terapeuta actúa como guía, ayudando al paciente a acceder a esos recursos a través de metáforas, cuentos terapéuticos y sugestiones indirectas.

## Beneficios principales

- **Reducción de ansiedad y estrés**: El trance hipnótico activa la respuesta de relajación del cuerpo.
- **Procesamiento de traumas**: Permite abordar experiencias difíciles de manera segura y contenida.
- **Cambio de patrones**: Facilita la transformación de hábitos y creencias limitantes.
- **Fortalecimiento del autoconcepto**: Ayuda a reconectar con la propia valía y recursos internos.

## ¿Para quién es?

La hipnoterapia Ericksoniana es adecuada para personas de todas las edades que buscan un enfoque respetuoso y profundo para su proceso de sanación.`,
    category: "Psicoterapia",
    date: "2025-03-15",
    readTime: "5 min",
    imageUrl: "",
  },
  {
    id: "2",
    title: "Meditación guiada: tu puerta hacia la paz interior",
    slug: "meditacion-guiada-paz-interior",
    excerpt:
      "Aprende cómo la meditación guiada puede transformar tu día a día, reduciendo el estrés y conectándote con tu esencia más profunda.",
    content: `La meditación guiada es una práctica accesible que te permite encontrar calma y claridad mental sin necesidad de experiencia previa. A través de la voz del guía, tu mente se relaja y tu cuerpo se libera de la tensión acumulada.

## ¿Por qué meditar?

En un mundo lleno de estímulos constantes, la meditación nos ofrece un espacio de silencio interior. Estudios científicos han demostrado que la práctica regular de meditación puede:

- Reducir los niveles de cortisol (hormona del estrés)
- Mejorar la calidad del sueño
- Aumentar la capacidad de concentración
- Fortalecer el sistema inmunológico

## Cómo empezar

No necesitas un lugar especial ni equipo sofisticado. Solo necesitas unos minutos de tu día y la disposición de estar presente. Comienza con sesiones cortas de 5-10 minutos e incrementa gradualmente.

## Meditaciones disponibles

Ofrezco meditaciones guiadas en formato de audio que puedes escuchar desde la comodidad de tu hogar, abordando temas como sanación emocional, conexión con tu niño interior y visualización creativa.`,
    category: "Meditación",
    date: "2025-03-10",
    readTime: "4 min",
    imageUrl: "",
  },
  {
    id: "3",
    title: "Cuencos tibetanos: vibración que sana cuerpo y alma",
    slug: "cuencos-tibetanos-vibracion-sanacion",
    excerpt:
      "Los cuencos tibetanos producen frecuencias sonoras que armonizan tus chakras y promueven un estado profundo de relajación y bienestar.",
    content: `Los cuencos tibetanos son instrumentos ancestrales utilizados durante miles de años para la meditación, la sanación y la armonización energética. Sus vibraciones penetran profundamente en el cuerpo, creando un efecto de masaje sonoro a nivel celular.

## La ciencia del sonido

Cada cuenco produce una frecuencia específica que resuena con diferentes centros energéticos del cuerpo. Cuando un chakra está desequilibrado, las vibraciones del cuenco ayudan a restaurar su frecuencia natural.

## Beneficios de las sesiones

- **Relajación profunda**: Las vibraciones inducen un estado de calma similar a la meditación profunda.
- **Alivio del dolor**: Muchas personas reportan reducción de dolores crónicos después de las sesiones.
- **Equilibrio emocional**: Ayuda a liberar emociones atrapadas y restaurar la armonía interior.
- **Mejora del sueño**: Las sesiones regulares pueden mejorar significativamente la calidad del descanso.

## ¿Cómo es una sesión?

Durante una sesión, te recuestas cómodamente mientras los cuencos se colocan alrededor y sobre tu cuerpo. Las vibraciones te envuelven, creando una experiencia profundamente relajante y restauradora.`,
    category: "Sanación Energética",
    date: "2025-03-05",
    readTime: "6 min",
    imageUrl: "",
  },
  {
    id: "4",
    title: "Sanación energética para animales: el vínculo que trasciende",
    slug: "sanacion-energetica-animales",
    excerpt:
      "Nuestros compañeros animales también experimentan bloqueos energéticos. Descubre cómo la sanación energética puede mejorar su bienestar.",
    content: `Los animales son seres profundamente sensibles que absorben las energías de su entorno y de las personas con quienes conviven. La sanación energética para animales es un enfoque gentil y no invasivo que puede ayudarles a recuperar su equilibrio.

## ¿Por qué los animales necesitan sanación?

Los animales pueden experimentar estrés, ansiedad, traumas y bloqueos energéticos igual que los humanos. Muchas veces, incluso absorben las emociones de sus compañeros humanos como acto de amor y protección.

## Señales de desequilibrio

- Cambios de comportamiento inexplicables
- Apatía o tristeza
- Problemas de salud recurrentes
- Agresividad inusual
- Miedos o fobias

## Cómo funciona

La sanación energética para animales trabaja con sus campos de energía para liberar bloqueos, restaurar el flujo vital y promover la autocuración. Las sesiones pueden realizarse de forma presencial o a distancia, ya que la energía no conoce límites físicos.

## Resultados

Los cambios suelen ser visibles rápidamente: animales más tranquilos, con mejor apetito, mayor vitalidad y una conexión más profunda con sus compañeros humanos.`,
    category: "Animales",
    date: "2025-02-28",
    readTime: "5 min",
    imageUrl: "",
  },
  {
    id: "5",
    title: "Sanación uterina: reconectando con tu poder femenino",
    slug: "sanacion-uterina-poder-femenino",
    excerpt:
      "El útero guarda memorias ancestrales y emociones profundas. La sanación uterina te ayuda a liberar cargas y reconectar con tu esencia femenina.",
    content: `La sanación uterina es un proceso profundo de liberación y reconexión con el centro energético femenino. El útero no solo es un órgano físico, sino un centro de poder, creatividad e intuición.

## ¿Qué guarda el útero?

El útero almacena memorias de:
- Experiencias emocionales no procesadas
- Memorias ancestrales de línea materna
- Impactos de relaciones pasadas
- Creencias limitantes sobre la feminidad

## El proceso de sanación

A través de técnicas energéticas, meditación guiada y trabajo con cristales, la sanación uterina permite:

- **Liberar memorias**: Soltar cargas emocionales que ya no te pertenecen.
- **Restaurar el flujo**: Reactivar la energía creativa y vital.
- **Sanar línea materna**: Trabajar con las memorias heredadas de tus ancestras.
- **Reconectar con tu poder**: Redescubrir tu fuerza, intuición y sabiduría interior.

## ¿Para quién es?

Para cualquier mujer que sienta la llamada de reconectar con su esencia, independientemente de su edad o si ha tenido o no una histerectomía, ya que el centro energético permanece.`,
    category: "Bienestar",
    date: "2025-02-20",
    readTime: "7 min",
    imageUrl: "",
  },
  {
    id: "6",
    title: "Cómo manejar la ansiedad en tiempos de incertidumbre",
    slug: "manejar-ansiedad-incertidumbre",
    excerpt:
      "La ansiedad es una respuesta natural del cuerpo, pero cuando se vuelve crónica puede afectar tu calidad de vida. Aprende herramientas prácticas para gestionarla.",
    content: `La ansiedad es una de las consultas más frecuentes en psicoterapia. En un mundo cada vez más acelerado e incierto, aprender a gestionarla se ha vuelto una habilidad esencial.

## Entendiendo la ansiedad

La ansiedad no es tu enemiga. Es un mecanismo de supervivencia que se activa cuando tu cerebro percibe una amenaza. El problema surge cuando esta respuesta se activa de forma constante, sin una amenaza real.

## Herramientas prácticas

### 1. Respiración consciente
La técnica 4-7-8 es especialmente efectiva: inhala durante 4 segundos, retén durante 7, exhala durante 8.

### 2. Anclaje sensorial
Cuando sientas ansiedad, nombra 5 cosas que puedes ver, 4 que puedes tocar, 3 que puedes escuchar, 2 que puedes oler y 1 que puedes saborear.

### 3. Movimiento consciente
El ejercicio físico moderado es uno de los ansiolíticos naturales más potentes.

### 4. Diario emocional
Escribir tus pensamientos y emociones ayuda a procesarlos y reducir la carga mental.

## Cuándo buscar ayuda profesional

Si la ansiedad interfiere con tu vida diaria, tus relaciones o tu trabajo, es momento de buscar apoyo terapéutico. No tienes que enfrentarla sola.`,
    category: "Psicoterapia",
    date: "2025-02-15",
    readTime: "6 min",
    imageUrl: "",
  },
];
