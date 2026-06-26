"use client";

import { Facebook, Instagram, Youtube } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations();

  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>
          &copy; {currentYear} Villas Grande Anse. {t("footer.rights")}
        </p>

        {/* Réseaux sociaux */}
        <div className="flex space-x-6">
          <a
            href="https://www.facebook.com/profile.php?id=61560053927118"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Villas Grande Anse"
            className="hover-jaune transition"
          >
            <Facebook size={28} />
          </a>
          <a
            href="https://www.instagram.com/villasgrandeansedeshaies/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Villas Grande Anse"
            className="hover-jaune transition"
          >
            <Instagram size={28} />
          </a>
	  <a
            href="https://www.youtube.com/@villasgrandeanse"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Youtube Villas Grande Anse"
            className="hover-jaune transition"
          >
            <Youtube size={28} />
          </a>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/mentions-legales" className="hover-jaune">
            {t("footer.mentions")}
          </Link>
          <Link href="/contact" className="hover-jaune">
            {t("footer.contact")}
          </Link>
          <Link href="/cgv" className="hover-jaune">
            {t("footer.cgv")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
