"use client";
import { useEffect, useState } from "react";

export default function PromoAdminPage() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      const res = await fetch("/api/promo");
      const data = await res.json();
      setConfig(data);
      setLoading(false);
    };
    fetchConfig();
  }, []);

  const handleChange = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleVillaChange = (villaId, field, value) => {
    setConfig((prev) => ({
      ...prev,
      villas: {
        ...prev.villas,
        [villaId]: {
          ...prev.villas[villaId],
          [field]: value,
        },
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    const res = await fetch("/api/promo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    });
    if (res.ok) {
      alert("✅ Bannières mises à jour !");
    } else {
      alert("❌ Une erreur est survenue.");
    }
    setSaving(false);
  };

  if (loading) return <p className="p-4 text-white">Chargement...</p>;

  return (
    <div className="max-w-2xl mx-auto pt-32 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6 text-[#eeb868]">
        Gestion des bannières promo
      </h1>

      <div className="bg-white/10 p-6 rounded-lg space-y-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={config.active}
            onChange={(e) => handleChange("active", e.target.checked)}
          />
          Activer la bannière d’accueil
        </label>
        <textarea
          className="w-full px-4 py-2 rounded text-[#ee3e50]"
          value={config.homeBanner}
          onChange={(e) => handleChange("homeBanner", e.target.value)}
          placeholder="Texte de la bannière d’accueil"
        />

        {[1, 2, 3].map((id) => (
          <div key={id} className="border-t border-white/30 pt-4">
            <h2 className="font-bold text-[#eeb868] mb-2">Villa {id}</h2>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={config.villas?.[id]?.active || false}
                onChange={(e) =>
                  handleVillaChange(id, "active", e.target.checked)
                }
              />
              Activer la bannière
            </label>
            <textarea
              className="w-full px-4 py-2 rounded text-[#ee3e50]"
              value={config.villas?.[id]?.message || ""}
              onChange={(e) => handleVillaChange(id, "message", e.target.value)}
              placeholder={`Message promo pour Villa ${id}`}
            />
          </div>
        ))}

        <button
          onClick={handleSave}
          className="w-full bg-[#eeb868] text-[#223e50] font-bold py-2 rounded hover:bg-[#c6943d] transition"
          disabled={saving}
        >
          {saving ? "Enregistrement..." : "Enregistrer les modifications"}
        </button>
      </div>
      <div className="mt-10 text-center">
        <a
          href="/admin"
          className="inline-block bg-[#eeb868] text-[#223e50] px-4 py-2 rounded font-semibold shadow hover:bg-[#b97d28] transition"
        >
          Retour au dashboard
        </a>
      </div>
    </div>
  );
}
