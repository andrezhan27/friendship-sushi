"use client";

import { Clock3, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import MagneticButton from "./MagneticButton";
import Reveal from "./Reveal";

export default function InfoSection() {
  const { t } = useLanguage();
  const details = [
    { icon: MapPin, label: t.address, value: t.addressText, href: "https://www.google.com/maps/place//data=!4m2!3m1!1s0xd1933003d738f29:0xf03a2fe5f0fe1952?sa=X&ved=1t:8290&ictx=111" },
    { icon: Clock3, label: t.hours, value: t.hoursText },
    { icon: Phone, label: t.contact, value: t.contactText, href: "tel:+351927372099" },
  ];

  return (
    <section className="info-section" id="info">
      <div className="info-layout">
        <div className="info-photo">
          <Image
            src="/images/space-6.webp"
            alt="Ambiente intimista do Friendship Sushi"
            fill
            sizes="(max-width: 899px) 100vw, 50vw"
          />
          <div className="info-photo-overlay" />
          <Reveal className="info-aside">
            <span>Friendship<br />Sushi</span>
            <p>{t.infoAside}</p>
          </Reveal>
        </div>

        <div className="info-content">
          <Reveal>
            <p className="eyebrow"><span>03</span>{t.infoEyebrow}</p>
            <h2>{t.infoTitle}</h2>
          </Reveal>

          <div className="info-list">
            {details.map(({ icon: Icon, label, value, href }, index) => (
              <Reveal className="info-row" delay={0.08 * index} key={label}>
                <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p>{label}</p>
                  {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{value}</a> : <strong>{value}</strong>}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.18}>
            <MagneticButton href="/reservas">{t.reserveTable}</MagneticButton>
          </Reveal>
        </div>
      </div>
      <div className="info-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12440.341487022342!2d-9.15668625!3d38.784677200000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1933003d738f29%3A0xf03a2fe5f0fe1952!2sFRIENDSHIP%20SUSHI!5e0!3m2!1sen!2spt!4v1786618888027!5m2!1sen!2spt"
          title="Friendship Sushi no Google Maps"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  );
}
