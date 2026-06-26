import { setRequestLocale } from "next-intl/server";
import { localizedAlternates } from "@/lib/site";
import InfosPratiquesClient from "./InfosPratiquesClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const fr = locale === "fr";
  return {
    title: fr
      ? "Infos pratiques – Accès & accueil des villas à Deshaies | Villas Grande Anse"
      : "Practical info – Getting to & checking in at our Deshaies villas | Villas Grande Anse",
    description: fr
      ? "Comment se rendre à nos villas à Deshaies (Guadeloupe), conditions d’arrivée, équipements et informations d’accueil pour préparer votre séjour."
      : "How to reach our villas in Deshaies (Guadeloupe), arrival conditions, amenities and check-in information to prepare your stay.",
    alternates: localizedAlternates(locale, "/infos-pratiques"),
  };
}

export default async function InfosPratiquesPage({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <InfosPratiquesClient />;
}
