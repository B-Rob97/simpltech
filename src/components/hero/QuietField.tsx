"use client";

import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { useLayoutEffect, useRef } from "react";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { siteConfig } from "@/lib/site";

export function QuietField() {
  const reduceMotion = Boolean(useReducedMotion());
  const fieldRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: fieldRef,
    offset: ["start start", "end end"],
  });

  const applyHorizon = (value: number) => {
    const node = fieldRef.current;
    if (!node || reduceMotion) return;

    const draw =
      value < 0.1 ? 0 : value > 0.58 ? 1 : (value - 0.1) / 0.48;
    const settle =
      value < 0.18 ? 0 : value > 0.88 ? 1 : (value - 0.18) / 0.7;

    node.style.setProperty("--quiet-draw", draw.toFixed(4));
    node.style.setProperty("--quiet-settle", settle.toFixed(4));
  };

  useLayoutEffect(() => {
    applyHorizon(scrollYProgress.get());
  }, [scrollYProgress, reduceMotion]);

  useMotionValueEvent(scrollYProgress, "change", applyHorizon);

  return (
    <div
      ref={fieldRef}
      className={reduceMotion ? "quiet-field is-static" : "quiet-field"}
    >
      <div className="quiet-sticky">
        <p className="quiet-place">{siteConfig.location}</p>
        <div className="quiet-copy">
          <HeroCopy
            className="quiet-hero-copy"
            headingClassName="quiet-hero-heading"
            bodyClassName="quiet-hero-body"
          />
          <HeroActions
            className="quiet-hero-actions"
            primaryClassName="quiet-action quiet-action-primary"
            secondaryClassName="quiet-action quiet-action-secondary"
          />
        </div>
        <div className="quiet-horizon" aria-hidden>
          <span className="quiet-horizon-line" />
        </div>
      </div>
    </div>
  );
}
