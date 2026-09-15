"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { HeroActions, HeroCopy } from "@/components/hero/HeroCopy";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/projects";

// Inner LCD of /themes/cupertino-laptop.webp (1600×900 studio plate).
// Inset from the measured black panel so the UI stays on the glass.
const SCREEN = {
  left: 0.2675,
  top: 0.153,
  width: 0.465,
  height: 0.522,
} as const;

const screenStyle = {
  left: `${SCREEN.left * 100}%`,
  top: `${SCREEN.top * 100}%`,
  width: `${SCREEN.width * 100}%`,
  height: `${SCREEN.height * 100}%`,
} as const;

const laptopOrigin = {
  transformOrigin: `${(SCREEN.left + SCREEN.width / 2) * 100}% ${(SCREEN.top + SCREEN.height / 2) * 100}%`,
} as const;

export function CupertinoHero() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <StaticCupertinoHero />;
  return <CupertinoScrollStory />;
}

function StaticCupertinoHero() {
  return (
    <div className="cupertino-story cupertino-story-static">
      <div className="cupertino-pin">
        <CupertinoCopy />
        <div className="cupertino-stage">
          <div className="cupertino-phone-wrap">
            <CupertinoPhone />
          </div>
          <div className="cupertino-laptop" style={laptopOrigin}>
            <LaptopChassis />
            <div className="cupertino-glass" style={screenStyle}>
              <div className="cupertino-frame">
                <CupertinoBootUi />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CupertinoScrollStory() {
  const storyRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const [endScale, setEndScale] = useState(2.4);
  const [midScale, setMidScale] = useState(1.22);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [restY, setRestY] = useState(48);
  const [copyGone, setCopyGone] = useState(false);
  const [phoneGone, setPhoneGone] = useState(false);
  const [shineGone, setShineGone] = useState(false);
  const [chromeGone, setChromeGone] = useState(false);

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  const copyY = useTransform(scrollYProgress, [0, 0.14], [0, -80]);
  const phoneX = useTransform(scrollYProgress, [0, 0.16], [0, 96]);
  const laptopScale = useTransform(
    scrollYProgress,
    [0.12, 0.4, 0.78],
    [1, midScale, endScale],
  );
  const laptopX = useTransform(
    scrollYProgress,
    [0.12, 0.4, 0.78],
    [0, endX * 0.2, endX],
  );
  const laptopY = useTransform(
    scrollYProgress,
    [0.12, 0.4, 0.78],
    [restY, restY * 0.3, endY],
  );
  const reelY = useTransform(scrollYProgress, [0.48, 0.62], ["0%", "-50%"]);
  const pinOpacity = useTransform(scrollYProgress, [0.94, 1], [1, 0]);

  const measureZoom = useCallback(() => {
    const pin = pinRef.current;
    const laptop = laptopRef.current;
    if (!pin || !laptop) return;

    const pinW = pin.clientWidth;
    const pinH = pin.clientHeight;
    const laptopW = laptop.offsetWidth;
    const laptopH = laptop.offsetHeight;
    if (pinW < 8 || pinH < 8 || laptopW < 8 || laptopH < 8) return;

    const screenW = laptopW * SCREEN.width;
    const screenH = laptopH * SCREEN.height;
    if (screenW < 8 || screenH < 8) return;

    const restLaptopX = (pinW - laptopW) / 2;
    const restLaptopY = (pinH - laptopH) / 2;
    const restScreenCX = restLaptopX + laptopW * (SCREEN.left + SCREEN.width / 2);
    const restScreenCY = restLaptopY + laptopH * (SCREEN.top + SCREEN.height / 2);

    const framed = Math.min(pinW / laptopW, pinH / laptopH);
    setMidScale(Math.max(1, Math.min(1.26, framed * 0.96)));
    setEndScale(Math.min(pinW / screenW, pinH / screenH));
    setEndX(pinW / 2 - restScreenCX);
    setEndY(pinH / 2 - restScreenCY);

    const copyReserve = Math.min(pinH * 0.46, 400);
    const maxTop = Math.max(0, pinH - laptopH - 16);
    setRestY(Math.max(0, Math.min(copyReserve, maxTop) - restLaptopY));
  }, []);

  useLayoutEffect(() => {
    measureZoom();
    window.addEventListener("resize", measureZoom);
    return () => window.removeEventListener("resize", measureZoom);
  }, [measureZoom]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setCopyGone(progress >= 0.15);
    setPhoneGone(progress >= 0.17);
    setShineGone(progress >= 0.12);
    setChromeGone(progress >= 0.88);
    if (pinRef.current) {
      pinRef.current.style.pointerEvents = progress > 0.93 ? "none" : "auto";
    }
  });

  return (
    <div ref={storyRef} className="cupertino-story">
      <motion.div
        ref={pinRef}
        className="cupertino-pin"
        style={{ opacity: pinOpacity }}
      >
        <motion.div
          className={`cupertino-copy${copyGone ? " is-gone" : ""}`}
          style={{ y: copyY }}
        >
          <CupertinoCopy />
        </motion.div>

        <div className="cupertino-stage">
          <motion.div
            className={`cupertino-phone-wrap${phoneGone ? " is-gone" : ""}`}
            style={{ x: phoneX }}
          >
            <CupertinoPhone />
          </motion.div>

          <motion.div
            ref={laptopRef}
            className="cupertino-laptop"
            style={{ x: laptopX, y: laptopY, scale: laptopScale, ...laptopOrigin }}
          >
            <div className={`cupertino-chassis${chromeGone ? " is-gone" : ""}`}>
              <LaptopChassis />
            </div>
            <div className="cupertino-glass" style={screenStyle}>
              <motion.div className="cupertino-reel" style={{ y: reelY }}>
                <div className="cupertino-frame">
                  <CupertinoBootUi />
                </div>
                <div className="cupertino-frame">
                  <CupertinoGlassNext />
                </div>
              </motion.div>
            </div>
            {shineGone ? null : (
              <div className="cupertino-shine" aria-hidden />
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function CupertinoCopy() {
  return (
    <div className="cupertino-copy-inner">
      <p className="cupertino-kicker">{siteConfig.name}</p>
      <HeroCopy
        className="cupertino-headline"
        headingClassName="cupertino-title"
        bodyClassName="cupertino-lede"
      />
      <ul className="cupertino-specs">
        <li>Calgary studio</li>
        <li>Ships in a week</li>
        <li>Clear packs</li>
      </ul>
      <HeroActions className="cupertino-actions" />
    </div>
  );
}

function LaptopChassis() {
  return (
    <Image
      src="/themes/cupertino-laptop.webp"
      alt=""
      width={1600}
      height={900}
      sizes="(max-width: 767px) 160vw, 92vw"
      preload
      className="cupertino-laptop-photo"
    />
  );
}

function CupertinoPhone() {
  return (
    <Image
      src="/themes/cupertino-phone.webp"
      alt=""
      width={864}
      height={1152}
      sizes="180px"
      loading="lazy"
      className="cupertino-phone-photo"
    />
  );
}

function CupertinoBootUi() {
  return (
    <div className="cupertino-boot">
      <div className="cupertino-boot-bar">
        <span>SimplTech</span>
        <span className="cupertino-boot-pips" aria-hidden>
          <i />
          <i />
          <i />
        </span>
      </div>
      <p className="cupertino-boot-kicker">Product launch</p>
      <p className="cupertino-boot-title">A site that feels inevitable.</p>
      <div className="cupertino-boot-metrics">
        <p>
          <strong>7 days</strong>
          <span>Brief to live</span>
        </p>
        <p>
          <strong>$1,490</strong>
          <span>Packs from</span>
        </p>
      </div>
      <div className="cupertino-boot-canvas" aria-hidden>
        <span className="cupertino-boot-pulse" />
      </div>
    </div>
  );
}

function CupertinoGlassNext() {
  return (
    <div className="cupertino-next">
      <p className="cupertino-next-kicker">What we do / 02</p>
      <h2 className="cupertino-next-title">
        Built for speed,
        <br />
        clarity, and growth.
      </h2>
      <p className="cupertino-next-lede">
        From a launch-ready marketing site to a prototype or custom web app.
      </p>
      <ul className="cupertino-next-list">
        {services.slice(0, 3).map((service, index) => (
          <li key={service.title}>
            <span>0{index + 1}</span>
            <strong>{service.title}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
