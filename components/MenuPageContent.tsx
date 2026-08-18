"use client";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

export default function MenuPageContent({ images }: { images: string[] }) {
  const { language, t } = useLanguage();
  return (
    <section className="menu-page">
      <div className="menu-page-intro section-shell">
        <Reveal>
          <Link className="menu-back" href="/"><ArrowLeft size={16} />{t.backHome}</Link>
          <p className="eyebrow">{t.menuPageEyebrow}</p>
          <h1>{t.menuPageTitle}</h1>
          <p className="menu-page-copy">{t.menuPageBody}</p>
        </Reveal>
      </div>
      <div className="menu-grid section-shell">
        {images.map((image, index) => (
          <div className="menu-grid-card" key={image}>
            <div className="menu-grid-image">
              <Image
                src={image}
                alt={language === "pt" ? `Prato do menu ${index + 1}` : `Menu dish ${index + 1}`}
                fill
                loading={index < 3 ? "eager" : "lazy"}
                sizes="(max-width: 639px) 100vw, (max-width: 999px) 50vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
