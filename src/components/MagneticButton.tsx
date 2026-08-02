"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function MagneticButton({
  href,
  children,
  className,
}: MagneticButtonProps) {
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(pointer: fine) and (min-width: 768px)");
  const ref = useRef<HTMLAnchorElement>(null);

  const enabled = !reduceMotion && isDesktop;

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={(event) => {
        if (!enabled || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        ref.current.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
      }}
      onMouseLeave={() => {
        if (!ref.current) return;
        ref.current.style.transform = "translate(0px, 0px)";
      }}
      style={{ transition: enabled ? "transform 0.2s ease-out" : undefined }}
    >
      {children}
    </motion.a>
  );
}
