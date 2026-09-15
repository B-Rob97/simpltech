"use client";

import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useLayoutEffect, useRef, type RefObject } from "react";
import Image from "next/image";
import {
  CraftDust,
  CraftPlaten,
  CraftStamp,
  CraftSunshaft,
  CraftTape,
} from "@/components/craft/CraftStudioMarks";
import { CupertinoHero } from "@/components/cupertino/CupertinoHero";
import { BrutalistHero } from "@/components/hero/BrutalistHero";
import { EditorialIssue } from "@/components/hero/EditorialIssue";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { PlayCollageMark } from "@/components/hero/HeroMarks";
import { NeonClubHero } from "@/components/hero/NeonClubHero";
import { NewsprintHero } from "@/components/hero/NewsprintHero";
import { NightSignalHero } from "@/components/hero/NightSignalHero";
import { SwissRegister } from "@/components/hero/SwissRegister";
import { useTheme } from "@/components/ThemeProvider";

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

function WarmCraftLayout({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const coverRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const applyCraftPull = (value: number) => {
    const node = coverRef.current;
    if (!node || reduceMotion) return;

    const press =
      value < 0.05
        ? 0
        : value < 0.14
          ? (value - 0.05) / 0.09
          : value < 0.24
            ? 1
            : value < 0.36
              ? 1 - (value - 0.24) / 0.12
              : 0;
    const grow = value < 0.38 ? 0 : value > 0.9 ? 1 : (value - 0.38) / 0.52;
    const dolly =
      value < 0.22
        ? (value / 0.22) * 0.12
        : 0.12 + Math.min(1, (value - 0.22) / 0.6) * 0.88;

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
          alt="Sunlit oak desk with a laptop, terracotta vase, and sketches"
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
        <p className="craft-signature">Made with care. Built in Calgary.</p>
      </div>
      <span className="craft-photo-label">The art of making things work.</span>
      <div className="craft-deckle" aria-hidden />
    </div>
  );
}

function PlaygroundLayout() {
  return (
    <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[var(--content-max)] flex-col justify-center px-5 pb-16 pt-28 sm:px-8">
      <div className="relative">
        <PlayCollageMark />
        <div className="relative z-10 -mt-8 max-w-xl rounded-[1.6rem] border-[3px] border-foreground bg-elevated p-6 sm:-mt-16 sm:p-8">
          <HeroCopy
            headingClassName="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-tight text-foreground"
            bodyClassName="mt-4 text-base leading-relaxed text-foreground/70"
          />
          <HeroActions />
        </div>
      </div>
    </div>
  );
}
