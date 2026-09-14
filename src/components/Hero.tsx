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
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { useTheme } from "@/components/ThemeProvider";
import { siteConfig } from "@/lib/site";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLElement>(null);
  const { setMorphProgress } = useBrandMorph();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setMorphProgress(value);
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
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const still = reduceMotion || theme.motion === "still";
  const poster = theme.hero === "grid" || theme.hero === "raw";

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <HeroBackdrop treatment={theme.hero} sectionRef={sectionRef} />

      <div
        className={`relative z-10 mx-auto flex min-h-[100svh] max-w-[var(--content-max)] flex-col px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-32 ${
          poster ? "justify-center" : "justify-end"
        }`}
      >
        <motion.p
          className="origin-bottom-left font-[family-name:var(--font-display)] font-semibold leading-[0.88] text-foreground will-change-transform"
          style={{
            fontSize: "var(--hero-mark-size)",
            letterSpacing: "var(--heading-tracking)",
            ...(still
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
          className="mt-8 max-w-xl sm:mt-10"
          style={still ? undefined : { opacity: contentOpacity, y: contentY }}
        >
          <h1 className="text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
            Websites and web apps that make startups look inevitable.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-foreground/70 sm:text-lg">
            We build fast, sharp digital products for startups and SMBs — from
            first landing page to the tools that run the business.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10"
          style={still ? undefined : { opacity: contentOpacity, y: contentY }}
        >
          <CalendlyButton className="rounded-[var(--radius-button)] bg-[color:var(--volt)] px-6 py-3 text-sm font-semibold text-[color:var(--accent-ink)] transition-transform hover:-translate-y-0.5">
            Book a discovery call
          </CalendlyButton>
          <a
            href="#work"
            className="rounded-[var(--radius-button)] border-[length:var(--border-width)] border-foreground/20 bg-foreground/5 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-foreground/40 hover:bg-foreground/10"
          >
            See selected work
          </a>
        </motion.div>
      </div>

      {!still ? (
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
    </section>
  );
}
