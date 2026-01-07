import ContactClient from "./contactClient";

export const metadata = {
  title: "Contact – Villas Grande Anse à Deshaies (Guadeloupe)",
  description:
    "Contactez Villas Grande Anse pour toute demande de réservation ou d'information sur nos villas à Deshaies en Guadeloupe, à deux pas de la plage de Grande Anse.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact – Villas Grande Anse à Deshaies",
    description:
      "Une question sur nos villas à Deshaies ? Contactez-nous facilement via notre formulaire sécurisé.",
    url: "https://www.villas-grande-anse.com/contact",
    images: [
      {
        url: "/hero.webp",
        width: 1200,
        height: 630,
        alt: "Villas Grande Anse à Deshaies en Guadeloupe",
      },
    ],
  },
};

export default function Page() {
  return <ContactClient />;
}
