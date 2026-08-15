"use client";

import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logoText from "@/public/images/logo-text.png";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-main section-shell">
        <Link className="footer-logo" href="/" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "auto" })} aria-label="Friendship Sushi — início">
          <Image src={logoText} alt="Friendship Sushi" width={1536} height={1024} />
        </Link>

        <div className="footer-column">
          <p>{t.footerNav}</p>
          <a href="#space">{t.navSpace}</a>
          <a href="#menu">{t.navMenu}</a>
          <a href="#info">{t.navInfo}</a>
          <Link href="/reservation">{t.reservations}</Link>
        </div>

        <div className="footer-column">
          <p>{t.legal}</p>
          <a href="#privacy">{t.privacy}</a>
          <a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noreferrer">
            {t.complaints}
          </a>
        </div>

        <div className="social-links">
          <a className="social-link" href="https://www.instagram.com/friendship_sushi" target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram size={21} strokeWidth={1.5} />
          </a>
          <a className="social-link" href="https://www.facebook.com/profile.php?id=61563631226419&sk=reels_tab" target="_blank" rel="noreferrer" aria-label="Facebook">
            <Facebook size={21} strokeWidth={1.5} />
          </a>
        </div>
      </div>
      <div className="footer-bottom section-shell">
        <span>© {year} Friendship Sushi</span>
        <span>Lisboa · Portugal</span>
      </div>
    </footer>
  );
}
