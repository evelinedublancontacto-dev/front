export interface Testimonial {
  id: string;
  name: string;
  fullName?: string;
  role?: string;
  category: "todos" | "psicoterapia" | "sanacion-energetica" | "animales" | "holistico";
  categoryLabel: string;
  highlight?: string;
  content: string;
  stars: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "gabriel-b",
    name: "Gabriel B.",
    category: "sanacion-energetica",
    categoryLabel: "Psicología & Sanación",
    highlight: "Una biblioteca andante de conocimiento, ética y calidez",
    content:
      "El trabajo de Eveline es impecable, tanto como psicóloga como sanadora. Es una mujer que se dedica a los detalles de su trabajo, lo que sumado a su inteligencia y ética la hace una de las mejores mujeres medicina de esta época.\n\nEveline es una biblioteca andante de conocimiento en psicología, curandería y sanación energética. Doy gracias a la vida por permitirme conocerla y presenciar su forma de trabajo: suave, amoroso y a la vez profundo y certero.",
    stars: 5,
  },
  {
    id: "lorena-g",
    name: "Lorena G.",
    role: "Activista por la prosperidad animal",
    category: "animales",
    categoryLabel: "Sanación para Animales",
    highlight: "Enseñanzas luminosas y apoyo profundo a los animales",
    content:
      "Como activista dedicada a la prosperidad animal, siempre he buscado herramientas integrales y respetuosas para acompañar a otras especies en sus procesos de sanación. Capacitarme con Eveline Dublán ha sido una experiencia transformadora; sus enseñanzas en técnicas luminosas me han permitido brindar un apoyo holístico, amoroso y profundo a los animales que más lo necesitan. ¡Infinitas gracias, Eve, por compartir tu luz y guiarnos en este camino de empatía!",
    stars: 5,
  },
  {
    id: "dagyi-r",
    name: "Dagyi R.",
    category: "psicoterapia",
    categoryLabel: "Acompañamiento Terapéutico",
    highlight: "Acompañamiento honesto con perspectiva de género",
    content:
      "Eveline me ha acompañado en procesos muy complejos, tanto en mis vínculos personales como en mi vida profesional. Es una profesional cálida y muy clara en su forma de trabajar, lo que me permitió entender qué se requería de mí y descubrir juntas el camino a seguir. Su acompañamiento es delicado pero preciso, y valoro enormemente que tenga perspectiva de género y una visión incluyente de las personas y del mundo en el que vivimos. La recomiendo sin duda a quien busque un proceso terapéutico honesto y transformador.",
    stars: 5,
  },
  {
    id: "constanza-m",
    name: "Constanza M.",
    category: "holistico",
    categoryLabel: "Sanación & Espiritualidad",
    highlight: "Lugares internos que sólo pueden tocarse desde el espíritu",
    content:
      "Conocí a Eveline en 2018, en una etapa de mi vida en la que atravesaba numerosas pérdidas. En ese momento ya estaba trabajando profundamente estos procesos con mi psicóloga y mi psiquiatra, pero dentro de mí existía la certeza de que necesitaba algo más. Necesitaba llegar a lugares internos que no siempre pueden explicarse desde la razón, lugares que sólo pueden tocarse desde una conexión más profunda con el espíritu y con esa energía universal que nos atraviesa.\n\nEveline apareció en mi camino justamente en ese momento y tengo la fortuna de seguir contando con sus conocimientos y sabiduría para sanar cada proceso por el que atravieso.\n\nDesde nuestro primer encuentro sentí que había encontrado a alguien capaz de acompañarme en ese territorio que hasta entonces no sabía cómo nombrar. Ella me mostró, con sensibilidad y profundidad, un camino de conexión espiritual que complementó mi proceso psicológico y emocional de una manera que para mí ha sido verdaderamente transformadora.\n\nA través de este camino he tenido nuevos despertares, he podido mirar partes de mí desde otra perspectiva y, sobre todo, he comprendido que la sanación también puede ocurrir cuando aprendemos a escuchar nuestro espíritu.\n\nHoy puedo decir que mi proceso de sanación no estaría completo sin esa dimensión espiritual que Eveline me ayudó a descubrir.\n\nLe estoy profundamente agradecida por haber aparecido en mi vida y por haberme mostrado un camino que, aunque siempre estuvo dentro de mí, necesitaba de alguien como ella para poder reconocerlo.\n\nNota al pie: sé que mis gatitos y perritos también le agradecen mucho a Eveline, nos ha ayudado como manada.",
    stars: 5,
  },
  {
    id: "arely-j",
    name: "Arely J.",
    fullName: "Arely Jiménez Juárez",
    category: "psicoterapia",
    categoryLabel: "Psicoterapia",
    highlight: "Aprender a volver a mí",
    content:
      "Eveline es una psicóloga excepcional, muy profesional, ética y con una gran calidez humana. Agradezco enormemente su guía y su escucha en cada sesión. Para mí, este proceso ha sido mucho más que simplemente ir a terapia; ha sido aprender a volver a mí. Gracias por sostener mi corazón cuando sentía que no podía más. ❤️\n\nLa recomiendo ampliamente a cualquiera que busque un camino de sanación.",
    stars: 5,
  },
  {
    id: "karina-c",
    name: "Karina C.",
    category: "holistico",
    categoryLabel: "Terapia & Sanación",
    highlight: "Acompañamiento cálido, luminoso e integral",
    content:
      "Mi Eve hermosa, quiero agradecerte por todo el cambio positivo que ha habido en mi vida desde que comencé a tomar terapia contigo. Siempre que preguntan por un psicólogo, sin dudarlo te recomiendo; eres una excelente opción como terapeuta y sanadora, con una formación profesional y calidad humana excepcional (💯), siempre nos acompañas de manera cálida y luminosa en nuestros procesos.\n\nOjalá todas las personas tuvieran la bendición de coincidir con una terapeuta como tú, tan integral y tan preparada. Gracias, gracias, gracias por tu existencia en este plano.",
    stars: 5,
  },
  {
    id: "sandra-c",
    name: "Sandra C.",
    category: "psicoterapia",
    categoryLabel: "Superación & Bienestar",
    highlight: "Sanar también es aprender a vivir sin miedo",
    content:
      "Mi terapeuta, psicóloga y guía en este proceso, me ha acompañado a superar traumas y etapas muy difíciles de mi vida de una manera amorosa, humana y profesional. A través de una terapia llena de luz, empatía y comprensión, me ha ayudado a sanar heridas del alma y fortalecer mi espíritu.\n\nHoy sé que sí es posible vivir sin cargar con los traumas, los miedos y el dolor del pasado. A veces solo necesitamos el acompañamiento adecuado y las herramientas de un profesional para comenzar a sanar. Gracias por acompañarme en este camino de transformación y bienestar.",
    stars: 5,
  },
  {
    id: "laura-p",
    name: "Laura P.",
    role: "Acompañamiento durante 15 años",
    category: "psicoterapia",
    categoryLabel: "Psicoterapia & Espiritualidad",
    highlight: "Una decisión personal valiente y una aliada en la mejor etapa",
    content:
      "Tomar terapia fue una decisión personal muy valiente, y decidí tomarla cuando había agotado lo personalmente manejable y emprendí la búsqueda de quien me daría esa mano para entrar a explorar y reconocer patrones, emociones y situaciones que no me permitían ser una mejor versión de mí.\n\nTuve la fortuna de conocer a Eveline, quien me ha dado el acompañamiento profesional y espiritual durante 15 años, para yo lograr reconstruirme y recuperar mi fuerza personal, valor y determinación para vivir una vida equilibrada en todos los aspectos. Muchas gracias Eveline, por ser una gran aliada en la mejor etapa de mi vida.",
    stars: 5,
  },
  {
    id: "deyanira-g",
    name: "Deyanira G.",
    category: "psicoterapia",
    categoryLabel: "Psicoterapia",
    highlight: "Escuchada y respetada, incluso cuando hablar no era sencillo",
    content:
      "Decidir iniciar terapia no siempre es fácil, pero haber decidido iniciarla con Eveline ha sido un acierto sin duda.\n\nAgradezco mucho el profesionalismo, paciencia y empatía con la que me ha acompañado; siempre me he sentido escuchada y respetada, incluso cuando hablar de ciertas cosas no ha sido sencillo.\n\nEn lo personal ha sido una experiencia muy positiva, de mucho aprendizaje y autoconocimiento. La recomiendo ampliamente para quienes estén pensando iniciar su propio proceso en un espacio seguro.",
    stars: 5,
  },
];
