// Centralised SEO constants & structured-data helpers.
// Single source of truth for the canonical domain so every page,
// sitemap entry and JSON-LD block stays consistent.

export const SITE_URL = "https://www.villas-grande-anse.com";
export const SITE_NAME = "Villas Grande Anse";
export const SITE_PHONE = "+33677806973";

export const ORG_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "133 Allée du Cœur",
  addressLocality: "Deshaies",
  addressRegion: "Basse-Terre",
  postalCode: "97126",
  addressCountry: "GP",
};

export const ORG_GEO = {
  "@type": "GeoCoordinates",
  latitude: 16.3089,
  longitude: -61.7931,
};

const AMENITIES = [
  "Piscine privée",
  "Plage à proximité",
  "Wi-Fi",
  "Cuisine équipée",
  "Climatisation",
  "Parking privé",
];

export const amenityFeature = AMENITIES.map((name) => ({
  "@type": "LocationFeatureSpecification",
  name,
  value: true,
}));

export const SAME_AS = [
  "https://www.facebook.com/profile.php?id=61560053927118",
  "https://www.instagram.com/villasgrandeansedeshaies",
];

// Per-villa SEO metadata used by both <head> tags and JSON-LD.
export const VILLAS = {
  akamapa: {
    slug: "akamapa",
    name: "Villa Akamapa",
    image: "/akamapa.webp",
    occupancy: 6,
    description:
      "Villa Akamapa à Deshaies (Guadeloupe) : villa spacieuse jusqu'à 6 personnes avec piscine privée, jardin tropical et plage de Grande Anse à 200 m.",
  },
  iguana: {
    slug: "iguana",
    name: "Villa Iguana",
    image: "/iguana.webp",
    occupancy: 8,
    description:
      "Villa Iguana à Deshaies (Guadeloupe) : villa au calme en pleine nature, piscine à débordement, 2 terrasses et capacité jusqu'à 8 personnes.",
  },
  "tilamp-tilamp": {
    slug: "tilamp-tilamp",
    name: "Villa Tilamp Tilamp",
    image: "/tilamp-tilamp.webp",
    occupancy: 11,
    description:
      "Villa Tilamp Tilamp à Deshaies (Guadeloupe) : grande villa de charme coloniale avec piscine privée, vastes terrasses et capacité jusqu'à 11 personnes, à 200 m de la plage de Grande Anse.",
  },
};

// JSON-LD for an individual villa (LodgingBusiness).
export function villaJsonLd(slug) {
  const villa = VILLAS[slug];
  if (!villa) return null;

  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${SITE_URL}/villas/${slug}#lodging`,
    name: `${villa.name} – Deshaies, Guadeloupe`,
    description: villa.description,
    url: `${SITE_URL}/villas/${slug}`,
    image: `${SITE_URL}${villa.image}`,
    telephone: SITE_PHONE,
    priceRange: "€€€",
    address: ORG_ADDRESS,
    geo: ORG_GEO,
    petsAllowed: false,
    numberOfRooms: undefined,
    maximumAttendeeCapacity: villa.occupancy,
    amenityFeature,
    containedInPlace: {
      "@type": "Place",
      name: "Deshaies, Guadeloupe",
    },
    parentOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
    },
    sameAs: SAME_AS,
  };
}

// JSON-LD breadcrumb helper.
// items: [{ name, path }] — path relative to SITE_URL ("" for home).
export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// Alternates SEO (canonical + hreflang) pour une page bilingue.
// path : chemin relatif SANS préfixe de langue (ex. "/villas/akamapa", "/").
export function localizedAlternates(locale, path) {
  const fr = path;
  const en = path === "/" ? "/en" : `/en${path}`;
  return {
    canonical: locale === "en" ? en : fr,
    languages: { fr, en, "x-default": fr },
  };
}
