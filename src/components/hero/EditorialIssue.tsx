"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { siteConfig } from "@/lib/site";

const CLIP_VARS = [
  "--ed-clip-t",
  "--ed-clip-r",
  "--ed-clip-b",
  "--ed-clip-l",
] as const;

type EditorialIssueProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function EditorialIssue({ sectionRef }: EditorialIssueProps) {
  const reduceMotion = useReducedMotion();
  const issueRef = useRef<HTMLDivElement>(null);
  const wellRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const grow = useTransform(scrollYProgress, [0.02, 0.74], [0, 1]);
  const copyX = useTransform(scrollYProgress, [0.14, 0.4], ["0%", "-115%"]);
  const mastY = useTransform(scrollYProgress, [0.1, 0.34], ["0%", "-180%"]);
  const cueY = useTransform(scrollYProgress, [0.08, 0.28], ["0%", "140%"]);
  const sheetRotateX = useTransform(scrollYProgress, [0.3, 0.58], [0, -84]);
  const sheetRotateZ = useTransform(scrollYProgress, [0.3, 0.58], [0, -4.5]);
  const sheetY = useTransform(scrollYProgress, [0.3, 0.58], ["0%", "-16%"]);
  const photoScale = useTransform(scrollYProgress, [0, 0.32], [1.06, 1.2]);
  const photoShift = useTransform(scrollYProgress, [0, 0.32], ["0%", "-5%"]);

  useEffect(() => {
    const root = document.documentElement;

    const syncWell = () => {
      const well = wellRef.current;
      if (!well || reduceMotion) {
        root.removeAttribute("data-editorial-story");
        return;
      }

      const rect = well.getBoundingClientRect();
      root.style.setProperty("--ed-clip-t", `${Math.max(0, rect.top)}px`);
      root.style.setProperty(
        "--ed-clip-r",
        `${Math.max(0, window.innerWidth - rect.right)}px`,
      );
      root.style.setProperty(
        "--ed-clip-b",
        `${Math.max(0, window.innerHeight - rect.bottom)}px`,
      );
      root.style.setProperty("--ed-clip-l", `${Math.max(0, rect.left)}px`);
    };

    const applyProgress = (value: number) => {
      issueRef.current?.style.setProperty("--ed-grow", String(value));
      syncWell();
    };

    const applyStory = (value: number) => {
      if (reduceMotion) {
        root.removeAttribute("data-editorial-story");
        root.removeAttribute("data-editorial-proof");
        return;
      }
      const heroBottom = sectionRef.current?.getBoundingClientRect().bottom ?? 0;
      const finished = value >= 0.995 || heroBottom <= 0;
      root.dataset.editorialStory = finished ? "done" : "live";
      root.dataset.editorialProof = value >= 0.6 || finished ? "lifted" : "set";
    };

    applyProgress(grow.get());
    applyStory(scrollYProgress.get());

    const unsubGrow = grow.on("change", applyProgress);
    const unsubStory = scrollYProgress.on("change", applyStory);
    window.addEventListener("resize", syncWell);

    return () => {
      unsubGrow();
      unsubStory();
      window.removeEventListener("resize", syncWell);
      root.removeAttribute("data-editorial-story");
      root.removeAttribute("data-editorial-proof");
      for (const name of CLIP_VARS) {
        root.style.removeProperty(name);
      }
    };
  }, [grow, reduceMotion, scrollYProgress, sectionRef]);

  return (
    <div
      ref={issueRef}
      className={
        reduceMotion ? "editorial-issue is-static" : "editorial-issue"
      }
      style={{ "--ed-grow": 0 } as CSSProperties}
    >
      <div className="editorial-stage">
        <motion.header
          className="editorial-masthead"
          style={reduceMotion ? undefined : { y: mastY }}
        >
          <p className="editorial-wordmark">{siteConfig.name}</p>
          <p className="editorial-folio">
            {siteConfig.location} · Vol. 01 · No. 03
          </p>
          <span className="editorial-ink-rule" aria-hidden />
        </motion.header>

        <motion.div
          className="editorial-copy"
          style={reduceMotion ? undefined : { x: copyX }}
        >
          <p className="editorial-kicker">Cover story</p>
          <HeroCopy
            className="editorial-lead"
            headingClassName="editorial-headline"
            bodyClassName="editorial-deck"
          />
          <HeroActions
            className="editorial-actions"
            primaryClassName="editorial-action editorial-action-primary"
            secondaryClassName="editorial-action editorial-action-secondary"
          />
        </motion.div>

        <div className="editorial-plate">
          <div ref={wellRef} className="editorial-well">
            <span className="editorial-crop editorial-crop-tl" aria-hidden />
            <span className="editorial-crop editorial-crop-tr" aria-hidden />
            <span className="editorial-crop editorial-crop-bl" aria-hidden />
            <span className="editorial-crop editorial-crop-br" aria-hidden />
          </div>

          {reduceMotion ? (
            <CoverProof />
          ) : (
            <motion.div
              className="editorial-cover-sheet"
              style={{
                rotateX: sheetRotateX,
                rotateZ: sheetRotateZ,
                y: sheetY,
              }}
            >
              <CoverProof scale={photoScale} shift={photoShift} />
            </motion.div>
          )}
        </div>

        {reduceMotion ? null : (
          <motion.p className="editorial-cue" style={{ y: cueY }}>
            Lift the proof
            <span className="editorial-cue-rule" aria-hidden />
          </motion.p>
        )}
      </div>
    </div>
  );
}

function CoverProof({
  scale,
  shift,
}: {
  scale?: MotionValue<number>;
  shift?: MotionValue<string>;
}) {
  return (
    <figure className="editorial-proof">
      <motion.div
        className="editorial-proof-frame"
        style={scale && shift ? { scale, y: shift } : undefined}
      >
        <Image
          src="/themes/editorial-architecture.webp"
          alt="Sculptural stone staircase framed by a circular skylight and a single black chair"
          width={864}
          height={1152}
          sizes="(max-width: 767px) 100vw, 52vw"
          preload
        />
      </motion.div>
      <figcaption>
        <span>Plate 03 — Gallery stair</span>
        <span>Form / Function</span>
      </figcaption>
    </figure>
  );
}
