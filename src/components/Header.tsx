"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useBrandMorph } from "@/components/BrandMorphContext";
import { CalendlyButton } from "@/components/CalendlyButton";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ThemeWordmark } from "@/components/ThemeWordmark";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const { morphProgress } = useBrandMorph();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-300 ${
        scrolled || morphProgress > 0.35
          ? "border-b border-foreground/10 bg-[color:var(--background)]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[var(--content-max)] items-center justify-between gap-3 px-5 sm:h-20 sm:px-8">
        <Link
          href="/"
          className="shrink-0 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-foreground sm:text-xl"
        >
          <ThemeWordmark />
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-foreground/75 min-[1100px]:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <ThemeSwitcher />
          <button
            type="button"
            className="site-menu-button inline-flex items-center rounded-[var(--radius-button)] border-[length:var(--border-width)] border-foreground/15 bg-foreground/5 px-2.5 py-1.5 text-sm font-semibold text-foreground min-[1100px]:hidden"
            aria-expanded={menuOpen}
            aria-controls="site-section-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
          <CalendlyButton className="rounded-[var(--radius-button)] bg-[color:var(--volt)] px-3 py-2 text-sm font-semibold text-[color:var(--accent-ink)] transition-transform hover:-translate-y-0.5 max-[439px]:hidden sm:px-4">
            Start a project
          </CalendlyButton>
        </div>
      </div>
      {menuOpen ? (
        <div id="site-section-menu" className="site-section-menu min-[1100px]:hidden">
          <nav className="grid" aria-label="Sections">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <CalendlyButton className="mt-2 hidden w-full justify-center rounded-[var(--radius-button)] bg-[color:var(--volt)] px-3 py-3 text-sm font-semibold text-[color:var(--accent-ink)] max-[439px]:inline-flex">
            Start a project
          </CalendlyButton>
        </div>
      ) : null}
    </header>
  );
}
