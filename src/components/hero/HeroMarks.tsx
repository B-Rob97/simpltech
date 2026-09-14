"use client";

import { useId } from "react";
import { siteConfig } from "@/lib/site";

export function LaptopMark() {
  const id = useId();
  const screen = `${id}-screen`;
  const shadow = `${id}-shadow`;

  return (
    <svg
      viewBox="0 0 720 400"
      className="h-auto w-full"
      role="img"
      aria-label="Laptop showing a product homepage"
    >
      <defs>
        <linearGradient id={screen} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbfbfd" />
          <stop offset="100%" stopColor="#eef0f4" />
        </linearGradient>
        <radialGradient id={shadow} cx="50%" cy="100%" r="50%">
          <stop offset="0%" stopColor="rgba(0,0,0,0.2)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="360" cy="388" rx="240" ry="12" fill={`url(#${shadow})`} />
      <rect x="118" y="8" width="484" height="292" rx="16" fill="#c8cad0" />
      <rect x="132" y="20" width="456" height="266" rx="6" fill={`url(#${screen})`} />
      <rect x="148" y="34" width="56" height="6" rx="3" fill="#1d1d1f" />
      <rect x="216" y="36" width="22" height="3" rx="1.5" fill="#d2d2d7" />
      <rect x="246" y="36" width="22" height="3" rx="1.5" fill="#d2d2d7" />
      <circle cx="360" cy="128" r="44" fill="#e8e8ed" />
      <circle cx="360" cy="128" r="26" fill="#1d1d1f" />
      <rect x="268" y="196" width="184" height="8" rx="4" fill="#1d1d1f" />
      <rect x="298" y="214" width="124" height="5" rx="2.5" fill="#c7c7cc" />
      <rect x="328" y="234" width="64" height="18" rx="9" fill="#1d1d1f" />
      <path d="M96 300 H 624 L 700 348 H 20 Z" fill="#b4b6bc" />
      <rect x="20" y="348" width="680" height="22" rx="6" fill="#9ea1a8" />
      <rect x="292" y="354" width="136" height="8" rx="4" fill="#868990" />
    </svg>
  );
}

export function ProductWindowMark() {
  return (
    <svg
      viewBox="0 0 560 360"
      className="h-auto w-full"
      role="img"
      aria-label="Product dashboard window"
    >
      <rect
        x="8"
        y="8"
        width="544"
        height="344"
        rx="16"
        fill="var(--elevated)"
        stroke="color-mix(in oklab, var(--foreground) 10%, transparent)"
      />
      <rect x="8" y="8" width="544" height="36" rx="16" fill="color-mix(in oklab, var(--foreground) 4%, var(--elevated))" />
      <rect x="8" y="28" width="544" height="16" fill="color-mix(in oklab, var(--foreground) 4%, var(--elevated))" />
      <circle cx="28" cy="26" r="5" fill="#ff5f57" />
      <circle cx="46" cy="26" r="5" fill="#febc2e" />
      <circle cx="64" cy="26" r="5" fill="#28c840" />
      <rect x="86" y="20" width="180" height="12" rx="6" fill="color-mix(in oklab, var(--foreground) 8%, transparent)" />
      <rect x="24" y="60" width="120" height="276" rx="10" fill="color-mix(in oklab, var(--foreground) 4%, transparent)" />
      <rect x="40" y="80" width="72" height="8" rx="4" fill="var(--accent)" />
      <rect x="40" y="104" width="88" height="6" rx="3" fill="color-mix(in oklab, var(--foreground) 22%, transparent)" />
      <rect x="40" y="124" width="76" height="6" rx="3" fill="color-mix(in oklab, var(--foreground) 16%, transparent)" />
      <rect x="40" y="144" width="84" height="6" rx="3" fill="color-mix(in oklab, var(--foreground) 16%, transparent)" />
      <rect x="160" y="60" width="112" height="88" rx="12" fill="color-mix(in oklab, var(--accent) 10%, var(--elevated))" />
      <rect x="284" y="60" width="112" height="88" rx="12" fill="color-mix(in oklab, var(--foreground) 4%, var(--elevated))" />
      <rect x="408" y="60" width="128" height="88" rx="12" fill="color-mix(in oklab, var(--foreground) 4%, var(--elevated))" />
      <rect x="176" y="76" width="48" height="6" rx="3" fill="color-mix(in oklab, var(--foreground) 35%, transparent)" />
      <rect x="176" y="96" width="72" height="18" rx="4" fill="var(--accent)" />
      <rect x="300" y="76" width="48" height="6" rx="3" fill="color-mix(in oklab, var(--foreground) 35%, transparent)" />
      <rect x="300" y="96" width="56" height="18" rx="4" fill="var(--foreground)" />
      <rect x="424" y="76" width="48" height="6" rx="3" fill="color-mix(in oklab, var(--foreground) 35%, transparent)" />
      <rect x="424" y="96" width="64" height="18" rx="4" fill="var(--foreground)" />
      <path
        d="M176 214 C 220 214, 230 268, 280 250 C 330 232, 350 190, 400 206 C 450 222, 470 248, 520 230"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="160" y="280" width="376" height="56" rx="12" fill="color-mix(in oklab, var(--foreground) 4%, var(--elevated))" />
    </svg>
  );
}

export function MagazineStillLife() {
  return (
    <svg
      viewBox="0 0 360 420"
      className="h-auto w-full"
      role="img"
      aria-label="Magazine still life with ink, seal, and folio"
    >
      <rect
        x="18"
        y="18"
        width="324"
        height="384"
        fill="var(--elevated)"
        stroke="var(--foreground)"
        strokeWidth="1"
      />
      <line
        x1="42"
        y1="48"
        x2="318"
        y2="48"
        stroke="var(--foreground)"
        strokeWidth="0.75"
      />
      <text
        x="42"
        y="78"
        fill="var(--accent)"
        fontSize="11"
        letterSpacing="3"
        fontFamily="var(--font-display), serif"
      >
        FOLIO
      </text>
      <path
        d="M86 300 C 70 220, 90 150, 150 128 C 210 108, 250 150, 238 210 C 226 268, 170 300, 86 300 Z"
        fill="var(--accent)"
      />
      <ellipse cx="168" cy="214" rx="34" ry="22" fill="var(--elevated)" />
      <rect x="210" y="248" width="88" height="118" fill="color-mix(in oklab, var(--foreground) 8%, var(--elevated))" stroke="var(--foreground)" />
      <line x1="222" y1="268" x2="286" y2="268" stroke="var(--foreground)" />
      <line x1="222" y1="284" x2="274" y2="284" stroke="var(--foreground)" />
      <line x1="222" y1="300" x2="280" y2="300" stroke="var(--foreground)" />
      <circle cx="86" cy="338" r="22" fill="none" stroke="var(--accent)" strokeWidth="3" />
      <text
        x="77"
        y="344"
        fill="var(--accent)"
        fontSize="14"
        fontFamily="var(--font-display), serif"
      >
        S
      </text>
    </svg>
  );
}

export function SwissPosterMark() {
  return (
    <svg
      viewBox="0 0 420 420"
      className="h-auto w-full"
      role="img"
      aria-label="International Style poster with a modular four"
    >
      <rect width="420" height="420" fill="transparent" />
      <text
        x="8"
        y="280"
        fill="var(--foreground)"
        fontSize="240"
        fontWeight="700"
        fontFamily="var(--font-grotesque), sans-serif"
        letterSpacing="-12"
      >
        04
      </text>
      <rect x="292" y="36" width="92" height="92" fill="var(--accent)" />
      <text
        x="12"
        y="400"
        fill="var(--foreground)"
        fontSize="14"
        fontWeight="700"
        letterSpacing="6"
        fontFamily="var(--font-grotesque), sans-serif"
      >
        INTL · YYC
      </text>
    </svg>
  );
}

export function BrutalMark() {
  return (
    <svg
      viewBox="0 0 280 120"
      className="h-auto w-full"
      role="img"
      aria-label="Barcode and industrial stamp"
    >
      <rect x="0" y="0" width="280" height="16" fill="var(--foreground)" />
      {Array.from({ length: 28 }, (_, index) => (
        <rect
          key={index}
          x={8 + index * 8}
          y="32"
          width={index % 4 === 0 ? 2 : 4}
          height="52"
          fill="var(--foreground)"
        />
      ))}
      <text
        x="8"
        y="108"
        fill="var(--foreground)"
        fontSize="11"
        letterSpacing="3"
        fontFamily="var(--font-mono), ui-monospace, monospace"
      >
        SITE-06 · {siteConfig.name.toUpperCase()}
      </text>
    </svg>
  );
}

export function CraftVesselMark() {
  return (
    <svg
      viewBox="0 0 320 400"
      className="h-auto w-full"
      role="img"
      aria-label="Studio vessel and letterpress stamp"
    >
      <ellipse
        cx="160"
        cy="372"
        rx="90"
        ry="12"
        fill="color-mix(in oklab, var(--foreground) 10%, transparent)"
      />
      <path
        d="M118 86 C 110 120, 96 190, 102 250 C 108 318, 212 318, 218 250 C 224 190, 210 120, 202 86 Z"
        fill="var(--accent)"
      />
      <path
        d="M124 86 C 132 70, 188 70, 196 86"
        fill="none"
        stroke="color-mix(in oklab, var(--accent-ink) 35%, var(--accent))"
        strokeWidth="6"
      />
      <ellipse
        cx="160"
        cy="88"
        rx="40"
        ry="10"
        fill="color-mix(in oklab, var(--accent-ink) 18%, var(--accent))"
      />
      <path
        d="M160 54 C 148 28, 168 12, 176 30 C 168 36, 166 48, 160 54 Z"
        fill="color-mix(in oklab, var(--foreground) 55%, #2f6b3a)"
      />
      <rect
        x="214"
        y="288"
        width="86"
        height="54"
        fill="none"
        stroke="var(--foreground)"
        strokeWidth="1.5"
      />
      <text
        x="226"
        y="312"
        fill="var(--foreground)"
        fontSize="10"
        fontFamily="var(--font-serif), serif"
      >
        STUDIO
      </text>
      <text
        x="226"
        y="328"
        fill="var(--foreground)"
        fontSize="10"
        fontFamily="var(--font-serif), serif"
      >
        STAMP
      </text>
    </svg>
  );
}

export function NeonSignMark() {
  return (
    <p className="hero-neon-sign" aria-hidden>
      SIMPLTECH
    </p>
  );
}

export function NeonTicketMark() {
  return (
    <svg
      viewBox="0 0 220 120"
      className="h-auto w-full"
      role="img"
      aria-label="Nightclub ticket stub"
    >
      <path
        d="M8 8 H 212 V 112 H 8 Z"
        fill="color-mix(in oklab, var(--elevated) 80%, black)"
        stroke="var(--signal)"
        strokeWidth="2"
      />
      <path
        d="M70 8 V 112"
        stroke="var(--signal)"
        strokeDasharray="4 6"
      />
      <text
        x="82"
        y="40"
        fill="var(--foreground)"
        fontSize="11"
        letterSpacing="2"
        fontFamily="var(--font-grotesque), sans-serif"
      >
        ADMIT ONE
      </text>
      <text
        x="82"
        y="68"
        fill="var(--accent)"
        fontSize="16"
        fontFamily="var(--font-unbounded), sans-serif"
      >
        CLUB
      </text>
      <text
        x="82"
        y="92"
        fill="var(--signal)"
        fontSize="10"
        fontFamily="var(--font-mono), ui-monospace, monospace"
      >
        YYC · RM 02
      </text>
      <text
        x="18"
        y="72"
        fill="var(--signal)"
        fontSize="28"
        transform="rotate(-90 32 72)"
        fontFamily="var(--font-mono), ui-monospace, monospace"
      >
        08
      </text>
    </svg>
  );
}

export function NewsHalftoneMark() {
  const dots = Array.from({ length: 72 }, (_, index) => {
    const column = index % 8;
    const row = Math.floor(index / 8);
    return { cx: 18 + column * 16, cy: 18 + row * 16, r: 2.2 + ((column + row) % 3) };
  });

  return (
    <svg
      viewBox="0 0 150 180"
      className="h-auto w-full"
      role="img"
      aria-label="Halftone news photograph"
    >
      <rect
        x="2"
        y="2"
        width="146"
        height="176"
        fill="var(--elevated)"
        stroke="var(--foreground)"
      />
      {dots.map((dot) => (
        <circle
          key={`${dot.cx}-${dot.cy}`}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill="var(--foreground)"
        />
      ))}
    </svg>
  );
}

export function PlayCollageMark() {
  return (
    <svg
      viewBox="0 0 520 360"
      className="h-auto w-full"
      role="img"
      aria-label="Studio collage of stickers and tape"
    >
      <rect x="40" y="36" width="150" height="42" fill="#2f6bff" transform="rotate(-8 40 36)" />
      <rect x="300" y="20" width="160" height="24" fill="#ffe14a" transform="rotate(6 300 20)" />
      <circle cx="410" cy="150" r="58" fill="#ff4d1c" />
      <path d="M86 210 L 150 150 L 214 210 Z" fill="#2f6bff" />
      <rect
        x="180"
        y="188"
        width="170"
        height="110"
        fill="#fff"
        stroke="#17130a"
        strokeWidth="3"
        transform="rotate(-3 180 188)"
      />
      <text
        x="198"
        y="250"
        fill="#17130a"
        fontSize="28"
        fontWeight="700"
        fontFamily="var(--font-grotesque), sans-serif"
      >
        simpltech
      </text>
      <path
        d="M70 300 C 110 270, 170 320, 220 290"
        fill="none"
        stroke="#17130a"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="92" cy="88" r="18" fill="#ffe14a" />
    </svg>
  );
}
