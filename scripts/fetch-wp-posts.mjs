import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url =
  "https://www.evelinedublan.com/wp-json/wp/v2/posts?per_page=20&_embed=1";

const catMap = {
  Psicoterapia: "psicoterapia",
  Meditación: "meditacion",
  Meditacion: "meditacion",
  "Sanación Energética": "sanacion-energetica",
  "Sanacion Energetica": "sanacion-energetica",
  "Cristales y Cuarzos": "cristales-y-cuarzos",
  Bienestar: "psicoterapia",
  Animales: "sanacion-energetica",
};

function decodeTitle(html) {
  return html
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&");
}

const res = await fetch(url);
if (!res.ok) throw new Error(`WP API ${res.status}`);
const posts = await res.json();

const out = posts.map((p) => {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  const cats = p._embedded?.["wp:term"]?.[0]?.map((t) => t.name) || [];
  let category = "sanacion-energetica";
  for (const c of cats) {
    if (catMap[c]) {
      category = catMap[c];
      break;
    }
  }
  const excerpt = (p.excerpt?.rendered || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 240);

  return {
    id: `wp-${p.id}`,
    title: decodeTitle(p.title.rendered),
    slug: p.slug,
    excerpt,
    content: p.content.rendered,
    image: media?.source_url || "",
    category,
    published: true,
    date: p.date,
  };
});

const dest = path.join(__dirname, "../src/data/wordpressBlogPosts.json");
fs.writeFileSync(dest, JSON.stringify(out, null, 2));
console.log(`Wrote ${out.length} posts to ${dest}`);
out.forEach((p) => console.log(`- ${p.slug} | ${p.category}`));
