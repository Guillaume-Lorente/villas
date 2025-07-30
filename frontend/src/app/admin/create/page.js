"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { resizeAndConvertImage } from "@/utils/image";

export default function CreateArticle() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);

  const fileInputRef = useRef();

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const resized = await resizeAndConvertImage(file, 1200, slug);
      setImage(resized);
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const resized = await resizeAndConvertImage(file, 1200, slug);
      setImage(resized);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("category", category);
    formData.append("date", date);
    formData.append("body", body);
    if (image) formData.append("image", image);

    const res = await fetch("/api/posts", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Article créé avec succès !");
      router.push("/admin");
    } else {
      alert("Erreur lors de l'envoi de l'article");
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 pt-32 text-white">
      <h1 className="text-3xl font-bold text-[#eeb868] mb-8 text-center">
        Créer un nouvel article
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[#eeb868] mb-1">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              setTitle(value);
              setSlug(
                value
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "")
              );
            }}
            required
            className="w-full px-4 py-2 rounded bg-white text-[#223e50] placeholder-gray-500 border border-gray-300 focus:outline-none"
          />
          {slug && (
            <p className="text-sm text-[#eeb868] mt-1">
              Slug généré : <span className="italic">{slug}</span>
            </p>
          )}
        </div>

        <input type="hidden" value={slug} readOnly />

        <div>
          <label className="block text-[#eeb868] mb-1">Catégorie</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-white text-[#223e50] border border-gray-300"
          >
            <option value="">-- Choisissez une catégorie --</option>
            <option value="La Côte sous le Vent">La Côte sous le Vent</option>
            <option value="Les plages">Les plages</option>
            <option value="Culture & Patrimoine">Culture & patrimoine</option>
            <option value="Activités & détente">Activités & détente</option>
            <option value="Découverte Nature">Découverte Nature</option>
            <option value="Saveurs Locales & Gastronomie">
              Saveurs Locales & Gastronomie
            </option>
          </select>
        </div>

        <div>
          <label className="block text-[#eeb868] mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-white text-[#223e50] border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-[#eeb868] mb-1">Contenu</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            required
            className="w-full px-4 py-2 rounded bg-white text-[#223e50] border border-gray-300 resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-[#eeb868] mb-2">
            Image de l&apos;article
          </label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={openFileDialog}
            className="w-full border-2 border-dashed border-[#eeb868] rounded p-6 text-center cursor-pointer hover:bg-[#eeb868]/10 transition"
          >
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileSelect}
              hidden
            />
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="aperçu"
                className="mx-auto max-h-64 object-contain"
              />
            ) : (
              <p className="text-[#eeb868]">
                Cliquez ou glissez-déposez une image ici
              </p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-[#eeb868] text-[#223e50] px-6 py-3 rounded font-semibold hover:bg-[#b97d28]"
          >
            Publier
          </button>
        </div>
      </form>
    </main>
  );
}
