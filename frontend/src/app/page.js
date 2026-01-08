export const metadata = {
  title:
    "Location villa à Deshaies, Guadeloupe – Villas de charme près de Grande Anse",
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
        alt: "Villa Tilamp Tilamp avec piscine à Deshaies",
      },
    ],
  },
};

import HomePage from "./HomePageClient";

export default function Page() {
  return <HomePage />;
}
