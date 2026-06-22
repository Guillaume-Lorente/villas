"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const POSTS_PER_PAGE = 6;

export default function BlogListClient({ posts }) {
  // Toutes les catégories présentes dans l'ENSEMBLE des articles.
  const categories = useMemo(
    () => [
      "Tout",
      ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean))),
    ],
    [posts]
  );

  const [selectedCategory, setSelectedCategory] = useState("Tout");
  const [page, setPage] = useState(1);

  // Le filtre porte sur TOUS les articles, pas seulement la page courante.
  const filtered =
    selectedCategory === "Tout"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const visible = filtered.slice(start, start + POSTS_PER_PAGE);

  const handleCategory = (cat) => {
    setSelectedCategory(cat);
    setPage(1);
  };

  const goToPage = (p) => {
    setPage(p);
    const top = document.getElementById("blog-top");
    if (top) top.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pageBtn =
    "px-5 py-2 rounded-full font-semibold border transition duration-300 transform hover:scale-105 hover:shadow-md";

  return (
    <main
      id="blog-top"
      className="bg-[#223e50] text-white py-12 px-4"
      aria-label="Liste des articles du blog"
    >
      {/* Filtres par catégorie (toutes catégories du blog) */}
      <div
        className="flex flex-wrap justify-center gap-4 mb-10"
        role="group"
        aria-label="Filtrer les articles par catégorie"
      >
        {categories.map((cat) => (
          <button
            aria-pressed={selectedCategory === cat}
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-5 py-2 rounded-full font-semibold border transition duration-300 ${
              selectedCategory === cat
                ? "bg-[#eeb868] text-[#223e50]"
                : "border-[#eeb868] text-[#eeb868] hover:bg-[#eeb868] hover:text-[#223e50]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grille des articles */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visible.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-xl overflow-hidden bg-white/10 backdrop-blur-md shadow-md hover:scale-[1.02] transition-transform duration-300 border border-white/10 flex flex-col"
          >
            {post.image && (
              <img
                src={
                  post.image.startsWith("http")
                    ? post.image
                    : `${process.env.NEXT_PUBLIC_API_BASE_URL}${post.image}`
                }
                alt={post.title}
                loading="lazy"
                decoding="async"
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-5 flex-1 flex flex-col">
              <h2 className="text-xl font-bold text-[#eeb868] mb-1 group-hover:underline">
                {post.title}
              </h2>
              <p className="text-sm text-white/70 mb-2">
                {post.category} • {post.date}
              </p>
              <p className="text-sm text-white/90 line-clamp-3 flex-1">
                {post.excerpt || "Découvrez notre article..."}
              </p>
              <span className="mt-4 text-sm font-semibold text-[#eeb868] hover:underline">
                Lire la suite →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Message si la catégorie est vide */}
      {visible.length === 0 && (
        <p className="text-center text-white/70 mt-10">
          Aucun article dans cette catégorie pour le moment.
        </p>
      )}

      {/* Pagination (sur les articles filtrés) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center flex-wrap gap-2 mt-14 text-sm">
          {currentPage > 1 && (
            <button
              onClick={() => goToPage(currentPage - 1)}
              className={`${pageBtn} bg-white text-[#223e50] border-[#eeb868] hover:bg-[#eeb868] hover:text-[#223e50]`}
            >
              ← Précédent
            </button>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`${pageBtn} ${
                p === currentPage
                  ? "bg-[#eeb868] text-[#223e50] border-[#eeb868]"
                  : "bg-white text-[#223e50] border-[#eeb868] hover:bg-[#eeb868] hover:text-[#223e50]"
              }`}
            >
              {p}
            </button>
          ))}

          {currentPage < totalPages && (
            <button
              onClick={() => goToPage(currentPage + 1)}
              className={`${pageBtn} bg-white text-[#223e50] border-[#eeb868] hover:bg-[#eeb868] hover:text-[#223e50]`}
            >
              Suivant →
            </button>
          )}
        </div>
      )}
    </main>
  );
}
