import {
  SITE_URL,
  SITE_NAME,
  SITE_PHONE,
  ORG_ADDRESS,
  ORG_GEO,
  amenityFeature,
  SAME_AS,
} from "../lib/site";
import JsonLd from "../components/JsonLd";
import HomePage from "./HomePageClient";

export const metadata = {
  title: "Location de villas à Deshaies, Guadeloupe | Villas Grande Anse",
  description:
    "Découvrez nos villas de charme à Deshaies (Guadeloupe) : piscines privées, plage de Grande Anse à deux pas, confort haut de gamme et réservation directe. Vacances tropicales inoubliables.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Location de villas à Deshaies | Villas Grande Anse",
    description:
      "Louez une villa à Deshaies (Guadeloupe) tout confort, proche de la plage de Grande Anse. Vue mer, piscine, calme tropical et charme créole.",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "Villa avec piscine à Deshaies, proche de la plage de Grande Anse en Guadeloupe",
      },
    ],
  },
};

const lodgingJsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "@id": `${SITE_URL}/#lodging`,
  name: SITE_NAME,
  description:
    "Location de villas avec piscine privée à Deshaies (Guadeloupe), à 200 m de la plage de Grande Anse. Villas de charme : Tilamp Tilamp, Akamapa et Iguana.",
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
  inLanguage: "fr-FR",
};

export default function Page() {
  return (
    <>
      <JsonLd data={[lodgingJsonLd, websiteJsonLd]} />
      <HomePage />
    </>
  );
}
