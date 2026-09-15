"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { useReducedMotion } from "motion/react";

type BrutalistScrollValue = {
  trackRef: RefObject<HTMLDivElement | null>;
  reduced: boolean;
};

const BrutalistScrollContext = createContext<BrutalistScrollValue | null>(null);

export function useBrutalistScroll() {
  return useContext(BrutalistScrollContext);
}

export function BrutalistScrollStage({
  hero,
  work,
}: {
  hero: ReactNode;
  work: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = Boolean(useReducedMotion());

  return (
    <BrutalistScrollContext.Provider value={{ trackRef, reduced }}>
      <div
        className="brutal-scroll-stage"
        data-brutal-reduced={reduced ? "true" : "false"}
      >
        <div className="brutal-scroll-track" ref={trackRef}>
          {hero}
        </div>
        <div className="theme-section-slot slot-work">{work}</div>
      </div>
    </BrutalistScrollContext.Provider>
  );
}
