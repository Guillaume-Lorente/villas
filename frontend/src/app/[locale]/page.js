import { setRequestLocale } from "next-intl/server";
import {
  SITE_URL,
  SITE_NAME,
  SITE_PHONE,
  ORG_ADDRESS,
  ORG_GEO,
  amenityFeature,
  SAME_AS,
  localizedAlternates,
} from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import HomePage from "./HomePageClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const fr = locale === "fr";
  return {
    title: fr
      ? "Location de villas à Deshaies, Guadeloupe | Villas Grande Anse"
      : "Villa rentals in Deshaies, Guadeloupe | Villas Grande Anse",
    description: fr
      ? "Découvrez nos villas de charme à Deshaies (Guadeloupe) : piscines privées, plage de Grande Anse à deux pas, confort haut de gamme et réservation directe. Vacances tropicales inoubliables."
      : "Discover our charming villas in Deshaies (Guadeloupe): private pools, Grande Anse beach nearby, premium comfort and direct booking. An unforgettable tropical getaway.",
    alternates: localizedAlternates(locale, "/"),
    openGraph: {
      title: fr
        ? "Location de villas à Deshaies | Villas Grande Anse"
        : "Villa rentals in Deshaies | Villas Grande Anse",
      description: fr
        ? "Louez une villa à Deshaies (Guadeloupe) tout confort, proche de la plage de Grande Anse. Vue mer, piscine, calme tropical et charme créole."
        : "Rent a fully equipped villa in Deshaies (Guadeloupe), close to Grande Anse beach. Sea view, pool, tropical calm and Creole charm.",
      images: [
        {
          url: "/hero.webp",
          width: 1200,
          height: 630,
          alt: fr
            ? "Villa avec piscine à Deshaies, proche de la plage de Grande Anse en Guadeloupe"
            : "Villa with pool in Deshaies, near Grande Anse beach in Guadeloupe",
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const fr = locale === "fr";

  const lodgingJsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE_URL}/#lodging`,
    name: SITE_NAME,
    description: fr
      ? "Location de villas avec piscine privée à Deshaies (Guadeloupe), à 200 m de la plage de Grande Anse. Villas de charme : Tilamp Tilamp, Akamapa et Iguana."
      : "Villa rentals with private pool in Deshaies (Guadeloupe), 200 m from Grande Anse beach. Charming villas: Tilamp Tilamp, Akamapa and Iguana.",
    image: [
      `${SITE_URL}/hero.webp`,
      `${SITE_URL}/akamapa.webp`,
      `${SITE_URL}/tilamp-tilamp.webp`,
      `${SITE_URL}/iguana.webp`,
    ],
    url: `${SITE_URL}/`,
    telephone: SITE_PHONE,
    priceRange: "€€€",
    address: ORG_ADDRESS,
    geo: ORG_GEO,
    amenityFeature,
    sameAs: SAME_AS,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "Villas Grande Anse – Deshaies",
    url: `${SITE_URL}/`,
    inLanguage: fr ? "fr-FR" : "en-US",
  };

  return (
    <>
      <JsonLd data={[lodgingJsonLd, websiteJsonLd]} />
      <HomePage />
    </>
  );
}
