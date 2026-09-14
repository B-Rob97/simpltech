"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { RefObject } from "react";
import { HeroCity, HeroSky } from "@/components/HeroScene";
import { siteConfig } from "@/lib/site";
import type { HeroTreatment } from "@/lib/themes";

type HeroBackdropProps = {
  treatment: HeroTreatment;
  sectionRef: RefObject<HTMLElement | null>;
};

export function HeroBackdrop({ treatment, sectionRef }: HeroBackdropProps) {
  switch (treatment) {
    case "skyline":
      return <SkylineHero sectionRef={sectionRef} />;
    case "void":
      return <VoidHero />;
    case "ruled":
      return <RuledHero />;
    case "grid":
      return <GridHero />;
    case "mesh":
      return <MeshHero />;
    case "paper":
      return <PaperHero />;
    case "blocks":
      return <BlocksHero />;
    case "raw":
      return <RawHero />;
    case "glow":
      return <GlowHero />;
    default: {
      const _exhaustive: never = treatment;
      return _exhaustive;
    }
  }
}

function SkylineHero({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const skyY = useTransform(scrollYProgress, [0, 0.8], [0, 40]);
  const cityY = useTransform(scrollYProgress, [0, 0.8], [0, 88]);
  const sceneOpacity = useTransform(scrollYProgress, [0.12, 0.82], [1, 0]);

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
    </>
  );
}

function VoidHero() {
  return (
    <div className="hero-void" aria-hidden>
      <span className="hero-void-rule" />
    </div>
  );
}

function RuledHero() {
  return (
    <div className="hero-ruled" aria-hidden>
      <p className="hero-ruled-folio">
        {siteConfig.location} · Vol. 01
      </p>
      <span className="hero-ruled-line hero-ruled-line-a" />
      <span className="hero-ruled-line hero-ruled-line-b" />
      <span className="hero-ruled-line hero-ruled-line-c" />
    </div>
  );
}

function GridHero() {
  return (
    <div className="hero-grid" aria-hidden>
      <span className="hero-grid-block" />
      <p className="hero-grid-index">INTL</p>
    </div>
  );
}

function MeshHero() {
  return <div className="hero-mesh" aria-hidden />;
}

function PaperHero() {
  return (
    <div className="hero-paper" aria-hidden>
      <span className="hero-paper-grain" />
    </div>
  );
}

function BlocksHero() {
  return (
    <div className="hero-blocks" aria-hidden>
      <span className="hero-block hero-block-a" />
      <span className="hero-block hero-block-b" />
      <span className="hero-block hero-block-c" />
    </div>
  );
}

function RawHero() {
  return (
    <div className="hero-raw" aria-hidden>
      <p className="hero-raw-stamp">RAW / 06</p>
    </div>
  );
}

function GlowHero() {
  return (
    <div className="hero-glow" aria-hidden>
      <span className="hero-glow-orb hero-glow-orb-a" />
      <span className="hero-glow-orb hero-glow-orb-b" />
    </div>
  );
}
