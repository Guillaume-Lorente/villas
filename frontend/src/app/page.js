export const metadata = {
  title: "Location de villas à Deshaies | Villas Grande Anse en Guadeloupe",
  description:
    "Location de villas avec piscine privée à Deshaies (Guadeloupe) à 200m de la plage de Grande Anse. Découvrez nos hébergements haut de gamme : Tilamp Tilamp, Akamapa et Iguana.",
  openGraph: {
    title: "Location de villas à Deshaies | Villas Grande Anse",
    description:
      "Louez une villa à Deshaies (Guadeloupe) tout confort, proche de la plage de Grande Anse. Vue mer, piscine, calme tropical et charme créole.",
    images: [
      {
        url: "/hero.jpg",
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
