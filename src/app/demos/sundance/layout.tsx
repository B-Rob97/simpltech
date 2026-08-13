import type { Metadata } from "next";
import { Cormorant_Garamond, Figtree } from "next/font/google";
import "./sundance.css";

const display = Cormorant_Garamond({
  variable: "--font-sundance-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Figtree({
  variable: "--font-sundance-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    absolute: "Min's Sun Dance Massage — Concept Demo",
  },
  description:
    "A concept redesign for Min's Sun Dance Massage in Calgary — two clinics, registered therapists, and the same Acuity booking she already uses.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SundanceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${display.variable} ${body.variable} sundance-root flex-1`}>
      {children}
    </div>
  );
}
