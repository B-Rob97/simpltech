"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: "wipe" | "words";
};

export function Reveal({
  children,
  className,
  delay = 0,
  mode = "wipe",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const wordText =
    typeof children === "string"
      ? children
      : Array.isArray(children) && children.every((part) => typeof part === "string")
        ? children.join("")
        : null;

  if (mode === "words" && wordText) {
    const words = wordText.split(" ");
    return (
      <span className={className}>
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: delay + index * 0.045,
              }}
            >
              {word}
              {index < words.length - 1 ? "\u00A0" : null}
            </motion.span>
          </span>
        ))}
      </span>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 28,
        clipPath: "inset(12% 0 0 0)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0 0 0)",
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
