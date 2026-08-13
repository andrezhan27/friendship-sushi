"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sections = ["top", "space", "menu", "info"];
    const onScroll = () => {
      const marker = window.scrollY + window.innerHeight * 0.38;
      let current = "top";
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= marker) current = id;
      });
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const visibleSection = pathname === "/menu" ? "menu-page" : activeSection;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const links = [
    [pathname === "/" ? "#top" : "/#top", t.navHome, "top"],
    [pathname === "/" ? "#space" : "/#space", t.navSpace, "space"],
    [pathname === "/" ? "#menu" : "/#menu", t.navMenu, pathname === "/menu" ? "menu-page" : "menu"],
    [pathname === "/" ? "#info" : "/#info", t.navInfo, "info"],
  ];

  return (
    <header className={`navbar ${scrolled || open ? "navbar--solid" : ""}`}>
      <a className="nav-brand" href={pathname === "/" ? "#top" : "/#top"} aria-label="Friendship Sushi — início">
        <span className="nav-logo">
          <Image src="/images/logo.png" width={58} height={58} alt="" priority />
        </span>
      </a>

      <nav className="nav-links" aria-label="Navegação principal">
        {links.map(([href, label, section]) => (
          <a key={href} href={href} className={visibleSection === section ? "active" : ""} aria-current={visibleSection === section ? "location" : undefined}>{label}</a>
        ))}
      </nav>

      <div className="nav-actions">
        <div className="language-switch" aria-label="Selecionar idioma">
          <button
            type="button"
            className={language === "pt" ? "active" : ""}
            onClick={() => setLanguage("pt")}
            aria-pressed={language === "pt"}
          >
            PT
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            className={language === "en" ? "active" : ""}
            onClick={() => setLanguage("en")}
            aria-pressed={language === "en"}
          >
            EN
          </button>
        </div>
        <a className="nav-reserve" href="/reservas">{t.navReserve}</a>
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            aria-label="Navegação móvel"
            initial={reduced ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {links.map(([href, label, section], index) => (
              <a key={href} href={href} className={visibleSection === section ? "active" : ""} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>{label}
              </a>
            ))}
            <a className="mobile-reserve" href="/reservas" onClick={() => setOpen(false)}>
              {t.reserveTable}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
