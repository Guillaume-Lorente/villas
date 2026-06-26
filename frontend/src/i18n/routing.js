import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Langues supportées par le site
  locales: ["fr", "en"],
  // Langue par défaut (français à la racine, sans préfixe)
  defaultLocale: "fr",
  // "as-needed" : pas de préfixe pour le français (/villas/akamapa),
  // préfixe /en pour l'anglais (/en/villas/akamapa).
  localePrefix: "as-needed",
});
