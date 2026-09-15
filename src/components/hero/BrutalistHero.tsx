"use client";

import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import Image from "next/image";
import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { useBrutalistScroll } from "@/components/hero/BrutalistScrollStage";
import { siteConfig } from "@/lib/site";

type OccupyPhase = "empty" | "draw" | "occupy" | "index";

function phaseFromProgress(value: number): OccupyPhase {
  if (value < 0.16) return "empty";
  if (value < 0.46) return "draw";
  if (value < 0.8) return "occupy";
  return "index";
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function applyOccupy(
  page: HTMLElement,
  stage: HTMLElement | null,
  value: number,
) {
  const rule = clamp01((value - 0.12) / 0.26);
  let column = 0;
  if (value >= 0.94) {
    column = 1;
  } else if (value >= 0.78) {
    column = 0.62 + ((value - 0.78) / 0.16) * 0.38;
  } else if (value >= 0.46) {
    column = 0.36 + ((value - 0.46) / 0.32) * 0.26;
  }
  const copy = 1 - clamp01((value - 0.68) / 0.16);

  page.style.setProperty("--brutal-col", column.toFixed(4));
  page.style.setProperty("--brutal-rule", rule.toFixed(4));
  page.style.setProperty("--brutal-copy", copy.toFixed(4));
  stage?.style.setProperty("--brutal-col", column.toFixed(4));
}

export function BrutalistHero() {
  const scroll = useBrutalistScroll();
  const reduceMotion = Boolean(useReducedMotion() || scroll?.reduced);

  if (reduceMotion) {
    return <BrutalistStaticHero />;
  }

  return <BrutalistOccupyHero trackRef={scroll?.trackRef ?? null} />;
}

function BrutalistOccupyHero({
  trackRef,
}: {
  trackRef: RefObject<HTMLDivElement | null> | null;
}) {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<OccupyPhase>("empty");
  const { scrollYProgress } = useScroll({
    target: trackRef ?? fallbackRef,
    offset: ["start start", "end start"],
  });

  const write = (value: number) => {
    const page = pageRef.current;
    if (!page) return;
    const stage =
      page.closest<HTMLElement>(".brutal-scroll-stage") ??
      page.closest<HTMLElement>(".composition-brutalist");
    applyOccupy(page, stage, value);
    setPhase(phaseFromProgress(value));
  };

  useLayoutEffect(() => {
    write(scrollYProgress.get());
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", write);

  return (
    <div
      className="hero-brutal-page"
      data-brutal-phase={phase}
      ref={(node) => {
        pageRef.current = node;
        if (!trackRef) fallbackRef.current = node;
      }}
    >
      <BrutalistHeroMatter />
    </div>
  );
}

function BrutalistStaticHero() {
  return (
    <div className="hero-brutal-page is-static" data-brutal-phase="index">
      <BrutalistHeroMatter />
    </div>
  );
}

function BrutalistHeroMatter() {
  return (
    <>
      <div className="hero-brutal-field">
        <Image
          src="/themes/brutalist-field.webp"
          alt=""
          fill
          sizes="100vw"
          preload
          className="hero-brutal-field-image"
        />
        <div className="hero-brutal-copy">
          <p className="hero-brutal-kicker">{siteConfig.location}</p>
          <p className="hero-brutal-name" aria-hidden>
            simpltech
          </p>
          <HeroCopy
            className="hero-brutal-lede"
            headingClassName="hero-brutal-heading"
            bodyClassName="hero-brutal-body"
          />
          <HeroActions
            className="hero-brutal-actions"
            primaryClassName="hero-brutal-btn hero-brutal-btn-primary"
            secondaryClassName="hero-brutal-btn hero-brutal-btn-secondary"
          />
        </div>
        <span className="hero-brutal-measure" aria-hidden />
      </div>
      <div className="hero-brutal-column" aria-hidden />
    </>
  );
}
