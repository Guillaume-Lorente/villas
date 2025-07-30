import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  const pageUrl = `https://villas-grande-anse.com/blog/${params.slug}`;
  const defaultImage = {
    url: "https://villas-grande-anse.com/hero.jpg",
    width: 1200,
    height: 630,
    alt: "Vue de Guadeloupe – Villas Grande Anse",
  };

  return {
    title: post.title,
    description: post.excerpt || post.title,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.title,
      url: pageUrl,
      type: "article",
      images: post.image
        ? [{ url: post.image, width: 1200, height: 630, alt: post.title }]
        : [defaultImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.title,
      images: post.image ? [post.image] : [defaultImage.url],
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  const allPosts = getAllPosts();
  const related = allPosts
    .filter((p) => p.slug !== params.slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  const pageUrl = `https://villas-grande-anse.com/blog/${post.slug}`;

  return (
    <main className="bg-[#223e50] text-white min-h-screen">
      {/* Hero */}
      {post.image && (
        <section
          className="h-[300px] md:h-[450px] bg-cover bg-center relative"
          style={{ backgroundImage: `url('${post.image}')` }}
        >
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-center text-[#eeb868] max-w-4xl">
              {post.title}
            </h1>
          </div>
        </section>
      )}

      {/* Contenu principal */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-sm text-white/70 mb-6 text-center md:text-left">
          {post.category && <span>{post.category}</span>}
          {post.date && <span> • {post.date}</span>}
        </div>

        <article
          className="prose prose-invert max-w-none text-white prose-img:rounded-lg prose-img:shadow-lg prose-a:text-[#eeb868] prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </section>

      {/* Bloc Partage */}
      <section className="max-w-4xl mx-auto px-4 py-8 border-t border-white/20">
        <h2 className="text-xl text-jaune font-bold mb-4">
          Partager cet article
        </h2>
        <div className="flex gap-4">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#3b5998] px-4 py-2 rounded text-white hover:opacity-80"
          >
            Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${pageUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1da1f2] px-4 py-2 rounded text-white hover:opacity-80"
          >
            Twitter
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent(
              post.title
            )}&body=Je vous recommande cet article : ${pageUrl}`}
            className="bg-[#eeb868] px-4 py-2 rounded text-[#223e50] hover:bg-[#dca248]"
          >
            Email
          </a>
        </div>
      </section>

      {/* Bloc Lire aussi */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12 border-t border-white/10">
          <h2 className="text-2xl text-jaune font-bold mb-8 text-center">
            Lire aussi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300 shadow-lg"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#eeb868] mb-1">
                    {post.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-2">
                    {post.category} • {post.date}
                  </p>
                  <p className="text-white/90 text-sm line-clamp-3">
                    {post.excerpt || "Lire l'article"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      {/* Bouton retour au blog */}
      <section className="max-w-4xl mx-auto px-4 pb-16 pt-4 text-center">
        <Link
          href="/blog"
          className="inline-block bg-[#eeb868] text-[#223e50] font-bold py-3 px-6 rounded-full hover:bg-[#c9943d] transition duration-300 shadow-md"
        >
          ← Retour au blog
        </Link>
      </section>
    </main>
  );
}
