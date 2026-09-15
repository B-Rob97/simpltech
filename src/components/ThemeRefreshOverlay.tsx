"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTheme } from "@/components/ThemeProvider";
import { themeIndex, THEME_IDS } from "@/lib/themes";

export function ThemeRefreshOverlay() {
  const { incoming, refreshing } = useTheme();
  const reduceMotion = useReducedMotion();
  const next = incoming;

  return (
    <AnimatePresence>
      {refreshing && next ? (
        <motion.div
          key={next.id}
          role="status"
          aria-live="polite"
          aria-label={`Refreshing ${next.label}`}
          className="theme-refresh"
          data-theme={next.id}
          data-motion={next.motion}
          data-density={next.density}
          data-hero={next.hero}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: "-8%" }
          }
          transition={
            reduceMotion
              ? { duration: 0.16, ease: "linear" }
              : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
          }
        >
          <div className="theme-refresh-wash" aria-hidden />
          <div className="theme-refresh-scan" aria-hidden />

          <div className="theme-refresh-plate">
            <div className="theme-refresh-mark" aria-hidden>
              <span className="theme-refresh-tile" />
              <span className="theme-refresh-tile" />
              <span className="theme-refresh-tile" />
              <span className="theme-refresh-tile" />
            </div>

            <p className="theme-refresh-folio">
              {String(themeIndex(next.id)).padStart(2, "0")} / {THEME_IDS.length}
            </p>
            <p className="theme-refresh-name">{next.label}</p>
            <p className="theme-refresh-pitch">{next.pitch}</p>
            <span className="theme-refresh-rule" aria-hidden />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
