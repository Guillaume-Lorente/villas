"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import MobileMenuPortal from "./MobileMenuPortal";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScroll = useRef(0);
  const { locale, setLocale, t } = useLanguage();

  const links = [
    { label: t("header.akamapa"), href: "/villas/akamapa" },
    { label: t("header.tilamp"), href: "/villas/tilamp-tilamp" },
    { label: t("header.iguana"), href: "/villas/iguana" },
    { label: t("header.infos"), href: "/infos-pratiques" },
    { label: t("header.blog"), href: "/blog" },
    { label: t("header.contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 50);

      if (current > lastScroll.current && current > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
          hidden
            ? "opacity-0 -translate-y-6 pointer-events-none"
            : "opacity-100 translate-y-0"
        } ${
          scrolled ? "bg-black/70 backdrop-blur-sm shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo Villas Grande Anse"
                width={150}
                height={50}
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav
            aria-label="Navigation principale"
            className="hidden lg:flex space-x-6 font-bold text-xl items-center"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover-jaune transform transition duration-300 hover:scale-105"
              >
                {link.label}
              </Link>
            ))}

            {/* Language switcher */}
            <div className="flex items-center space-x-2 ml-6">
              <button
                onClick={() => setLocale("fr")}
                aria-label="Passer le site en français"
              >
                <Image
                  src="/icons/drapeau-fr.png"
                  alt="FR"
                  width={24}
                  height={16}
                />
              </button>
              <button
                onClick={() => setLocale("en")}
                aria-label="Switch site to English"
              >
                <Image
                  src="/icons/drapeau-en.png"
                  alt="EN"
                  width={24}
                  height={16}
                />
              </button>
            </div>
          </nav>

          {/* Burger icon for mobile */}
          <button
            className="lg:hidden text-bleu"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu de navigation"
            aria-expanded={menuOpen}
          >
            <Menu size={32} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenuPortal
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={links}
      />
    </>
  );
}
