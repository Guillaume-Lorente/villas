import { setRequestLocale } from "next-intl/server";
import {
  SITE_URL,
  villaJsonLd,
  breadcrumbJsonLd,
  localizedAlternates,
} from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import IguanaPage from "./IguanaClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const fr = locale === "fr";
  return {
    title: fr
      ? "Location villa à Deshaies – Villa Iguana, piscine & nature en Guadeloupe"
      : "Villa rental in Deshaies – Villa Iguana, pool & nature in Guadeloupe",
    description: fr
      ? "Louez la Villa Iguana à Deshaies (Guadeloupe) : villa au calme en pleine nature, piscine à débordement, terrasses spacieuses et capacité jusqu’à 8 personnes. Idéale pour un séjour paisible et dépaysant."
      : "Rent Villa Iguana in Deshaies (Guadeloupe): a peaceful villa surrounded by nature, with an infinity pool, spacious terraces and room for up to 8 guests. Ideal for a quiet, change-of-scenery stay.",
    alternates: localizedAlternates(locale, "/villas/iguana"),
    openGraph: {
      title: fr
        ? "Villa Iguana – Location de villa à Deshaies en Guadeloupe"
        : "Villa Iguana – Villa rental in Deshaies, Guadeloupe",
      description: fr
        ? "Une villa paisible nichée dans la nature, en bord de rivière à Deshaies. Jusqu’à 8 personnes, 2 terrasses, piscine à débordement, proche de Grande Anse."
        : "A peaceful villa nestled in nature, by the river in Deshaies. Up to 8 guests, 2 terraces, infinity pool, close to Grande Anse.",
      url: `${SITE_URL}/villas/iguana`,
      images: [
        {
          url: "/iguana.webp",
          width: 1200,
          height: 630,
          alt: fr
            ? "Vue de la piscine à débordement de la Villa Iguana"
            : "View of Villa Iguana's infinity pool",
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
          villaJsonLd("iguana"),
          breadcrumbJsonLd([
            { name: locale === "fr" ? "Accueil" : "Home", path: "/" },
            { name: "Villa Iguana", path: "/villas/iguana" },
          ]),
        ]}
      />
      <IguanaPage />
    </>
  );
}
