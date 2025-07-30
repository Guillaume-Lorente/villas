"use client";
import { useState } from "react";

export default function PromoBanner({ message }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-[#eeb868] text-[#223e50] px-4 py-4 flex justify-center items-center text-sm md:text-base relative">
      <p className="font-semibold text-center">{message}</p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-xl font-bold"
        aria-label="Fermer la bannière"
      >
        ×
      </button>
    </div>
  );
}
