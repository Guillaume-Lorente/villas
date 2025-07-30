"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogListClient({ posts }) {
  const categories = ["Tout", ...new Set(posts.map((p) => p.category))];
  const [selectedCategory, setSelectedCategory] = useState("Tout");

  const filtered =
    selectedCategory === "Tout"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    const topElement = document.getElementById("blog-top");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [posts]);

  return (
    <>
      {/* Hero section avec image en fond */}
      <section
        className="h-[600px] md:h-[700px] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: "url('/blog-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#eeb868] drop-shadow">
            Le blog des Caraïbes
          </h1>
          <p className="text-white/90 mt-4 max-w-xl mx-auto text-base md:text-lg">
            Bons plans, récits, plages et cuisine locale pour des vacances
            inoubliables.
          </p>
        </div>
      </section>

      {/* Contenu blog sous image */}
      <main id="blog-top" className="bg-[#223e50] text-white py-12 px-4">
        {/* Filtres par catégorie */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
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
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-xl overflow-hidden bg-white/10 backdrop-blur-md shadow-md hover:scale-[1.02] transition-transform duration-300 border border-white/10 flex flex-col"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
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
      </main>
    </>
  );
}
