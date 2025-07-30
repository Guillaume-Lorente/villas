import Script from "next/script";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: "Villas Grande Anse",
    description:
      "Location de villas avec piscine privée à Deshaies (Guadeloupe), à 200m de la plage de Grande Anse. Villas de charme : Tilamp Tilamp, Akamapa et Iguana.",
    image: [
      "https://villas-grande-anse.com/hero.jpg",
      "https://villas-grande-anse.com/akamapa.jpg",
      "https://villas-grande-anse.com/tilamp-tilamp.jpg",
      "https://villas-grande-anse.com/iguana.jpg",
    ],
    url: "https://villas-grande-anse.com",
    telephone: "+33677806973",
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: "133 Allée du Cœur",
      addressLocality: "Deshaies",
      addressRegion: "Basse-Terre",
      postalCode: "97126",
      addressCountry: "GP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 16.3089,
      longitude: -61.7931,
    },
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Piscine privée",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Plage à proximité",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Wi-Fi",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Cuisine équipée",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Climatisation",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Parking privé",
        value: true,
      },
    ],
    sameAs: [
      "https://www.facebook.com/profile.php?id=61560053927118",
      "https://www.instagram.com/villasgrandeansedeshaies",
    ],
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
