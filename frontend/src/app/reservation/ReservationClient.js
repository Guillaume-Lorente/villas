"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Script from "next/script";
import { useLanguage } from "@/context/LanguageContext";
import { event as fbEvent } from "@/lib/fpixel";

// ✅ Toast Component
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

export default function ReservationPage() {
  const searchParams = useSearchParams();
  const [villaName, setVillaName] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [toast, setToast] = useState(null);

  const roomOptionsByVilla = {
    1: [
      { room_count: 1, includes_sofa_bed: false, max_guests: 2 },
      { room_count: 2, includes_sofa_bed: false, max_guests: 4 },
      { room_count: 2, includes_sofa_bed: true, max_guests: 6 },
    ],
    2: [
      { room_count: 2, includes_sofa_bed: false, max_guests: 6 },
      { room_count: 3, includes_sofa_bed: false, max_guests: 9 },
      { room_count: 4, includes_sofa_bed: false, max_guests: 11 },
    ],
    3: [
      { room_count: 1, includes_sofa_bed: false, max_guests: 3 },
      { room_count: 2, includes_sofa_bed: false, max_guests: 6 },
      { room_count: 3, includes_sofa_bed: false, max_guests: 8 },
    ],
  };

  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const rooms = searchParams.get("rooms");
  const sofa = searchParams.get("sofa");
  const villaId = searchParams.get("villa");
  const price = searchParams.get("price");

  const guests = roomOptionsByVilla[villaId]?.find(
    (opt) =>
      opt.room_count.toString() === rooms &&
      opt.includes_sofa_bed.toString() === sofa,
  )?.max_guests;

  useEffect(() => {
    const fetchVilla = async () => {
      if (!villaId) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/villas/${villaId}`,
        );
        const data = await res.json();
        setVillaName(data.name || "");
      } catch (err) {
        console.error("Erreur chargement villa:", err);
      }
    };
    fetchVilla();
  }, [villaId]);

  useEffect(() => {
    window.onRecaptchaSuccess = function (token) {
      setRecaptchaToken(token);
    };
  }, []);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const formattedStart = start ? format(new Date(start), "dd/MM/yyyy") : "";
  const formattedEnd = end ? format(new Date(end), "dd/MM/yyyy") : "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      setToast({ message: "Veuillez valider le reCAPTCHA.", type: "error" });
      return;
    }

    const form = new FormData(e.target);
    const nom = form.get("Nom");
    const prenom = form.get("Prénom");
    const email = form.get("Email");
    const telephone = form.get("Téléphone");
    const message = form.get("Message");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/reservation`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          villaName,
          start: formattedStart,
          end: formattedEnd,
          rooms,
          guests,
          price,
          nom: `${prenom} ${nom}`,
          email,
          telephone,
          message,
          token: recaptchaToken,
        }),
      },
    );

    grecaptcha.reset();
    setRecaptchaToken("");

    if (res.ok) {
      // ✅ Meta Pixel: conversion (demande envoyée)
      fbEvent("Lead", {
        content_category: "Villa",
        content_ids: [String(villaId)],
        content_type: "product",
        value: price ? Number(price) : undefined,
        currency: "EUR",
      });

      // ✅ Event GA4
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "generate_lead", {
          villa_name: villaName,
          start_date: formattedStart,
          end_date: formattedEnd,
          value: price ? parseFloat(price) : undefined,
          currency: "EUR",
        });
      }

      setToast({
        message: "✅ Demande envoyée avec succès !",
        type: "success",
      });
    } else {
      setToast({
        message: "❌ Une erreur est survenue, veuillez réessayer.",
        type: "error",
      });
    }
  };

  const { t } = useLanguage();

  return (
    <main className="max-w-2xl mx-auto px-4 pt-32 pb-16 text-[#eeb868]">
      <h1 className="text-3xl font-bold text-[#eeb868] mb-6">
        {t("reservation.title")}
      </h1>

      <div className="bg-white/10 p-6 rounded-lg shadow space-y-4">
        <p>
          <strong>{t("reservation.villa")} :</strong>{" "}
          {villaName || `Villa #${villaId}`}
        </p>
        <p>
          <strong>{t("reservation.dates")} :</strong> du {formattedStart} au{" "}
          {formattedEnd}
        </p>
        <p>
          <strong>{t("reservation.rooms")} :</strong> {rooms}
        </p>
        {guests && (
          <p>
            <strong>{t("reservation.guests")} :</strong> {guests}
          </p>
        )}
        {price && (
          <p>
            <strong>{t("reservation.price")} :</strong>{" "}
            {parseFloat(price).toFixed(2)} € *
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          role="form"
          aria-labelledby="reservation-form-title"
          className="space-y-4 mt-6"
        >
          <input
            id="nom"
            name="Nom"
            type="text"
            placeholder={t("reservation.form.lastname")}
            required
            className="w-full px-4 py-2 rounded bg-white text-[#223e50]"
          />
          <input
            id="prenom"
            name="Prénom"
            type="text"
            placeholder={t("reservation.form.firstname")}
            required
            className="w-full px-4 py-2 rounded bg-white text-[#223e50]"
          />
          <label htmlFor="email" className="sr-only">
            {t("reservation.form.email")}
          </label>
          <input
            id="email"
            name="Email"
            type="email"
            placeholder={t("reservation.form.email")}
            required
            className="w-full px-4 py-2 rounded bg-white text-[#223e50]"
          />

          <label htmlFor="telephone" className="sr-only">
            {t("reservation.form.phone")}
          </label>
          <input
            id="telephone"
            name="Téléphone"
            type="tel"
            placeholder={t("reservation.form.phone")}
            required
            className="w-full px-4 py-2 rounded bg-white text-[#223e50]"
          />

          <label htmlFor="message" className="sr-only">
            {t("reservation.form.message")}
          </label>
          <textarea
            id="message"
            name="Message"
            placeholder={t("reservation.form.message")}
            className="w-full px-4 py-2 rounded bg-white text-[#223e50] h-28"
          />

          <div className="flex justify-center">
            <div
              className="g-recaptcha"
              data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              data-callback="onRecaptchaSuccess"
            />
          </div>

          <button
            type="submit"
            aria-label={t("reservation.submit")}
            className="w-full bg-[#eeb868] text-[#223e50] font-bold py-2 rounded hover:bg-[#c6943d] transition"
          >
            {t("reservation.submit")}
          </button>

          <p>{t("reservation.disclaimer")}</p>
          <p className="text-xs">{t("reservation.privacy")}</p>
        </form>
      </div>

      {/* ✅ Toast affiché si nécessaire */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="lazyOnload"
      />
    </main>
  );
}
