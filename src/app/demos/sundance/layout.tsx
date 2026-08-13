import type { Metadata } from "next";
import "./sundance.css";

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
    <div className="sundance-root flex-1">
      {children}
    </div>
  );
}
