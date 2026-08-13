const STARS = Array.from({ length: 34 }, (_, i) => {
  const n = (i + 1) * 12.9898;
  const x = Math.abs((Math.sin(n) * 43758.5453) % 1);
  const y = Math.abs((Math.sin(n * 1.71) * 23421.631) % 1);
  return {
    cx: x * 1600,
    cy: 16 + y * 300,
    r: i % 7 === 0 ? 1.3 : i % 3 === 0 ? 0.85 : 0.55,
    delay: `${(i % 8) * 0.42}s`,
    duration: `${2.6 + (i % 5) * 0.55}s`,
  };
});

const WINDOWS = [
  { x: 772, y: 168, w: 3, h: 5, delay: "0.2s" },
  { x: 786, y: 196, w: 3, h: 5, delay: "1.1s" },
  { x: 844, y: 132, w: 3.5, h: 6, delay: "0.6s" },
  { x: 868, y: 178, w: 3, h: 5, delay: "1.8s" },
  { x: 1082, y: 88, w: 4, h: 6, delay: "0.4s" },
  { x: 1096, y: 124, w: 3, h: 5, delay: "2.2s" },
  { x: 1074, y: 168, w: 3, h: 5, delay: "1.4s" },
  { x: 1148, y: 118, w: 3, h: 5, delay: "0.9s" },
  { x: 1248, y: 156, w: 3, h: 5, delay: "1.6s" },
  { x: 1288, y: 172, w: 3, h: 5, delay: "0.3s" },
  { x: 1404, y: 128, w: 3, h: 5, delay: "2s" },
  { x: 1512, y: 154, w: 3, h: 5, delay: "1.2s" },
] as const;

type HeroSceneProps = {
  animate: boolean;
};

export function HeroScene({ animate }: HeroSceneProps) {
  return (
    <div
      className={animate ? "hero-scene hero-scene-live" : "hero-scene"}
      aria-hidden
    >
      <svg
        className="hero-scene-sky"
        viewBox="0 0 1600 420"
        preserveAspectRatio="xMidYMin slice"
      >
        {STARS.map((star) => (
          <circle
            key={`${star.cx}-${star.cy}`}
            className="hero-star"
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill="#eef4ff"
            style={{
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}

        <path
          className="hero-chinook-glow"
          d="M-80 290 C 280 40, 1320 20, 1680 310"
          fill="none"
          stroke="rgba(245,197,24,0.28)"
          strokeWidth="46"
        />
        <path
          className="hero-chinook"
          d="M-80 292 C 300 78, 1300 58, 1680 312"
          fill="none"
          stroke="rgba(245,197,24,0.55)"
          strokeWidth="3.5"
        />
        <path
          d="M-80 248 C 320 20, 1280 8, 1680 268"
          fill="none"
          stroke="rgba(12,26,46,0.55)"
          strokeWidth="70"
        />

        <ellipse
          className="hero-cloud"
          cx="240"
          cy="92"
          rx="160"
          ry="22"
          fill="rgba(238,244,255,0.05)"
        />
        <ellipse
          className="hero-cloud"
          cx="1180"
          cy="70"
          rx="210"
          ry="26"
          fill="rgba(238,244,255,0.04)"
          style={{ animationDelay: "-18s" }}
        />
      </svg>

      <svg
        className="hero-scene-city"
        viewBox="0 0 1600 480"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="hero-mountain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(47,123,255,0.16)" />
            <stop offset="100%" stopColor="rgba(7,17,31,0.0)" />
          </linearGradient>
          <linearGradient id="hero-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(47,123,255,0.28)" />
            <stop offset="55%" stopColor="rgba(12,26,46,0.92)" />
            <stop offset="100%" stopColor="#07111f" />
          </linearGradient>
          <linearGradient id="hero-tower-glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(47,123,255,0.2)" />
            <stop offset="50%" stopColor="rgba(238,244,255,0.08)" />
            <stop offset="100%" stopColor="rgba(7,17,31,0.95)" />
          </linearGradient>
          <pattern
            id="hero-windows"
            width="14"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="3"
              y="4"
              width="2.4"
              height="3.2"
              fill="rgba(238,244,255,0.16)"
            />
            <rect
              x="8.5"
              y="11"
              width="2.4"
              height="3.2"
              fill="rgba(245,197,24,0.2)"
            />
          </pattern>
          <linearGradient id="hero-river" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(47,123,255,0.16)" />
            <stop offset="28%" stopColor="rgba(7,17,31,0.55)" />
            <stop offset="100%" stopColor="rgba(5,11,20,0)" />
          </linearGradient>
          <linearGradient id="hero-reflection" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(245,197,24,0.28)" />
            <stop offset="100%" stopColor="rgba(245,197,24,0)" />
          </linearGradient>
        </defs>

        <path
          d="M0 300 L 90 214 L 168 258 L 270 168 L 360 236 L 470 148 L 560 228 L 680 188 L 780 300 Z"
          fill="url(#hero-mountain)"
        />
        <path
          d="M0 300 L 70 246 L 150 272 L 240 210 L 330 268 L 430 198 L 520 260 L 640 230 L 760 300 Z"
          fill="rgba(7,17,31,0.45)"
        />

        <g fill="#0a1628">
          <rect x="40" y="248" width="72" height="52" />
          <rect x="124" y="228" width="54" height="72" />
          <rect x="188" y="256" width="88" height="44" />
          <rect x="720" y="214" width="38" height="86" />
          <rect x="932" y="188" width="20" height="112" />
          <rect x="1172" y="206" width="46" height="94" />
          <rect x="1316" y="228" width="68" height="72" />
          <rect x="1488" y="196" width="34" height="104" />
        </g>

        <g fill="#0c1a2e">
          <rect x="756" y="156" width="44" height="144" />
          <path d="M808 300 L 814 98 C 828 52, 900 44, 938 108 L 928 300 Z" />
          <rect x="1062" y="58" width="52" height="242" />
          <path d="M1128 300 L 1144 96 L 1178 96 L 1162 300 Z" />
          <rect x="1234" y="148" width="32" height="152" />
          <polygon points="1234,148 1250,118 1266,148" />
          <rect x="1272" y="160" width="32" height="140" />
          <polygon points="1272,160 1288,132 1304,160" />
          <rect x="1392" y="108" width="26" height="192" />
          <rect x="1498" y="140" width="48" height="160" />
        </g>

        <g fill="url(#hero-windows)" opacity="0.85">
          <rect x="756" y="156" width="44" height="144" />
          <path d="M808 300 L 814 98 C 828 52, 900 44, 938 108 L 928 300 Z" />
          <rect x="1062" y="58" width="52" height="242" />
          <path d="M1128 300 L 1144 96 L 1178 96 L 1162 300 Z" />
          <rect x="1234" y="148" width="32" height="152" />
          <rect x="1272" y="160" width="32" height="140" />
          <rect x="1392" y="108" width="26" height="192" />
        </g>

        <path
          d="M808 300 L 814 98 C 828 52, 900 44, 938 108 L 928 300 Z"
          fill="url(#hero-glass)"
          opacity="0.55"
        />
        <rect
          x="1062"
          y="58"
          width="52"
          height="242"
          fill="url(#hero-tower-glass)"
          opacity="0.45"
        />
        <polygon
          points="1234,148 1250,118 1266,148"
          fill="rgba(245,197,24,0.22)"
        />
        <polygon
          points="1272,160 1288,132 1304,160"
          fill="rgba(245,197,24,0.18)"
        />

        <g className="hero-tower">
          <rect
            x="1004"
            y="36"
            width="8"
            height="264"
            fill="url(#hero-tower-glass)"
          />
          <rect x="1005" y="36" width="6" height="264" fill="#0c1a2e" />
          <ellipse
            cx="1008"
            cy="58"
            rx="27"
            ry="8"
            fill="#0c1a2e"
            stroke="rgba(245,197,24,0.45)"
            strokeWidth="1.4"
          />
          <ellipse
            className="hero-tower-ring"
            cx="1008"
            cy="58"
            rx="27"
            ry="8"
            fill="none"
            stroke="rgba(245,197,24,0.7)"
            strokeWidth="1.2"
          />
          <line
            x1="1008"
            y1="36"
            x2="1008"
            y2="8"
            stroke="rgba(238,244,255,0.45)"
            strokeWidth="1.2"
          />
          <circle
            className="hero-beacon-glow"
            cx="1008"
            cy="8"
            r="9"
            fill="rgba(245,197,24,0.35)"
          />
          <circle
            className="hero-beacon"
            cx="1008"
            cy="8"
            r="2.3"
            fill="#f5c518"
          />
        </g>

        {WINDOWS.map((window) => (
          <rect
            key={`${window.x}-${window.y}`}
            className="hero-window"
            x={window.x}
            y={window.y}
            width={window.w}
            height={window.h}
            fill="#f5c518"
            style={{ animationDelay: window.delay }}
          />
        ))}

        <g fill="#07111f">
          <rect x="688" y="262" width="96" height="38" />
          <rect x="1088" y="270" width="128" height="30" />
          <rect x="1348" y="252" width="170" height="48" />
        </g>

        <rect x="0" y="300" width="1600" height="180" fill="url(#hero-river)" />
        <rect
          className="hero-shimmer"
          x="980"
          y="302"
          width="6"
          height="70"
          fill="url(#hero-reflection)"
        />
        <rect
          className="hero-shimmer"
          x="848"
          y="304"
          width="36"
          height="46"
          fill="url(#hero-reflection)"
          opacity="0.45"
          style={{ animationDelay: "-1.4s" }}
        />
        <rect
          className="hero-shimmer"
          x="1068"
          y="304"
          width="40"
          height="52"
          fill="rgba(47,123,255,0.12)"
          style={{ animationDelay: "-2.1s" }}
        />
        <path
          className="hero-shimmer"
          d="M 40 318 H 1560"
          stroke="rgba(238,244,255,0.08)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
