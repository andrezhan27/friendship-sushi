import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import InfoSection from "@/components/InfoSection";
import { LanguageProvider } from "@/components/LanguageProvider";
import MenuCarousel from "@/components/MenuCarousel";
import Navbar from "@/components/Navbar";
import SpaceSection from "@/components/SpaceSection";

export default function Home() {
  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <Hero />
        <SpaceSection />
        <MenuCarousel />
        <InfoSection />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
