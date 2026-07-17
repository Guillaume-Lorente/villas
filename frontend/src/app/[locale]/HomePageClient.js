"use client";

import Link from "next/link";
import MapSection from "@/components/MapSection";
import HomeGallery from "@/components/HomeGallery";
import FadeUp from "@/components/FadeUp";
import { useEffect, useState } from "react";
import PromoBanner from "@/components/PromoBanner";
import { useTranslations } from "next-intl";
import Image from "next/image";

const villas = [
  { slug: "akamapa", name: "Villa Akamapa", image: "/akamapa.webp" },
  {
    slug: "tilamp-tilamp",
    name: "Villa Tilamp Tilamp",
    image: "/tilamp-tilamp.webp",
  },
  { slug: "iguana", name: "Villa Iguana", image: "/iguana.webp" },
];

export default function HomePage() {
  const t = useTranslations();
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
    <main
      className="bg-[#223e50] text-white pt-24"
      aria-label="Page d'accueil - Location de villas à Deshaies"
    >
      {/* Promo Banner */}
      {promoConfig?.homepage?.active && (
        <PromoBanner message={promoConfig.homepage.message} />
      )}

      {/* Hero */}
      <section className="relative w-full h-[600px] md:h-[600px] lg:h-[650px]">
        <Image
          src="/hero.webp"
          alt="Location de villas à Deshaies en Guadeloupe, proche de la plage de Grande Anse"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          fetchPriority="high"
        />

        {/* Le voile noir + le texte au-dessus */}
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
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={villa.image}
                    alt={`Villa ${villa.name} à Deshaies en Guadeloupe`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                    fetchPriority="low"
                  />
                </div>

                <div className="p-4 space-y-1">
                  <h3 className="text-xl font-bold text-[#eeb868]">
                    {villa.name}
                  </h3>

                  {/* TEXTE SEO DISCRET */}
                  <p className="text-sm text-[#223e50]/80 leading-snug">
                    {t(`home.cardSeo.${villa.slug}`)}
                  </p>
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
      {/* Contenu SEO visible (toutes tailles d'écran) et localisé */}
      <section
        aria-label="Informations sur la location de villas à Deshaies"
        className="max-w-4xl mx-auto px-4 py-16 text-white/85"
      >
        <FadeUp>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#eeb868] mb-6 text-center">
            {t("home.about.title")}
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="space-y-4 leading-relaxed">
            <p>{t("home.about.p1")}</p>
            <p>{t("home.about.p2")}</p>
            <p>{t("home.about.p3")}</p>
            <p>{t("home.about.p4")}</p>
          </div>
        </FadeUp>
      </section>

      {/* FAQ */}
      <section
        aria-label="Questions fréquentes sur la location de villas à Deshaies"
        className="max-w-4xl mx-auto px-4 pb-20"
      >
        <FadeUp>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#eeb868] mb-8 text-center">
            {t("home.faq.title")}
          </h2>
        </FadeUp>
        <div className="space-y-4">
          {t.raw("home.faq.items").map((item, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-[#eeb868] mb-2">
                  {item.q}
                </h3>
                <p className="text-white/85 leading-relaxed">{item.a}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </main>
  );
}
