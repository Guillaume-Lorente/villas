"use client";

import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";

export default function CGV() {
  const { t } = useLanguage();

  const renderParagraphs = (text) => {
    if (!text || typeof text !== "string") return null;

    return text.split("\n").map((paragraph, i) => (
      <p key={i} className="mb-4 whitespace-pre-line">
        {paragraph}
      </p>
    ));
  };

  // Génère dynamiquement les articles 1 à 16
  const articles = Array.from({ length: 16 }, (_, i) => {
    const index = i + 1;
    const title = t(`cgv.article${index}Title`);
    const text = t(`cgv.article${index}`);
    return { key: index, title, text };
  });

  return (
    <main className="bg-[#223e50] text-white min-h-screen py-16 pt-32 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#eeb868] mb-8 text-center">
          {t("cgv.title")}
        </h1>

        <section className="space-y-10 text-sm sm:text-base leading-relaxed">
          {articles.map(({ key, title, text }) => (
            <div key={key}>
              <h2 className="text-[#eeb868] font-semibold text-lg mb-2">
                {title}
              </h2>
              {renderParagraphs(text)}
            </div>
          ))}

          <div className="text-center pt-8">
            <Link
              href="/"
              className="inline-block bg-[#eeb868] text-[#223e50] px-6 py-2 rounded-lg shadow hover:bg-[#c6943d] transition"
            >
              {t("cgv.backHome")}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
