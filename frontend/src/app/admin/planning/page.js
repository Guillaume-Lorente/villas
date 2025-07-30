"use client";
import { useState } from "react";
import AdminCalendar from "@/components/AdminCalendar";

const villaOptions = [
  { id: 1, name: "Akamapa" },
  { id: 2, name: "Tilamp-Tilamp" },
  { id: 3, name: "Iguana" },
];

export default function PlanningPage() {
  const [selectedVillaId, setSelectedVillaId] = useState(1);

  return (
    <main className="max-w-5xl mx-auto px-4 pt-32 pb-12 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#eeb868]">
          Planning – {villaOptions.find((v) => v.id === selectedVillaId)?.name}
        </h1>

        <select
          className="bg-[#223e50] border border-white/20 text-white text-sm rounded px-2 py-1"
          value={selectedVillaId}
          onChange={(e) => setSelectedVillaId(Number(e.target.value))}
        >
          {villaOptions.map((villa) => (
            <option key={villa.id} value={villa.id}>
              {villa.name}
            </option>
          ))}
        </select>
        <button
          onClick={async () => {
            const confirmSync = confirm("Lancer la synchronisation iCal ?");
            if (!confirmSync) return;

            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sync?villaId=${selectedVillaId}`
              );
              const data = await res.json();
              alert("✅ " + "Import iCal réussi");
              // petit "refresh" du composant calendrier
              setSelectedVillaId((prev) => prev);
            } catch (err) {
              alert("❌ Erreur lors de la synchronisation");
            }
          }}
          className="bg-[#eeb868] text-[#223e50] px-3 py-1 rounded text-sm shadow hover:bg-[#c6943d]"
        >
          🔁 Forcer la sync iCal
        </button>
      </div>

      <div className="bg-[#223e50] p-6 rounded-xl shadow-lg">
        <AdminCalendar villaId={selectedVillaId} />
      </div>
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
