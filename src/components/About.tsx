"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/Reveal";

const beliefs = [
  {
    label: "01",
    title: "Right tool",
    detail:
      "Storefronts for selling. Modern builds for search. Custom only when it earns its keep.",
  },
  {
    label: "02",
    title: "Honest advice",
    detail: "We never steer you toward software that pads our invoice.",
  },
  {
    label: "03",
    title: "Fair pricing",
    detail:
      "Canadian agency rates from another decade don't match how tech works now.",
  },
] as const;

const paragraphs = [
  "We're SimplTech — a Calgary studio that helps founders and growing teams turn half-formed ideas into something people can actually see, click, and believe in.",
  "We love startups. We love watching someone's vision go from a napkin sketch to a live product.",
  "Selling online? We put you on a real storefront platform built for that — not a homemade shopping cart. Need a clean, fast site that shows up in search? We build it the modern way, so it loads quick and looks sharp.",
] as const;

export function About() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const markY = useTransform(scrollYProgress, [0, 1], ["12%", "-18%"]);
  const markOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.08, 0.16, 0.14, 0.06],
  );
  const markRotate = useTransform(scrollYProgress, [0, 1], [-4, 2]);
  const glowX = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-white/10 py-28 sm:py-36"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(47,123,255,0.28),transparent_68%)] blur-2xl"
        style={reduceMotion ? undefined : { x: glowX }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(245,197,24,0.16),transparent_70%)] blur-2xl"
      />

      <motion.p
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-[family-name:var(--font-display)] text-[clamp(7rem,28vw,22rem)] font-semibold leading-none tracking-[-0.08em] text-white"
        style={
          reduceMotion
            ? { opacity: 0.1 }
            : { y: markY, opacity: markOpacity, rotate: markRotate }
        }
      >
        YYC
      </motion.p>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--volt)]">
                About
              </p>
            </Reveal>
            <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-6xl sm:leading-[1.05]">
              <Reveal mode="words">Calgary-based. Startup-obsessed.</Reveal>
            </h2>
          </div>

          <Reveal delay={0.12}>
            <motion.div
              className="flex items-center gap-3 text-sm text-white/60"
              animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="relative flex h-2.5 w-2.5">
                {!reduceMotion ? (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--volt)] opacity-40" />
                ) : null}
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--volt)]" />
              </span>
              <span className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                Based in Calgary, AB
              </span>
            </motion.div>
          </Reveal>
        </div>

        <div className="mt-14 max-w-4xl space-y-8 sm:mt-16 sm:space-y-10">
          {paragraphs.map((text, index) => (
            <Reveal key={text} delay={0.08 + index * 0.1}>
              <p
                className={`leading-[1.45] tracking-[-0.01em] text-white/75 ${
                  index === 0
                    ? "text-2xl font-medium text-white/90 sm:text-3xl"
                    : "text-xl sm:text-2xl"
                }`}
              >
                {text}
              </p>
            </Reveal>
          ))}
        </div>

        <ul className="mt-16 grid gap-0 border-t border-white/10 sm:mt-20 md:grid-cols-3">
          {beliefs.map((belief, index) => (
            <li
              key={belief.title}
              className="relative border-t border-white/10 py-8 first:border-t-0 md:border-l md:border-t-0 md:px-8 md:py-10 md:first:border-l-0 md:first:pl-0"
            >
              <Reveal delay={0.1 + index * 0.08}>
                <motion.span
                  aria-hidden
                  className="absolute left-0 top-0 hidden h-px bg-[color:var(--volt)] md:block"
                  initial={reduceMotion ? false : { width: "0%" }}
                  whileInView={reduceMotion ? undefined : { width: "100%" }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + index * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={reduceMotion ? { width: "100%" } : undefined}
                />
                <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-[color:var(--signal)]">
                  {belief.label}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {belief.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white/65 sm:text-lg">
                  {belief.detail}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
