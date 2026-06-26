import { SITE_URL } from "../lib/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/api",
        "/reservation",
        "/mentions-legales",
        "/cgv",
        "/en/admin",
        "/en/reservation",
        "/en/mentions-legales",
        "/en/cgv",
        "/en/blog",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
