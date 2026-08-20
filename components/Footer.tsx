import FooterContent from "./FooterContent";
import { getRestaurantLegalLinks } from "@/lib/restaurant-legal-links";

export default async function Footer() {
  const legalLinks = await getRestaurantLegalLinks();

  return <FooterContent legalLinks={legalLinks} />;
}
