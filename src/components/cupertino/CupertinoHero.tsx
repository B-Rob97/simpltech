"use client";

import {
  motion,
  useAnimationFrame,
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
const SCREEN = {
  left: 0.274,
  top: 0.156,
  width: 0.452,
  height: 0.518,
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
  const staticStory = Boolean(reduceMotion);

  if (staticStory) {
    return <StaticCupertinoHero />;
  }

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
              <CupertinoBootUi />
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
  const screenRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const [endScale, setEndScale] = useState(2.8);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [restY, setRestY] = useState(48);
  const [copyGone, setCopyGone] = useState(false);
  const [phoneGone, setPhoneGone] = useState(false);

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  const copyY = useTransform(scrollYProgress, [0, 0.2], [0, -64]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.14, 0.24], [1, 0.2, 0]);
  const copyScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.96]);
  const phoneX = useTransform(scrollYProgress, [0, 0.28], [0, 80]);
  const phoneOpacity = useTransform(scrollYProgress, [0.02, 0.24], [1, 0]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.28], [1, 0.8]);
  const laptopScale = useTransform(scrollYProgress, [0.1, 0.84], [1, endScale]);
  const laptopX = useTransform(scrollYProgress, [0.1, 0.84], [0, endX]);
  const laptopY = useTransform(scrollYProgress, [0.1, 0.84], [restY, endY]);
  const bootOpacity = useTransform(scrollYProgress, [0.32, 0.5], [1, 0]);
  const bootY = useTransform(scrollYProgress, [0.32, 0.5], ["0%", "-12%"]);
  const chromeOpacity = useTransform(scrollYProgress, [0.8, 0.93], [1, 0]);
  const pinOpacity = useTransform(scrollYProgress, [0.9, 0.995], [1, 0]);
  const shineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.42], [1, 0.55, 0]);

  const alignPortal = useCallback(() => {
    const screen = screenRef.current;
    const clip = clipRef.current;
    const world = worldRef.current;
    const pin = pinRef.current;
    if (!screen || !clip || !world || !pin) return;

    const glass = screen.getBoundingClientRect();
    const frame = pin.getBoundingClientRect();
    const width = Math.max(glass.width, 1);
    const height = Math.max(glass.height, 1);
    const x = glass.left - frame.left;
    const y = glass.top - frame.top;
    clip.style.left = `${x}px`;
    clip.style.top = `${y}px`;
    clip.style.width = `${width}px`;
    clip.style.height = `${height}px`;
    clip.style.borderRadius = `${Math.min(width * 0.02, 16)}px`;

    const pageW = frame.width;
    const pageH = frame.height;
    const fit = Math.min(width / pageW, height / pageH);
    const ox = (width - pageW * fit) / 2;
    const oy = (height - pageH * fit) / 2;
    world.style.width = `${pageW}px`;
    world.style.height = `${pageH}px`;
    world.style.transformOrigin = "0 0";
    world.style.transform = `translate(${ox}px, ${oy}px) scale(${fit})`;
  }, []);

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

    setEndScale(Math.min(pinW / screenW, pinH / screenH));
    setEndX(pinW / 2 - restScreenCX);
    setEndY(pinH / 2 - restScreenCY);
    setRestY(Math.min(pinH * 0.07, 64));
  }, []);

  useLayoutEffect(() => {
    measureZoom();
    alignPortal();
    window.addEventListener("resize", measureZoom);
    window.addEventListener("resize", alignPortal);
    return () => {
      window.removeEventListener("resize", measureZoom);
      window.removeEventListener("resize", alignPortal);
    };
  }, [alignPortal, measureZoom]);

  useAnimationFrame(() => {
    alignPortal();
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    setCopyGone(progress > 0.16);
    setPhoneGone(progress > 0.22);
    if (pinRef.current) {
      pinRef.current.style.pointerEvents = progress > 0.9 ? "none" : "auto";
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
          style={{ y: copyY, opacity: copyOpacity, scale: copyScale }}
        >
          <CupertinoCopy />
        </motion.div>

        <div className="cupertino-stage">
          <motion.div
            className={`cupertino-phone-wrap${phoneGone ? " is-gone" : ""}`}
            style={{ x: phoneX, opacity: phoneOpacity, scale: phoneScale }}
          >
            <CupertinoPhone />
          </motion.div>

          <motion.div
            ref={laptopRef}
            className="cupertino-laptop"
            style={{ x: laptopX, y: laptopY, scale: laptopScale, ...laptopOrigin }}
          >
            <motion.div style={{ opacity: chromeOpacity }}>
              <LaptopChassis />
            </motion.div>
            <div
              ref={screenRef}
              className="cupertino-glass"
              style={screenStyle}
              aria-hidden
            >
              <motion.div
                className="cupertino-boot-shift"
                style={{ y: bootY, opacity: bootOpacity }}
              >
                <CupertinoBootUi />
              </motion.div>
            </div>
            <motion.div
              className="cupertino-shine"
              style={{ opacity: shineOpacity }}
              aria-hidden
            />
          </motion.div>
        </div>

        <div ref={clipRef} className="cupertino-section-clip" aria-hidden>
          <div ref={worldRef} className="cupertino-section-world">
            <CupertinoServicesPreview />
          </div>
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

function CupertinoServicesPreview() {
  return (
    <section className="design-services services-cupertino">
      <div className="design-section-heading">
        <p className="section-kicker">What we do / 02</p>
        <h2>
          Built for speed,
          <br />
          clarity, and growth.
        </h2>
        <p>
          From a launch-ready marketing site to a prototype or custom web app.
          The right platform, thoughtfully built.
        </p>
      </div>
      <div className="service-collection">
        {services.map((service, index) => (
          <article key={service.title} className="service-item">
            <span className="service-number">0{index + 1}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
