/**
 * Optional: push WordPress seed into PocketBase when admin credentials exist.
 *
 * Usage:
 *   PB_EMAIL=... PB_PASSWORD=... node scripts/migrate-blog-to-pocketbase.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import PocketBase from "pocketbase";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PB_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL ||
  "https://eveline-dublan.pockethost.io";
const email = process.env.PB_EMAIL;
const password = process.env.PB_PASSWORD;

if (!email || !password) {
  console.log(
    "Skip PocketBase upload: set PB_EMAIL and PB_PASSWORD to sync. Seed JSON is already live via mergeBlogPosts.",
  );
  process.exit(0);
}

const posts = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../src/data/wordpressBlogPosts.json"),
    "utf8",
  ),
);

const pb = new PocketBase(PB_URL);
await pb.collection("users").authWithPassword(email, password);

let created = 0;
let updated = 0;
let skipped = 0;

for (const post of posts) {
  const existing = await pb.collection("posts").getFullList({
    filter: `slug = "${post.slug}"`,
  });

  const payload = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    image: post.image,
    category: post.category,
    published: true,
  };

  if (existing.length > 0) {
    await pb.collection("posts").update(existing[0].id, payload);
    updated++;
  } else {
    await pb.collection("posts").create(payload);
    created++;
  }
}

console.log({ created, updated, skipped });
