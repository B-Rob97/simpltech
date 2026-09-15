"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { type RefObject } from "react";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { siteConfig } from "@/lib/site";

const NAMEPLATE = `The ${siteConfig.name}`;

const INSIDE = [
  { href: "#work", label: "Selected work", folio: "P.2" },
  { href: "#services", label: "What we do", folio: "P.3" },
  { href: "#about", label: "From the editor", folio: "P.4" },
  { href: "#pricing", label: "Classifieds", folio: "P.5" },
  { href: "#approach", label: "How we print", folio: "P.6" },
  { href: "#contact", label: "Help wanted", folio: "P.8" },
] as const;

type NewsprintHeroProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function NewsprintHero({ sectionRef }: NewsprintHeroProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const sheetY = useTransform(scrollYProgress, [0, 0.58], ["0%", "-18%"]);
  const sheetScale = useTransform(scrollYProgress, [0, 0.58], [1, 0.955]);
  const cylinderShift = useTransform(scrollYProgress, [0, 1], ["0%", "220%"]);
  const inkWet = useTransform(scrollYProgress, [0.12, 0.72], [0.62, 0]);

  return (
    <div className="news-press-run">
      <div className="news-press-stage">
        <motion.div
          className="news-sheet"
          style={
            reduceMotion
              ? undefined
              : { y: sheetY, scale: sheetScale, transformOrigin: "50% 100%" }
          }
        >
          <div className="hero-news-frame">
            <header className="news-folio">
              <p>
                {siteConfig.location}
                <span> · Chinook, 9°</span>
              </p>
              <p>Monday morning edition</p>
              <p>Vol. 01 · No. 09 · 25¢</p>
            </header>

            <p className="news-nameplate" aria-label={NAMEPLATE}>
              {NAMEPLATE.split("").map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  className="news-sort"
                  style={{ animationDelay: `${70 + index * 42}ms` }}
                  aria-hidden
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </p>

            <div className="news-ticker" aria-hidden>
              <div className="news-ticker-track">
                <TickerCopy />
                <TickerCopy />
              </div>
            </div>

            <div className="news-front">
              <article className="news-lead">
                <p className="news-kicker">Front page · Product studio</p>
                <HeroCopy
                  headingClassName="news-headline"
                  bodyClassName="news-dek"
                />
                <HeroActions
                  className="news-actions"
                  primaryClassName="news-action news-action-primary"
                  secondaryClassName="news-action news-action-secondary"
                />
              </article>

              <figure className="news-halftone">
                <div className="news-halftone-plate">
                  <Image
                    src="/themes/newsprint-lead.webp"
                    alt="High-contrast newsprint photograph of downtown Calgary towers under an overcast sky"
                    width={1600}
                    height={1200}
                    sizes="(max-width: 767px) 100vw, 42vw"
                    preload
                  />
                  <span className="news-halftone-screen" />
                  <span className="news-stamp">Late city</span>
                </div>
                <figcaption>
                  <span>A1</span>
                  Calgary at press time — towers under a chinook sky.
                </figcaption>
              </figure>

              <aside className="news-rail">
                <p className="news-kicker">Inside this edition</p>
                <ol className="news-index">
                  {INSIDE.map((item) => (
                    <li key={item.href}>
                      <a href={item.href}>
                        <span>{item.label}</span>
                        <span>{item.folio}</span>
                      </a>
                    </li>
                  ))}
                </ol>
                <figure className="news-cut">
                  <Image
                    src="/themes/newsprint-press.webp"
                    alt="Rotary printing press cylinders threading a web of newsprint"
                    width={1200}
                    height={1600}
                    sizes="(max-width: 767px) 40vw, 16vw"
                  />
                  <figcaption>Press room · YYC</figcaption>
                </figure>
              </aside>
            </div>
          </div>
        </motion.div>

        <div className="news-press-gate" aria-hidden>
          <p className="news-press-label">
            Sheet feeding · page 2 prints as it leaves the drum
          </p>
          <div className="news-nips">
            <span />
            <span />
          </div>
          <motion.div
            className="news-cylinder-drum"
            style={reduceMotion ? undefined : { backgroundPositionX: cylinderShift }}
          />
          <div className="news-nips">
            <span />
            <span />
          </div>
          <motion.div
            className="news-ink-wet"
            style={reduceMotion ? undefined : { opacity: inkWet }}
          />
        </div>
      </div>
    </div>
  );
}

function TickerCopy() {
  return (
    <p>
      Late city final · Calgary desk · Websites that make startups look
      inevitable · Press run 09 · No agency theatre · Built in under a week ·
      {` ${siteConfig.domain} `}· Monday morning edition ·
    </p>
  );
}
