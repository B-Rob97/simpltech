"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { SwissPosterMark } from "@/components/hero/HeroMarks";
import { services } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

const RAIL_CELLS = 6;
const CELL_CODES = ["A1", "A2", "A3", "A4", "A5", "A6"] as const;
const PAGE_INDEX = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#pricing", label: "Pricing" },
] as const;

export function SwissRegister() {
  const reduceMotion = Boolean(useReducedMotion());
  const registerRef = useRef<HTMLDivElement>(null);
  const [cell, setCell] = useState(0);

  const { scrollYProgress } = useScroll({
    target: registerRef,
    offset: ["start start", "end end"],
  });

  const numeralScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.58]);
  const numeralX = useTransform(scrollYProgress, [0, 0.4], ["14%", "0%"]);
  const numeralY = useTransform(scrollYProgress, [0, 0.4], ["12%", "0%"]);
  const trimScale = useTransform(scrollYProgress, [0.42, 0.6], [0, 1]);
  const printY = useTransform(scrollYProgress, [0.5, 0.8], ["110%", "0%"]);
  const copyY = useTransform(scrollYProgress, [0.52, 0.82], [0, -56]);

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
        <SwissGridOverlay />
        <header className="swiss-folio">
          <span className="swiss-folio-system">04</span>
          <span>Intl · typographic style</span>
          <span>{siteConfig.location}</span>
          <span>Grid 12</span>
          <span className="swiss-folio-reg">
            Reg {reduceMotion ? CELL_CODES[5] : CELL_CODES[cell]}
          </span>
        </header>

        <div className="swiss-stage">
          <motion.div
            className="swiss-copy"
            style={reduceMotion ? undefined : { y: copyY }}
          >
            <p className="swiss-kicker">Design system 04</p>
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
            <nav className="swiss-hero-index" aria-label="On this page">
              {PAGE_INDEX.map((item, index) => (
                <a key={item.href} href={item.href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>

          <figure className="swiss-plate">
            <Image
              src="/themes/swiss-poster.webp"
              alt="International Style poster plate: black modular bars and a vermillion square on a paper grid"
              fill
              sizes="(max-width: 767px) 92vw, 46vw"
              preload
              className="swiss-plate-image"
            />
            <motion.div
              className="swiss-numeral-lock"
              style={
                reduceMotion
                  ? undefined
                  : { scale: numeralScale, x: numeralX, y: numeralY }
              }
            >
              <SwissPosterMark />
            </motion.div>
            <figcaption>Intl · YYC · System 04</figcaption>
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
              <p className="swiss-proof-kicker">Printed index / 01</p>
              <p className="swiss-proof-title">What we do</p>
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

        {reduceMotion || cell > 0 ? null : (
          <p className="swiss-register-cue">Register</p>
        )}
      </div>
    </div>
  );
}

function SwissGridOverlay() {
  return (
    <div className="swiss-grid-overlay" aria-hidden>
      {Array.from({ length: 13 }, (_, index) => (
        <span
          key={`v-${index}`}
          className="swiss-grid-v"
          style={{
            left: `${(index / 12) * 100}%`,
            animationDelay: `${index * 35}ms`,
          }}
        />
      ))}
      {Array.from({ length: 9 }, (_, index) => (
        <span
          key={`h-${index}`}
          className="swiss-grid-h"
          style={{
            top: `${(index / 8) * 100}%`,
            animationDelay: `${80 + index * 40}ms`,
          }}
        />
      ))}
    </div>
  );
}
