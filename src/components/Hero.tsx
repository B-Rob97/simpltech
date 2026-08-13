"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { useBrandMorph } from "@/components/BrandMorphContext";
import { CalendlyButton } from "@/components/CalendlyButton";
import { HeroScene } from "@/components/HeroScene";
import { siteConfig } from "@/lib/site";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { setMorphProgress } = useBrandMorph();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setMorphProgress(value);
  });

  // Big mark is fully present on load, then shrinks / fades out toward the header.
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
  const sceneY = useTransform(scrollYProgress, [0, 0.8], [0, 72]);
  const sceneOpacity = useTransform(scrollYProgress, [0.12, 0.82], [1, 0]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <div className="hero-atmosphere" aria-hidden />
      <motion.div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={
          reduceMotion ? undefined : { y: sceneY, opacity: sceneOpacity }
        }
      >
        <HeroScene animate={!reduceMotion} />
      </motion.div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-32">
        <motion.p
          className="origin-bottom-left font-[family-name:var(--font-display)] text-[clamp(3.5rem,14vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-white will-change-transform"
          style={
            reduceMotion
              ? undefined
              : {
                  scale: brandScale,
                  y: brandY,
                  x: brandX,
                  opacity: brandOpacity,
                  letterSpacing: brandTracking,
                }
          }
        >
          {siteConfig.name}
          <span className="text-[color:var(--volt)]">.</span>
        </motion.p>

        <motion.div
          className="mt-8 max-w-xl sm:mt-10"
          style={
            reduceMotion
              ? undefined
              : { opacity: contentOpacity, y: contentY }
          }
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-2xl font-medium leading-snug tracking-tight text-white sm:text-3xl">
            Websites and web apps that make startups look inevitable.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            We build fast, sharp digital products for startups and SMBs — from
            first landing page to the tools that run the business.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10"
          style={
            reduceMotion
              ? undefined
              : { opacity: contentOpacity, y: contentY }
          }
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <CalendlyButton className="rounded-full bg-[color:var(--volt)] px-6 py-3 text-sm font-semibold text-[color:var(--ink)] transition-transform hover:-translate-y-0.5">
            Book a discovery call
          </CalendlyButton>
          <a
            href="#work"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/10"
          >
            See selected work
          </a>
        </motion.div>
      </div>

      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 sm:bottom-8"
          style={{ opacity: scrollCueOpacity }}
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">
            Scroll
          </span>
          <motion.span
            className="block h-5 w-px bg-[color:var(--volt)]"
            animate={{ y: [0, 6, 0], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      ) : null}
    </section>
  );
}
