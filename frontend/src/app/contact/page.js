"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import { useLanguage } from "../../context/LanguageContext";

// Toast Component
function Toast({ message, type, onClose }) {
  return (
    <div
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-md text-white text-sm font-semibold transition-all duration-300
        ${type === "success" ? "bg-green-600" : "bg-red-600"}`}
    >
      {message}
      <button
        onClick={onClose}
        className="ml-4 text-white font-bold hover:underline"
      >
        ✕
      </button>
    </div>
  );
}

export default function ContactPage() {
  const { t } = useLanguage();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { message, type }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = grecaptcha.getResponse();
    if (!token) {
      setToast({ message: t("contact.recaptchaError"), type: "error" });
      setLoading(false);
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, token }),
      }
    );

    setLoading(false);
    if (res.ok) {
      setForm({ nom: "", prenom: "", email: "", message: "" });
      grecaptcha.reset();
      setToast({ message: t("contact.success"), type: "success" });
    } else {
      setToast({ message: t("contact.error"), type: "error" });
    }
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  return (
    <main
      role="main"
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: "url('/background2.jpg')" }}
    >
      <div className="bg-[#223e50]/90 text-white p-8 rounded-3xl max-w-2xl w-full shadow-xl border border-white/20 space-y-6 mt-24 md:mt-20">
        <h1 className="text-4xl font-bold text-[#eeb868] text-center">
          {t("contact.title")}
        </h1>
        <p className="text-center text-white/90">{t("contact.description")}</p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="nom" className="sr-only">
              {t("contact.name")}
            </label>
            <input
              id="nom"
              name="nom"
              type="text"
              value={form.nom}
              onChange={handleChange}
              required
              aria-required="true"
              aria-label={t("contact.name")}
              placeholder={t("contact.name")}
              className="w-full px-4 py-3 rounded-md bg-white text-jaune placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#eeb868]"
            />
          </div>

          <div>
            <label htmlFor="prenom" className="sr-only">
              {t("contact.firstname")}
            </label>
            <input
              id="prenom"
              name="prenom"
              type="text"
              value={form.prenom}
              onChange={handleChange}
              required
              aria-required="true"
              aria-label={t("contact.firstname")}
              placeholder={t("contact.firstname")}
              className="w-full px-4 py-3 rounded-md bg-white text-jaune placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#eeb868]"
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              {t("contact.email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              aria-required="true"
              aria-label={t("contact.email")}
              placeholder={t("contact.email")}
              className="w-full px-4 py-3 rounded-md bg-white text-jaune placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#eeb868]"
            />
          </div>

          <div>
            <label htmlFor="message" className="sr-only">
              {t("contact.message")}
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              aria-required="true"
              aria-label={t("contact.message")}
              placeholder={t("contact.message")}
              rows={5}
              className="w-full px-4 py-3 rounded-md bg-white text-jaune placeholder-gray-500 border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-[#eeb868]"
            />
          </div>

          <div
            className="flex justify-center"
            role="group"
            aria-label="reCAPTCHA"
          >
            <div
              className="g-recaptcha"
              data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#eeb868] text-[#223e50] font-bold py-3 rounded-full hover:bg-[#c6943d] transition"
            aria-label={t("contact.submit")}
          >
            {loading ? t("contact.loading") : t("contact.submit")}
          </button>
        </form>
      </div>

      {toast && (
        <div role="alert" aria-live="assertive">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        </div>
      )}

      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="lazyOnload"
      />
    </main>
  );
}
