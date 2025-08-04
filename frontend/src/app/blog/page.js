import BlogListClient from "./blogListClient";
import { ChevronLeft, ChevronRight } from "lucide-react";

const POSTS_PER_PAGE = 6;

export default async function BlogHomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`, {
    cache: "no-store",
  });

  const allPosts = await res.json();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const currentPage = 1;

  const paginated = allPosts.slice(0, POSTS_PER_PAGE);

  // Fonction pagination dynamique
  const generatePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="bg-[#223e50] text-white pb-16">
      <BlogListClient posts={paginated} />

      {/* Pagination dynamique avec effet hover */}
      <div className="flex justify-center items-center flex-wrap gap-2 mt-16 text-sm">
        {/* ← Précédent */}
        {currentPage > 1 && (
          <a
            href={currentPage === 2 ? "/blog" : `/blog/page/${currentPage - 1}`}
            className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold bg-white text-[#223e50] border border-[#eeb868] hover:bg-[#eeb868] hover:text-[#223e50] transition duration-300 transform hover:scale-105 hover:shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
            Précédent
          </a>
        )}

        {/* Numéros de pages */}
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-[#eeb868]">
              ...
            </span>
          ) : (
            <a
              key={p}
              href={p === 1 ? "/blog" : `/blog/page/${p}`}
              className={`px-5 py-2 rounded-full font-semibold border transition duration-300 transform hover:scale-105 hover:shadow-md ${
                p === currentPage
                  ? "bg-[#eeb868] text-[#223e50] border-[#eeb868]"
                  : "bg-white text-[#223e50] border-[#eeb868] hover:bg-[#eeb868] hover:text-[#223e50]"
              }`}
            >
              {p}
            </a>
          )
        )}

        {/* → Suivant */}
        {currentPage < totalPages && (
          <a
            href={`/blog/page/${currentPage + 1}`}
            className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold bg-white text-[#223e50] border border-[#eeb868] hover:bg-[#eeb868] hover:text-[#223e50] transition duration-300 transform hover:scale-105 hover:shadow-md"
          >
            Suivant
            <ChevronRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
