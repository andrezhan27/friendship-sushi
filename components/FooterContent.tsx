"use client";

import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logoText from "@/public/images/logo-text.png";
import type { RestaurantLegalLinks } from "@/lib/restaurant-legal-links";
import { useLanguage } from "./LanguageProvider";

const complaintsBookUrl = "https://www.livroreclamacoes.pt/Inicio/";

export default function FooterContent({ legalLinks }: { legalLinks: RestaurantLegalLinks }) {
  const { t } = useLanguage();

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
          {legalLinks.privacyPolicyUrl && (
            <a href={legalLinks.privacyPolicyUrl} target="_blank" rel="noreferrer">
              {t.privacy}
            </a>
          )}
          {legalLinks.termsAndConditionsUrl && (
            <a href={legalLinks.termsAndConditionsUrl} target="_blank" rel="noreferrer">
              {t.termsAndConditions}
            </a>
          )}
          <a href={complaintsBookUrl} target="_blank" rel="noreferrer">
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
        <div className="footer-bottom-copy">
          <a href="https://www.intelis.pt/" target="_blank" rel="noreferrer">
            {t.footerDesignedBy}
          </a>
          <a href="https://www.intelis.pt/" target="_blank" rel="noreferrer">
            {t.footerRights}
          </a>
        </div>
      </div>
    </footer>
  );
}
