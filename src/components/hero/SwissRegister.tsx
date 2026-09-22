"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform
} from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { services } from "@/lib/projects";
import { siteConfig } from "@/lib/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const RAIL_CELLS = 6;
const CELL_CODES = ["A1", "A2", "A3", "A4", "A5", "A6"] as const;

export function SwissRegister() {
  const reduceMotion = Boolean(useReducedMotion());
  const registerRef = useRef<HTMLDivElement>(null);
  const [cell, setCell] = useState(0);

  const { scrollYProgress } = useScroll({
    target: registerRef,
    offset: ["start start", "end end"],
  });

  const trimScale = useTransform(scrollYProgress, [0.42, 0.6], [0, 1]);
  const printY = useTransform(scrollYProgress, [0.5, 0.8], ["110%", "0%"]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(
      RAIL_CELLS - 1,
      Math.floor((Math.min(Math.max(value, 0), 0.42) / 0.42) * RAIL_CELLS),
    );
    setCell(next);
  });

  return (
    <div
      ref={registerRef}
      className={reduceMotion ? "swiss-register is-static" : "swiss-register"}
    >
      <div className="swiss-register-sticky" data-swiss-cell={cell}>
        <header className="swiss-folio">
          <span className="swiss-folio-system">04</span>
          <span>{siteConfig.location}</span>
          <span className="swiss-folio-reg">
            Reg {reduceMotion ? CELL_CODES[5] : CELL_CODES[cell]}
          </span>
        </header>

        <div className="swiss-stage">
          <div className="swiss-copy">
            <HeroCopy
              className="swiss-hero-copy"
              headingClassName="swiss-hero-heading"
              bodyClassName="swiss-hero-body"
            />
            <HeroActions
              className="swiss-hero-actions"
              primaryClassName="swiss-btn swiss-btn-solid"
              secondaryClassName="swiss-btn swiss-btn-line"
            />
          </div>

          <figure className="swiss-plate">
            <Image
              src="/themes/swiss-poster.webp"
              alt="International Style poster plate: black modular bars and a vermillion square on a paper grid"
              fill
              sizes="(max-width: 767px) 72vw, 38vw"
              preload
              className="swiss-plate-image"
            />
          </figure>
        </div>

        <div className="swiss-rail" aria-hidden>
          <span
            className="swiss-module"
            style={{ top: `${(cell / RAIL_CELLS) * 100}%` }}
          />
        </div>

        <motion.div
          className="swiss-trim"
          aria-hidden
          style={
            reduceMotion ? { transform: "scaleX(1)" } : { scaleX: trimScale }
          }
        />

        {reduceMotion ? null : (
          <div className="swiss-print-bed">
            <motion.div className="swiss-proof" style={{ y: printY }} aria-hidden>
              <p className="swiss-proof-kicker">What we do</p>
              <ol className="swiss-proof-list">
                {services.map((service, index) => (
                  <li key={service.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {service.title}
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
