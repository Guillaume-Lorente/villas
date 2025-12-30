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

export default function TilampTilampPage() {
  const villa = {
    name: "Villa Tilamp Tilamp",
    description: `Tilamp Tilamp signifie prendre son temps. Cette villa est unique de part son style colonial très rare en Guadeloupe. Sa configuration exceptionnelle vous offre un espace de terrasses tout au tour de la villa qui est extrêmement bien ventilée. Alliant élégance et charme, elle peut accueillir jusqu'à 11 personnes. Dès votre arrivée, sa décoration particulièrement soignée vous séduira. Elle dispose d'une grande piscine, de nombreux espaces pour le farniente, en somme c'est le lieu idéal pour vous retrouver en famille ou entre amis, et passer des vacances inoubliables en Guadeloupe !`,
    images: [
      {
        src: "/tilamp-tilamp.jpg",
        alt: "Villa Tilamp Tilamp et sa piscine privée",
      },
      {
        src: "/piscinetilamp.jpg",
        alt: "Piscine turquoise entourée de transats sous les cocotiers",
      },
      {
        src: "/terrassetilamp.jpg",
        alt: "Terrasse de la villa",
      },
      {
        src: "/baby.jpg",
        alt: "Babyfoot disponible sur la terrasse",
      },
      {
        src: "/cuisinetilamp.jpg",
        alt: "Cuisine équipée avec bar extérieur",
      },
      {
        src: "/cuisinetilamp2.jpg",
        alt: "Cuisine moderne et équipée",
      },
      {
        src: "/salontilamp.jpg",
        alt: "Salon intérieur avec accès aux terrasses",
      },
      {
        src: "/salonTilamp.jpeg",
        alt: "Salon intérieur",
      },
      {
        src: "/chambre1tilamp.jpg",
        alt: "Chambre 'Tropical' climatisée avec lit Queen Size et lit simple",
      },
      {
        src: "/chambre2tilamp.jpg",
        alt: "Chambre 'Caraïbes' climatisée avec lit Queen Size et lit simple",
      },
      {
        src: "/sdb1tilamp.jpg",
        alt: "Salle de bain & wc indépendant commune aux chambres 'Tropical' et 'Caraïbes'",
      },
      {
        src: "/chambre3tilamp2.jpeg",
        alt: "Suite 'Rivage' climatisée à l'étage, avec lit Queen Size et lit simple",
      },
      {
        src: "/sdb2tilamp.jpg",
        alt: "Salle de bain attenante et wc privatif de la suite 'Rivage'",
      },
      {
        src: "/chambre4tilamp.jpg",
        alt: "Suite 'Exotique' climatisée avec lit Queen Size",
      },
      {
        src: "/chambre4tilamp2.jpg",
        alt: "Suite 'Exotique' climatisée avec lit Queen Size",
      },
      {
        src: "/sdb3tilamp.jpg",
        alt: "Salle de bain attenante & wc privatif de la suite 'Exotique'",
      },
      {
        src: "/panierAccueil.jpg",
        alt: "Panier d'accueil offert à votre arrivée",
      },
      {
        src: "/kitSDB.jpg",
        alt: "Kit de salle de bain à disposition à votre arrivée",
      },
      {
        src: "/jardinTilamp.jpeg",
        alt: "Les jardins de la villa",
      },
      {
        src: "/extTilamp.jpeg",
        alt: "Villa Tilamp Tilamp",
      },
      {
        src: "/ananas.jpg",
        alt: "Ananas du jardin",
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
      {promoConfig?.villas?.[2]?.active && (
        <PromoBanner message={promoConfig.villas[2].message || ""} />
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
              {t("tilamp.name")}
            </h1>
            <p className="text-white/90 leading-relaxed text-md">
              {t("tilamp.description")}
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
                {t(`tilamp.info.${item.labelKey}`)}
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
              {t("tilamp.galleryTitle")}
            </h2>
            <VillaGallery images={villa.images} />
          </div>

          {/* Équipements */}
          <div className="bg-white/10 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-[#eeb868] mb-6">
              {t("tilamp.equipmentTitle")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-white text-sm">
              {autresEquipements.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="text-[#eeb868]">{item.icon}</div>
                  <span>{t(`tilamp.equipments.${item.key}`)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Descriptif */}
          <div className="bg-white/10 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-[#eeb868] mb-6">
              {t("tilamp.descriptionTitle")}
            </h2>
            <p>{t("tilamp.descriptionText")}</p>
            <ul className="list-disc list-inside space-y-2 text-white/90 text-sm mt-4">
              {t("tilamp.features", { returnObjects: true }).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          {/* Services inclus */}
          <div className="bg-white/10 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-[#eeb868] mb-4">
              {t("tilamp.includedTitle")}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-white/90 text-sm mt-4">
              {t("tilamp.included", { returnObjects: true }).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Colonne droite : Calendrier */}
        <div className="hidden lg:block w-full lg:w-1/3 sticky top-32 self-start">
          <div className="bg-white text-[#223e50] rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {t("tilamp.availabilityTitle")}
            </h2>
            <div className="bg-gray-100 rounded-lg">
              <Calendar villaId={2} villaName={villa.name} />
            </div>
          </div>
        </div>
      </section>
      <MobileReservationModal villaId={2} villaName={villa.name} />

      <details
        className="hidden md:block max-w-4xl mx-auto px-4 pb-16 text-sm text-white/80"
        aria-labelledby="akamapa-seo-desc"
      >
        <summary className="cursor-pointer text-[#eeb868] font-semibold mb-4">
          À propos de la villa Tilamp‑Tilamp
        </summary>
        <div className="space-y-4 pt-2">
          <p>
            Située à Deshaies, à seulement quelques minutes à pied de la célèbre
            plage de Grande Anse, la villa Tilamp‑Tilamp offre une expérience de
            location exceptionnelle en Guadeloupe. Cette maison de charme au
            style colonial rare allie confort, raffinement et authenticité
            caribéenne.
          </p>
          <p>
            Entourée de végétation luxuriante, elle dispose de vastes terrasses
            ventilées, d’une grande piscine privée et d’espaces de détente
            parfaitement aménagés. Grâce à ses 4 chambres et ses nombreux
            couchages, elle peut accueillir confortablement jusqu’à 11 personnes
            – idéale pour des vacances en famille ou entre amis.
          </p>
          <p>
            Louer la villa Tilamp Tilamp, c’est choisir une villa d’exception à
            Deshaies, avec tout le confort moderne, à proximité immédiate de la
            plage, des sentiers de randonnée, du jardin botanique et des
            meilleurs restaurants de Basse‑Terre.
          </p>
          <p>
            Profitez de votre séjour pour découvrir les trésors de la Côte sous
            le Vent et vivez une expérience inoubliable de location saisonnière
            en Guadeloupe.
          </p>
        </div>
      </details>
    </main>
  );
}
