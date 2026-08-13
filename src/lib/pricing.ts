export type PricingPackage = {
  id: string;
  name: string;
  bestFor: string;
  price: number;
  priceLabel: string;
  featured?: boolean;
  includes: readonly string[];
};

export type CarePlan = {
  name: string;
  price: number;
  priceLabel: string;
  period: string;
  includes: readonly string[];
};

/** Floor price shown in the pricing intro counter. */
export const pricingFloor = 1490;

export const pricingPackages: readonly PricingPackage[] = [
  {
    id: "launch",
    name: "Local Launch",
    bestFor: "Best for service pros & trades",
    price: 1490,
    priceLabel: "$1,490",
    includes: [
      "Custom 3-page website (no templates)",
      "Mobile-responsive design",
      "Basic on-page SEO",
      "Google Business Profile setup",
      "Secure contact form",
      "Business email — 1GB",
      "Domain purchase included",
      "Year-one hosting & SSL included",
      "Built in under a week",
      "1-on-1 handoff training",
    ],
  },
  {
    id: "growth",
    name: "Business Growth",
    bestFor: "Best for growing brands & professional firms",
    price: 2190,
    priceLabel: "$2,190",
    featured: true,
    includes: [
      "Custom 5-page website (no templates)",
      "Mobile-responsive design",
      "On-page SEO tuned for local search",
      "Google Business Profile setup",
      "Secure contact form",
      "Business email — 3GB",
      "Domain purchase included",
      "Year-one hosting & SSL included",
      "Built in under a week",
      "1-on-1 handoff training",
    ],
  },
  {
    id: "store",
    name: "Store Power",
    bestFor: "Best for retail & online shops",
    price: 2890,
    priceLabel: "$2,890",
    includes: [
      "Full online store setup (Shopify)",
      "Inventory & shipping configuration",
      "Secure payment gateway integration",
      "Customer account dashboard",
      "Sales analytics integration",
      "Advanced product SEO",
      "Mobile-responsive design",
      "Google Business Profile setup",
      "Secure contact form",
      "Business email — 5GB",
      "Domain purchase included",
      "1-on-1 handoff training",
    ],
  },
] as const;

export const carePlan: CarePlan = {
  name: "Steady Care",
  price: 99,
  priceLabel: "$99",
  period: "per year",
  includes: [
    "Hosting — 40GB storage",
    "SSL security",
    "Daily backups",
    "Monthly updates",
    "Monthly 45 minutes of content edits",
  ],
};
