"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "../context/LanguageContext";

// Dynamically import Map component with SSR disabled
const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

export default function MapSection() {
  const { t } = useLanguage();

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl text-jaune font-semibold mb-6 text-center">
        {t("map.title")}
      </h2>
      <p className="text-center text-white max-w-2xl mx-auto mb-8">
        {t("map.description")}
      </p>
      <Map />
    </section>
  );
}
