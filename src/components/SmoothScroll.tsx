"use client";

import Lenis from "lenis";
import { useReducedMotion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import { useTheme } from "@/components/ThemeProvider";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const reduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const still = theme.motion === "still";
  const duration = theme.motion === "calm" ? 0.7 : 1.15;

  useEffect(() => {
    if (reduceMotion || still) return;

    const lenis = new Lenis({
      duration,
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [duration, reduceMotion, still]);

  return children;
}
