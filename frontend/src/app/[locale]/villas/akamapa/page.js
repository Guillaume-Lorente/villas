import { setRequestLocale } from "next-intl/server";
import {
  SITE_URL,
  villaJsonLd,
  breadcrumbJsonLd,
  localizedAlternates,
} from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import AkamapaPage from "./AkamapaClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const fr = locale === "fr";
  return {
    title: fr
      ? "Location villa à Deshaies – Villa Akamapa avec piscine proche Grande Anse"
      : "Villa rental in Deshaies – Villa Akamapa with pool near Grande Anse",
    description: fr
      ? "Louez la Villa Akamapa à Deshaies (Guadeloupe) : villa spacieuse jusqu’à 6 personnes avec piscine privée et plage de Grande Anse à seulement 200 m. Parfaite pour des vacances en famille ou entre amis."
      : "Rent Villa Akamapa in Deshaies (Guadeloupe): a spacious villa for up to 6 guests with a private pool, just 200 m from Grande Anse beach. Perfect for a family or friends holiday.",
    alternates: localizedAlternates(locale, "/villas/akamapa"),
    openGraph: {
      title: fr
        ? "Villa Akamapa – Location de villa à Deshaies, Guadeloupe"
        : "Villa Akamapa – Villa rental in Deshaies, Guadeloupe",
      description: fr
        ? "Profitez de la Villa Akamapa, une location de vacances à Deshaies à 200m de la plage. Piscine, terrasse, jardin tropical. Idéale pour un séjour en famille en Guadeloupe."
        : "Enjoy Villa Akamapa, a holiday rental in Deshaies, 200 m from the beach. Pool, terrace, tropical garden. Ideal for a family stay in Guadeloupe.",
      url: `${SITE_URL}/villas/akamapa`,
      images: [
        {
          url: "/akamapa.webp",
          width: 1200,
          height: 630,
          alt: fr
            ? "Vue aérienne de la Villa Akamapa avec piscine privée à Deshaies"
            : "Aerial view of Villa Akamapa with private pool in Deshaies",
        },
      ],
      type: "website",
    },
  };
}

export default async function Page({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd
        data={[
          villaJsonLd("akamapa"),
          breadcrumbJsonLd([
            { name: locale === "fr" ? "Accueil" : "Home", path: "/" },
            { name: "Villa Akamapa", path: "/villas/akamapa" },
          ]),
        ]}
      />
      <AkamapaPage />
    </>
  );
}
