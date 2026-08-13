import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://friendshipsushi.pt"),
  title: "Friendship Sushi | Lisboa",
  description:
    "Uma experiência de sushi contemporânea num espaço arquitetónico único em Lisboa.",
  openGraph: {
    title: "Friendship Sushi | Lisboa",
    description: "Sushi · À La Carte · Lisboa",
    images: [{ url: "/images/hero-desktop.webp", width: 1448, height: 1086 }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
