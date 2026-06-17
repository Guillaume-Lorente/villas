import { notFound } from "next/navigation";
import Link from "next/link";
import { remark } from "remark";
import gfm from "remark-gfm";
import html from "remark-html";
import { SITE_URL, SITE_NAME, breadcrumbJsonLd } from "../../../lib/site";
import JsonLd from "../../../components/JsonLd";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) return {};

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${slug}`,
    { cache: "no-store" },
  );

  if (!res.ok) return {};

  const post = await res.json();

  // ✅ Fix chemin image
  if (post.image && !post.image.startsWith("http")) {
    post.image = `${process.env.NEXT_PUBLIC_API_BASE_URL}${post.image}`;
  }

  const pageUrl = `${SITE_URL}/blog/${slug}`;
  const defaultImage = {
    url: `${SITE_URL}/hero.webp`,
    width: 1200,
    height: 630,
    alt: "Vue de Guadeloupe – Villas Grande Anse",
  };

  return {
    title: post.title,
    description: post.excerpt || post.title,
    alternates: {
      canonical: `/blog/${slug}`,
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
  const { slug } = await params;
  if (!slug) return notFound();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${slug}`,
    { cache: "no-store" },
  );

  if (!res.ok) return notFound();
  const post = await res.json();

  // ✅ Fix chemin image article principal
  if (post.image && !post.image.startsWith("http")) {
    post.image = `${process.env.NEXT_PUBLIC_API_BASE_URL}${post.image}`;
  }

  // ✅ Conversion markdown -> HTML : rend les liens cliquables et crawlables
  // par Google, et produit de vraies balises (<p>, <h2>, <ul>, <a>...) que la
  // typographie « prose » peut styler.
  const contentHtml = post.content
    ? (await remark().use(gfm).use(html).process(post.content))
        .toString()
        // Traitement des liens :
        // - internes (/..., #..., mailto:) : inchangés (même onglet)
        // - externes : ouverture dans un nouvel onglet (le lecteur ne quitte
        //   pas le site) + ajout automatique de https:// si la rédactrice a
        //   oublié le protocole (ex. www.exemple.com).
        .replace(/<a href="([^"]+)"/g, (match, href) => {
          if (
            href.startsWith("/") ||
            href.startsWith("#") ||
            href.startsWith("mailto:")
          ) {
            return `<a href="${href}"`;
          }
          const url = /^https?:\/\//i.test(href) ? href : `https://${href}`;
          return `<a href="${url}" target="_blank" rel="noopener noreferrer"`;
        })
    : "";

  const resAll = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`,
    { cache: "no-store" },
  );

  const allPosts = resAll.ok ? await resAll.json() : [];

  const related = allPosts
    .filter((p) => p.slug !== slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);

  // ✅ Fix chemin image pour les articles liés
  related.forEach((p) => {
    if (p.image && !p.image.startsWith("http")) {
      p.image = `${process.env.NEXT_PUBLIC_API_BASE_URL}${p.image}`;
    }
  });

  const pageUrl = `${SITE_URL}/blog/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.image ? [post.image] : [`${SITE_URL}/hero.webp`],
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    articleSection: post.category || undefined,
    inLanguage: "fr-FR",
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    author: { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/` },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
  };

  let formattedDate = post.date || null;
  if (post.date) {
    const d = new Date(post.date);
    if (!isNaN(d)) {
      formattedDate = d.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  }

  return (
    <main className="bg-[#223e50] text-white min-h-screen pt-24 md:pt-28">
      <JsonLd
        data={[
          articleJsonLd,
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 pt-6 pb-2 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-[#eeb868] leading-tight">
          {post.title}
        </h1>
        <div className="mt-5 mx-auto w-16 h-[3px] bg-[#eeb868]/70 rounded-full"></div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flow-root bg-white/5 border border-white/10 rounded-2xl shadow-xl px-6 py-8 md:px-10 md:py-12">
          {/* Méta : catégorie + date */}
          <div className="flex flex-wrap items-center gap-3 mb-8 justify-center md:justify-start">
            {post.category && (
              <span className="inline-block bg-[#eeb868]/15 text-[#eeb868] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                {post.category}
              </span>
            )}
            {formattedDate && (
              <span className="text-sm text-white/60">{formattedDate}</span>
            )}
          </div>

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full mb-8 max-h-[300px] object-cover rounded-xl shadow-lg
                md:float-left md:w-[60%] md:mr-8 md:mb-4 md:max-h-[480px]"
            />
          )}

          <article
            className="prose prose-invert prose-lg max-w-none
              text-white/90 leading-relaxed
              prose-headings:text-[#eeb868] prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:my-5
              prose-a:text-[#eeb868] prose-a:font-medium prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-[#f5cd8a]
              prose-strong:text-white
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
              prose-ul:my-5 prose-li:marker:text-[#eeb868]
              prose-blockquote:border-l-4 prose-blockquote:border-[#eeb868] prose-blockquote:bg-white/5 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-5 prose-blockquote:not-italic prose-blockquote:text-white/80
              max-md:[&>p:first-of-type]:first-letter:float-left max-md:[&>p:first-of-type]:first-letter:text-6xl max-md:[&>p:first-of-type]:first-letter:font-bold max-md:[&>p:first-of-type]:first-letter:text-[#eeb868] max-md:[&>p:first-of-type]:first-letter:mr-3 max-md:[&>p:first-of-type]:first-letter:mt-1 max-md:[&>p:first-of-type]:first-letter:leading-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </section>

      {/* Partage */}
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
              post.title,
            )}&body=Je vous recommande cet article : ${pageUrl}`}
            className="bg-[#eeb868] px-4 py-2 rounded text-[#223e50] hover:bg-[#dca248]"
          >
            Email
          </a>
        </div>
      </section>

      {/* Suggestions */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12 border-t border-white/10">
          <h2 className="text-2xl text-jaune font-bold mb-8 text-center">
            Lire aussi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300 shadow-lg"
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-[#eeb868] mb-1">
                    {p.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-2">
                    {p.category} • {p.date}
                  </p>
                  <p className="text-white/90 text-sm line-clamp-3">
                    {p.excerpt || "Lire l'article"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Retour blog */}
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
