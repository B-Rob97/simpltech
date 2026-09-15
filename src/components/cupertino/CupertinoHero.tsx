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
          <CupertinoPhone />
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
  const [endScale, setEndScale] = useState(3.8);

  const { scrollYProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  const copyY = useTransform(scrollYProgress, [0, 0.22], [0, -56]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.16, 0.24], [1, 0.2, 0]);
  const copyScale = useTransform(scrollYProgress, [0, 0.24], [1, 0.94]);
  const phoneX = useTransform(scrollYProgress, [0, 0.32], [0, 72]);
  const phoneOpacity = useTransform(scrollYProgress, [0.04, 0.3], [1, 0]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.32], [1, 0.82]);
  const laptopScale = useTransform(scrollYProgress, [0.1, 0.84], [1, endScale]);
  const laptopY = useTransform(scrollYProgress, [0, 0.28], [28, 0]);
  const bootY = useTransform(scrollYProgress, [0.16, 0.4], ["0%", "-108%"]);
  const chromeOpacity = useTransform(scrollYProgress, [0.78, 0.94], [1, 0]);
  const pinOpacity = useTransform(scrollYProgress, [0.9, 0.99], [1, 0]);
  const shineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.45], [1, 0.7, 0]);

  const alignPortal = useCallback(() => {
    const screen = screenRef.current;
    const clip = clipRef.current;
    const world = worldRef.current;
    const pin = pinRef.current;
    if (!screen || !clip || !world || !pin) return;

    const glass = screen.getBoundingClientRect();
    const frame = pin.getBoundingClientRect();
    const x = glass.left - frame.left;
    const y = glass.top - frame.top;
    clip.style.left = `${x}px`;
    clip.style.top = `${y}px`;
    clip.style.width = `${glass.width}px`;
    clip.style.height = `${glass.height}px`;
    clip.style.borderRadius = `${Math.min(glass.width * 0.018, 14)}px`;
    world.style.width = `${frame.width}px`;
    world.style.minHeight = `${frame.height}px`;
    world.style.transform = `translate(${-x}px, ${-y}px)`;
  }, []);

  const measureScale = useCallback(() => {
    const screen = screenRef.current;
    const laptop = laptopRef.current;
    if (!screen || !laptop) return;
    const baseWidth = screen.offsetWidth;
    const baseHeight = screen.offsetHeight;
    if (baseWidth < 8 || baseHeight < 8) return;
    setEndScale(
      Math.max(window.innerWidth / baseWidth, window.innerHeight / baseHeight) *
        1.03,
    );
  }, []);

  useLayoutEffect(() => {
    measureScale();
    alignPortal();
    window.addEventListener("resize", measureScale);
    window.addEventListener("resize", alignPortal);
    return () => {
      window.removeEventListener("resize", measureScale);
      window.removeEventListener("resize", alignPortal);
    };
  }, [alignPortal, measureScale]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    alignPortal();
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
          className="cupertino-copy"
          style={{ y: copyY, opacity: copyOpacity, scale: copyScale }}
        >
          <CupertinoCopy />
        </motion.div>

        <div className="cupertino-stage">
          <motion.div
            className="cupertino-phone-wrap"
            style={{ x: phoneX, opacity: phoneOpacity, scale: phoneScale }}
          >
            <CupertinoPhone />
          </motion.div>

          <motion.div
            ref={laptopRef}
            className="cupertino-laptop"
            style={{ scale: laptopScale, y: laptopY, ...laptopOrigin }}
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
              <motion.div className="cupertino-boot-shift" style={{ y: bootY }}>
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

        <div
          ref={clipRef}
          className="cupertino-section-clip"
          aria-hidden
        >
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
      sizes="(max-width: 767px) 140vw, 90vw"
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
