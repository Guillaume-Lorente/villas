export const metadata = {
  title:
    "Location villa à Deshaies – Villa Tilamp Tilamp, grande villa avec piscine",
  description:
    "Découvrez la Villa Tilamp Tilamp à Deshaies (Guadeloupe) : grande villa de charme avec piscine privée, vastes terrasses et capacité jusqu’à 11 personnes, à deux pas de la plage de Grande Anse.",
  alternates: {
    canonical: "/villas/tilamp-tilamp",
  },
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
    url: "https://villasgrandeanse.com/villas/tilamp-tilamp",
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
