"use client";

import { useLanguage } from "../../context/LanguageContext";

export default function InfosPratiques() {
  const { t } = useLanguage();

  return (
    <main
      role="main"
      aria-labelledby="infos-title"
      className="flex-grow flex flex-col"
    >
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12 pt-32"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="bg-[#223e50]/90 text-white p-8 rounded-3xl max-w-3xl w-full shadow-2xl border border-white/20 space-y-12 mt-20 md:mt-0">
          <h1
            id="infos-title"
            className="text-4xl md:text-5xl font-bold text-[#eeb868] text-center drop-shadow-sm"
          >
            {t("infos.title")}
          </h1>

          {/* Section 1 */}
          <section aria-labelledby="how-to-title" className="space-y-4">
            <h2
              id="how-to-title"
              className="text-2xl md:text-3xl font-semibold text-[#eeb868]"
            >
              {t("infos.howTo.title")}
            </h2>
            <div className="space-y-2 leading-relaxed text-white/90">
              <p>
                <span role="img" aria-label="Localisation">
                  📍
                </span>{" "}
                <strong>{t("infos.howTo.gpsLabel")}</strong>{" "}
                <span className="text-white">{t("infos.howTo.gpsValue")}</span>
              </p>
              <p>
                <span role="img" aria-label="Voiture">
                  🚗
                </span>{" "}
                <strong>{t("infos.howTo.fromAirport")}</strong>{" "}
                <strong>{t("infos.howTo.duration")}</strong>
              </p>
              <p>➤ {t("infos.howTo.step1")}</p>
              <p>➤ {t("infos.howTo.step2")}</p>
              <p>➤ {t("infos.howTo.step3")}</p>
            </div>
          </section>

          {/* Section 2 */}
          <section aria-labelledby="welcome-title" className="space-y-4">
            <h2
              id="welcome-title"
              className="text-2xl md:text-3xl font-semibold text-[#eeb868]"
            >
              {t("infos.welcome.title")}
            </h2>
            <div className="leading-relaxed text-white/90 space-y-3">
              <p>{t("infos.welcome.text1")}</p>
              <p>{t("infos.welcome.text2")}</p>
              <p>{t("infos.welcome.text3")}</p>
            </div>
          </section>

          {/* Section 3 */}
          <section aria-labelledby="services-title" className="space-y-4">
            <h2
              id="services-title"
              className="text-2xl md:text-3xl font-semibold text-[#eeb868]"
            >
              {t("infos.services.title")}
            </h2>
            <div className="leading-relaxed text-white/90 space-y-3">
              <p>{t("infos.services.text1")}</p>
              <p>{t("infos.services.text2")}</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
