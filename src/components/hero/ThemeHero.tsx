"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import {
  CraftDust,
  CraftPlaten,
  CraftStamp,
  CraftSunshaft,
  CraftTape,
} from "@/components/craft/CraftStudioMarks";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import {
  BrutalMark,
  LaptopMark,
  NeonSignMark,
  NeonTicketMark,
  NewsHalftoneMark,
  PlayCollageMark,
  ProductWindowMark,
  SwissPosterMark,
} from "@/components/hero/HeroMarks";
import { HeroCity, HeroSky } from "@/components/HeroScene";
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
      return <NightSignalLayout sectionRef={sectionRef} />;
    case "cupertino":
      return <CupertinoLayout />;
    case "editorial":
      return <EditorialLayout />;
    case "swiss":
      return <SwissLayout />;
    case "soft-product":
      return <SoftProductLayout />;
    case "brutalist":
      return <BrutalistLayout />;
    case "warm-craft":
      return <WarmCraftLayout sectionRef={sectionRef} />;
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

function NightSignalLayout({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const brandScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);
  const brandY = useTransform(scrollYProgress, [0, 0.7], [0, -200]);
  const brandX = useTransform(scrollYProgress, [0, 0.7], [0, -32]);
  const brandOpacity = useTransform(scrollYProgress, [0.15, 0.65], [1, 0]);
  const brandTracking = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["-0.04em", "-0.06em"],
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, -40]);
  const skyY = useTransform(scrollYProgress, [0, 0.8], [0, 40]);
  const cityY = useTransform(scrollYProgress, [0, 0.8], [0, 88]);
  const sceneOpacity = useTransform(scrollYProgress, [0.12, 0.82], [1, 0]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <>
      <div className="hero-atmosphere" aria-hidden />
      <motion.div
        className={
          reduceMotion
            ? "hero-scene pointer-events-none absolute inset-0"
            : "hero-scene hero-scene-live pointer-events-none absolute inset-0"
        }
        aria-hidden
        style={reduceMotion ? undefined : { opacity: sceneOpacity }}
      >
        <motion.div
          className="absolute inset-0"
          style={reduceMotion ? undefined : { y: skyY }}
        >
          <HeroSky />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          style={reduceMotion ? undefined : { y: cityY }}
        >
          <HeroCity />
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[var(--content-max)] flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-32">
        <motion.p
          className="origin-bottom-left font-[family-name:var(--font-display)] font-semibold leading-[0.88] text-foreground will-change-transform"
          style={{
            fontSize: "var(--hero-mark-size)",
            letterSpacing: "var(--heading-tracking)",
            ...(reduceMotion
              ? undefined
              : {
                  scale: brandScale,
                  y: brandY,
                  x: brandX,
                  opacity: brandOpacity,
                  letterSpacing: brandTracking,
                }),
          }}
        >
          {siteConfig.name}
          <span className="text-[color:var(--volt)]">.</span>
        </motion.p>
        <motion.div
          style={
            reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }
          }
        >
          <HeroCopy className="mt-8 max-w-xl sm:mt-10" />
          <HeroActions />
        </motion.div>
      </div>

      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-6 z-0 flex flex-col items-center gap-2 sm:bottom-8"
          style={{ opacity: scrollCueOpacity }}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/45">
            Scroll
          </span>
          <motion.span
            className="block h-5 w-px bg-[color:var(--volt)]"
            animate={{ y: [0, 6, 0], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      ) : null}
    </>
  );
}

function CupertinoLayout() {
  return (
    <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[var(--content-max)] flex-col items-center px-5 pb-16 pt-28 text-center sm:px-8 sm:pb-20 sm:pt-36">
      <p className="text-sm font-medium tracking-[-0.02em] text-foreground/55">
        {siteConfig.name}
      </p>
      <HeroCopy
        className="mt-6 max-w-3xl"
        headingClassName="font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-foreground"
        bodyClassName="mx-auto mt-5 max-w-xl text-base leading-relaxed text-foreground/60 sm:text-lg"
      />
      <HeroActions className="mt-8 flex flex-wrap items-center justify-center gap-3" />
      <div className="mt-10 w-full max-w-xl sm:mt-12">
        <LaptopMark />
      </div>
    </div>
  );
}

function EditorialLayout() {
  return (
    <div className="editorial-cover relative z-10 mx-auto min-h-[100svh] max-w-[var(--content-max)] px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
      <div className="flex items-end justify-between gap-6 border-b border-foreground pb-3">
        <p className="font-[family-name:var(--font-display)] text-2xl italic leading-none sm:text-4xl">
          {siteConfig.name}
        </p>
        <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/55">
          {siteConfig.location} · Vol. 01
        </p>
      </div>
      <div className="mt-10 grid items-start gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.8fr)] md:gap-16">
        <div>
          <p className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.2em] text-[color:var(--accent)]">
            Cover story
          </p>
          <HeroCopy
            className="mt-5"
            headingClassName="font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,4.2rem)] font-medium italic leading-[1.05] text-foreground"
            bodyClassName="mt-6 max-w-lg border-l border-foreground pl-5 text-base leading-relaxed text-foreground/75"
          />
          <HeroActions />
        </div>
        <figure className="editorial-photograph">
          <Image src="/themes/editorial-architecture.webp" alt="Sculptural stone staircase framed by dramatic gallery light" width={1200} height={1499} sizes="(max-width: 767px) 100vw, 48vw" preload />
          <figcaption>01 — A different perspective. <span>Form / Function</span></figcaption>
        </figure>
      </div>
    </div>
  );
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
      value < 0.06
        ? 0
        : value < 0.14
          ? (value - 0.06) / 0.08
          : value < 0.22
            ? 1
            : value < 0.32
              ? 1 - (value - 0.22) / 0.1
              : 0;
    const grow = value < 0.3 ? 0 : value > 0.82 ? 1 : (value - 0.3) / 0.52;
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
      {reduceMotion ? null : <CraftPlaten />}
      <div className="craft-letter">
        <CraftTape />
        <div className="craft-letter-blot" aria-hidden />
        <CraftStamp />
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
      <div className="craft-deckle" aria-hidden />
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
