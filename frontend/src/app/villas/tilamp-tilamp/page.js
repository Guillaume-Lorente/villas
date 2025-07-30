export const metadata = {
  title:
    "Villa Tilamp-Tilamp – Location de villa à Deshaies, Guadeloupe | Villas Grande Anse",
  description:
    "La villa Tilamp-Tilamp, au style colonial rare en Guadeloupe, vous accueille à Deshaies. Terrasse en L, piscine, 4 chambres, proche de la plage de Grande Anse. Jusqu’à 11 personnes.",
  keywords: [
    "location villa Deshaies",
    "villa Tilamp-Tilamp Guadeloupe",
    "villa coloniale Guadeloupe",
    "location vacances Grande Anse",
    "hébergement Basse-Terre",
    "villa avec piscine Deshaies",
    "grande villa à louer Guadeloupe",
    "vacances famille Deshaies",
    "villas Grande Anse",
  ],
  openGraph: {
    title: "Villa Tilamp-Tilamp – Location de villa à Deshaies, Guadeloupe",
    description:
      "Villa coloniale unique à Deshaies. Hébergement de charme à 200m de la plage de Grande Anse. Jusqu’à 11 personnes, piscine, terrasses, jardin tropical.",
    url: "https://villasgrandeanse.com/villas/tilamp-tilamp", // ← adapte selon ton domaine
    images: [
      {
        url: "/tilamp-tilamp.jpg",
        width: 1200,
        height: 630,
        alt: "Vue de la villa Tilamp-Tilamp avec sa piscine et terrasse",
      },
    ],
    type: "website",
  },
};

import TilampPage from "./TilampClient";

export default function Page() {
  return <TilampPage />;
}
