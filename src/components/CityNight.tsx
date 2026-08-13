import type { CSSProperties } from "react";
import { CityRise } from "@/components/CityRise";

const NIGHT_STARS = [
  { cx: 1073, cy: 473, r: 1.15, delay: "0.00s", duration: "3.00s" },
  { cx: 737, cy: 862, r: 0.5, delay: "0.40s", duration: "3.55s" },
  { cx: 46, cy: 144, r: 0.5, delay: "0.80s", duration: "4.10s" },
  { cx: 286, cy: 383, r: 0.75, delay: "1.20s", duration: "4.65s" },
  { cx: 1314, cy: 648, r: 0.5, delay: "1.60s", duration: "5.20s" },
  { cx: 8, cy: 208, r: 0.5, delay: "2.00s", duration: "3.00s" },
  { cx: 294, cy: 144, r: 0.75, delay: "2.40s", duration: "3.55s" },
  { cx: 707, cy: 689, r: 1.15, delay: "2.80s", duration: "4.10s" },
  { cx: 1483, cy: 431, r: 0.5, delay: "0.00s", duration: "4.65s" },
  { cx: 695, cy: 796, r: 0.75, delay: "0.40s", duration: "5.20s" },
  { cx: 1031, cy: 610, r: 0.5, delay: "0.80s", duration: "3.00s" },
  { cx: 516, cy: 89, r: 0.5, delay: "1.20s", duration: "3.55s" },
  { cx: 1217, cy: 89, r: 0.75, delay: "1.60s", duration: "4.10s" },
  { cx: 890, cy: 426, r: 0.5, delay: "2.00s", duration: "4.65s" },
  { cx: 1057, cy: 546, r: 1.15, delay: "2.40s", duration: "5.20s" },
  { cx: 929, cy: 539, r: 0.75, delay: "2.80s", duration: "3.00s" },
  { cx: 1383, cy: 611, r: 0.5, delay: "0.00s", duration: "3.55s" },
  { cx: 1071, cy: 829, r: 0.5, delay: "0.40s", duration: "4.10s" },
  { cx: 807, cy: 386, r: 0.75, delay: "0.80s", duration: "4.65s" },
  { cx: 1599, cy: 251, r: 0.5, delay: "1.20s", duration: "5.20s" },
  { cx: 1341, cy: 542, r: 0.5, delay: "1.60s", duration: "3.00s" },
  { cx: 928, cy: 628, r: 1.15, delay: "2.00s", duration: "3.55s" },
  { cx: 1576, cy: 44, r: 0.5, delay: "2.40s", duration: "4.10s" },
  { cx: 1157, cy: 489, r: 0.5, delay: "2.80s", duration: "4.65s" },
] as const;

export function NightBackdrop() {
  const stars = NIGHT_STARS;

  return (
    <div
      className="night-live pointer-events-none fixed inset-0 z-0 opacity-40"
      aria-hidden
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {stars.map((star) => (
          <circle
            key={`${star.cx}-${star.cy}`}
            className="hero-star"
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill="#eef4ff"
            style={
              {
                "--star-delay": star.delay,
                "--star-duration": star.duration,
              } as CSSProperties
            }
          />
        ))}
      </svg>
    </div>
  );
}

type SkylineBandProps = {
  id: string;
  flip?: boolean;
  anchor?: "top" | "bottom";
  compact?: boolean;
  className?: string;
};

export function SkylineBand({
  id,
  flip = false,
  anchor = "top",
  compact = false,
  className = "",
}: SkylineBandProps) {
  const windows = `${id}-windows`;
  const glass = `${id}-glass`;

  return (
    <div
      className={`night-live pointer-events-none absolute inset-x-0 overflow-hidden ${
        compact ? "h-20 sm:h-24" : "h-36 sm:h-44"
      } ${anchor === "bottom" ? "bottom-0" : "top-0"} ${className}`}
      aria-hidden
    >
      <CityRise className="h-full w-full">
      <svg
        className={`h-full w-full ${flip ? "-scale-x-100" : ""}`}
        viewBox="0 0 1600 160"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id={glass} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(47,123,255,0.22)" />
            <stop offset="100%" stopColor="#0c1a2e" />
          </linearGradient>
          <pattern
            id={windows}
            width="12"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="2.5"
              y="3"
              width="2"
              height="2.8"
              fill="rgba(238,244,255,0.16)"
            />
            <rect
              x="7"
              y="9"
              width="2"
              height="2.8"
              fill="rgba(245,197,24,0.2)"
            />
          </pattern>
        </defs>

        <g fill="#0a1628">
          <rect x="40" y="118" width="54" height="42" />
          <rect x="102" y="102" width="36" height="58" />
          <rect x="148" y="124" width="70" height="36" />
          <rect x="520" y="108" width="28" height="52" />
          <rect x="720" y="96" width="22" height="64" />
          <rect x="1188" y="110" width="40" height="50" />
          <rect x="1410" y="104" width="32" height="56" />
        </g>
        <g fill="#0c1a2e">
          <rect x="760" y="72" width="34" height="88" />
          <path d="M804 160 L 808 48 C 818 28, 868 24, 892 58 L 886 160 Z" />
          <rect x="980" y="36" width="40" height="124" />
          <path d="M1032 160 L 1044 54 L 1068 54 L 1056 160 Z" />
          <rect x="1120" y="78" width="24" height="82" />
          <polygon points="1120,78 1132,60 1144,78" />
          <rect x="1148" y="86" width="24" height="74" />
          <polygon points="1148,86 1160,70 1172,86" />
          <rect x="1288" y="64" width="20" height="96" />
          <rect x="1460" y="80" width="38" height="80" />
        </g>
        <g fill={`url(#${windows})`} opacity="0.8">
          <rect x="760" y="72" width="34" height="88" />
          <path d="M804 160 L 808 48 C 818 28, 868 24, 892 58 L 886 160 Z" />
          <rect x="980" y="36" width="40" height="124" />
          <rect x="1120" y="78" width="24" height="82" />
          <rect x="1148" y="86" width="24" height="74" />
          <rect x="1288" y="64" width="20" height="96" />
        </g>
        <path
          d="M804 160 L 808 48 C 818 28, 868 24, 892 58 L 886 160 Z"
          fill={`url(#${glass})`}
          opacity="0.45"
        />
        <polygon
          points="1120,78 1132,60 1144,78"
          fill="rgba(245,197,24,0.2)"
        />
        <polygon
          points="1148,86 1160,70 1172,86"
          fill="rgba(245,197,24,0.16)"
        />

        <rect x="928" y="22" width="6" height="138" fill="#0c1a2e" />
        <ellipse
          className="hero-tower-ring"
          cx="931"
          cy="34"
          rx="16"
          ry="5"
          fill="#0c1a2e"
          stroke="rgba(245,197,24,0.65)"
          strokeWidth="1.1"
        />
        <line
          x1="931"
          y1="22"
          x2="931"
          y2="8"
          stroke="rgba(238,244,255,0.4)"
          strokeWidth="1"
        />
        <circle
          className="hero-beacon-glow"
          cx="931"
          cy="8"
          r="6"
          fill="rgba(245,197,24,0.3)"
        />
        <circle className="hero-beacon" cx="931" cy="8" r="1.7" fill="#f5c518" />

        <rect
          className="hero-window"
          x="772"
          y="88"
          width="2.5"
          height="4"
          fill="#f5c518"
        />
        <rect
          className="hero-window"
          x="784"
          y="108"
          width="2.5"
          height="4"
          fill="#f5c518"
          style={{ animationDelay: "0.7s" }}
        />
        <rect
          className="hero-window"
          x="990"
          y="58"
          width="3"
          height="5"
          fill="#f5c518"
          style={{ animationDelay: "1.2s" }}
        />
        <rect
          className="hero-window"
          x="1002"
          y="86"
          width="2.5"
          height="4"
          fill="#f5c518"
          style={{ animationDelay: "2.4s" }}
        />
        <rect
          className="hero-window"
          x="1296"
          y="84"
          width="2.5"
          height="4"
          fill="#f5c518"
          style={{ animationDelay: "2s" }}
        />
        <rect
          className="hero-window"
          x="1302"
          y="108"
          width="2.5"
          height="4"
          fill="#f5c518"
          style={{ animationDelay: "3.1s" }}
        />
        <path
          className="hero-traffic"
          d="M 0 152 H 1600"
          fill="none"
          stroke="rgba(245,197,24,0.55)"
          strokeWidth="1.2"
          strokeDasharray="28 480"
          style={
            {
              "--traffic-duration": "18s",
              "--traffic-delay": "-4s",
            } as CSSProperties
          }
        />
      </svg>
      </CityRise>
    </div>
  );
}

type ChinookGlowProps = {
  className?: string;
  align?: "center" | "start";
};

export function ChinookGlow({
  className = "",
  align = "center",
}: ChinookGlowProps) {
  const glowPath =
    align === "start"
      ? "M-80 250 C 120 120, 560 70, 1680 260"
      : "M-80 230 C 320 40, 1280 20, 1680 240";
  const linePath =
    align === "start"
      ? "M-80 252 C 140 148, 540 98, 1680 262"
      : "M-80 232 C 340 70, 1260 50, 1680 242";

  return (
    <svg
      className={`night-live pointer-events-none absolute inset-x-0 top-0 h-64 w-full sm:h-80 ${className}`}
      viewBox="0 0 1600 320"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden
    >
      <g className="hero-chinook-group">
        <path
          className="hero-chinook-glow"
          d={glowPath}
          fill="none"
          stroke="rgba(245,197,24,0.16)"
          strokeWidth="40"
        />
        <path
          className="hero-chinook"
          d={linePath}
          fill="none"
          stroke="rgba(245,197,24,0.32)"
          strokeWidth="2.5"
        />
      </g>
    </svg>
  );
}

export function ContactCity() {
  return (
    <div
      className="night-live pointer-events-none absolute inset-0"
      aria-hidden
    >
      <CityRise className="absolute inset-0">
      <svg
        className="absolute inset-y-0 right-0 h-full w-[70%] [mask-image:linear-gradient(to_right,transparent,black_28%)]"
        viewBox="0 0 720 420"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="contact-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(47,123,255,0.3)" />
            <stop offset="100%" stopColor="rgba(7,17,31,0.2)" />
          </linearGradient>
        </defs>

        <g className="hero-chinook-group">
          <path
            className="hero-chinook-glow"
            d="M 40 90 C 220 10, 520 6, 740 100"
            fill="none"
            stroke="rgba(245,197,24,0.22)"
            strokeWidth="28"
          />
          <path
            className="hero-chinook"
            d="M 40 92 C 230 28, 510 22, 740 102"
            fill="none"
            stroke="rgba(245,197,24,0.5)"
            strokeWidth="2.2"
          />
        </g>

        <g fill="rgba(7,17,31,0.55)">
          <rect x="80" y="268" width="48" height="72" />
          <rect x="138" y="248" width="32" height="92" />
          <rect x="178" y="278" width="58" height="62" />
          <rect x="248" y="220" width="36" height="120" />
          <path d="M292 340 L 296 168 C 308 138, 360 132, 388 176 L 382 340 Z" />
          <rect x="430" y="148" width="44" height="192" />
          <path d="M486 340 L 500 176 L 528 176 L 514 340 Z" />
          <rect x="548" y="214" width="26" height="126" />
          <polygon points="548,214 561,190 574,214" />
          <rect x="578" y="226" width="26" height="114" />
          <polygon points="578,226 591,204 604,226" />
          <rect x="628" y="198" width="22" height="142" />
          <rect x="668" y="236" width="40" height="104" />
        </g>

        <path
          d="M292 340 L 296 168 C 308 138, 360 132, 388 176 L 382 340 Z"
          fill="url(#contact-glass)"
        />
        <polygon
          points="548,214 561,190 574,214"
          fill="rgba(245,197,24,0.28)"
        />
        <polygon
          points="578,226 591,204 604,226"
          fill="rgba(245,197,24,0.2)"
        />

        <rect x="396" y="128" width="7" height="212" fill="rgba(7,17,31,0.7)" />
        <ellipse
          className="hero-tower-ring"
          cx="399.5"
          cy="146"
          rx="20"
          ry="6"
          fill="rgba(7,17,31,0.8)"
          stroke="rgba(245,197,24,0.7)"
          strokeWidth="1.2"
        />
        <line
          x1="399.5"
          y1="128"
          x2="399.5"
          y2="108"
          stroke="rgba(238,244,255,0.5)"
          strokeWidth="1.1"
        />
        <circle
          className="hero-beacon-glow"
          cx="399.5"
          cy="108"
          r="8"
          fill="rgba(245,197,24,0.35)"
        />
        <circle
          className="hero-beacon"
          cx="399.5"
          cy="108"
          r="2"
          fill="#f5c518"
        />

        <rect
          className="hero-window"
          x="258"
          y="240"
          width="3"
          height="5"
          fill="#f5c518"
        />
        <rect
          className="hero-window"
          x="266"
          y="268"
          width="2.5"
          height="4"
          fill="#f5c518"
          style={{ animationDelay: "0.6s" }}
        />
        <rect
          className="hero-window"
          x="440"
          y="176"
          width="3.5"
          height="6"
          fill="#f5c518"
          style={{ animationDelay: "1.1s" }}
        />
        <rect
          className="hero-window"
          x="452"
          y="214"
          width="3"
          height="5"
          fill="#f5c518"
          style={{ animationDelay: "2.3s" }}
        />
        <rect
          className="hero-window"
          x="636"
          y="220"
          width="3"
          height="5"
          fill="#f5c518"
          style={{ animationDelay: "1.8s" }}
        />
        <rect
          className="hero-window"
          x="644"
          y="252"
          width="2.5"
          height="4"
          fill="#f5c518"
          style={{ animationDelay: "3s" }}
        />
        <path
          className="hero-traffic"
          d="M 40 336 H 720"
          fill="none"
          stroke="rgba(245,197,24,0.55)"
          strokeWidth="1.3"
          strokeDasharray="24 360"
          style={
            {
              "--traffic-duration": "14s",
              "--traffic-delay": "-3s",
            } as CSSProperties
          }
        />
      </svg>
      </CityRise>
    </div>
  );
}
