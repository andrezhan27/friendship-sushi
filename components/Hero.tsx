"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import logoText from "@/public/images/logo-text.png";
import { useLanguage } from "./LanguageProvider";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const enter = (delay: number, y = 18) => ({
    initial: reduced ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="hero" id="top" aria-label="Friendship Sushi">
      <Image
        className="hero-image hero-image--desktop"
        src="/images/hero-desktop.webp"
        alt="Interior do Friendship Sushi com iluminação circular âmbar e superfícies refletoras"
        fill
        priority
        sizes="(max-width: 767px) 0px, 100vw"
      />
      <Image
        className="hero-image hero-image--mobile"
        src="/images/space-2.webp"
        alt="Interior do Friendship Sushi visto ao longo da sala"
        fill
        priority
        sizes="(max-width: 767px) 100vw, 0px"
      />
      <div className="hero-overlay" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="hero-content">
        <h1 className="sr-only">Friendship Sushi Lisboa</h1>
        <motion.div className="hero-wordmark" {...enter(0.82, 12)}>
          <Image
            src={logoText}
            alt="Friendship Sushi"
            width={1536}
            height={1024}
            priority
          />
        </motion.div>
        <motion.div {...enter(1.08, 14)}>
          <MagneticButton href="/reservas">{t.reserveTable}</MagneticButton>
        </motion.div>
      </div>

      <motion.a className="hero-scroll" href="#space" {...enter(1.45, 10)}>
        <span>{t.scroll}</span>
        <ArrowDown size={16} aria-hidden="true" />
      </motion.a>
    </section>
  );
}
