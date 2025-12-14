"use client";

import {
  Users,
  BedDouble,
  Bath,
  ParkingCircle,
  Snowflake,
  CookingPot,
  Wifi,
  Tv2,
  Flame,
  Droplet,
  WashingMachine,
  Lock,
  Fan,
  ShowerHead,
} from "lucide-react";

import { useState, useEffect } from "react";
import VillaGallery from "@/components/VillaGallery";
import Calendar from "@/components/Calendar";
import PromoBanner from "@/components/PromoBanner";
import MobileReservationModal from "@/components/MobileReservationModal";
import { useLanguage } from "@/context/LanguageContext";
import StructuredData from "@/components/StructuredData";

export default function IguanaPage() {
  const villa = {
    name: "Villa Iguana",
    description: `La villa Iguana est originale dans sa disposition et elle bénéficie d'un cadre idéal car elle est au plus près de la nature et jouxte la rivière Ziotte. Vous y verrez très certainement des iguanes (parfaitement inoffensif puisque herbivore) d'où le nom de la villa, des mangoustes, des colibris, et autres oiseaux typiques de la Guadeloupe. Elle dispose d'une grande piscine à débordement avec un bassin adapté aux plus petits (ou pour les apéritifs), de deux grandes terrasses, d'une maison annexe et peut accueillir jusqu'à 8 personnes. Un véritable havre de paix vous attend pour des vacances uniques en Guadeloupe.`,
    images: [
      {
        src: "/iguana.jpg",
        alt: "Villa Iguana et sa piscine privée",
      },
      {
        src: "/piscineIguana.jpg",
        alt: "Piscine turquoise entourée d'un deck avec transats",
      },
      {
        src: "/piscineIguana2.jpg",
        alt: "Piscine turquoise entourée d'un deck avec transats",
      },
      {
        src: "/exterieurIguana.jpg",
        alt: "Extérieur de la villa Iguana",
      },
      {
        src: "/exterieurIguana2.jpg",
        alt: "Maison annexe 'Antilles' à la Villa Iguana",
      },
      {
        src: "/terrasseIguana.jpg",
        alt: "Terrasse extérieure avec accès piscine",
      },
      {
        src: "/tableIguana.jpg",
        alt: "Salon extérieur et espace repas",
      },
      {
        src: "/salonIguana.jpg",
        alt: "Salon intérieur de la villa Iguana",
      },
      {
        src: "/chambreIguana1.jpg",
        alt: "Suite 'Afrique' climatisée et munie d'un brasseur d'air avec lit King Size et lit simple",
      },
      {
        src: "/chambreIguana1-2.jpg",
        alt: "Suite 'Afrique'",
      },
      {
        src: "/chambreIguana1-3.jpg",
        alt: "Lit simple de la suite 'Afrique'",
      },
      {
        src: "/sdbIguana1-2.jpg",
        alt: "Salle de bain & wc attenants à la suite 'Afrique'",
      },
      {
        src: "/chambreIguana2.jpg",
        alt: "Suite 'Asie' climatisée et munie d'un brasseur d'air avec lit King size (pouvant être séparé en deux lits), lit simple",
      },
      {
        src: "/chambreIguana2-2.jpg",
        alt: "Lit simple de la suite 'Asie'",
      },
      {
        src: "/chambreIguana2-3.jpg",
        alt: "Suite 'Asie'",
      },
      {
        src: "/sdbIguana2.jpg",
        alt: "Salle de bain & wc attenants de la suite 'Asie'",
      },
      {
        src: "/salonIguana2-3.jpg",
        alt: "Petit salon de la maison annexe 'Antilles'",
      },
      {
        src: "/chambreIguana3.jpg",
        alt: "Chambre en mezzanine maison annexe 'Antilles'",
      },
      {
        src: "/sdbIguana3.jpg",
        alt: "Salle de bain & wc de la maison annexe 'Antilles'",
      },
      {
        src: "/cuisineIguana.jpg",
        alt: "Grande cuisine entièrement équipée et une arrière cuisine munies de brasseurs d'air, de la villa Iguana",
      },
    ],
  };

  const infosClés = [
    { icon: <Users size={24} />, labelKey: "capacity" },
    { icon: <BedDouble size={24} />, labelKey: "bedrooms" },
    { icon: <Bath size={24} />, labelKey: "bathrooms" },
    { icon: <ParkingCircle size={24} />, labelKey: "parking" },
  ];

  const autresEquipements = [
    { icon: <Snowflake size={24} />, key: "ac" },
    { icon: <Flame size={24} />, key: "bbq" },
    { icon: <CookingPot size={24} />, key: "kitchen" },
    {
      icon: (
        <img
          src="/icons/piscine.png"
          alt="Piscine"
          className="w-6 h-6 object-contain"
        />
      ),
      key: "pool",
    },
    { icon: <Wifi size={24} />, key: "wifi" },
    {
      icon: (
        <img
          src="/icons/plage.png"
          alt="Plage"
          className="w-6 h-6 object-contain"
        />
      ),
      key: "beach",
    },
    { icon: <WashingMachine size={24} />, key: "washer" },
    { icon: <Tv2 size={24} />, key: "tv" },
    {
      icon: (
        <img
          src="/icons/moustiquaire.png"
          alt="Moustiquaire"
          className="w-6 h-6 object-contain"
        />
      ),
      key: "net",
    },
    { icon: <Droplet size={24} />, key: "dryer" },
    { icon: <Lock size={24} />, key: "safe" },
    { icon: <Fan size={24} />, key: "fan" },
    { icon: <ShowerHead size={24} />, key: "outdoorShower" },
    {
      icon: (
        <img
          src="/icons/jeux.png"
          alt="Jeux de societe"
          className="w-6 h-6 object-contain"
        />
      ),
      key: "games",
    },
    {
      icon: (
        <img
          src="/icons/commerce.png"
          alt="Commerce de proximite"
          className="w-6 h-6 object-contain"
        />
      ),
      key: "shops",
    },
  ];

  const { t } = useLanguage();
  const [promoConfig, setPromoConfig] = useState(null);

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/promo`
        );
        const data = await res.json();
        setPromoConfig(data);
      } catch (err) {
        console.error("Erreur chargement promoConfig:", err);
      }
    };

    fetchPromo();
  }, []);

  
  return (
    <main className="bg-[#223e50] text-white pt-24">
      <StructuredData />
      {promoConfig?.villas?.[3]?.active && (
  <PromoBanner message={promoConfig.villas[3].message || ""} />
)}

     {/* Hero */}
      <section
        className="relative h-[700px] bg-cover bg-center"
        style={{ backgroundImage: `url('${villa.images[1].src}')` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-end justify-center md:justify-start h-full px-4 pb-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/30 p-6 rounded-xl max-w-2xl text-center md:text-left shadow-lg">
            <h1 className="text-[#eeb868] text-4xl font-bold mb-4">
              {t("iguana.name")}
            </h1>
            <p className="text-white/90 leading-relaxed text-md">
              {t("iguana.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Infos clés */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {infosClés.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="text-[#eeb868]">{item.icon}</div>
              <span className="text-white font-semibold">
                {t(`iguana.info.${item.labelKey}`)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Contenu principal */}
      <section className="max-w-8xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Colonne gauche */}
        <div className="w-full lg:w-2/3 space-y-12">
          {/* Galerie */}
          <h2 className="sr-only">Galerie photo de la villa</h2>
          <div className="bg-white/10 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-[#eeb868] mb-4">
              {t("iguana.galleryTitle")}
            </h2>
            <VillaGallery images={villa.images} />
          </div>

          {/* Équipements */}
          <div className="bg-white/10 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-[#eeb868] mb-6">
              {t("iguana.equipmentTitle")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-white text-sm">
              {autresEquipements.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="text-[#eeb868]">{item.icon}</div>
                  <span>{t(`iguana.equipments.${item.key}`)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Descriptif */}
          <div className="bg-white/10 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-[#eeb868] mb-6">
              {t("iguana.descriptionTitle")}
            </h2>
            <p>{t("iguana.descriptionText")}</p>
            <ul className="list-disc list-inside space-y-2 text-white/90 text-sm mt-4">
              {t("iguana.features", { returnObjects: true }).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          {/* Services inclus */}
          <div className="bg-white/10 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-[#eeb868] mb-4">
              {t("iguana.includedTitle")}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-white/90 text-sm mt-4">
              {t("iguana.included", { returnObjects: true }).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Colonne droite : Calendrier */}
        <div className="hidden lg:block w-full lg:w-1/3 sticky top-32 self-start">
          <div className="bg-white text-[#223e50] rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {t("iguana.availabilityTitle")}
            </h2>
            <div className="bg-gray-100 rounded-lg">
              <Calendar villaId={3} villaName={villa.name} />
            </div>
          </div>
        </div>
      </section>
      <MobileReservationModal villaId={3} villaName={villa.name} />

      <details
        className="hidden md:block max-w-4xl mx-auto px-4 pb-16 text-sm text-white/80"
        aria-labelledby="akamapa-seo-desc"
      >
        <summary className="cursor-pointer text-[#eeb868] font-semibold mb-4">
          À propos de la villa Iguana
        </summary>
        <div className="space-y-4 pt-2">
          <p>
            Nichée en pleine nature à Deshaies, la villa Iguana est un véritable
            havre de paix pour les amateurs de tranquillité et de verdure.
            Bordée par la rivière Ziotte et entourée de végétation tropicale,
            elle offre un cadre unique pour des vacances en Guadeloupe, loin du
            tumulte touristique.
          </p>
          <p>
            Cette villa atypique, parfaitement intégrée à son environnement,
            permet de croiser colibris, iguanes (inoffensifs bien sûr),
            mangoustes et autres animaux emblématiques de Basse‑Terre. Elle
            dispose d’une piscine à débordement avec un espace pour les enfants
            ou les apéritifs les pieds dans l’eau, ainsi que de deux vastes
            terrasses et d’une maison annexe.
          </p>
          <p>
            La villa Iguana peut accueillir jusqu’à 8 personnes dans un confort
            absolu. C’est une excellente option pour une location de villa en
            Guadeloupe alliant calme, nature et proximité des plus beaux sites
            de la Côte sous le Vent.
          </p>
          <p>
            À seulement quelques minutes de la plage de Grande Anse, du jardin
            botanique et des sentiers de randonnée, cette villa est idéale pour
            un séjour ressourçant en famille ou entre amis.
          </p>
        </div>
      </details>
    </main>
  );
}
