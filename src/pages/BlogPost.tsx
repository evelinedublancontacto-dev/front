import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Sparkles, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import pb from "@/lib/pocketbase";
import type { RecordModel } from "pocketbase";
import heroBg from "@/assets/hero-bg.jpg";

const CATEGORY_MAP: Record<string, string> = {
  psicoterapia: "Psicoterapia",
  meditacion: "Meditación",
  "sanacion-energetica": "Sanación Energética",
  "cristales-y-cuarzos": "Cristales y Cuarzos",
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<RecordModel | null>(null);
  const [related, setRelated] = useState<RecordModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const result = await pb.collection("posts").getFullList({
          filter: `slug = "${slug}" && published = true`,
        });
        if (result.length === 0) {
          setNotFound(true);
          return;
        }
        const found = result[0];
        setPost(found);

        // Fetch related posts
        try {
          const relatedResult = await pb.collection("posts").getFullList({
            filter: `category = "${found.category}" && id != "${found.id}" && published = true`,
            sort: "-created",
          });
          setRelated(relatedResult.slice(0, 2));
        } catch {}
      } catch (err) {
        console.error("Error fetching post:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-foreground mb-4">Artículo no encontrado</h1>
          <Link to="/blog" className="text-primary font-body hover:underline">
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  const catLabel = CATEGORY_MAP[post.category] || post.category;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-28 overflow-hidden">
        <div className="absolute inset-0">
          {post.image ? (
            <img src={post.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <img src={heroBg} alt="" width={1920} height={600} className="w-full h-full object-cover" />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, hsla(270,30%,12%,0.75) 0%, hsla(270,30%,12%,0.9) 100%)",
            }}
          />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gold-light animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 font-body text-sm mb-6 transition-colors"
              style={{ color: "hsl(42 70% 62%)" }}
            >
              <ArrowLeft className="w-4 h-4" /> Volver al blog
            </Link>

            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-body font-semibold mb-4"
              style={{ background: "hsla(275,55%,45%,0.2)", color: "hsl(270 60% 75%)" }}
            >
              {catLabel}
            </span>

            <h1 className="font-display text-3xl md:text-5xl font-bold mb-4" style={{ color: "hsl(0 0% 100%)" }}>
              {post.title}
            </h1>

            <div className="flex items-center gap-4 font-body text-sm" style={{ color: "hsl(270 30% 70%)" }}>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.created).toLocaleDateString("es-MX", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z" fill="hsl(270 20% 98%)" />
          </svg>
        </div>
      </section>

      {/* Featured image */}
      {post.image && (
        <section className="container mx-auto px-6 -mt-10 relative z-20 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="rounded-2xl overflow-hidden shadow-2xl border border-border"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[300px] md:h-[420px] object-cover"
            />
          </motion.div>
        </section>
      )}

      {/* Content — render HTML from Tiptap */}
      <section className="container mx-auto px-6 py-12 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-lg max-w-none
            prose-headings:font-display prose-headings:text-foreground
            prose-p:font-body prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-strong:text-foreground
            prose-ul:font-body prose-ul:text-muted-foreground
            prose-ol:font-body prose-ol:text-muted-foreground
            prose-li:text-muted-foreground
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl border-glow bg-gradient-card text-center">
          <Sparkles className="w-6 h-6 mx-auto mb-3 text-primary" />
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            ¿Te gustaría agendar una sesión?
          </h3>
          <p className="font-body text-sm text-muted-foreground mb-4">
            Estoy aquí para acompañarte en tu proceso de sanación y bienestar.
          </p>
          <a
            href="/#contacto"
            className="inline-block px-6 py-3 bg-primary text-primary-foreground font-body font-semibold rounded-lg hover:bg-purple-glow transition-all duration-300 shadow-mystical"
          >
            Contactar
          </a>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display text-2xl font-semibold text-foreground mb-6">Artículos relacionados</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/blog/${r.slug}`}
                  className="group block p-6 rounded-2xl border border-border bg-card hover:shadow-mystical hover:border-primary/20 transition-all duration-500"
                >
                  <h4 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {r.title}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground line-clamp-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
