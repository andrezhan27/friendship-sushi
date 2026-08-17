"use client";

import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

const dishes = [
  { image: "/menu/landing/menu-1.webp", pt: "Seleção de Nigiri", en: "Nigiri Selection", categoryPt: "Nigiri & Gunkan", categoryEn: "Nigiri & Gunkan" },
  { image: "/menu/landing/menu-2.webp", pt: "Lagostim Especial", en: "Special Langoustine", categoryPt: "Marisco", categoryEn: "Seafood" },
  { image: "/menu/landing/menu-3.webp", pt: "Roll de Salmão", en: "Salmon Roll", categoryPt: "Uramaki", categoryEn: "Uramaki" },
  { image: "/menu/landing/menu-4.webp", pt: "Crocante Dourado", en: "Golden Crunch", categoryPt: "Fusão", categoryEn: "Fusion" },
  { image: "/menu/landing/menu-5.webp", pt: "Tataki de Atum", en: "Tuna Tataki", categoryPt: "Tataki", categoryEn: "Tataki" },
  { image: "/menu/landing/menu-6.webp", pt: "Sashimi de Salmão", en: "Salmon Sashimi", categoryPt: "Sashimi", categoryEn: "Sashimi" },
  { image: "/menu/landing/menu-7.webp", pt: "Gunkan de Salmão", en: "Salmon Gunkan", categoryPt: "Gunkan", categoryEn: "Gunkan" },
  { image: "/menu/landing/menu-8.webp", pt: "Nigiri de Enguia", en: "Eel Nigiri", categoryPt: "Nigiri", categoryEn: "Nigiri" },
];

export default function MenuCarousel() {
  const { language, t } = useLanguage();
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [halfWidth, setHalfWidth] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setHalfWidth(track.scrollWidth / 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduced || paused || !halfWidth) return;
    let next = x.get() - delta * 0.026;
    if (next <= -halfWidth) next += halfWidth;
    x.set(next);
  });

  const items = [...dishes, ...dishes];

  return (
    <section className="menu-section" id="menu">
      <div className="section-shell menu-heading">
        <Reveal>
          <h2 className="section-title"><span>02</span>{t.menuTitle}</h2>
        </Reveal>
        <Reveal className="menu-description" delay={0.1}>
          <p>{t.menuBody}</p>
          <a href="/menu">{t.fullMenu}</a>
        </Reveal>
      </div>

      <div className="carousel-viewport">
        <motion.div
          className="carousel-track"
          ref={trackRef}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -halfWidth, right: 0 }}
          dragElastic={0.08}
          onDragStart={() => setPaused(true)}
          onDragEnd={() => setPaused(false)}
        >
          {items.map((dish, index) => (
            <motion.article
              className="dish-card"
              key={`${dish.image}-${index}`}
              whileHover={reduced ? undefined : { y: -7 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden={index >= dishes.length}
            >
              <div className="dish-image">
                <Image
                  src={dish.image}
                  alt={index < dishes.length ? (language === "pt" ? dish.pt : dish.en) : ""}
                  fill
                  sizes="(max-width: 767px) 72vw, 29vw"
                />
              </div>
              <div className="dish-meta">
                <p>{language === "pt" ? dish.categoryPt : dish.categoryEn}</p>
                <h3>{language === "pt" ? dish.pt : dish.en}</h3>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
      <p className="drag-hint">← &nbsp; {t.drag} &nbsp; →</p>
      <PricingSection />
    </section>
  );
}

function PricingSection() {
  const { t } = useLanguage();
  const rows = [
    { period: t.weekday, audience: t.adults, lunch: "17,90 €", dinner: "23,90 €" },
    { period: t.weekend, audience: t.adults, lunch: "23,90 €", dinner: "23,90 €" },
    { period: t.kids, audience: "", lunch: "9,90 €", dinner: "12,90 €" },
  ];

  return (
    <div className="pricing section-shell" id="pricing">
      <div className="pricing-copy">
        <Reveal>
          <p className="pricing-kicker">{t.pricingSubtitle}</p>
          <h3>{t.pricingTitle}</h3>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="pricing-table" role="table" aria-label={t.pricingTitle}>
            <div className="pricing-row pricing-row--head" role="row">
              <span role="columnheader" />
              <span role="columnheader">{t.lunch}</span>
              <span role="columnheader">{t.dinner}</span>
            </div>
            {rows.map((row) => (
              <div className="pricing-row" role="row" key={`${row.period}-${row.audience}`}>
                <div role="cell"><strong>{row.period}</strong><small>{row.audience}</small></div>
                <span role="cell">{row.lunch}<small>{t.perPerson}</small></span>
                <span role="cell">{row.dinner}<small>{t.perPerson}</small></span>
              </div>
            ))}
          </div>
          <div className="pricing-notes"><span>{t.vat}</span></div>
        </Reveal>
      </div>
      <div className="pricing-visuals" aria-label="Seleção Friendship Sushi">
        <Reveal className="pricing-image pricing-image--one">
          <Image src="/images/food-1.webp" alt="Seleção variada de sushi Friendship" fill sizes="(max-width: 899px) 70vw, 25vw" />
        </Reveal>
        <Reveal className="pricing-image pricing-image--two" delay={0.12}>
          <Image src="/images/food-2.webp" alt="Seleção de peixe e marisco Friendship" fill sizes="(max-width: 899px) 56vw, 22vw" />
        </Reveal>
      </div>
    </div>
  );
}
