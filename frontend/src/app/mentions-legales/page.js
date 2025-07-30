"use client";

import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";

export default function MentionsLegales() {
  const { t } = useLanguage();

  const renderParagraphs = (text) =>
    text.split("\n").map((line, i) => (
      <p key={i} className="text-white/90">
        {line}
      </p>
    ));

  return (
    <main className="bg-[#223e50] text-white min-h-screen py-16 pt-32 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#eeb868] mb-8 text-center">
          {t("legal.title")}
        </h1>

        <section className="space-y-6 text-sm sm:text-base leading-relaxed">
          {/* Éditeur */}
          <div>
            <h2 className="text-[#eeb868] font-semibold text-lg mb-2">
              {t("legal.publisherTitle")}
            </h2>
            {renderParagraphs(t("legal.publisher"))}
          </div>

          {/* Hébergement */}
          <div>
            <h2 className="text-[#eeb868] font-semibold text-lg mb-2">
              {t("legal.hostingTitle")}
            </h2>
            {renderParagraphs(t("legal.hosting"))}
          </div>

          {/* Créateur */}
          <div>
            <h2 className="text-[#eeb868] font-semibold text-lg mb-2">
              {t("legal.creatorTitle")}
            </h2>
            {renderParagraphs(t("legal.creator"))}
          </div>

          {/* Modifications */}
          <div>
            <h2 className="text-[#eeb868] font-semibold text-lg mb-2">
              {t("legal.changesTitle")}
            </h2>
            {renderParagraphs(t("legal.changes"))}
          </div>

          {/* Données personnelles */}
          <div>
            <h2 className="text-[#eeb868] font-semibold text-lg mb-2">
              {t("legal.dataTitle")}
            </h2>
            {renderParagraphs(t("legal.data"))}
          </div>

          {/* Accessibilité */}
          <div>
            <h2 className="text-[#eeb868] font-semibold text-lg mb-2">
              {t("legal.accessTitle")}
            </h2>
            {renderParagraphs(t("legal.access"))}
          </div>

          {/* Retour */}
          <div className="text-center pt-8">
            <Link
              href="/"
              className="inline-block bg-[#eeb868] text-[#223e50] px-6 py-2 rounded-lg shadow hover:bg-[#c6943d] transition"
            >
              {t("legal.backHome")}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
