"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SundanceLogo } from "@/components/sundance/SundanceLogo";
import { sundance } from "@/lib/sundance";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#rates", label: "Rates" },
  { href: "#locations", label: "Locations" },
  { href: "#visit", label: "Visit" },
] as const;

export function SundanceHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`transition-[background,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-b border-[color:var(--sand-deep)] bg-[color:var(--cream)]/92 shadow-[0_8px_30px_rgba(29,25,20,0.06)] backdrop-blur-xl"
          : "border-b border-transparent bg-[color:var(--cream)]/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <SundanceLogo className="h-10 w-10" />
          <span className="leading-tight">
            <span className="block font-[family-name:var(--font-sundance-display)] text-lg font-semibold tracking-wide text-[color:var(--ink)]">
              {sundance.name}
            </span>
            <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--ink-soft)]">
              Massage
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-[color:var(--ink-soft)] md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-[color:var(--ink)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={sundance.phoneHref}
            className="text-sm font-medium text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--ink)]"
          >
            {sundance.phoneDisplay}
          </a>
          <a
            href={sundance.bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[color:var(--sage)] px-4 py-2 text-sm font-semibold text-[color:var(--cream)] transition-transform hover:-translate-y-0.5"
          >
            Book online
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--sand-deep)] text-[color:var(--ink)] md:hidden"
          aria-expanded={open}
          aria-controls="sundance-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className="block h-px w-4 bg-current" />
            <span className="block h-px w-4 bg-current" />
          </span>
        </button>
      </div>

      {open ? (
        <div
          id="sundance-menu"
          className="border-t border-[color:var(--sand-deep)] bg-[color:var(--cream)] px-5 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-3 text-base">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="py-1 text-[color:var(--ink)]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a href={sundance.phoneHref} className="py-1 text-[color:var(--ink-soft)]">
              Call or text {sundance.phoneDisplay}
            </a>
            <a
              href={sundance.bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex justify-center rounded-full bg-[color:var(--sage)] px-4 py-2.5 text-sm font-semibold text-[color:var(--cream)]"
              onClick={() => setOpen(false)}
            >
              Book online
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export function SundanceDemoNote() {
  return (
    <p className="bg-[color:var(--sage-deep)] px-5 py-2 text-center text-xs tracking-wide text-[color:var(--cream)] sm:text-sm">
      Concept demo by{" "}
      <Link href="/" className="underline decoration-white/40 underline-offset-2">
        SimplTech
      </Link>
      {" · "}
      booking still uses her existing Acuity calendar
    </p>
  );
}
