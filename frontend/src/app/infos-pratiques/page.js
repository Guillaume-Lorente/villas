import InfosPratiquesClient from "./InfosPratiquesClient";

export const metadata = {
  title:
    "Infos pratiques – Accès & accueil des villas à Deshaies | Villas Grande Anse",
  description:
    "Comment se rendre à nos villas à Deshaies (Guadeloupe), conditions d’arrivée, équipements et informations d’accueil pour préparer votre séjour.",
  alternates: {
    canonical: "/infos-pratiques",
  },
};

export default function InfosPratiquesPage() {
  return <InfosPratiquesClient />;
}
