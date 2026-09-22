"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { NeonSignMark, NeonTicketMark } from "@/components/hero/HeroMarks";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function progressBetween(progress: number, start: number, end: number) {
  return clamp01((progress - start) / (end - start));
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
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = sectionRef.current;
    const stage = stageRef.current;
    if (!hero || !stage) return;

    let frame = 0;
    const apply = () => {
      const travel = Math.max(1, hero.offsetHeight - window.innerHeight);
      const progress = clamp01(-hero.getBoundingClientRect().top / travel);
      const door = progressBetween(progress, 0.24, 0.92);
      stage.style.setProperty("--neon-p", progress.toFixed(4));
      stage.style.setProperty("--neon-scan", progressBetween(progress, 0.02, 0.2).toFixed(4));
      stage.style.setProperty("--neon-stamp", progressBetween(progress, 0.14, 0.28).toFixed(4));
      stage.style.setProperty("--neon-door", door.toFixed(4));
      stage.classList.toggle("is-inside", door > 0.82);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionRef]);

  return (
    <div ref={stageRef} className={`neon-club-stage ${paused ? "is-paused" : ""}`}>
      <div className="neon-club-interior" aria-hidden="true">
        <Image
          src="/themes/neon-club-floor.webp"
          alt=""
          fill
          sizes="100vw"
          className="neon-club-interior-photo"
        />
        <p className="neon-interior-bill">Tonight&apos;s bill</p>
      </div>
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
        <div className="neon-club-bill">
          <NeonClubCopy />
          <div className="neon-ticket-stage">
            <NeonTicketMark />
            <span className="neon-scan-beam" aria-hidden />
            <span className="neon-admit-stamp" aria-hidden>
              ADMITTED
            </span>
          </div>
        </div>
        <div className="neon-rope-row" aria-hidden="true">
          <span className="neon-rope neon-rope-left" />
          <span className="neon-rope neon-rope-right" />
        </div>
      </div>

      <div className="neon-door-anchor" aria-hidden>
        <NeonDoorFrame />
      </div>

      <div className="neon-led-bar" aria-hidden="true">
        <span className="neon-led neon-led-scan">SCAN TICKET</span>
        <span className="neon-led neon-led-in">ADMITTED · ROOM 02</span>
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
