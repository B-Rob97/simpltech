"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import type { RefObject } from "react";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { HeroCity, HeroSky } from "@/components/HeroScene";
import { NightSignalWorkLock } from "@/components/night/NightSignalWorkLock";
import { siteConfig } from "@/lib/site";

type NightSignalHeroProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function NightSignalHero({ sectionRef }: NightSignalHeroProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const cityScale = useTransform(scrollYProgress, [0.05, 0.48], [1.02, 1.34]);
  const cityY = useTransform(scrollYProgress, [0.05, 0.48], [42, -18]);
  const skyY = useTransform(scrollYProgress, [0, 0.5], [0, 28]);
  const photoOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.52],
    [0.48, 0.68, 0.9],
  );
  const photoScale = useTransform(scrollYProgress, [0, 0.55], [1.06, 1.26]);

  const brandScale = useTransform(scrollYProgress, [0.04, 0.4], [1, 0.18]);
  const brandY = useTransform(scrollYProgress, [0.04, 0.4], [0, -210]);
  const brandX = useTransform(scrollYProgress, [0.04, 0.4], [0, -28]);
  const brandOpacity = useTransform(scrollYProgress, [0.08, 0.3], [1, 0]);
  const brandTracking = useTransform(
    scrollYProgress,
    [0.04, 0.4],
    ["-0.04em", "-0.06em"],
  );

  const copyOpacity = useTransform(scrollYProgress, [0.02, 0.2], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0.02, 0.2], [0, -32]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  const searchlightRotate = useTransform(
    scrollYProgress,
    [0.16, 0.4],
    [-30, 14],
  );
  const searchlightOpacity = useTransform(
    scrollYProgress,
    [0.14, 0.26, 0.68, 0.86],
    [0, 0.9, 0.72, 0],
  );
  const ringScale = useTransform(scrollYProgress, [0.2, 0.56], [0.15, 1.85]);
  const ringOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.36, 0.58],
    [0, 0.75, 0],
  );

  const glassWidth = useTransform(scrollYProgress, [0.16, 0.55], ["18%", "90%"]);
  const glassHeight = useTransform(
    scrollYProgress,
    [0.16, 0.55],
    ["16%", "74%"],
  );
  const glassX = useTransform(scrollYProgress, [0.16, 0.55], ["74%", "50%"]);
  const glassY = useTransform(scrollYProgress, [0.16, 0.55], ["26%", "54%"]);
  const glassRadius = useTransform(scrollYProgress, [0.16, 0.55], [18, 8]);
  const lockLabelOpacity = useTransform(
    scrollYProgress,
    [0.18, 0.26, 0.4, 0.5],
    [0, 1, 1, 0],
  );

  if (reduceMotion) {
    return <StaticNightSignal />;
  }

  return (
    <div className="night-signal-lock">
      <div className="night-signal-pin">
        <div className="hero-atmosphere" aria-hidden />
        <motion.div
          className="night-signal-photo"
          aria-hidden
          style={{ opacity: photoOpacity, scale: photoScale }}
        >
          <Image
            src="/themes/night-signal-skyline.webp"
            alt=""
            fill
            sizes="100vw"
            preload
            className="object-cover object-[center_70%]"
          />
        </motion.div>

        <motion.div
          className="hero-scene hero-scene-live pointer-events-none absolute inset-0"
          aria-hidden
          style={{ y: skyY }}
        >
          <HeroSky />
        </motion.div>
        <motion.div
          className="hero-scene hero-scene-live pointer-events-none absolute inset-0 origin-[63%_78%]"
          aria-hidden
          style={{ y: cityY, scale: cityScale }}
        >
          <HeroCity />
        </motion.div>

        <motion.div
          className="night-signal-rings"
          aria-hidden
          style={{ opacity: ringOpacity, scale: ringScale }}
        >
          <span />
          <span />
          <span />
        </motion.div>

        <motion.div
          className="night-searchlight"
          aria-hidden
          style={{
            opacity: searchlightOpacity,
            rotate: searchlightRotate,
          }}
        >
          <span />
        </motion.div>

        <div className="night-signal-copy">
          <p className="night-signal-chip">
            <span className="night-live-dot" aria-hidden />
            YYC · Night signal · Live
          </p>
          <motion.p
            className="night-signal-wordmark origin-bottom-left font-[family-name:var(--font-display)] font-semibold leading-[0.88] text-foreground will-change-transform"
            style={{
              fontSize: "var(--hero-mark-size)",
              scale: brandScale,
              y: brandY,
              x: brandX,
              opacity: brandOpacity,
              letterSpacing: brandTracking,
            }}
          >
            {siteConfig.name}
            <span className="text-[color:var(--volt)]">.</span>
          </motion.p>
          <motion.div style={{ opacity: copyOpacity, y: copyY }}>
            <HeroCopy className="mt-8 max-w-xl sm:mt-10" />
            <HeroActions />
          </motion.div>
        </div>

        <motion.div
          aria-hidden
          className="night-signal-cue"
          style={{ opacity: cueOpacity }}
        >
          <span>Lock the tower</span>
          <i />
        </motion.div>

        <motion.p
          className="night-signal-lock-label"
          style={{ opacity: lockLabelOpacity }}
        >
          Signal lock
        </motion.p>

        <motion.div
          className="night-observatory"
          style={{
            width: glassWidth,
            height: glassHeight,
            left: glassX,
            top: glassY,
            borderRadius: glassRadius,
          }}
        >
          <div className="night-observatory-chrome" aria-hidden>
            <span>Deck 01</span>
            <span>Calgary Tower</span>
            <span>Feed</span>
          </div>
          <div className="night-observatory-scan" aria-hidden />
          <div className="night-observatory-page">
            <NightSignalWorkLock />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StaticNightSignal() {
  return (
    <div className="night-signal-static">
      <div className="hero-atmosphere" aria-hidden />
      <div className="night-signal-photo night-signal-photo-static" aria-hidden>
        <Image
          src="/themes/night-signal-skyline.webp"
          alt=""
          fill
          sizes="100vw"
          preload
          className="object-cover object-[center_70%]"
        />
      </div>
      <div className="hero-scene pointer-events-none absolute inset-0" aria-hidden>
        <HeroSky />
        <HeroCity />
      </div>
      <div className="night-signal-copy">
        <p className="night-signal-chip">
          <span className="night-live-dot" aria-hidden />
          YYC · Night signal · Live
        </p>
        <p
          className="night-signal-wordmark font-[family-name:var(--font-display)] font-semibold leading-[0.88] text-foreground"
          style={{
            fontSize: "var(--hero-mark-size)",
            letterSpacing: "var(--heading-tracking)",
          }}
        >
          {siteConfig.name}
          <span className="text-[color:var(--volt)]">.</span>
        </p>
        <HeroCopy className="mt-8 max-w-xl sm:mt-10" />
        <HeroActions />
      </div>
    </div>
  );
}
