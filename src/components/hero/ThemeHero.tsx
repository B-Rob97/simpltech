"use client";

import {
  useMotionValueEvent,
  useScroll
} from "motion/react";
import { useLayoutEffect, useRef, type RefObject } from "react";
import Image from "next/image";
import {
  CraftDust,
  CraftPlaten,
  CraftSheetPlate,
  CraftStamp,
  CraftSunshaft,
  CraftTape,
} from "@/components/craft/CraftStudioMarks";
import { CupertinoHero } from "@/components/cupertino/CupertinoHero";
import { BrutalistHero } from "@/components/hero/BrutalistHero";
import { EditorialIssue } from "@/components/hero/EditorialIssue";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { NeonClubHero } from "@/components/hero/NeonClubHero";
import { NewsprintHero } from "@/components/hero/NewsprintHero";
import { NightSignalHero } from "@/components/hero/NightSignalHero";
import { PlaygroundCollage } from "@/components/hero/PlaygroundCollage";
import { QuietField } from "@/components/hero/QuietField";
import { SwissRegister } from "@/components/hero/SwissRegister";
import { useTheme } from "@/components/ThemeProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type ThemeHeroProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function ThemeHero({ sectionRef }: ThemeHeroProps) {
  const { theme } = useTheme();

  switch (theme.id) {
    case "mission-control":
      // Mission Control renders its own complete page composition.
      return null;
    case "night-signal":
      return <NightSignalHero sectionRef={sectionRef} />;
    case "cupertino":
      return <CupertinoLayout />;
    case "editorial":
      return <EditorialIssue sectionRef={sectionRef} />;
    case "swiss":
      return <SwissRegister />;
    case "soft-product":
      return <SoftProductLayout />;
    case "brutalist":
      return <BrutalistHero />;
    case "warm-craft":
      return <WarmCraftLayout sectionRef={sectionRef} />;
    case "neon-club":
      return <NeonClubHero sectionRef={sectionRef} />;
    case "newsprint":
      return <NewsprintHero sectionRef={sectionRef} />;
    case "playground":
      return <PlaygroundLayout />;
    case "quiet":
      return <QuietField />;
    default: {
      const _exhaustive: never = theme.id;
      return _exhaustive;
    }
  }
}

function CupertinoLayout() {
  return <CupertinoHero />;
}

function SoftProductLayout() {
  // Workspace pin and live dashboard live in SoftProductWorkspace.
  return null;
}

function craftSmoothstep(start: number, end: number, value: number) {
  if (value <= start) return 0;
  if (value >= end) return 1;
  const t = (value - start) / (end - start);
  return t * t * (3 - 2 * t);
}

function WarmCraftLayout({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const applyCraftPull = (value: number) => {
    const node = coverRef.current;
    if (!node || reduceMotion) return;

    // Pin-length map: platen travels the first half, the sheet pulls the second.
    const press =
      craftSmoothstep(0.08, 0.36, value) * (1 - craftSmoothstep(0.46, 0.62, value));
    const grow = craftSmoothstep(0.42, 0.94, value);
    const dolly = craftSmoothstep(0, 0.9, value);

    node.style.setProperty("--craft-press", press.toFixed(4));
    node.style.setProperty("--craft-grow", grow.toFixed(4));
    node.style.setProperty("--craft-dolly", dolly.toFixed(4));
  };

  useLayoutEffect(() => {
    applyCraftPull(scrollYProgress.get());
  }, [scrollYProgress, reduceMotion]);

  useMotionValueEvent(scrollYProgress, "change", applyCraftPull);

  return (
    <div className="craft-cover" ref={coverRef}>
      <div className="craft-photograph-frame">
        <Image
          className="craft-photograph"
          src="/themes/craft-studio.webp"
          alt="Sunlit oak desk with a laptop, sketches, and a terracotta vase"
          fill
          sizes="100vw"
          preload
        />
      </div>
      <CraftSunshaft />
      {reduceMotion ? null : <CraftDust />}
      <div className="craft-letter">
        {reduceMotion ? null : <CraftPlaten />}
        <CraftTape />
        <div className="craft-letter-blot" aria-hidden />
        <CraftStamp />
        <p className="font-[family-name:var(--font-display)] italic text-foreground/60">
          A Calgary studio
        </p>
        <HeroCopy
          className="mt-4"
          headingClassName="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.14] tracking-[-0.02em] text-foreground"
          bodyClassName="mt-5 max-w-md text-base leading-relaxed text-foreground/70"
        />
        <HeroActions
          primaryClassName="rounded-[0.2rem] bg-[color:var(--volt)] px-6 py-3 text-sm font-semibold text-[color:var(--accent-ink)]"
          secondaryClassName="rounded-[0.2rem] border border-foreground/20 px-6 py-3 text-sm font-semibold text-foreground"
        />
        <div className="craft-pulled-print">
          <p className="craft-pulled-kicker">The pulled print</p>
          <p className="craft-pulled-headline">
            Calgary-based. Startup-obsessed.
          </p>
          <p className="craft-pulled-body">
            The studio letter becomes the next page — About is already on the
            sheet.
          </p>
        </div>
        <CraftSheetPlate />
        <p className="craft-signature">Made with care. Built in Calgary.</p>
      </div>
      <span className="craft-photo-label">The art of making things work.</span>
      <div className="craft-deckle" aria-hidden />
    </div>
  );
}

function PlaygroundLayout() {
  return <PlaygroundCollage />;
}
