"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type CityRiseProps = {
  children: ReactNode;
  className?: string;
};

export function CityRise({ children, className }: CityRiseProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.35, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "80px 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
