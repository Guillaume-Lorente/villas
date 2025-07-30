"use client";

import Link from "next/link";

export default function AdminDashboard() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 pt-32">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#eeb868]">Tableau de bord</h1>
        <button
          onClick={async () => {
            await fetch("/api/admin-logout");
            window.location.href = "/admin/login";
          }}
          className="text-sm text-red-400 hover:text-red-600 underline"
        >
          Déconnexion
        </button>
      </div>

      <div className="flex flex-col space-y-4">
        <Link
          href="/admin/planning"
          className="bg-[#eeb868] text-[#223e50] px-4 py-2 rounded font-semibold shadow hover:bg-[#b97d28]"
        >
          📅 Gérer les plannings
        </Link>
        <Link
          href="/admin/blog"
          className="bg-[#eeb868] text-[#223e50] px-4 py-2 rounded font-semibold shadow hover:bg-[#b97d28]"
        >
          📝 Gérer les articles de blog
        </Link>
        <Link
          href="/admin/promo"
          className="bg-[#eeb868] text-[#223e50] px-4 py-2 rounded font-semibold shadow hover:bg-[#b97d28]"
        >
          🎉 Gérer les bannières de promotions
        </Link>
      </div>
    </main>
  );
}
