export type Project = {
  id: string;
  name: string;
  summary: string;
  tags: string[];
  href?: string;
  privateNote?: string;
};

export const projects: Project[] = [
  {
    id: "revolution-drilling",
    name: "Revolution Drilling",
    summary:
      "A custom marketing site for a Grande Prairie transmission-line drilling contractor — services, equipment, project case studies, and careers, rebuilt from Wix.",
    tags: ["Next.js", "Industrial", "Brand site"],
    href: "https://www.revolution-drilling.com",
  },
  {
    id: "evolving-prowess",
    name: "Evolving Prowess",
    summary:
      "Custom Shopify theme work for an inclusive Calgary activewear brand — product storytelling, storefront polish, and conversion-minded UX.",
    tags: ["Shopify", "E-commerce", "Theme"],
    href: "https://evolvingprowess.ca",
  },
  {
    id: "prism",
    name: "Prism",
    summary:
      "A multi-portal construction operations platform spanning web dashboards and field apps — role-based workflows for management, QC, safety, and equipment teams.",
    tags: ["Platform", "Internal tools", "Mobile + web"],
    privateNote: "Private engagement — details intentionally limited.",
  },
  {
    id: "deep-set",
    name: "Deep Set Anchors",
    summary:
      "A modern service and rentals site for an Alberta oilfield anchoring company — public pages plus a lightweight admin portal for inventory.",
    tags: ["Next.js", "Operations", "SMB"],
    href: "https://deepset.vercel.app/",
  },
  {
    id: "network-travel",
    name: "The Network Travel Agency",
    summary:
      "Boutique travel marketing site for destination weddings and honeymoons — bilingual content, booking CTAs, and SEO-ready destination pages.",
    tags: ["Next.js", "Travel", "SEO"],
    href: "https://nta-seven.vercel.app/",
  },
  {
    id: "corn-crush",
    name: "Corn Crush",
    summary:
      "A bold, brand-forward restaurant site for a Calgary corn-cup concept — menu, location, and a playful experience that matches the product.",
    tags: ["Next.js", "Hospitality", "Brand site"],
    href: "https://www.corncrush.ca",
  },
];

export const services = [
  {
    title: "Marketing sites that convert",
    description:
      "Landing pages and company sites with clear positioning, fast load times, and CTAs that turn traffic into conversations.",
  },
  {
    title: "Prototypes and custom builds",
    description:
      "Need to prove a brand-new idea? We prototype fast — including phone apps and clickable product demos — and when it's time for fully customized code from the ground up, we ship production-ready builds at the same pace.",
  },
  {
    title: "Product and web apps",
    description:
      "Customer portals, admin tools, and lightweight SaaS fronts — built to ship, iterate, and scale with your business.",
  },
  {
    title: "Website builders and platforms",
    description:
      "Already on Webflow, Framer, or another builder? We extend and polish what you have. For e-commerce, Shopify is usually the smarter call — and we customize themes and storefront UX without slowing checkout.",
  },
  {
    title: "SEO foundations",
    description:
      "Technical SEO from day one: metadata, structured data, sitemaps, performance, and content structure search engines can actually use.",
  },
] as const;
