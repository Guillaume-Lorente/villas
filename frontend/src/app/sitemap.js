import { SITE_URL } from "../lib/site";

// Render on each request so the sitemap always reflects the blog articles
// currently published, even if the backend was unreachable at build time.
// The /api/posts fetch is still cached (revalidate 1h) to avoid hammering it.
export const dynamic = "force-dynamic";

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/villas/akamapa", changefreq: "weekly", priority: 0.9 },
  { path: "/villas/iguana", changefreq: "weekly", priority: 0.9 },
  { path: "/villas/tilamp-tilamp", changefreq: "weekly", priority: 0.9 },
  { path: "/blog", changefreq: "weekly", priority: 0.7 },
  { path: "/contact", changefreq: "monthly", priority: 0.6 },
  { path: "/infos-pratiques", changefreq: "monthly", priority: 0.6 },
];

async function getPosts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const posts = await res.json();
    return Array.isArray(posts) ? posts : [];
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
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

  return [...staticEntries, ...blogEntries];
}
