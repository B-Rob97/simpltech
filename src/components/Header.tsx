"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useBrandMorph } from "@/components/BrandMorphContext";
import { CalendlyButton } from "@/components/CalendlyButton";
import { siteConfig } from "@/lib/site";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#about", label: "About" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { morphProgress } = useBrandMorph();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-300 ${
        scrolled || morphProgress > 0.35
          ? "border-b border-white/10 bg-[color:var(--ink)]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-white sm:text-xl"
        >
          {siteConfig.name}
          <span className="text-[color:var(--volt)]">.</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/75 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <CalendlyButton className="rounded-full bg-[color:var(--volt)] px-4 py-2 text-sm font-semibold text-[color:var(--ink)] transition-transform hover:-translate-y-0.5">
          Start a project
        </CalendlyButton>
      </div>
    </header>
  );
}
