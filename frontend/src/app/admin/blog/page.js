"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogAdminPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (slug) => {
    if (!confirm("Supprimer cet article ?")) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${slug}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (res.ok) {
      setPosts(posts.filter((post) => post.slug !== slug));
    } else {
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 pt-32">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#eeb868]">Articles du blog</h1>
        <Link
          href="/admin/create"
          className="bg-[#eeb868] text-[#223e50] px-4 py-2 rounded font-semibold shadow hover:bg-[#b97d28]"
        >
          + Ajouter un article
        </Link>
      </div>

      {loading ? (
        <p className="text-white text-center">Chargement...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-white border border-white/20">
            <thead className="bg-[#223e50] text-[#eeb868]">
              <tr>
                <th className="text-left px-4 py-2">Titre</th>
                <th className="text-left px-4 py-2">Catégorie</th>
                <th className="text-left px-4 py-2">Date</th>
                <th className="text-left px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.slug}
                  className="border-t border-white/10 hover:bg-white/10"
                >
                  <td className="px-4 py-2">{post.title}</td>
                  <td className="px-4 py-2">{post.category}</td>
                  <td className="px-4 py-2">{post.date}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link
                      href={`/admin/edit/${post.slug}`}
                      className="bg-[#eeb868] text-[#223e50] px-3 py-1 rounded hover:bg-[#b97d28]"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-10 text-center">
        <a
          href="/admin"
          className="inline-block bg-[#eeb868] text-[#223e50] px-4 py-2 rounded font-semibold shadow hover:bg-[#b97d28] transition"
        >
          Retour au dashboard
        </a>
      </div>
    </main>
  );
}
