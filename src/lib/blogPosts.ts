import wordpressPosts from "@/data/wordpressBlogPosts.json";

export type BlogPostRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  published: boolean;
  date?: string;
  created?: string;
};

const legacyPosts = wordpressPosts as BlogPostRecord[];

/** Normalize PocketBase or legacy post into a common shape */
export function toBlogPost(raw: Record<string, unknown>): BlogPostRecord {
  return {
    id: String(raw.id),
    title: String(raw.title ?? ""),
    slug: String(raw.slug ?? ""),
    excerpt: String(raw.excerpt ?? ""),
    content: String(raw.content ?? ""),
    image: String(raw.image ?? ""),
    category: String(raw.category ?? "sanacion-energetica"),
    published: Boolean(raw.published ?? true),
    date: raw.date ? String(raw.date) : undefined,
    created: raw.created
      ? String(raw.created)
      : raw.date
        ? String(raw.date)
        : undefined,
  };
}

/**
 * Merge PocketBase posts with WordPress migration seed.
 * PB wins on slug collision; legacy fills gaps so the catalog is complete.
 */
export function mergeBlogPosts(
  pocketbasePosts: Record<string, unknown>[],
): BlogPostRecord[] {
  const bySlug = new Map<string, BlogPostRecord>();

  for (const p of legacyPosts) {
    bySlug.set(p.slug, toBlogPost(p));
  }
  for (const p of pocketbasePosts) {
    const post = toBlogPost(p);
    if (post.published) bySlug.set(post.slug, post);
  }

  return Array.from(bySlug.values()).sort((a, b) => {
    const da = a.created || a.date || "";
    const db = b.created || b.date || "";
    return db.localeCompare(da);
  });
}

export function findLegacyPost(slug: string): BlogPostRecord | undefined {
  return legacyPosts.find((p) => p.slug === slug && p.published);
}

export function getLegacyRelated(
  category: string,
  slug: string,
  limit = 2,
): BlogPostRecord[] {
  return legacyPosts
    .filter((p) => p.published && p.category === category && p.slug !== slug)
    .slice(0, limit);
}
