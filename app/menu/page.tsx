import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import MenuPageContent from "@/components/MenuPageContent";
import Navbar from "@/components/Navbar";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

const imageFilePattern = /\.(?:avif|gif|jpe?g|png|webp)$/i;

const merchandisingOrder = [
  "DSC06100 copiar.webp",
  "DSC04520 copiar.webp",
  "DSC04517 copiar.webp",
  "DSC06071 copiar.webp",
  "DSC04580 copiar.webp",
  "DSC06095 copiar.webp",
  "DSC06091 copiar.webp",
  "DSC06106 copiar.webp",
  "DSC04628 copiar.webp",
  "DSC04616 copiar.webp",
  "DSC04637 copiar.webp",
  "DSC04610 copiar.webp",
  "DSC09230 copiar.webp",
  "DSC06242 copiar.webp",
  "DSC04509 copiar.webp",
  "DSC04499 copiar.webp",
  "DSC04501 copiar.webp",
  "DSC04597 copiar.webp",
  "DSC06174 copiar.webp",
  "DSC06211 copiar.webp",
  "DSC04542 copiar.webp",
  "DSC04527 copiar.webp",
  "DSC04540 copiar.webp",
  "DSC06120 copiar.webp",
  "DSC04486 copiar.webp",
  "DSC04490 copiar.webp",
  "DSC04562 copiar.webp",
  "DSC04564 copiar.webp",
  "DSC04552 copiar.webp",
  "DSC04569 copiar.webp",
  "DSC04574 copiar.webp",
  "DSC04579 copiar.webp",
  "DSC04640 copiar.webp",
  "DSC04604 copiar.webp",
  "DSC04621 copiar.webp",
  "DSC04547 copiar.webp",
] as const;

const merchandisingRank = new Map<string, number>(
  merchandisingOrder.map((fileName, index) => [fileName, index]),
);

export default async function MenuPage() {
  const menuImageDirectory = join(process.cwd(), "public", "menu", "menu-page");
  const menuImages = (await readdir(menuImageDirectory))
    .filter((fileName) => imageFilePattern.test(fileName))
    .sort((first, second) => {
      const firstRank = merchandisingRank.get(first) ?? Number.MAX_SAFE_INTEGER;
      const secondRank = merchandisingRank.get(second) ?? Number.MAX_SAFE_INTEGER;

      return firstRank - secondRank || first.localeCompare(second, undefined, { numeric: true });
    })
    .map((fileName) => `/menu/menu-page/${encodeURIComponent(fileName)}`);

  return (
    <LanguageProvider>
      <Navbar />
      <main><MenuPageContent images={menuImages} /></main>
      <Footer />
    </LanguageProvider>
  );
}
