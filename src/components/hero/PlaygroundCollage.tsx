"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { siteConfig } from "@/lib/site";

const STICKERS = [
  {
    src: "/themes/playground-star-sticker.webp",
    className: "playground-sticker playground-sticker-star",
    alt: "",
  },
  {
    src: "/themes/playground-smile-sticker.webp",
    className: "playground-sticker playground-sticker-smile",
    alt: "",
  },
  {
    src: "/themes/playground-bolt-sticker.webp",
    className: "playground-sticker playground-sticker-bolt",
    alt: "",
  },
  {
    src: "/themes/playground-burst-sticker.webp",
    className: "playground-sticker playground-sticker-burst",
    alt: "",
  },
] as const;

export function PlaygroundCollage() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <StaticPlaygroundHero />;
  }

  return <PlaygroundPeelStory />;
}

function StaticPlaygroundHero() {
  return (
    <div className="playground-static">
      <CollageWall preload />
      <ScatteredStickers />
      <Polaroid />
      <PlaygroundNote />
    </div>
  );
}

function PlaygroundPeelStory() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [noteLive, setNoteLive] = useState(true);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end start"],
  });

  const growP = useTransform(scrollYProgress, [0.2, 0.86], [0, 1]);
  const frameP = useTransform(scrollYProgress, [0.7, 0.96], [1, 0]);
  const peelRotate = useTransform(scrollYProgress, [0.18, 0.48], [8, -78]);
  const peelSquash = useTransform(scrollYProgress, [0.7, 0.92], [1, 0]);
  const noteX = useTransform(scrollYProgress, [0, 0.42], [0, -460]);
  const noteY = useTransform(scrollYProgress, [0, 0.42], [0, -280]);
  const noteRotate = useTransform(scrollYProgress, [0, 0.42], [-2.5, -28]);
  const tapeStretch = useTransform(scrollYProgress, [0, 0.22], [1, 1.55]);
  const tapeX = useTransform(scrollYProgress, [0.16, 0.4], [0, -90]);
  const tapeRotate = useTransform(scrollYProgress, [0.16, 0.4], [-8, -48]);
  const starX = useTransform(scrollYProgress, [0.12, 0.8], [0, -36]);
  const starY = useTransform(scrollYProgress, [0.12, 0.8], [0, -18]);
  const smileX = useTransform(scrollYProgress, [0.12, 0.8], [0, 42]);
  const smileY = useTransform(scrollYProgress, [0.12, 0.8], [0, -16]);
  const boltX = useTransform(scrollYProgress, [0.12, 0.8], [0, -28]);
  const boltY = useTransform(scrollYProgress, [0.12, 0.8], [0, 36]);
  const burstX = useTransform(scrollYProgress, [0.12, 0.8], [0, 32]);
  const burstY = useTransform(scrollYProgress, [0.12, 0.8], [0, 28]);
  const cueY = useTransform(scrollYProgress, [0, 0.18], [0, 28]);
  const cueScale = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setNoteLive(value < 0.3);
  });

  useMotionValueEvent(growP, "change", (value) => {
    document.documentElement.style.setProperty("--punch-p", String(value));
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--punch-p", "0");
    return () => {
      document.documentElement.style.removeProperty("--punch-p");
    };
  }, []);

  return (
    <div className="playground-pin" ref={pinRef}>
      <motion.div
        className="playground-sticky"
        style={
          {
            "--punch-p": growP,
            "--frame-p": frameP,
          } as CSSProperties
        }
      >
        <CollageWall preload />

        <Polaroid
          peel={
            <motion.span
              className="playground-peel"
              style={{ rotate: peelRotate, scale: peelSquash }}
            />
          }
        />

        <motion.div
          className="playground-sticker playground-sticker-star"
          style={{ x: starX, y: starY }}
          aria-hidden
        >
          <Image
            src="/themes/playground-star-sticker.webp"
            alt=""
            width={1024}
            height={1024}
          />
        </motion.div>
        <motion.div
          className="playground-sticker playground-sticker-smile"
          style={{ x: smileX, y: smileY }}
          aria-hidden
        >
          <Image
            src="/themes/playground-smile-sticker.webp"
            alt=""
            width={1024}
            height={1024}
          />
        </motion.div>
        <motion.div
          className="playground-sticker playground-sticker-bolt"
          style={{ x: boltX, y: boltY }}
          aria-hidden
        >
          <Image
            src="/themes/playground-bolt-sticker.webp"
            alt=""
            width={1024}
            height={1024}
          />
        </motion.div>
        <motion.div
          className="playground-sticker playground-sticker-burst"
          style={{ x: burstX, y: burstY }}
          aria-hidden
        >
          <Image
            src="/themes/playground-burst-sticker.webp"
            alt=""
            width={1024}
            height={1024}
          />
          <span>PLAY</span>
        </motion.div>

        <motion.div
          className={`playground-note ${noteLive ? "is-live" : "is-peeled"}`}
          style={{ x: noteX, y: noteY, rotate: noteRotate }}
        >
          <motion.div
            className="playground-tape"
            style={{ scaleX: tapeStretch, x: tapeX, rotate: tapeRotate }}
            aria-hidden
          >
            <Image
              src="/themes/playground-tape.webp"
              alt=""
              width={1280}
              height={720}
            />
          </motion.div>
          <PlaygroundNoteBody />
        </motion.div>

        <motion.p
          className="playground-peel-cue"
          style={{ y: cueY, scale: cueScale }}
          aria-hidden
        >
          Peel the snapshot
          <span />
        </motion.p>
      </motion.div>
    </div>
  );
}

function CollageWall({ preload = false }: { preload?: boolean }) {
  return (
    <div className="playground-wall">
      <Image
        src="/themes/playground-collage.webp"
        alt="Paper collage of torn color scraps, washi tape, and stickers"
        fill
        sizes="100vw"
        preload={preload}
        className="object-cover"
      />
    </div>
  );
}

function Polaroid({ peel }: { peel?: ReactNode }) {
  return (
    <div className="playground-polaroid">
      <div className="playground-polaroid-tape" aria-hidden>
        <Image
          src="/themes/playground-tape.webp"
          alt=""
          width={1280}
          height={720}
        />
      </div>
      <div className="playground-polaroid-well">
        <Image
          src="/themes/playground-snapshot.webp"
          alt="Snapshot of torn color paper, washi tape, and stickers"
          fill
          sizes="(min-width: 768px) 30vw, 68vw"
          className="object-cover"
        />
      </div>
      <p className="playground-polaroid-caption">Selected work / snapshot 10</p>
      {peel}
    </div>
  );
}

function PlaygroundNote() {
  return (
    <div className="playground-note is-live">
      <div className="playground-tape" aria-hidden>
        <Image
          src="/themes/playground-tape.webp"
          alt=""
          width={1280}
          height={720}
        />
      </div>
      <PlaygroundNoteBody />
    </div>
  );
}

function PlaygroundNoteBody() {
  return (
    <>
      <p className="playground-badge">{siteConfig.name}</p>
      <HeroCopy
        headingClassName="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-foreground"
        bodyClassName="mt-4 text-base leading-relaxed text-foreground/75"
      />
      <HeroActions
        primaryClassName="rounded-[1.4rem] border-[3px] border-foreground bg-[color:var(--volt)] px-6 py-3 text-sm font-semibold text-[color:var(--accent-ink)] shadow-[4px_4px_0_#17130a] transition-transform hover:-translate-y-1 hover:rotate-[-2deg]"
        secondaryClassName="rounded-[1.4rem] border-[3px] border-foreground bg-[#d9f263] px-6 py-3 text-sm font-semibold text-foreground shadow-[4px_4px_0_#17130a] transition-transform hover:-translate-y-1 hover:rotate-[2deg]"
      />
    </>
  );
}

function ScatteredStickers() {
  return (
    <div className="playground-static-stickers" aria-hidden>
      {STICKERS.map((sticker) => (
        <span key={sticker.src} className={sticker.className}>
          <Image src={sticker.src} alt={sticker.alt} width={1024} height={1024} />
          {sticker.className.includes("burst") ? <span>PLAY</span> : null}
        </span>
      ))}
    </div>
  );
}
