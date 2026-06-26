import { setRequestLocale } from "next-intl/server";
import { SITE_URL, localizedAlternates } from "@/lib/site";
import ContactClient from "./contactClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const fr = locale === "fr";
  return {
    title: fr
      ? "Contact – Villas Grande Anse à Deshaies (Guadeloupe)"
      : "Contact – Villas Grande Anse in Deshaies (Guadeloupe)",
    description: fr
      ? "Contactez Villas Grande Anse pour toute demande de réservation ou d'information sur nos villas à Deshaies en Guadeloupe, à deux pas de la plage de Grande Anse."
      : "Contact Villas Grande Anse for any booking request or information about our villas in Deshaies, Guadeloupe, a stone's throw from Grande Anse beach.",
    alternates: localizedAlternates(locale, "/contact"),
    openGraph: {
      title: fr
        ? "Contact – Villas Grande Anse à Deshaies"
        : "Contact – Villas Grande Anse in Deshaies",
      description: fr
        ? "Une question sur nos villas à Deshaies ? Contactez-nous facilement via notre formulaire sécurisé."
        : "A question about our villas in Deshaies? Get in touch easily via our secure form.",
      url: `${SITE_URL}/contact`,
      images: [
        {
          url: "/hero.webp",
          width: 1200,
          height: 630,
          alt: fr
            ? "Villas Grande Anse à Deshaies en Guadeloupe"
            : "Villas Grande Anse in Deshaies, Guadeloupe",
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactClient />;
}
