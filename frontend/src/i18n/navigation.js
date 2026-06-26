import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Versions « locale-aware » des utilitaires de navigation :
// les liens conservent automatiquement la langue courante.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
