import { permanentRedirect } from "next/navigation";

// La liste du blog est désormais paginée côté client sur une seule URL (/blog).
// Les anciennes URL paginées sont redirigées pour consolider le SEO.
export default function BlogPaginatedRedirect() {
  permanentRedirect("/blog");
}
