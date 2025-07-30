"use client";
import { createContext, useContext, useState, useEffect } from "react";
import fr from "../messages/fr.json";
import en from "../messages/en.json";

const translations = { fr, en };
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("fr");

  // ✅ Charger la langue sauvegardée au démarrage
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale === "en" || savedLocale === "fr") {
      setLocale(savedLocale);
    }
  }, []);

  // ✅ Mettre à jour localStorage à chaque changement de langue
  const handleSetLocale = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const t = (key) => {
    return (
      key.split(".").reduce((obj, part) => obj?.[part], translations[locale]) ||
      key
    );
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
