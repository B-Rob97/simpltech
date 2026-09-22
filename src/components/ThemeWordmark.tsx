"use client";

import { useTheme } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/site";

type ThemeWordmarkProps = {
  className?: string;
};

export function ThemeWordmark({ className = "" }: ThemeWordmarkProps) {
  const { theme } = useTheme();
  const name = siteConfig.name;

  switch (theme.id) {
    case "mission-control":
      return <span className={`${className} mission-wordmark`}><span aria-hidden>✳</span> SimplTech<span className="mission-wordmark-plus" aria-hidden>®</span></span>;
    case "night-signal":
      return (
        <span className={`night-wordmark ${className}`}>
          {name}
          <span className="night-wordmark-volt" aria-hidden>
            .
          </span>
        </span>
      );
    case "cupertino":
      return <span className={`${className} font-medium`}>{name}</span>;
    case "editorial":
      return <span className={`${className} italic`}>{name}</span>;
    case "swiss":
      return (
        <span
          className={`${className} text-[0.72em] font-bold uppercase tracking-[0.22em]`}
        >
          {name}
        </span>
      );
    case "soft-product":
      return (
        <span className={`${className} soft-product-wordmark`}>
          <span className="soft-product-app-mark" aria-hidden>
            <span />
          </span>
          {name}
        </span>
      );
    case "brutalist":
      return <span className={`${className} brutal-wordmark`}>{name.toLowerCase()}</span>;
    case "warm-craft":
      return <span className={`${className} italic`}>{name}</span>;
    case "neon-club":
      return (
        <span className={className}>
          {name}
          <span className="text-[color:var(--signal)]">/</span>
        </span>
      );
    case "newsprint":
      return (
        <span
          className={`${className} text-[0.7em] uppercase tracking-[0.16em]`}
        >
          The {name}
        </span>
      );
    case "playground":
      return <span className={`${className} playground-wordmark lowercase`}>{name}</span>;
    case "quiet":
      return <span className={`${className} font-normal tracking-[0.04em]`}>{name}</span>;
    default: {
      const _exhaustive: never = theme.id;
      return _exhaustive;
    }
  }
}
