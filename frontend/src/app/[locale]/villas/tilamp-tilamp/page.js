import { setRequestLocale } from "next-intl/server";
import {
  SITE_URL,
  villaJsonLd,
  breadcrumbJsonLd,
  localizedAlternates,
} from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import TilampPage from "./TilampClient";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const fr = locale === "fr";
  return {
    title: fr
      ? "Location villa à Deshaies – Villa Tilamp Tilamp, grande villa avec piscine"
      : "Villa rental in Deshaies – Villa Tilamp Tilamp, large villa with pool",
    description: fr
      ? "Découvrez la Villa Tilamp Tilamp à Deshaies (Guadeloupe) : grande villa de charme avec piscine privée, vastes terrasses et capacité jusqu’à 11 personnes, à deux pas de la plage de Grande Anse."
      : "Discover Villa Tilamp Tilamp in Deshaies (Guadeloupe): a large charming villa with a private pool, vast terraces and room for up to 11 guests, a stone's throw from Grande Anse beach.",
    alternates: localizedAlternates(locale, "/villas/tilamp-tilamp"),
    openGraph: {
      title: fr
        ? "Villa Tilamp-Tilamp – Location de villa à Deshaies, Guadeloupe"
        : "Villa Tilamp-Tilamp – Villa rental in Deshaies, Guadeloupe",
      description: fr
        ? "Villa coloniale unique à Deshaies. Hébergement de charme à 200m de la plage de Grande Anse. Jusqu’à 11 personnes, piscine, terrasses, jardin tropical."
        : "A unique colonial-style villa in Deshaies. Charming accommodation 200 m from Grande Anse beach. Up to 11 guests, pool, terraces, tropical garden.",
      url: `${SITE_URL}/villas/tilamp-tilamp`,
      images: [
        {
          url: "/tilamp-tilamp.webp",
          width: 1200,
          height: 630,
          alt: fr
            ? "Vue de la villa Tilamp-Tilamp avec sa piscine et terrasse"
            : "View of Villa Tilamp-Tilamp with its pool and terrace",
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
          villaJsonLd("tilamp-tilamp"),
          breadcrumbJsonLd([
            { name: locale === "fr" ? "Accueil" : "Home", path: "/" },
            { name: "Villa Tilamp Tilamp", path: "/villas/tilamp-tilamp" },
          ]),
        ]}
      />
      <TilampPage />
    </>
  );
}
