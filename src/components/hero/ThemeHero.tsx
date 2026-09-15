"use client";

import { useReducedMotion } from "motion/react";
import { useState, type RefObject } from "react";
import Image from "next/image";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { CupertinoHero } from "@/components/cupertino/CupertinoHero";
import { NightSignalHero } from "@/components/hero/NightSignalHero";
import {
  BrutalMark,
  NeonSignMark,
  NeonTicketMark,
  NewsHalftoneMark,
  PlayCollageMark,
  ProductWindowMark,
  SwissPosterMark,
} from "@/components/hero/HeroMarks";
import { EditorialIssue } from "@/components/hero/EditorialIssue";
import { useTheme } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/site";

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
      return <SwissLayout />;
    case "soft-product":
      return <SoftProductLayout />;
    case "brutalist":
      return <BrutalistLayout />;
    case "warm-craft":
      return <WarmCraftLayout />;
    case "neon-club":
      return <NeonClubLayout />;
    case "newsprint":
      return <NewsprintLayout />;
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

function SwissLayout() {
  return (
    <div className="hero-swiss-page relative z-10 mx-auto grid min-h-[100svh] max-w-[var(--content-max)] grid-cols-1 items-center gap-8 px-5 pb-16 pt-28 sm:px-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div className="order-2 md:order-1">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:var(--accent)]">
          Design system 04
        </p>
        <HeroCopy
          className="mt-4"
          headingClassName="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,3.2rem)] font-bold uppercase leading-[0.95] tracking-[-0.06em] text-foreground"
          bodyClassName="mt-5 max-w-md text-sm leading-relaxed text-foreground/80 sm:text-base"
        />
        <HeroActions
          primaryClassName="rounded-none bg-[color:var(--volt)] px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[color:var(--accent-ink)]"
          secondaryClassName="rounded-none border border-foreground px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-foreground"
        />
      </div>
      <div className="order-1 md:order-2">
        <SwissPosterMark />
      </div>
    </div>
  );
}

function SoftProductLayout() {
  return (
    <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[var(--content-max)] items-center gap-10 px-5 pb-16 pt-28 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <div>
        <p className="inline-flex rounded-full border border-foreground/10 bg-elevated px-3 py-1 text-xs font-medium text-foreground/55">
          Product studio
        </p>
        <HeroCopy
          className="mt-6"
          headingClassName="font-[family-name:var(--font-display)] text-[clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-foreground"
          bodyClassName="mt-5 max-w-md text-base leading-relaxed text-foreground/65"
        />
        <HeroActions />
      </div>
      <div className="hero-product-window">
        <ProductWindowMark />
      </div>
    </div>
  );
}

function BrutalistLayout() {
  return (
    <div className="relative z-10 mx-auto min-h-[100svh] max-w-[var(--content-max)] px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
      <div className="hero-brutal-frame flex min-h-[calc(100svh-8rem)] flex-col justify-between p-5 sm:p-8">
        <div className="hero-brutal-tape" aria-hidden />
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.18em]">
          {siteConfig.legalName} · SITE 06
        </p>
        <HeroCopy
          className="max-w-4xl"
          headingClassName="font-[family-name:var(--font-mono)] text-[clamp(1.8rem,5vw,3.8rem)] font-bold uppercase leading-[0.95] text-foreground"
          bodyClassName="mt-6 max-w-xl text-sm leading-relaxed text-foreground sm:text-base"
        />
        <div className="grid gap-6 md:grid-cols-[1fr_220px] md:items-end">
          <HeroActions
            className="flex flex-wrap gap-3"
            primaryClassName="rounded-none bg-foreground px-5 py-3 font-[family-name:var(--font-mono)] text-sm uppercase text-[color:var(--accent-ink)]"
            secondaryClassName="rounded-none border-[3px] border-foreground px-5 py-3 font-[family-name:var(--font-mono)] text-sm uppercase text-foreground"
          />
          <BrutalMark />
        </div>
      </div>
    </div>
  );
}

function WarmCraftLayout() {
  return (
    <div className="craft-cover">
      <Image className="craft-photograph" src="/themes/craft-studio.webp" alt="Sunlit oak desk with a laptop, terracotta vase, and sketches" fill sizes="100vw" preload />
      <div className="craft-letter">
        <p className="font-[family-name:var(--font-display)] italic text-foreground/60">
          A Calgary studio
        </p>
        <HeroCopy
          className="mt-4"
          headingClassName="font-[family-name:var(--font-display)] text-[clamp(2.1rem,4.6vw,3.8rem)] font-medium leading-[1.12] text-foreground"
          bodyClassName="mt-5 max-w-md text-base leading-relaxed text-foreground/70"
        />
        <HeroActions
          primaryClassName="rounded-[0.2rem] bg-[color:var(--volt)] px-6 py-3 text-sm font-semibold text-[color:var(--accent-ink)]"
          secondaryClassName="rounded-[0.2rem] border border-foreground/20 px-6 py-3 text-sm font-semibold text-foreground"
        />
        <p className="craft-signature">Made with care. Built in Calgary.</p>
      </div>
      <span className="craft-photo-label">The art of making things work.</span>
    </div>
  );
}

function NeonClubLayout() {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  return (
    <div className="hero-neon-page relative z-10 mx-auto flex min-h-[100svh] max-w-[var(--content-max)] flex-col justify-center px-5 pb-16 pt-28 sm:px-8">
      <div className={`neon-tunnel ${paused || reduceMotion ? "is-paused" : ""}`} aria-hidden="true">
        {[0, 1, 2, 3, 4].map((frame) => <span key={frame} style={{ animationDelay: `${frame * -1.6}s` }} />)}
      </div>
      {!reduceMotion && <button type="button" className="neon-motion-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Play atmosphere" : "Pause atmosphere"}</button>}
      <div className="relative w-full">
        <NeonSignMark />
      </div>
      <div className="relative mt-8 grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_200px]">
        <div>
          <HeroCopy
            headingClassName="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-tight text-foreground"
            bodyClassName="mt-4 max-w-lg text-base leading-relaxed text-foreground/70"
          />
          <HeroActions />
        </div>
        <NeonTicketMark />
      </div>
    </div>
  );
}

function NewsprintLayout() {
  return (
    <div className="relative z-10 mx-auto min-h-[100svh] max-w-[var(--content-max)] px-5 pb-12 pt-24 sm:px-8 sm:pt-28">
      <div className="hero-news-frame p-4 sm:p-6">
        <p className="text-center text-[10px] uppercase tracking-[0.28em]">
          {siteConfig.location} · Monday morning edition · 25¢
        </p>
        <p className="mt-2 border-y-2 border-foreground py-2 text-center font-[family-name:var(--font-display)] text-[clamp(1.6rem,4.6vw,3rem)] font-bold uppercase leading-none tracking-tight">
          The {siteConfig.name}
        </p>
        <div className="mt-6 grid gap-6 border-t border-foreground pt-6 md:grid-cols-[minmax(0,1.3fr)_150px_minmax(0,1fr)]">
          <div className="md:border-r md:border-foreground md:pr-6">
            <HeroCopy
              headingClassName="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold leading-[1.1] text-foreground"
              bodyClassName="mt-4 columns-1 text-sm leading-relaxed text-foreground sm:columns-2 sm:gap-6"
            />
            <HeroActions className="mt-6 flex flex-wrap gap-3" />
          </div>
          <NewsHalftoneMark />
          <p className="text-sm leading-relaxed text-foreground/80">
            We build fast, sharp digital products for startups and SMBs — from
            first landing page to the tools that run the business.
          </p>
        </div>
      </div>
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
