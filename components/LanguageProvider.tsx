"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type Language = "pt" | "en";

const copy = {
  pt: {
    navHome: "Início",
    navSpace: "O Espaço",
    navMenu: "Menu",
    navInfo: "Informações",
    navReserve: "Reservar",
    reserveTable: "Reservar Mesa",
    scroll: "Descobrir",
    spaceTitle: "O Espaço",
    spaceBody: "Um espaço onde luz, textura e gastronomia se encontram.",
    spaceNote: "Arquitetura envolvente. Luz quente. Uma experiência à mesa que começa antes do primeiro prato.",
    menuTitle: "A Nossa Carta",
    menuBody: "Uma seleção pensada para descobrir, partilhar e repetir.",
    fullMenu: "Ver Menu Completo",
    drag: "Arraste",
    menuPageEyebrow: "Friendship Sushi · Lisboa",
    menuPageTitle: "Menu Completo",
    menuPageBody: "Descubra uma seleção de sushi contemporâneo criada para partilhar à mesa.",
    backHome: "Voltar ao início",
    pricingTitle: "Preços",
    pricingSubtitle: "À la carte · All you can eat",
    weekday: "Segunda — Sexta",
    weekend: "Sábados, Domingos e Feriados",
    lunch: "Almoço",
    dinner: "Jantar",
    kids: "Crianças (4–9 anos)",
    adults: "Adultos",
    perPerson: "por pessoa",
    vat: "Preços com IVA incluído.",
    infoEyebrow: "Visite-nos",
    infoTitle: "À sua espera.",
    address: "Morada",
    addressText: "Av. Columbano Bordalo Pinheiro 91B, 1070-062 Lisboa",
    hours: "Horário",
    hoursText: "Todos os dias · 12:00–15:00 · 19:00–23:00",
    contact: "Contacto",
    contactText: "927 372 099",
    infoAside: "Sushi contemporâneo, servido num espaço desenhado para ficar na memória.",
    footerNav: "Navegação",
    legal: "Legal",
    privacy: "Política de Privacidade",
    complaints: "Livro de Reclamações",
    reservations: "Reservas",
  },
  en: {
    navHome: "Home",
    navSpace: "The Space",
    navMenu: "Menu",
    navInfo: "Information",
    navReserve: "Reserve",
    reserveTable: "Reserve a Table",
    scroll: "Discover",
    spaceTitle: "The Space",
    spaceBody: "Where light, texture and gastronomy come together.",
    spaceNote: "Immersive architecture. Warm light. A dining experience that begins before the first dish.",
    menuTitle: "Our Menu",
    menuBody: "A selection created to discover, share and enjoy again.",
    fullMenu: "View Full Menu",
    drag: "Drag",
    menuPageEyebrow: "Friendship Sushi · Lisbon",
    menuPageTitle: "Full Menu",
    menuPageBody: "Discover a contemporary sushi selection created to share at the table.",
    backHome: "Back to home",
    pricingTitle: "Pricing",
    pricingSubtitle: "À la carte · All you can eat",
    weekday: "Monday — Friday",
    weekend: "Saturdays, Sundays & Holidays",
    lunch: "Lunch",
    dinner: "Dinner",
    kids: "Children (4–9 years)",
    adults: "Adults",
    perPerson: "per person",
    vat: "Prices include VAT.",
    infoEyebrow: "Visit us",
    infoTitle: "Your table awaits.",
    address: "Address",
    addressText: "Av. Columbano Bordalo Pinheiro 91B, 1070-062 Lisbon",
    hours: "Opening Hours",
    hoursText: "Every day · 12:00–15:00 · 19:00–23:00",
    contact: "Contact",
    contactText: "927 372 099",
    infoAside: "Contemporary sushi, served in a space designed to stay with you.",
    footerNav: "Navigation",
    legal: "Legal",
    privacy: "Privacy Policy",
    complaints: "Complaints Book",
    reservations: "Reservations",
  },
} as const;

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (typeof copy)[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");
  const value = useMemo(() => ({ language, setLanguage, t: copy[language] }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
