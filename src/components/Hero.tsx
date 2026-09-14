"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef } from "react";
import { useBrandMorph } from "@/components/BrandMorphContext";
import { ThemeHero } from "@/components/hero/ThemeHero";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setMorphProgress } = useBrandMorph();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setMorphProgress(value);
  });

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <ThemeHero sectionRef={sectionRef} />
    </section>
  );
}
