import "server-only";

import { restaurantInfo } from "./restaurant-info";

export type RestaurantLegalLinks = {
  privacyPolicyUrl: string | null;
  termsAndConditionsUrl: string | null;
};

type RestaurantLegalLinksRow = {
  privacy_policy_url: unknown;
  terms_and_conditions_url: unknown;
};

const emptyLegalLinks: RestaurantLegalLinks = {
  privacyPolicyUrl: null,
  termsAndConditionsUrl: null,
};

function normalizePublicUrl(value: unknown) {
  if (typeof value !== "string" || !value.trim()) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function getRestaurantLegalLinks(): Promise<RestaurantLegalLinks> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) return emptyLegalLinks;

  const query = new URLSearchParams({
    id: `eq.${restaurantInfo.databaseId}`,
    select: "privacy_policy_url,terms_and_conditions_url",
    limit: "1",
  });

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/restaurants?${query}`, {
      headers: {
        apikey: supabasePublishableKey,
        Authorization: `Bearer ${supabasePublishableKey}`,
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.error(`Unable to load restaurant legal links: ${response.status}`);
      return emptyLegalLinks;
    }

    const rows = (await response.json()) as RestaurantLegalLinksRow[];
    const restaurant = rows[0];

    if (!restaurant) return emptyLegalLinks;

    return {
      privacyPolicyUrl: normalizePublicUrl(restaurant.privacy_policy_url),
      termsAndConditionsUrl: normalizePublicUrl(restaurant.terms_and_conditions_url),
    };
  } catch (error) {
    console.error("Unable to load restaurant legal links", error);
    return emptyLegalLinks;
  }
}
