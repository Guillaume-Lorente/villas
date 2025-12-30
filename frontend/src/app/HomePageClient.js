"use client";

import Link from "next/link";
import MapSection from "../components/MapSection";
import HomeGallery from "../components/HomeGallery";
import FadeUp from "../components/FadeUp";
import { useEffect, useState } from "react";
import PromoBanner from "../components/PromoBanner";
import { useLanguage } from "../context/LanguageContext";
import StructuredData from "../components/StructuredData";

const villas = [
  { slug: "akamapa", name: "Villa Akamapa", image: "/akamapa.jpeg" },
  {
    slug: "tilamp-tilamp",
    name: "Villa Tilamp Tilamp",
    image: "/tilamp-tilamp.jpg",
  },
  { slug: "iguana", name: "Villa Iguana", image: "/iguana.jpeg" },
];

export default function HomePage() {
  const { t } = useLanguage();
  const [homepagePromo, setHomepagePromo] = useState(null);
  const [promoConfig, setPromoConfig] = useState(null);

  useEffect(() => {
    if (!promoConfig) return;

    if (promoConfig.homepage?.active && promoConfig.homepage?.message) {
      setHomepagePromo(promoConfig.homepage.message);
    }
  }, [promoConfig]);

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/promo`
        );
        const data = await res.json();
        setPromoConfig(data);
      } catch (error) {
        console.error("Erreur chargement promoConfig:", error);
      }
    };

    fetchPromo();
  }, []);

  return (
    <main className="bg-[#223e50] text-white pt-24">
      <StructuredData />

      {/* Promo Banner */}
      {promoConfig?.homepage?.active && (
        <PromoBanner message={promoConfig.homepage.message} />
      )}

      {/* Hero */}
      <section
        className="relative w-full h-[600px] md:h-[600px] lg:h-[650px] bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <FadeUp>
            <div className="text-center px-4 max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug text-jaune drop-shadow">
                {t("home.heroTitle")}
              </h1>
              <p className="mt-6 text-base sm:text-lg md:text-xl text-white/90">
                {t("home.heroDescription")}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Villas */}
      <section
        aria-label="Présentation des villas disponibles"
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <FadeUp>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#eeb868] mb-8 text-center">
            {t("home.villasTitle")}
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {villas.map((villa, index) => (
            <FadeUp key={villa.slug} delay={index * 0.1}>
              <Link
                href={`/villas/${villa.slug}`}
                className="group block rounded-xl overflow-hidden bg-white shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <div
                  className="h-64 bg-center bg-cover transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url('${villa.image}')` }}
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-[#eeb868]">
                    {villa.name}
                  </h3>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      <hr className="my-12 border-t border-white/10" />

      {/* Carte */}
      <section className="max-w-7xl mx-auto px-4">
        <FadeUp>
          <MapSection />
        </FadeUp>
      </section>

      <hr className="my-12 border-t border-white/10" />

      {/* Galerie */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <FadeUp>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#eeb868] mb-4 text-center">
            {t("home.discoverTitle")}
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-center max-w-3xl mx-auto mb-8 text-white/90">
            {t("home.discoverDescription")}
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <HomeGallery />
        </FadeUp>
        <FadeUp delay={0.3}>
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-block bg-[#eeb868] text-[#223e50] px-6 py-3 rounded-lg shadow hover:bg-[#c6943d] transition"
            >
              {t("home.blogButton")}
            </Link>
          </div>
        </FadeUp>
      </section>
      <details
        aria-label="Informations détaillées sur les villas à Deshaies"
        className="hidden md:block max-w-4xl mx-auto px-4 pb-16 text-sm text-white/80"
      >
        <summary className="cursor-pointer text-[#eeb868] font-semibold">
          En savoir plus sur la location de villas à Deshaies
        </summary>
        <div className="mt-3 space-y-3">
          <p>
            Situées à seulement 200 mètres de la célèbre{" "}
            <strong>plage de Grande Anse</strong>, nos villas de charme vous
            offrent une expérience unique au cœur de <strong>Deshaies</strong>,
            sur la côte ouest de la <strong>Basse-Terre</strong> en Guadeloupe.
          </p>
          <p>
            Que vous recherchiez une{" "}
            <strong>location de villa avec piscine</strong>, un hébergement
            proche de la plage ou un lieu calme en pleine nature tropicale, les{" "}
            <strong>Villas Grande Anse</strong> sont le choix idéal pour vos
            vacances. Nos hébergements sont entièrement équipés, ventilés
            naturellement et décorés avec goût, dans un style alliant confort
            moderne et authenticité créole.
          </p>
          <p>
            En séjournant dans nos villas, vous êtes à proximité des plus beaux
            sites de la Guadeloupe : <strong>réserve Cousteau</strong>,{" "}
            <strong>jardin botanique de Deshaies</strong>,{" "}
            <strong>plage de la Perle</strong>, cascades, sentiers de randonnée
            et marchés locaux.
          </p>
          <p>
            Réservez dès maintenant votre{" "}
            <strong>villa de vacances à Deshaies</strong> et vivez un séjour
            inoubliable en Guadeloupe, entre mer turquoise, nature luxuriante et
            accueil chaleureux.
          </p>
        </div>
      </details>
    </main>
  );
}
