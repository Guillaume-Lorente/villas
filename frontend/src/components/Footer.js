"use client";

import { Facebook, Instagram } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

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
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="/mentions-legales" className="hover-jaune">
            {t("footer.mentions")}
          </a>
          <a href="/contact" className="hover-jaune">
            {t("footer.contact")}
          </a>
          <a href="/cgv" className="hover-jaune">
            {t("footer.cgv")}
          </a>
        </div>
      </div>
    </footer>
  );
}
