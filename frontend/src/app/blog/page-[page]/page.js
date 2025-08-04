export const dynamic = "force-dynamic";

import BlogListClient from "../../blogListClient";

const POSTS_PER_PAGE = 6;

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const posts = await res.json();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function BlogPaginatedPage({ params }) {
  const page = parseInt(params.page || "1", 10);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`, {
    cache: "no-store",
  });

  const allPosts = res.ok ? await res.json() : [];

  const start = (page - 1) * POSTS_PER_PAGE;
  const paginated = allPosts.slice(start, start + POSTS_PER_PAGE);
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  return (
    <main className="min-h-screen bg-[#223e50] text-white">
      {/* Hero Blog */}
      <section className="bg-[url('/blog-hero.jpg')] bg-cover bg-center h-64 flex items-center justify-center">
        <div className="bg-black/60 w-full h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-jaune text-center">
            Explorez la Côte sous le Vent
          </h1>
        </div>
      </section>

      {/* Liste des articles */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-jaune mb-8 text-center">
          Nos derniers articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginated.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:scale-105 transition transform shadow-md"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-bold text-jaune mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-white/70 mb-2">
                  {post.category} • {post.date}
                </p>
                <p className="text-white text-sm line-clamp-3">
                  {post.excerpt || "Lire l’article complet"}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-12 flex-wrap items-center">
          {page > 1 && (
            <a
              href={page === 2 ? "/blog" : `/blog/page-${page - 1}`}
              className="px-5 py-2 rounded-full bg-[#eeb868] text-[#223e50] font-semibold hover:bg-[#c78f34]"
            >
              ← Précédent
            </a>
          )}

          {Array.from({ length: totalPages }, (_, i) => {
            const current = i + 1;
            return (
              <a
                key={current}
                href={current === 1 ? "/blog" : `/blog/page-${current}`}
                className={`px-5 py-2 rounded-full font-semibold border transition ${
                  current === page
                    ? "bg-[#eeb868] text-[#223e50]"
                    : "bg-white text-[#223e50] hover:bg-[#eeb868] hover:text-[#223e50] border-[#eeb868]"
                }`}
              >
                {current}
              </a>
            );
          })}

          {page < totalPages && (
            <a
              href={`/blog/page-${page + 1}`}
              className="px-5 py-2 rounded-full bg-[#eeb868] text-[#223e50] font-semibold hover:bg-[#c78f34]"
            >
              Suivant →
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
