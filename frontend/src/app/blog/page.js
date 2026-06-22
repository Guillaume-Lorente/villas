import BlogListClient from "./blogListClient";
import Image from "next/image";

export default async function BlogHomePage() {
  let allPosts = [];
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`, {
      cache: "no-store",
    });
    if (res.ok) allPosts = await res.json();
  } catch {
    allPosts = [];
  }

  return (
    <div className="bg-[#223e50] text-white pb-16">
      {/* Hero photo — uniquement sur la 1re page du blog */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center">
        <Image
          src="/blog-hero.webp"
          alt="Blog sur la Guadeloupe et la Côte sous le Vent"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
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

      {/* Filtre + pagination gérés côté client sur l'ensemble des articles */}
      <BlogListClient posts={allPosts} />
    </div>
  );
}
