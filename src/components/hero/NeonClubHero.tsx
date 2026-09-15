"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useState, type RefObject } from "react";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { NeonSignMark, NeonTicketMark } from "@/components/hero/HeroMarks";

type NeonClubHeroProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

// Scroll story: a door scan, then a walk down the alley. The neon
// doorway grows toward the camera and tonight's lineup is visible
// through the opening — not a fade, and not a growing laptop.

export function NeonClubHero({ sectionRef }: NeonClubHeroProps) {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  if (reduceMotion) {
    return <NeonClubStatic />;
  }

  return (
    <NeonClubStory
      sectionRef={sectionRef}
      paused={paused}
      onTogglePaused={() => setPaused((value) => !value)}
    />
  );
}

function NeonClubStatic() {
  return (
    <div className="neon-club-stage is-static">
      <NeonClubVeil paused />
      <div className="neon-door-anchor">
        <NeonDoorFrame />
      </div>
      <NeonClubBill />
    </div>
  );
}

function NeonClubStory({
  sectionRef,
  paused,
  onTogglePaused,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  paused: boolean;
  onTogglePaused: () => void;
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const alleyScale = useTransform(scrollYProgress, [0.3, 1], [1, 1.82]);
  const billX = useTransform(scrollYProgress, [0.2, 0.48], [0, -72]);
  const billY = useTransform(scrollYProgress, [0.2, 0.48], [0, -140]);
  const scanX = useTransform(scrollYProgress, [0.02, 0.2], ["-8%", "112%"]);
  const stampScale = useTransform(scrollYProgress, [0.16, 0.24, 0.32], [0, 1.28, 1]);
  const stampRotate = useTransform(scrollYProgress, [0.16, 0.32], [-28, -9]);
  const scanLed = useTransform(scrollYProgress, [0.14, 0.22], [1, 0]);
  const inLed = useTransform(scrollYProgress, [0.18, 0.26], [0, 1]);
  const rope = useTransform(scrollYProgress, [0.28, 0.5], [0, 92]);
  const ropeLeft = useTransform(rope, (value) => -value);
  const holeW = useTransform(scrollYProgress, [0.32, 1], [15, 180]);
  const holeH = useTransform(scrollYProgress, [0.32, 1], [28, 180]);
  const frameScale = useTransform(scrollYProgress, [0.32, 1], [0.42, 3.1]);
  const veilMask = useMotionTemplate`radial-gradient(ellipse ${holeW}% ${holeH}% at 78% 52%, transparent 0%, transparent 98%, #000 99%)`;

  return (
    <div className={`neon-club-stage ${paused ? "is-paused" : ""}`}>
      <motion.div className="neon-club-veil" style={{ maskImage: veilMask, WebkitMaskImage: veilMask }}>
        <motion.div
          className="neon-club-alley"
          style={{ scale: alleyScale, transformOrigin: "78% 52%" }}
        >
          <Image
            src="/themes/neon-club-poster.webp"
            alt="Wet alley at night, wheat-pasted posters and a club doorway lit in magenta and cyan neon"
            fill
            sizes="100vw"
            preload
            className="neon-club-alley-photo"
          />
        </motion.div>
        <div className={`neon-tunnel ${paused ? "is-paused" : ""}`} aria-hidden="true">
          {[0, 1, 2, 3, 4].map((frame) => (
            <span key={frame} style={{ animationDelay: `${frame * -1.6}s` }} />
          ))}
        </div>
        <div className="neon-scanlines" aria-hidden="true" />
        <motion.div className="neon-club-bill" style={{ x: billX, y: billY }}>
          <NeonClubCopy />
          <div className="neon-ticket-stage">
            <NeonTicketMark />
            <motion.span className="neon-scan-beam" style={{ x: scanX }} aria-hidden />
            <motion.span
              className="neon-admit-stamp"
              style={{ scale: stampScale, rotate: stampRotate }}
              aria-hidden
            >
              ADMITTED
            </motion.span>
          </div>
        </motion.div>
        <div className="neon-rope-row" aria-hidden="true">
          <motion.span className="neon-rope neon-rope-left" style={{ x: ropeLeft }} />
          <motion.span className="neon-rope neon-rope-right" style={{ x: rope }} />
        </div>
      </motion.div>

      <motion.div
        className="neon-door-anchor"
        style={{ scale: frameScale }}
        aria-hidden
      >
        <NeonDoorFrame />
      </motion.div>

      <div className="neon-led-bar" aria-hidden="true">
        <motion.span className="neon-led neon-led-scan" style={{ scale: scanLed }}>
          SCAN TICKET
        </motion.span>
        <motion.span className="neon-led neon-led-in" style={{ scale: inLed }}>
          ADMITTED · ROOM 02
        </motion.span>
      </div>

      <button
        type="button"
        className="neon-motion-toggle"
        aria-pressed={paused}
        onClick={onTogglePaused}
      >
        {paused ? "Play atmosphere" : "Pause atmosphere"}
      </button>

      <p className="neon-scroll-cue">Walk the alley</p>
    </div>
  );
}

function NeonClubVeil({ paused }: { paused: boolean }) {
  return (
    <div className="neon-club-veil">
      <div className="neon-club-alley">
        <Image
          src="/themes/neon-club-poster.webp"
          alt="Wet alley at night, wheat-pasted posters and a club doorway lit in magenta and cyan neon"
          fill
          sizes="100vw"
          preload
          className="neon-club-alley-photo"
        />
      </div>
      <div className={`neon-tunnel ${paused ? "is-paused" : ""}`} aria-hidden="true">
        {[0, 1, 2, 3, 4].map((frame) => (
          <span key={frame} style={{ animationDelay: `${frame * -1.6}s` }} />
        ))}
      </div>
      <div className="neon-scanlines" aria-hidden="true" />
    </div>
  );
}

function NeonClubBill() {
  return (
    <div className="neon-club-bill">
      <NeonClubCopy />
      <div className="neon-ticket-stage">
        <NeonTicketMark />
      </div>
    </div>
  );
}

function NeonClubCopy() {
  return (
    <div className="neon-club-copy">
      <p className="neon-club-kicker">Tonight · YYC · Room 02</p>
      <NeonSignMark />
      <HeroCopy
        headingClassName="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold leading-tight text-foreground"
        bodyClassName="mt-4 max-w-lg text-base leading-relaxed text-foreground/75"
      />
      <HeroActions
        primaryClassName="rounded-[var(--radius-button)] bg-[color:var(--volt)] px-6 py-3 text-sm font-semibold text-[color:var(--accent-ink)] shadow-[0_0_18px_color-mix(in_oklab,var(--volt)_55%,transparent)] transition-transform hover:-translate-y-0.5"
        secondaryClassName="rounded-[var(--radius-button)] border-[length:var(--border-width)] border-[color:var(--signal)] px-6 py-3 text-sm font-semibold text-foreground shadow-[0_0_14px_color-mix(in_oklab,var(--signal)_35%,transparent)]"
      />
    </div>
  );
}

function NeonDoorFrame() {
  return (
    <svg className="neon-door-frame" viewBox="0 0 220 340" role="presentation">
      <path
        className="neon-tube neon-tube-magenta"
        d="M36 328 V 78 Q 36 22 110 22 Q 184 22 184 78 V 328"
      />
      <path
        className="neon-tube neon-tube-cyan"
        d="M54 328 V 90 Q 54 44 110 44 Q 166 44 166 90 V 328"
      />
    </svg>
  );
}
