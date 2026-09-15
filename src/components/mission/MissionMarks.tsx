import Image from "next/image";
import type { CSSProperties } from "react";

const STARS = [
  [12, 18],
  [28, 42],
  [46, 22],
  [63, 58],
  [71, 16],
  [84, 44],
  [18, 72],
  [38, 64],
] as const;

export function OrbitField({
  selected = 0,
  preview = false,
}: {
  selected?: number;
  preview?: boolean;
}) {
  return (
    <div className={`mc-orbit-field ${preview ? "is-preview" : ""}`} aria-hidden>
      <div className="mc-orbit-ring ring-outer" />
      <div className="mc-orbit-ring ring-middle" />
      <div className="mc-orbit-ring ring-inner" />
      <div className="mc-orbit-axis" />
      <div className="mc-orbit-sweep" />
      <div className="mc-sat-path sat-outer">
        <i className="mc-sat" />
      </div>
      <div className="mc-sat-path sat-mid">
        <i className="mc-sat sat-signal" />
      </div>
      <div className="mc-orbit-center">
        <span>ST</span>
        <small>Ideas into reality</small>
      </div>
      <span className="mc-map-label">
        {preview ? "Incoming deck / Flight portfolio" : "Project navigation / Select a point"}
      </span>
      <span className="mc-map-coordinate">
        YYC / {String(selected + 1).padStart(2, "0")} · 08
      </span>
    </div>
  );
}

export function LaunchTrajectory() {
  return (
    <svg className="mc-trajectory" viewBox="0 0 320 220" aria-hidden>
      <path className="mc-trajectory-grid" d="M20 20h280M20 70h280M20 120h280M20 170h280M40 10v200M120 10v200M200 10v200M280 10v200" />
      <path className="mc-trajectory-path" d="M36 188 C 90 180, 110 120, 148 96 C 190 70, 220 48, 286 28" />
      <circle className="mc-trajectory-node n1" cx="36" cy="188" r="5" />
      <circle className="mc-trajectory-node n2" cx="148" cy="96" r="5" />
      <circle className="mc-trajectory-node n3" cx="286" cy="28" r="5" />
      <text x="48" y="208">01 Discovery</text>
      <text x="158" y="88">02 Design</text>
      <text x="232" y="20">03 Liftoff</text>
    </svg>
  );
}

export function MissionPatch() {
  return (
    <div className="mc-studio-seal" aria-hidden>
      <div className="mc-patch-photo">
        <Image
          src="/themes/mission-patch.webp"
          alt=""
          width={640}
          height={640}
          sizes="(max-width: 700px) 180px, 370px"
        />
        <svg className="mc-patch-caption" viewBox="0 0 200 200">
          <defs>
            <path id="mc-patch-arc" d="M34,86 a68,68 0 0,1 132,0" />
          </defs>
          <path className="mc-patch-cover" d="M24,92 a76,76 0 0,1 152,0" />
          <text>
            <textPath href="#mc-patch-arc" startOffset="50%" textAnchor="middle">
              SIMPLTECH
            </textPath>
          </text>
        </svg>
      </div>
      <span>SIMPLTECH / YYC</span>
      <span>Independent by design</span>
    </div>
  );
}

export function ProjectConstellation({ index }: { index: number }) {
  const turn = (index * 37) % 360;
  return (
    <svg
      className="mc-constellation"
      viewBox="0 0 160 90"
      aria-hidden
      style={{ "--mc-constellation-turn": `${turn}deg` } as CSSProperties}
    >
      {STARS.map(([x, y], starIndex) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={starIndex === index % STARS.length ? 2.4 : 1.1}
          className={starIndex === index % STARS.length ? "is-lock" : undefined}
        />
      ))}
      <path d="M12 18 L28 42 L46 22 L63 58 L71 16" />
      <path d="M38 64 L63 58 L84 44" />
    </svg>
  );
}

export function HatchDeckPreview() {
  return (
    <div className="mc-deck-screen" aria-hidden>
      <div className="mc-deck-photo" aria-hidden>
        <Image src="/themes/mission-deck.webp" alt="" fill sizes="100vw" />
      </div>
      <div className="mc-deck-hud">
        <span>Porthole / 01</span>
        <span>Next section on glass</span>
        <span>Flight portfolio</span>
      </div>
      <div className="mc-manifesto-strip mc-manifesto-on-glass">
        <span>Less agency theatre.</span>
        <span aria-hidden>✳</span>
        <span>More liftoff.</span>
        <span className="mc-manifesto-meta">Transmission / Deck incoming</span>
      </div>
      <div className="mc-deck-preview">
        <p className="mc-label">
          <span>01</span>
          Flight portfolio
          <span className="mc-label-rule" aria-hidden />
        </p>
        <div className="mc-section-title">
          <h2>
            Proof of
            <br />
            <em>possibility.</em>
          </h2>
          <p>
            The work map locks onto the glass.
            <br />
            You are boarding the command deck.
          </p>
        </div>
        <div className="mc-orbit-map mc-orbit-map-preview">
          <OrbitField preview selected={0} />
        </div>
      </div>
    </div>
  );
}
