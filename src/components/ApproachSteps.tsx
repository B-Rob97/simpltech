"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

const steps = [
  {
    step: "01",
    title: "Clarify the goal",
    description:
      "We pin down who the site is for, what success looks like, and what needs to ship first.",
  },
  {
    step: "02",
    title: "Design for impact",
    description:
      "Brand-forward layouts, purposeful motion, and a structure that guides visitors to action.",
  },
  {
    step: "03",
    title: "Ship and iterate",
    description:
      "Production-ready builds with SEO, analytics hooks, and room to grow after launch — on whatever stack fits.",
  },
] as const;

export function ApproachSteps() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative mt-14">
      {/* Desktop horizontal connector — sits behind step numbers */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-[0.95rem] z-0 hidden h-px md:block"
      >
        <div className="h-full w-full bg-white/10" />
        <motion.div
          className="absolute inset-y-0 left-0 origin-left bg-[color:var(--volt)]"
          style={
            reduceMotion
              ? { width: "100%" }
              : { width: "100%", scaleX: lineScale }
          }
        />
      </div>

      {/* Mobile vertical connector */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-[0.55rem] top-3 z-0 w-px md:hidden"
      >
        <div className="h-full w-full bg-white/10" />
        <motion.div
          className="absolute inset-x-0 top-0 origin-top bg-[color:var(--volt)]"
          style={
            reduceMotion
              ? { height: "100%" }
              : { height: "100%", scaleY: lineScale }
          }
        />
      </div>

      <div className="relative z-10 grid gap-10 md:grid-cols-3 md:gap-8">
        {steps.map((item, index) => {
          const threshold = index / (steps.length - 1);
          return (
            <StepCard
              key={item.step}
              item={item}
              progress={scrollYProgress}
              threshold={threshold}
              reduceMotion={Boolean(reduceMotion)}
            />
          );
        })}
      </div>
    </div>
  );
}

function StepCard({
  item,
  progress,
  threshold,
  reduceMotion,
}: {
  item: (typeof steps)[number];
  progress: MotionValue<number>;
  threshold: number;
  reduceMotion: boolean;
}) {
  const scale = useTransform(
    progress,
    [threshold - 0.12, threshold + 0.08],
    [0.92, 1],
  );
  const opacity = useTransform(
    progress,
    [threshold - 0.12, threshold + 0.08],
    [0.45, 1],
  );

  return (
    <div className="relative pl-8 md:pl-0">
      <span
        aria-hidden
        className="absolute left-0 top-1.5 h-3 w-3 rounded-full border border-[color:var(--volt)] bg-[color:var(--ink)] md:hidden"
      />
      {/* Keep the number fully opaque so the ink pad always masks the connector */}
      <p className="relative z-10 inline-block bg-[color:var(--ink)] px-3 py-0.5 font-[family-name:var(--font-display)] text-base font-semibold tracking-wide text-[color:var(--signal)]">
        {item.step}
      </p>
      <motion.div style={reduceMotion ? undefined : { scale, opacity }}>
        <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}
