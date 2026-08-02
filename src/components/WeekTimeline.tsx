"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

const days = [
  { day: "Mon", label: "Brief" },
  { day: "Tue", label: "Design" },
  { day: "Wed", label: "Build" },
  { day: "Thu", label: "Review" },
  { day: "Fri", label: "Live" },
] as const;

export function WeekTimeline() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="mt-10">
      <div className="relative">
        <div className="absolute left-0 right-0 top-[13px] h-px bg-white/15" />
        <motion.div
          className="absolute left-0 top-[13px] h-px origin-left bg-[color:var(--volt)]"
          style={reduceMotion ? { width: "100%" } : { width: fillWidth }}
        />
        <ol className="relative grid grid-cols-5 gap-2">
          {days.map((item, index) => {
            const threshold = index / (days.length - 1);
            return (
              <DayStep
                key={item.day}
                item={item}
                progress={scrollYProgress}
                threshold={threshold}
                reduceMotion={Boolean(reduceMotion)}
              />
            );
          })}
        </ol>
      </div>
      <p className="mt-5 text-sm text-white/50">
        Designed and built in under a week — with expert review before launch.
      </p>
    </div>
  );
}

function DayStep({
  item,
  progress,
  threshold,
  reduceMotion,
}: {
  item: (typeof days)[number];
  progress: MotionValue<number>;
  threshold: number;
  reduceMotion: boolean;
}) {
  const opacity = useTransform(
    progress,
    [threshold - 0.08, threshold + 0.05],
    [0.35, 1],
  );
  const scale = useTransform(
    progress,
    [threshold - 0.08, threshold + 0.05],
    [0.85, 1],
  );

  return (
    <motion.li
      className="flex flex-col items-start"
      style={reduceMotion ? undefined : { opacity, scale }}
    >
      <span className="mb-3 h-3 w-3 rounded-full border border-[color:var(--volt)] bg-[color:var(--ink)] shadow-[0_0_0_3px_rgba(245,197,24,0.15)]" />
      <span className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--volt)]">
        {item.day}
      </span>
      <span className="mt-1 text-sm text-white/70">{item.label}</span>
    </motion.li>
  );
}
