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
import Image from "next/image";
import Link from "next/link";
import { event as fbEvent } from "@/lib/fpixel";

export default function AkamapaPage() {
  const villa = {
    name: "Villa Akamapa",
    description: `Akamapa que l'on peut traduire par «la case à maman et à papa »... Les nombreux atouts de cette villa typiquement guadeloupéenne de plain-pied avec sa piscine au centre vous séduiront. Elle bénéficie d'un cadre idéal, d'une grande piscine, d'une grande terrasse en L, et d'un carbet pour le farniente à l'ombre. Laisser vous emporter par la sérénité des lieux dans un écrin de verdure.`,
    images: [
      {
        src: "/akamapa.webp",
        alt: "Vue aérienne de la villa Akamapa et sa piscine privée",
      },
      {
        src: "/piscine2aka.jpg",
        alt: "Piscine turquoise entourée de transats",
      },
      {
        src: "/piscineaka.jpg",
        alt: "Vue large de la piscine et de la terrasse ensoleillée",
      },
      {
        src: "/chaiseaka.jpg",
        alt: "Chaises longues installées au bord de la piscine",
      },
      {
        src: "/abordpisc.jpg",
        alt: "Petit salon au bord de la piscine",
      },
      {
        src: "/salonextaka.jpg",
        alt: "Salon extérieur couvert avec canapés confortables",
      },
      {
        src: "/salonext2aka.jpg",
        alt: "Autre vue du salon extérieur donnant sur la piscine",
      },
      {
        src: "/chambre1aka.jpg",
        alt: "Première suite 'Orchidée' climatisée avec lit King Size, accès terrasse & piscine",
      },
      {
        src: "/sdb1aka.jpg",
        alt: "Salle de bain attenante à la suite 'Orchidée'",
      },
      {
        src: "/chambre2aka.jpg",
        alt: "Deuxième suite 'Hibiscus' climatisée avec lit King size pouvant être séparé en deux lits, accès terrasse & piscine",
      },
      {
        src: "/sdb2aka.jpg",
        alt: "Salle de bain attenante à la suite 'Hibiscus'",
      },
      {
        src: "/salonaka.jpg",
        alt: "Salon intérieur avec TV et deux lits simples",
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
        src: "/palmier2.jpg",
        alt: "Palmier à l'entrée de la Villa",
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
          loading="lazy"
          decoding="async"
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
          loading="lazy"
          decoding="async"
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
          loading="lazy"
          decoding="async"
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
          loading="lazy"
          decoding="async"
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
          loading="lazy"
          decoding="async"
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
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/promo`,
        );
        const data = await res.json();
        setPromoConfig(data);
      } catch (err) {
        console.error("Erreur chargement promoConfig:", err);
      }
    };

    fetchPromo();
  }, []);

  useEffect(() => {
    fbEvent("ViewContent", {
      content_name: "Akamapa",
      content_category: "Villa",
      content_ids: ["akamapa"],
      content_type: "product",
      currency: "EUR",
    });
  }, []);

  return (
    <main className="bg-[#223e50] text-white pt-24">
      <StructuredData />
      {promoConfig?.villas?.[1]?.active && (
        <PromoBanner message={promoConfig.villas[1].message || ""} />
      )}

      {/* Hero */}
      <section className="relative h-[700px]">
        <Image
          src={villa.images[1].src}
          alt={villa.images[1].alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex items-end justify-center md:justify-start h-full px-4 pb-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/30 p-6 rounded-xl max-w-2xl text-center md:text-left shadow-lg">
            <h1 className="text-[#eeb868] text-4xl font-bold mb-4">
              {t("akamapa.name")}
            </h1>
            <p className="text-white/90 leading-relaxed text-md">
              {t("akamapa.description")}
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
                {t(`akamapa.info.${item.labelKey}`)}
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
              {t("akamapa.galleryTitle")}
            </h2>
            <VillaGallery images={villa.images} />
          </div>

          {/* Équipements */}
          <div className="bg-white/10 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-[#eeb868] mb-6">
              {t("akamapa.equipmentTitle")}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-white text-sm">
              {autresEquipements.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="text-[#eeb868]">{item.icon}</div>
                  <span>{t(`akamapa.equipments.${item.key}`)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Descriptif */}
          <div className="bg-white/10 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-[#eeb868] mb-6">
              {t("akamapa.descriptionTitle")}
            </h2>
            <p>{t("akamapa.descriptionText")}</p>
            <p className="mt-4 text-white/90 text-sm leading-relaxed">
              {t("akamapa.contextLinkText")}{" "}
              <Link
                href="/villas/tilamp-tilamp"
                className="text-[#eeb868] underline hover:no-underline"
              >
                {t("links.tilamp")}
              </Link>
              .
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/90 text-sm mt-4">
              {t("akamapa.features", { returnObjects: true }).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          {/* Services inclus */}
          <div className="bg-white/10 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold text-[#eeb868] mb-4">
              {t("akamapa.includedTitle")}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-white/90 text-sm mt-4">
              {t("akamapa.included", { returnObjects: true }).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Colonne droite : Calendrier */}
        <div className="hidden lg:block w-full lg:w-1/3 sticky top-32 self-start">
          <div className="bg-white text-[#223e50] rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {t("akamapa.availabilityTitle")}
            </h2>
            <div className="bg-gray-100 rounded-lg">
              <Calendar villaId={1} villaName={villa.name} />
            </div>
          </div>
        </div>
      </section>
      <MobileReservationModal villaId={1} villaName={villa.name} />

      {/* Autres villas */}
      <section
        className="max-w-6xl mx-auto px-4 pb-16"
        aria-label={t("akamapa.otherVillasTitle")}
      >
        <h2 className="text-2xl font-bold text-[#eeb868] mb-6 text-center">
          {t("akamapa.otherVillasTitle")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tilamp */}
          <Link
            href="/villas/tilamp-tilamp"
            className="group rounded-xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/10 hover:scale-[1.01] transition-transform duration-300 shadow-lg flex flex-col"
            aria-label={t("akamapa.otherVillas.tilampText")}
          >
            <div className="relative h-48">
              <Image
                src="/tilamp-tilamp.webp"
                alt="Villa Tilamp Tilamp à Deshaies"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
                fetchPriority="low"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-[#eeb868] mb-2">
                {t("akamapa.otherVillas.tilampTitle")}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {t("akamapa.otherVillas.tilampText")}
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-[#eeb868] group-hover:underline">
                {t("common.discoverMore")} →
              </span>
            </div>
          </Link>

          {/* Iguana */}
          <Link
            href="/villas/iguana"
            className="group rounded-xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/10 hover:scale-[1.01] transition-transform duration-300 shadow-lg flex flex-col"
            aria-label={t("akamapa.otherVillas.iguanaText")}
          >
            <div className="relative h-48">
              <Image
                src="/iguana.webp"
                alt="Villa Iguana à Deshaies"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
                fetchPriority="low"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-[#eeb868] mb-2">
                {t("akamapa.otherVillas.iguanaTitle")}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {t("akamapa.otherVillas.iguanaText")}
              </p>
              <span className="mt-3 inline-block text-sm font-semibold text-[#eeb868] group-hover:underline">
                {t("common.discoverMore")} →
              </span>
            </div>
          </Link>
        </div>
      </section>

      <details
        className="hidden md:block max-w-4xl mx-auto px-4 pb-16 text-sm text-white/80"
        aria-labelledby="akamapa-seo-desc"
      >
        <summary
          id="akamapa-seo-desc"
          className="cursor-pointer text-[#eeb868] font-semibold mb-2"
        >
          En savoir plus sur la location de la villa Akamapa à Deshaies
        </summary>
        <div className="mt-2 space-y-4">
          <p>
            Située à Deshaies, en Basse‑Terre (Guadeloupe), la{" "}
            <strong>villa Akamapa</strong> est une location saisonnière tout
            confort à seulement 200 mètres de la célèbre plage de Grande‑Anse.
            Cette villa créole de plain‑pied dispose d’une grande piscine
            privée, d’une terrasse ombragée et d’un jardin tropical.
          </p>
          <p>
            Idéale pour des vacances en famille ou entre amis, elle peut
            accueillir jusqu’à 6 personnes grâce à ses 2 chambres climatisées et
            son salon avec deux lits simples. Vous profitez d’un{" "}
            <strong>logement tout équipé</strong> : cuisine aménagée, Wi‑Fi,
            parking privé, moustiquaires, coffre‑fort, lave‑linge, barbecue et
            plus encore.
          </p>
          <p>
            Offrez-vous un séjour paisible dans un écrin de verdure, à proximité
            des plus beaux sites de Basse‑Terre.
            <strong>Réservez dès maintenant votre villa à Deshaies</strong> et
            vivez une expérience authentique en Guadeloupe.
          </p>
          <p className="text-white/90">
            {t("akamapa.homeLinkText").replace(t("links.homeDeshaies"), "")}{" "}
            <Link
              href="/"
              className="text-[#eeb868] underline hover:no-underline"
            >
              {t("links.homeDeshaies")}
            </Link>
          </p>
        </div>
      </details>
    </main>
  );
}
