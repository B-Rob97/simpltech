"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { pricingFloor } from "@/lib/pricing";

const START = 5000;
const END = pricingFloor;

function formatPrice(value: number) {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

export function PriceCounter() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const value = useMotionValue(reduceMotion ? END : START);
  const display = useTransform(value, (latest) => formatPrice(latest));

  useEffect(() => {
    if (reduceMotion || !inView) return;

    const controls = animate(value, END, {
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  if (reduceMotion) {
    return (
      <p
        ref={ref}
        className="mt-2 font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight text-white sm:text-6xl"
      >
        {formatPrice(END)}
      </p>
    );
  }

  return (
    <motion.p
      ref={ref}
      className="mt-2 font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight text-white sm:text-6xl"
    >
      {display}
    </motion.p>
  );
}
