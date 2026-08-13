"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  mode?: "wipe" | "words";
};

const inViewOptions = {
  once: true,
  amount: 0.05,
  margin: "120px 0px",
} as const;

export function Reveal({
  children,
  className,
  delay = 0,
  mode = "wipe",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const wipeRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement>(null);
  const wipeInView = useInView(wipeRef, inViewOptions);
  const wordsInView = useInView(wordsRef, inViewOptions);
  const inView = mode === "words" ? wordsInView : wipeInView;
  const [shown, setShown] = useState(false);
  const visible = inView || shown;

  useEffect(() => {
    if (inView) setShown(true);
  }, [inView]);

  useEffect(() => {
    const el = wordsRef.current ?? wipeRef.current;
    if (!el) return;

    const revealIfVisible = () => {
      const box = el.getBoundingClientRect();
      if (box.bottom > 0 && box.top < window.innerHeight) {
        setShown(true);
      }
    };

    revealIfVisible();
    const timeout = window.setTimeout(revealIfVisible, 200);
    window.addEventListener("scroll", revealIfVisible, { passive: true });
    window.addEventListener("resize", revealIfVisible);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("scroll", revealIfVisible);
      window.removeEventListener("resize", revealIfVisible);
    };
  }, []);

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
      <span ref={wordsRef} className={className}>
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={
                visible ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }
              }
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
      ref={wipeRef}
      className={className}
      initial={{
        opacity: 0,
        y: 28,
        clipPath: "inset(12% 0 0 0)",
      }}
      animate={
        visible
          ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }
          : { opacity: 0, y: 28, clipPath: "inset(12% 0 0 0)" }
      }
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
