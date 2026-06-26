import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // On applique le middleware à toutes les routes SAUF :
  // - /api (backend), /_next, /_vercel
  // - les fichiers statiques (tout ce qui contient un point : .webp, .xml, .ico…)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
