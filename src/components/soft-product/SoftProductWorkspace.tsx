"use client";

import {
  useMotionValueEvent,
  useScroll,
  useTransform
} from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { SoftProductWindow } from "@/components/soft-product/SoftProductWindow";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SoftProductWorkspaceProps = {
  services: ReactNode;
};

const pinVars = {
  "--soft-max": 0,
  "--soft-clear": 0,
} as CSSProperties;

export function SoftProductWorkspace({ services }: SoftProductWorkspaceProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  // Progress is the spacer track only, not the whole pin. Services sits
  // one track below the stage, so the board wipes as that section arrives.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end end"],
  });
  const maximize = useTransform(scrollYProgress, [0, 0.74], [0, 1]);
  const clearBoard = useTransform(scrollYProgress, [0.6, 0.97], [0, 1]);

  useMotionValueEvent(maximize, "change", (value) => {
    pinRef.current?.style.setProperty("--soft-max", value.toFixed(4));
  });
  useMotionValueEvent(clearBoard, "change", (value) => {
    pinRef.current?.style.setProperty("--soft-clear", value.toFixed(4));
    pinRef.current?.toggleAttribute("data-open", value > 0.55);
  });

  if (reduceMotion) {
    return (
      <div ref={pinRef} className="soft-product-pin is-static" style={pinVars}>
        <section className="site-hero">
          <div className="soft-product-stage">
            <div className="soft-product-atmosphere" aria-hidden />
            <SoftProductCopy />
            <SoftProductWindow reduceMotion />
          </div>
        </section>
        <div className="theme-section-slot slot-services">{services}</div>
      </div>
    );
  }

  return (
    <div ref={pinRef} className="soft-product-pin" style={pinVars}>
      <div className="soft-product-stage">
        <section className="site-hero">
          <div className="soft-product-atmosphere" aria-hidden />
          <ul className="soft-product-chips" aria-hidden>
            <li>7-day ship</li>
            <li>Calgary studio</li>
            <li>Next.js</li>
          </ul>
          <SoftProductCopy />
          <SoftProductWindow reduceMotion={false} />
          <p className="soft-product-cue">
            Scroll to open workspace
            <span className="soft-product-cue-max" />
          </p>
        </section>
      </div>
      <div ref={trackRef} className="soft-product-track" aria-hidden />
      <div className="theme-section-slot slot-services">{services}</div>
    </div>
  );
}

function SoftProductCopy() {
  return (
    <div className="soft-product-copy">
      <p className="soft-product-chip">
        <span className="soft-product-chip-dot" />
        Product studio
      </p>
      <HeroCopy
        className="soft-product-copy-text"
        headingClassName="soft-product-heading"
        bodyClassName="soft-product-body"
      />
      <HeroActions className="soft-product-actions" />
    </div>
  );
}
