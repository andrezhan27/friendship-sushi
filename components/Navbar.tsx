"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
  const returnHome = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const links = [
    ["/", t.navHome, "top"],
    [pathname === "/" ? "#space" : "/#space", t.navSpace, "space"],
    ["/menu", t.navMenu, pathname === "/menu" ? "menu-page" : "menu"],
    [pathname === "/" ? "#info" : "/#info", t.navInfo, "info"],
  ];

  return (
    <header className={`navbar ${scrolled || open ? "navbar--solid" : ""}`}>
      <Link className="nav-brand" href="/" onClick={returnHome} aria-label="Friendship Sushi — início">
        <span className="nav-logo">
          <Image src="/images/logo.png" width={58} height={58} alt="" priority />
        </span>
      </Link>

      <nav className="nav-links" aria-label="Navegação principal">
        {links.map(([href, label, section]) => (
          <Link key={href} href={href} onClick={section === "top" ? returnHome : undefined} className={visibleSection === section ? "active" : ""} aria-current={visibleSection === section ? "location" : undefined}>{label}</Link>
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
        <Link className="nav-reserve" href="/reservation">{t.navReserve}</Link>
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
              <Link key={href} href={href} className={visibleSection === section ? "active" : ""} onClick={() => {
                setOpen(false);
                if (section === "top") returnHome();
              }}>
                <span>0{index + 1}</span>{label}
              </Link>
            ))}
            <Link className="mobile-reserve" href="/reservation" onClick={() => setOpen(false)}>
              {t.reserveTable}
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
