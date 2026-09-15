"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { HatchDeckPreview } from "@/components/mission/MissionMarks";

type Phase = "approach" | "align" | "hatch" | "locked";

function phaseLabel(phase: Phase): string {
  switch (phase) {
    case "approach":
      return "Approach burn";
    case "align":
      return "Docking align";
    case "hatch":
      return "Hatch opening";
    case "locked":
      return "Deck locked";
    default: {
      const _exhaustive: never = phase;
      return _exhaustive;
    }
  }
}

function formatMet(elapsedMs: number) {
  const total = Math.max(0, Math.floor(elapsedMs / 1000));
  const hours = String(Math.floor(total / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const seconds = String(total % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function HeroChrome({
  paused,
  onPause,
  altitude,
  phase,
  met,
  compactHud,
}: {
  paused: boolean;
  onPause: () => void;
  altitude: string;
  phase: Phase;
  met: string;
  compactHud?: boolean;
}) {
  return (
    <>
      <div className={`mc-hero-topline ${compactHud ? "is-docked" : ""}`}>
        <span>Independent digital studio</span>
        <span className="mc-hero-met">
          MET {met}
          <i />
        </span>
        <span>
          Calgary, Canada <i />
        </span>
      </div>
      <div className="mc-hero-copy">
        <p className="mc-eyebrow">
          <span className="mc-status-light" /> Small studio. Expansive thinking.
        </p>
        <h1>
          Ideas deserve
          <br />
          a bigger <em>orbit.</em>
        </h1>
        <div className="mc-hero-bottom">
          <p>
            Websites and web apps that make startups look inevitable. Built with
            intent. Ready for what&apos;s next.
          </p>
          <a className="mc-round-link" href="#work">
            <span>
              Explore
              <br />
              our work
            </span>
            <span aria-hidden>↘</span>
          </a>
        </div>
      </div>
      <aside className="mc-telemetry" aria-label="Orbital insertion readouts">
        <p>
          <span>ALT</span>
          <strong>{altitude}</strong>
          <small>km</small>
        </p>
        <p>
          <span>INC</span>
          <strong>51.6°</strong>
          <small>YYC</small>
        </p>
        <p>
          <span>PHS</span>
          <strong>{phaseLabel(phase)}</strong>
          <small>ST-01</small>
        </p>
      </aside>
      <div className="mc-hero-footer">
        <span>Strategy → Design → Development</span>
        <button type="button" onClick={onPause} aria-pressed={paused}>
          {paused ? "Resume motion" : "Pause motion"}
          <span aria-hidden>{paused ? " ▷" : " Ⅱ"}</span>
        </button>
        <a href="#work">
          Scroll to insert <span aria-hidden>↓</span>
        </a>
      </div>
    </>
  );
}

export function MissionHero({
  paused,
  onPause,
}: {
  paused: boolean;
  onPause: () => void;
}) {
  const reduced = useReducedMotion();
  const compact = useMediaQuery("(max-width: 700px)");
  const trackRef = useRef<HTMLDivElement>(null);
  const pointer = useMotionValue(0);
  const smooth = useSpring(pointer, { stiffness: 55, damping: 22 });
  const imageX = useTransform(smooth, [-1, 1], [-15, 15]);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const planetScale = useTransform(scrollYProgress, [0, 0.46], [1, 1.52]);
  const planetY = useTransform(scrollYProgress, [0, 0.46], [0, 72]);
  const planetRotate = useTransform(scrollYProgress, [0, 0.46], [0, 3.2]);
  const starsX = useTransform(scrollYProgress, [0, 0.55], [0, compact ? -18 : -48]);
  const starsY = useTransform(scrollYProgress, [0, 0.55], [0, 16]);
  const copyY = useTransform(scrollYProgress, [0.1, 0.48], [0, compact ? -160 : -280]);
  const copyX = useTransform(scrollYProgress, [0.18, 0.48], [0, compact ? -8 : -28]);
  const hatch = useTransform(scrollYProgress, [0.5, 0.9], [0, 82]);
  const origin = compact ? "50% 42%" : "70% 46%";
  const veilMask = useTransform(
    hatch,
    (radius) =>
      `radial-gradient(circle at ${origin}, transparent ${radius}%, #000 ${radius + 0.35}%)`,
  );
  const ringSize = useTransform(hatch, (radius) => `${Math.max(radius * 2.1, 9)}vmax`);
  const altitudeValue = useTransform(scrollYProgress, [0, 0.78], [421.4, 11.8]);
  const reticleScale = useTransform(scrollYProgress, [0, 0.42, 0.52], [1.18, 0.62, 0.2]);
  const reticleRotate = useTransform(scrollYProgress, [0, 0.45], [0, 36]);

  const [altitude, setAltitude] = useState("421.4");
  const [phase, setPhase] = useState<Phase>("approach");
  const [met, setMet] = useState("00:00:00");

  useMotionValueEvent(altitudeValue, "change", (value) => {
    setAltitude(value.toFixed(1));
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value >= 0.88) setPhase("locked");
    else if (value >= 0.5) setPhase("hatch");
    else if (value >= 0.28) setPhase("align");
    else setPhase("approach");
  });

  useEffect(() => {
    const started = Date.now();
    const tick = () => setMet(formatMet(Date.now() - started));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!reduced && !paused && event.pointerType === "mouse") {
      const box = event.currentTarget.getBoundingClientRect();
      pointer.set(((event.clientX - box.left) / box.width - 0.5) * 2);
    }
  };

  if (reduced) {
    return (
      <section className="mc-hero" onPointerMove={onPointerMove} onPointerLeave={() => pointer.set(0)}>
        <motion.div className="mc-planet" style={{ x: 0 }}>
          <Image
            src="/themes/mission-orbit.webp"
            alt="A dark planet edged by the warm light of a rising sun"
            fill
            sizes="100vw"
            preload
          />
        </motion.div>
        <div className="mc-stars" aria-hidden>
          <Image src="/themes/mission-stars.webp" alt="" fill sizes="100vw" />
        </div>
        <div className="mc-hero-grid" aria-hidden />
        <div className="mc-reticle" aria-hidden>
          <span />
          <span />
          <i />
        </div>
        <HeroChrome
          paused={paused}
          onPause={onPause}
          altitude="421.4"
          phase="approach"
          met={met}
        />
      </section>
    );
  }

  return (
    <div className="mc-story" ref={trackRef}>
      <div className="mc-deck-pin">
        <HatchDeckPreview />
      </div>
      <div className="mc-hero-veil">
        <section
          className="mc-hero mc-hero-pinned"
          onPointerMove={onPointerMove}
          onPointerLeave={() => pointer.set(0)}
        >
          <motion.div
            className="mc-veil-mask"
            style={{
              maskImage: veilMask,
              WebkitMaskImage: veilMask,
            }}
          >
            <motion.div
              className="mc-planet"
              style={{
                scale: planetScale,
                y: planetY,
                rotate: planetRotate,
              }}
            >
              <motion.div style={{ x: paused ? 0 : imageX }}>
                <Image
                  src="/themes/mission-orbit.webp"
                  alt="A dark planet edged by the warm light of a rising sun"
                  fill
                  sizes="100vw"
                  preload
                />
              </motion.div>
            </motion.div>
            <motion.div className="mc-stars" aria-hidden style={{ x: starsX, y: starsY }}>
              <Image src="/themes/mission-stars.webp" alt="" fill sizes="100vw" />
            </motion.div>
            <div className="mc-hero-grid" aria-hidden />
            <div className="mc-limb-glow" aria-hidden />
          </motion.div>
          <motion.div className="mc-hud-shift" style={{ y: copyY, x: copyX }}>
            <HeroChrome
              paused={paused}
              onPause={onPause}
              altitude={altitude}
              phase={phase}
              met={met}
              compactHud
            />
          </motion.div>
          <motion.div
            className="mc-reticle"
            aria-hidden
            style={{ scale: reticleScale, rotate: reticleRotate }}
          >
            <span />
            <span />
            <i />
            <b />
            <b />
            <b />
            <b />
          </motion.div>
          <motion.div
            className="mc-hatch-ring"
            aria-hidden
            style={{
              width: ringSize,
              height: ringSize,
              left: origin.split(" ")[0],
              top: origin.split(" ")[1],
            }}
          />
        </section>
      </div>
      <div className="mc-story-spacer" aria-hidden />
    </div>
  );
}
