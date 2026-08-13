import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import MenuPageContent from "@/components/MenuPageContent";
import Navbar from "@/components/Navbar";

export default function MenuPage() {
  return (
    <LanguageProvider>
      <Navbar />
      <main><MenuPageContent /></main>
      <Footer />
    </LanguageProvider>
  );
}
