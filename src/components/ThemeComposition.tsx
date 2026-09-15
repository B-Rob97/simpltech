"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useTheme } from "@/components/ThemeProvider";
import type { ThemeId } from "@/lib/themes";
import MissionControl from "@/components/mission/MissionControl";

type Section = "work" | "services" | "approach" | "about" | "pricing" | "contact";
const sequences: Record<ThemeId, Section[]> = {
  "mission-control": ["work", "services", "approach", "about", "pricing", "contact"],
  "night-signal": ["work", "services", "approach", "about", "pricing", "contact"],
  cupertino: ["services", "work", "pricing", "approach", "about", "contact"],
  editorial: ["work", "about", "services", "approach", "pricing", "contact"],
  swiss: ["services", "work", "approach", "pricing", "about", "contact"],
  "soft-product": ["services", "approach", "work", "pricing", "about", "contact"],
  brutalist: ["work", "pricing", "services", "approach", "about", "contact"],
  "warm-craft": ["about", "work", "approach", "services", "pricing", "contact"],
  "neon-club": ["work", "services", "pricing", "about", "approach", "contact"],
  newsprint: ["work", "services", "about", "pricing", "approach", "contact"],
  playground: ["work", "services", "about", "approach", "pricing", "contact"],
};

// Server-rendered content stays shared; the reading order changes with the design.
export function ThemeComposition({ hero, sections }: { hero: ReactNode; sections: Record<Section, ReactNode> }) {
  const { theme } = useTheme();
  const previousTheme = useRef(theme.id);
  useEffect(() => {
    if (previousTheme.current === theme.id) return;
    previousTheme.current = theme.id;
    // A new composition can move the current section by several screens.
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [theme.id]);
  if (theme.id === "mission-control") return <MissionControl />;
  return <div className={`theme-composition composition-${theme.id}`}>
    {hero}
    <div className="theme-sections">
      {sequences[theme.id].map((id) => <div className={`theme-section-slot slot-${id}`} key={id}>{sections[id]}</div>)}
    </div>
  </div>;
}
