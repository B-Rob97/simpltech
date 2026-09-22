"use client";

import { useEffect, useState } from "react";

const lanes = [
  {
    name: "Clarify",
    cards: ["Scope the launch", "Pin the first win"],
    more: ["Map the week", "Name the buyer"],
  },
  {
    name: "Design",
    cards: ["Route the story", "Set the motion"],
    more: ["Lock the type", "Stage the proof"],
  },
  {
    name: "Ship",
    cards: ["Hand off live", "Measure week one"],
    more: ["Wire analytics", "Open the inbox"],
  },
] as const;

const activity = [
  "BrettOS desktop — live",
  "Prism portal — in review",
  "Discovery quote — sent",
  "Calgary studio — on",
] as const;

type SoftProductWindowProps = {
  reduceMotion: boolean;
};

export function SoftProductWindow({ reduceMotion }: SoftProductWindowProps) {
  return (
    <div className="soft-product-window" aria-hidden>
      <div className="soft-product-titlebar">
        <div className="soft-product-lights">
          <span className="is-close" />
          <span className="is-min" />
          <span className="is-max" />
        </div>
        <p className="soft-product-path">
          app.simpltech.ca
          <span className="soft-product-path-view" />
        </p>
        <p className="soft-product-live">
          <i />
          Live
        </p>
      </div>
      <div className="soft-product-shell">
        <nav className="soft-product-rail">
          <span data-item="overview">Overview</span>
          <span data-item="modules">Modules</span>
          <span data-item="pipeline">Pipeline</span>
          <span data-item="ship">Ship</span>
        </nav>
        <div className="soft-product-screen">
          <div className="soft-product-board">
            <div className="soft-product-kpis">
              <Metric
                label="Days to launch"
                value={7}
                suffix="d"
                reduceMotion={reduceMotion}
              />
              <Metric
                label="Sites shipped"
                value={12}
                suffix=""
                reduceMotion={reduceMotion}
              />
              <Metric
                label="LCP target"
                value={98}
                suffix="%"
                reduceMotion={reduceMotion}
              />
            </div>
            <div className="soft-product-chart">
              <div className="soft-product-chart-head">
                <p>Pipeline velocity</p>
                <span>This week</span>
              </div>
              <svg
                className="soft-product-spark"
                viewBox="0 0 360 88"
                fill="none"
              >
                <path
                  className="soft-product-spark-fill"
                  d="M0 70 C 36 70, 48 52, 78 48 C 112 43, 124 62, 158 44 C 190 28, 214 18, 248 26 C 278 33, 300 14, 360 8 V 88 H 0 Z"
                />
                <path
                  className="soft-product-spark-line"
                  d="M0 70 C 36 70, 48 52, 78 48 C 112 43, 124 62, 158 44 C 190 28, 214 18, 248 26 C 278 33, 300 14, 360 8"
                />
              </svg>
            </div>
            <div className="soft-product-lanes">
              {lanes.map((lane) => (
                <div key={lane.name} className="soft-product-lane">
                  <p>{lane.name}</p>
                  {lane.cards.map((card) => (
                    <span key={card} className="soft-product-lane-card">
                      {card}
                    </span>
                  ))}
                  {lane.more.map((card) => (
                    <span key={card} className="soft-product-lane-card is-more">
                      {card}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <ul className="soft-product-activity">
              {activity.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <span className="soft-product-cursor" />
    </div>
  );
}

function Metric({
  label,
  value,
  suffix,
  reduceMotion,
}: {
  label: string;
  value: number;
  suffix: string;
  reduceMotion: boolean;
}) {
  const [shown, setShown] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setShown(value);
      return;
    }

    let frame = 0;
    const started = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - started) / 1100);
      const eased = 1 - (1 - t) ** 3;
      setShown(Math.round(value * eased));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, value]);

  return (
    <article className="soft-product-kpi">
      <p>{label}</p>
      <strong>
        {shown}
        {suffix}
      </strong>
    </article>
  );
}
