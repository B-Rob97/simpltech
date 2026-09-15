"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef, useState, type RefObject } from "react";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { BrutalMark } from "@/components/hero/HeroMarks";
import { useBrutalistScroll } from "@/components/hero/BrutalistScrollStage";
import { siteConfig } from "@/lib/site";

const plates = [
  { key: "SITE", value: "06" },
  { key: "LOC", value: "YYC" },
  { key: "CLASS", value: "RAW" },
  { key: "CAST", value: "MONO" },
] as const;

type BayPhase = "seal" | "scan" | "shear" | "stamp" | "cleared";

function phaseFromProgress(value: number): BayPhase {
  if (value < 0.06) return "seal";
  if (value < 0.14) return "scan";
  if (value < 0.42) return "shear";
  if (value < 0.55) return "stamp";
  return "cleared";
}

export function BrutalistHero() {
  const scroll = useBrutalistScroll();
  const reduceMotion = Boolean(useReducedMotion() || scroll?.reduced);

  if (reduceMotion) {
    return <BrutalistStaticHero />;
  }

  return <BrutalistBayHero trackRef={scroll?.trackRef ?? null} />;
}

function BrutalistBayHero({
  trackRef,
}: {
  trackRef: RefObject<HTMLDivElement | null> | null;
}) {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<BayPhase>("seal");
  const { scrollYProgress } = useScroll({
    target: trackRef ?? fallbackRef,
    offset: ["start start", "end start"],
  });

  const doorY = useTransform(scrollYProgress, (latest) => {
    const t = clamp((latest - 0.08) / 0.34, 0, 1);
    let drop: number;
    if (t < 0.36) {
      drop = (t / 0.36) * 0.18;
    } else if (t < 0.48) {
      drop = 0.18;
    } else {
      drop = 0.18 + ((t - 0.48) / 0.52) * 0.9;
    }
    return `${drop * 100}%`;
  });

  const scanX = useTransform(scrollYProgress, [0.02, 0.16], ["-6%", "112%"]);
  const copyClip = useTransform(
    scrollYProgress,
    [0.24, 0.5],
    ["inset(0% 0 0% 0)", "inset(0% 0 100% 0)"],
  );
  const dockClip = useTransform(
    scrollYProgress,
    [0.36, 0.5],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  const stampScale = useTransform(
    scrollYProgress,
    [0.44, 0.48, 0.52, 0.56],
    [2.35, 0.84, 1.1, 1],
  );
  const stampRotate = useTransform(scrollYProgress, [0.44, 0.56], [-12, -2]);
  const stampX = useTransform(scrollYProgress, [0.44, 0.5, 0.56], [28, -6, 0]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setPhase(phaseFromProgress(value));
  });

  return (
    <div
      className="hero-brutal-page"
      data-brutal-phase={phase}
      ref={trackRef ? undefined : fallbackRef}
    >
      <CropMarks />
      <div className="hero-brutal-tape" aria-hidden />
      <div className="hero-brutal-lintel">
        <SpecPlates />
        <motion.div className="hero-brutal-copy" style={{ clipPath: copyClip }}>
          <p className="hero-brutal-kicker">
            {siteConfig.legalName} · SITE 06 · BLAST BAY
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
        </motion.div>
        <motion.p
          className="hero-brutal-dock-line"
          style={{ clipPath: dockClip }}
          aria-hidden
        >
          SITE-06 ARCHIVE · SELECTED WORK
        </motion.p>
      </div>

      <div className="hero-brutal-bay">
        <p className="hero-brutal-bay-label">BAY 06 · INTERIOR</p>
        <motion.div className="hero-brutal-door" style={{ y: doorY }}>
          <Image
            src="/themes/brutalist-slab.webp"
            alt=""
            fill
            sizes="100vw"
            preload
            className="hero-brutal-slab-image"
          />
          <span className="hero-brutal-door-stencil">SITE-06</span>
          <span className="hero-brutal-door-lip" aria-hidden />
          <motion.span
            className="hero-brutal-scan"
            style={{ x: scanX }}
            aria-hidden
          />
        </motion.div>
      </div>

      <div className="hero-brutal-sill">
        <BrutalMark />
        <motion.span
          className="hero-brutal-cleared"
          style={{ scale: stampScale, rotate: stampRotate, x: stampX }}
        >
          CLEARED
        </motion.span>
      </div>
    </div>
  );
}

function BrutalistStaticHero() {
  return (
    <div className="hero-brutal-page is-static" data-brutal-phase="cleared">
      <CropMarks />
      <div className="hero-brutal-tape" aria-hidden />
      <div className="hero-brutal-lintel">
        <SpecPlates />
        <div className="hero-brutal-copy">
          <p className="hero-brutal-kicker">
            {siteConfig.legalName} · SITE 06 · BLAST BAY
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
      </div>
      <figure className="hero-brutal-static-slab">
        <Image
          src="/themes/brutalist-slab.webp"
          alt="Board-formed concrete blast slab"
          width={1800}
          height={1012}
          sizes="(max-width: 767px) 100vw, 72vw"
          preload
        />
        <figcaption>SITE-06 · RAW CAST · YYC</figcaption>
      </figure>
      <div className="hero-brutal-sill">
        <BrutalMark />
        <span className="hero-brutal-cleared">CLEARED</span>
      </div>
    </div>
  );
}

function SpecPlates() {
  return (
    <ul className="hero-brutal-plates">
      {plates.map((plate) => (
        <li key={plate.key}>
          <span>{plate.key}</span>
          <strong>{plate.value}</strong>
        </li>
      ))}
    </ul>
  );
}

function CropMarks() {
  return (
    <div className="hero-brutal-crops" aria-hidden>
      {(["tl", "tr", "bl", "br"] as const).map((corner) => (
        <span
          key={corner}
          className={`hero-brutal-crop hero-brutal-crop-${corner}`}
        />
      ))}
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
