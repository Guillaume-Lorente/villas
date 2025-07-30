"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

export default function MobileMenuPortal({ isOpen, onClose, links }) {
  const [mounted, setMounted] = useState(false);
  const { setLocale } = useLanguage();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[98] bg-black/60 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Menu tropical vibes 🌴 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        className={`fixed top-0 right-0 w-3/4 max-w-sm h-full z-[99] p-6 flex flex-col gap-6
        border-l-4 border-[#f3a94b] shadow-[0_0_20px_#f3a94b88]
        transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "linear-gradient(to bottom right, #223e50, #2e566d)",
          color: "white",
        }}
      >
        {/* Titre + bouton X */}
        <div className="flex items-center justify-between mb-4">
          <h2
            id="mobile-menu-title"
            className="text-[#f3a94b] text-xl font-bold text-center w-full tracking-wide"
          >
            Menu
          </h2>
          <button
            onClick={onClose}
            aria-label="Fermer le menu"
            className="text-white hover:text-[#f3a94b] transition absolute right-6 top-6"
          >
            <X size={28} />
          </button>
        </div>

        {/* Drapeaux de langue */}
        <div className="flex justify-center space-x-4 mb-4">
          <button onClick={() => setLocale("fr")} aria-label="Langue française">
            <Image
              src="/icons/drapeau-fr.png"
              alt="FR"
              width={30}
              height={20}
            />
          </button>
          <button onClick={() => setLocale("en")} aria-label="Langue anglaise">
            <Image
              src="/icons/drapeau-en.png"
              alt="EN"
              width={30}
              height={20}
            />
          </button>
        </div>

        {/* Liens */}
        <nav className="flex flex-col space-y-4 font-bold text-xl">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="hover:text-[#f3a94b] hover:translate-x-1 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>,
    document.body
  );
}
