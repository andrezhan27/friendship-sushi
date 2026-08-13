import type { Metadata } from "next";
import { restaurantInfo } from "@/lib/restaurant-info";

export const metadata: Metadata = {
  title: "Reservar Mesa | Friendship Sushi",
  description: "Reserve a sua mesa no Friendship Sushi, Lisboa.",
};

export default function ReservationsPage() {
  return (
    <main className="reservation-page">
      <iframe
        className="reservation-widget"
        loading="eager"
        src={restaurantInfo.reservationWidgetUrl}
        title="Friendship Sushi"
      />
    </main>
  );
}
