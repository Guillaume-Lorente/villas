/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.villas-grande-anse.com",
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: [
    "/admin",
    "/admin/*",
    "/api/*",
    "/reservation",
    "/reservation*",
    "/404",
    "/500",
    "/mentions-legales",
    "/cgv",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/api",
          "/reservation",
          "/mentions-legales",
          "/cgv",
        ],
      },
    ],
  },
};
