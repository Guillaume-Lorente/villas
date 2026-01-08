export const metadata = {
  title:
    "Location villa à Deshaies – Villa Akamapa avec piscine proche Grande Anse",
  description:
    "Louez la Villa Akamapa à Deshaies (Guadeloupe) : villa spacieuse jusqu’à 6 personnes avec piscine privée et plage de Grande Anse à seulement 200 m. Parfaite pour des vacances en famille ou entre amis.",
  alternates: {
    canonical: "/villas/akamapa",
  },

  keywords: [
    "location villa Deshaies",
    "villa Akamapa Guadeloupe",
    "villa avec piscine Deshaies",
    "location vacances Grande Anse",
    "villa Guadeloupe Basse-Terre",
    "hébergement Deshaies",
    "maison à louer Guadeloupe",
    "villas Grande Anse",
    "vacances Deshaies Guadeloupe",
  ],
  openGraph: {
    title: "Villa Akamapa – Location de villa à Deshaies, Guadeloupe",
    description:
      "Profitez de la Villa Akamapa, une location de vacances à Deshaies à 200m de la plage. Piscine, terrasse, jardin tropical. Idéale pour un séjour en famille en Guadeloupe.",
    url: "https://villasgrandeanse.com/villas/akamapa",
    images: [
      {
        url: "/akamapa.jpg",
        width: 1200,
        height: 630,
        alt: "Vue aérienne de la Villa Akamapa avec piscine privée à Deshaies",
      },
    ],
    type: "website",
  },
};

import AkamapaPage from "./AkamapaClient";

export default function Page() {
  return <AkamapaPage />;
}
