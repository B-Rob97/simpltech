"use client";

import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import Image from "next/image";
import { useLayoutEffect, useRef, type RefObject } from "react";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { useBrutalistScroll } from "@/components/hero/BrutalistScrollStage";
import { siteConfig } from "@/lib/site";

type OccupyPhase = "empty" | "draw" | "occupy" | "index";

type OccupyVars = {
  rule: number;
  column: number;
  copy: number;
};

const OCCUPY_FOLLOW = 0.32;
const OCCUPY_SETTLE = 0.0012;

function phaseFromProgress(value: number): OccupyPhase {
  if (value < 0.1) return "empty";
  if (value < 0.4) return "draw";
  if (value < 0.86) return "occupy";
  return "index";
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function mapOccupy(value: number): OccupyVars {
  const rule = clamp01((value - 0.1) / 0.28);
  const column = value < 0.4 ? 0 : clamp01((value - 0.4) / 0.46);
  const copy = 1 - clamp01((value - 0.64) / 0.18);
  return { rule, column, copy };
}

function writeOccupy(
  page: HTMLElement,
  stage: HTMLElement | null,
  vars: OccupyVars,
) {
  const column = vars.column.toFixed(5);
  page.style.setProperty("--brutal-col", column);
  page.style.setProperty("--brutal-rule", vars.rule.toFixed(5));
  page.style.setProperty("--brutal-copy", vars.copy.toFixed(5));
  stage?.style.setProperty("--brutal-col", column);
}

function writePhase(page: HTMLElement, value: number) {
  const next = phaseFromProgress(value);
  if (page.dataset.brutalPhase !== next) {
    page.dataset.brutalPhase = next;
  }
}

function mixToward(current: number, next: number) {
  return current + (next - current) * OCCUPY_FOLLOW;
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
  const displayed = useRef<OccupyVars>({ rule: 0, column: 0, copy: 1 });
  const target = useRef<OccupyVars & { progress: number }>({
    rule: 0,
    column: 0,
    copy: 1,
    progress: 0,
  });
  const frame = useRef(0);
  const { scrollYProgress } = useScroll({
    target: trackRef ?? fallbackRef,
    offset: ["start start", "end start"],
  });

  const paint = (immediate = false) => {
    const page = pageRef.current;
    if (!page) return;
    const stage =
      page.closest<HTMLElement>(".brutal-scroll-stage") ??
      page.closest<HTMLElement>(".composition-brutalist");
    const next = target.current;
    const now = displayed.current;

    if (immediate) {
      now.rule = next.rule;
      now.column = next.column;
      now.copy = next.copy;
    } else {
      now.rule = mixToward(now.rule, next.rule);
      now.column = mixToward(now.column, next.column);
      now.copy = mixToward(now.copy, next.copy);
    }

    const settled =
      immediate ||
      (Math.abs(next.rule - now.rule) < OCCUPY_SETTLE &&
        Math.abs(next.column - now.column) < OCCUPY_SETTLE &&
        Math.abs(next.copy - now.copy) < OCCUPY_SETTLE);

    if (settled) {
      now.rule = next.rule;
      now.column = next.column;
      now.copy = next.copy;
    }

    writeOccupy(page, stage, now);
    writePhase(page, next.progress);

    if (settled) {
      frame.current = 0;
      return;
    }

    frame.current = requestAnimationFrame(() => paint());
  };

  const write = (value: number) => {
    target.current = { ...mapOccupy(value), progress: value };
    if (!frame.current) {
      frame.current = requestAnimationFrame(() => paint());
    }
  };

  useLayoutEffect(() => {
    const value = scrollYProgress.get();
    target.current = { ...mapOccupy(value), progress: value };
    paint(true);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = 0;
    };
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", write);

  return (
    <div
      className="hero-brutal-page"
      data-brutal-phase="empty"
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
