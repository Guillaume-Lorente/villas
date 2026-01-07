export const metadata = {
  title:
    "Villa Iguana – Location de villa à Deshaies en Guadeloupe | Villas Grande Anse",
  description:
    "Découvrez la Villa Iguana, au bord de la rivière Ziotte à Deshaies. En pleine nature, cette villa avec piscine à débordement peut accueillir jusqu'à 8 personnes. Calme et détente garantis.",
  alternates: {
    canonical: "/villas/iguana",
  },
  keywords: [
    "location villa Deshaies",
    "villa Iguana Guadeloupe",
    "villa avec piscine Deshaies",
    "hébergement nature Guadeloupe",
    "location vacances Basse-Terre",
    "villa familiale Deshaies",
    "location villa rivière Ziotte",
    "villas Grande Anse",
    "villa Guadeloupe 8 personnes",
  ],
  openGraph: {
    title: "Villa Iguana – Location de villa à Deshaies en Guadeloupe",
    description:
      "Une villa paisible nichée dans la nature, en bord de rivière à Deshaies. Jusqu’à 8 personnes, 2 terrasses, piscine à débordement, proche de Grande Anse.",
    url: "https://villasgrandeanse.com/villas/iguana", // ← adapte à ton domaine
    images: [
      {
        url: "/iguana.jpg",
        width: 1200,
        height: 630,
        alt: "Vue de la piscine à débordement de la Villa Iguana",
      },
    ],
    type: "website",
  },
};

import IguanaPage from "./IguanaClient";

export default function Page() {
  return <IguanaPage />;
}
