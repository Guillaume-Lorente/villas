"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { resizeAndConvertImage } from "@/utils/image";
import { useParams } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function EditArticle() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  const fileInputRef = useRef();

  useEffect(() => {
    fetch(`${API_BASE}/api/posts/${slug}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setCategory(data.category);
        setDate(data.date);
        setBody(data.content);
        setExistingImage(data.image);
      });
  }, [slug]);

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

    const res = await fetch(`${API_BASE}/api/posts/${slug}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    if (res.ok) {
      alert("Article modifié avec succès !");
      router.push("/admin");
    } else {
      alert("Erreur lors de la mise à jour");
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-12 pt-32 text-white">
      <h1 className="text-3xl font-bold text-[#eeb868] mb-8 text-center">
        Modifier l’article
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[#eeb868] mb-1">Titre</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-white text-[#223e50] border border-gray-300"
          />
        </div>

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
          <label className="block text-[#eeb868] mb-2">Image</label>
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
            ) : existingImage ? (
              <img
                src={existingImage}
                alt="image actuelle"
                className="mx-auto max-h-64 object-contain"
              />
            ) : (
              <p className="text-[#eeb868]">
                Cliquez ou glissez-déposez une nouvelle image
              </p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-[#eeb868] text-[#223e50] px-6 py-3 rounded font-semibold hover:bg-[#b97d28]"
          >
            Mettre à jour
          </button>
        </div>
      </form>
    </main>
  );
}
