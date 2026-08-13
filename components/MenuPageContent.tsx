"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

const selections = [
  { image: "/images/menu-1.webp", pt: "Seleção de Nigiri", en: "Nigiri Selection", category: "Nigiri & Gunkan" },
  { image: "/images/menu-2.webp", pt: "Lagostim Especial", en: "Special Langoustine", category: "Seafood" },
  { image: "/images/menu-3.webp", pt: "Roll de Salmão", en: "Salmon Roll", category: "Uramaki" },
  { image: "/images/menu-4.webp", pt: "Crocante Dourado", en: "Golden Crunch", category: "Fusion" },
  { image: "/images/menu-5.webp", pt: "Tataki de Atum", en: "Tuna Tataki", category: "Tataki" },
  { image: "/images/menu-6.webp", pt: "Sashimi de Salmão", en: "Salmon Sashimi", category: "Sashimi" },
  { image: "/images/menu-7.webp", pt: "Gunkan de Salmão", en: "Salmon Gunkan", category: "Gunkan" },
  { image: "/images/menu-8.webp", pt: "Nigiri de Enguia", en: "Eel Nigiri", category: "Nigiri" },
];

export default function MenuPageContent() {
  const { language, t } = useLanguage();
  return (
    <section className="menu-page">
      <div className="menu-page-intro section-shell">
        <Reveal>
          <Link className="menu-back" href="/#menu"><ArrowLeft size={16} />{t.backHome}</Link>
          <p className="eyebrow">{t.menuPageEyebrow}</p>
          <h1>{t.menuPageTitle}</h1>
          <p className="menu-page-copy">{t.menuPageBody}</p>
        </Reveal>
      </div>
      <div className="menu-grid section-shell">
        {selections.map((dish, index) => (
          <Reveal className="menu-grid-card" delay={(index % 3) * 0.06} key={dish.image}>
            <div className="menu-grid-image"><Image src={dish.image} alt={language === "pt" ? dish.pt : dish.en} fill sizes="(max-width: 639px) 100vw, (max-width: 999px) 50vw, 33vw" /></div>
            <div className="menu-grid-meta"><span>{String(index + 1).padStart(2, "0")} · {dish.category}</span><h2>{language === "pt" ? dish.pt : dish.en}</h2></div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
