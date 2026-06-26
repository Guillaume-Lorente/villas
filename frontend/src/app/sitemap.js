import { SITE_URL } from "../lib/site";

// Rendu à chaque requête pour refléter les articles de blog publiés.
export const dynamic = "force-dynamic";

// Pages commerciales : disponibles en français ET en anglais (hreflang).
const BILINGUAL_ROUTES = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/villas/akamapa", changefreq: "weekly", priority: 0.9 },
  { path: "/villas/iguana", changefreq: "weekly", priority: 0.9 },
  { path: "/villas/tilamp-tilamp", changefreq: "weekly", priority: 0.9 },
  { path: "/contact", changefreq: "monthly", priority: 0.6 },
  { path: "/infos-pratiques", changefreq: "monthly", priority: 0.6 },
];

// Le blog n'existe qu'en français.
const FR_ONLY_ROUTES = [{ path: "/blog", changefreq: "weekly", priority: 0.7 }];

const frUrl = (path) => `${SITE_URL}${path}`;
const enUrl = (path) => (path === "/" ? `${SITE_URL}/en` : `${SITE_URL}/en${path}`);

async function getPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const posts = await res.json();
    return Array.isArray(posts) ? posts : [];
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const now = new Date();

  // Pages bilingues : on déclare la version FR et la version EN, chacune
  // avec les liens hreflang vers l'autre langue + x-default (FR).
  const bilingualEntries = BILINGUAL_ROUTES.flatMap((route) => {
    const languages = {
      fr: frUrl(route.path),
      en: enUrl(route.path),
      "x-default": frUrl(route.path),
    };
    const shared = {
      lastModified: now,
      changeFrequency: route.changefreq,
      priority: route.priority,
      alternates: { languages },
    };
    return [
      { url: frUrl(route.path), ...shared },
      { url: enUrl(route.path), ...shared },
    ];
  });

  const frOnlyEntries = FR_ONLY_ROUTES.map((route) => ({
    url: frUrl(route.path),
    lastModified: now,
    changeFrequency: route.changefreq,
    priority: route.priority,
  }));

  const posts = await getPosts();
  const blogEntries = posts
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [...bilingualEntries, ...frOnlyEntries, ...blogEntries];
}
