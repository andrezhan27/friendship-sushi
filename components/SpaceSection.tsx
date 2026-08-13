"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { type CSSProperties, type KeyboardEvent, type TouchEvent, useRef, useState } from "react";
import space1 from "@/public/images/space-1.webp";
import space2 from "@/public/images/space-2.webp";
import space3 from "@/public/images/space-3.webp";
import space4 from "@/public/images/space-4.webp";
import space5 from "@/public/images/space-5.webp";
import space6 from "@/public/images/space-6.webp";
import { useLanguage } from "./LanguageProvider";
import Reveal from "./Reveal";

type SpaceImage = { src: StaticImageData; alt: string };
type CarouselStyle = CSSProperties & { "--space-shift": string };

const spaceImages: SpaceImage[] = [
  { src: space1, alt: "Mesa e cadeiras em tons queimados no Friendship Sushi" },
  { src: space2, alt: "Perspetiva central da sala e dos círculos iluminados" },
  { src: space3, alt: "Iluminação circular âmbar no interior do restaurante" },
  { src: space4, alt: "Superfícies negras refletoras do Friendship Sushi" },
  { src: space5, alt: "Sala do Friendship Sushi com iluminação quente" },
  { src: space6, alt: "Detalhe das mesas no espaço Friendship Sushi" },
];

function relativePosition(index: number, active: number) {
  let position = index - active;
  const halfway = spaceImages.length / 2;

  if (position > halfway) position -= spaceImages.length;
  if (position < -halfway) position += spaceImages.length;

  return position;
}

export default function SpaceSection() {
  const { t } = useLanguage();
  const touchStartRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);

  function navigate(step: number) {
    setActive((current) => (current + step + spaceImages.length) % spaceImages.length);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigate(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      navigate(1);
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartRef.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = touchStartRef.current;
    const end = event.changedTouches[0]?.clientX;
    touchStartRef.current = null;

    if (start === null || end === undefined || Math.abs(start - end) < 45) return;
    navigate(start > end ? 1 : -1);
  }

  return (
    <section className="space-section" id="space">
      <div className="section-shell space-heading">
        <Reveal><h2 className="section-title"><span>01</span>{t.spaceTitle}</h2></Reveal>
      </div>

      <div
        className="space-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label={t.spaceTitle}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {spaceImages.map((image, index) => {
          const position = relativePosition(index, active);
          const distance = Math.abs(position);
          const isActive = index === active;

          return (
            <button
              type="button"
              className={`space-carousel-card${isActive ? " is-active" : ""}`}
              data-distance={distance}
              style={{ "--space-shift": `${position * 82}%` } as CarouselStyle}
              key={image.src.src}
              aria-label={`${index + 1} / ${spaceImages.length}: ${image.alt}`}
              aria-current={isActive ? "true" : undefined}
              aria-hidden={distance > 2 ? "true" : undefined}
              tabIndex={distance <= 2 ? 0 : -1}
              onClick={() => setActive(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 767px) 64vw, 42vw"
                loading="eager"
                draggable={false}
              />
            </button>
          );
        })}
      </div>

      <div className="space-controls section-shell">
        <button type="button" onClick={() => navigate(-1)} aria-label="Imagem anterior"><ArrowLeft size={18} /></button>
        <div className="space-counter">
          <span aria-live="polite">{String(active + 1).padStart(2, "0")}</span><i /><span>06</span>
        </div>
        <button type="button" onClick={() => navigate(1)} aria-label="Imagem seguinte"><ArrowRight size={18} /></button>
      </div>
    </section>
  );
}
