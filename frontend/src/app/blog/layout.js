export const metadata = {
  title:
    "Blog Guadeloupe – Nature, Plages et Activités à Deshaies | Villas Grande Anse",
  description:
    "Explorez notre blog dédié à la Côte sous le Vent en Guadeloupe : plages de rêve, randonnées en forêt tropicale, idées sorties, visites, conseils pratiques et bons plans autour de Deshaies.",
  openGraph: {
    title: "Blog Guadeloupe – Nature, Plages et Activités à Deshaies",
    description:
      "Conseils, découvertes et activités pour des vacances inoubliables à Deshaies, sur la côte ouest de la Guadeloupe. Articles rédigés par l’équipe de Villas Grande Anse.",
    images: [
      {
        url: "/blog-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Plage de Grande Anse au coucher du soleil",
      },
    ],
  },
};
export default function BlogLayout({ children }) {
  return <>{children}</>;
}
