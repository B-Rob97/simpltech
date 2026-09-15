const DUST_MOTES = [
  { left: "18%", delay: "0s", duration: "11s", size: 3 },
  { left: "27%", delay: "1.6s", duration: "13s", size: 2 },
  { left: "41%", delay: "3.1s", duration: "10s", size: 4 },
  { left: "58%", delay: "0.8s", duration: "14s", size: 2 },
  { left: "69%", delay: "2.4s", duration: "12s", size: 3 },
  { left: "76%", delay: "4.2s", duration: "15s", size: 2 },
  { left: "88%", delay: "1.1s", duration: "11s", size: 3 },
] as const;

export function CraftSunshaft() {
  return <div className="craft-sunshaft" aria-hidden />;
}

export function CraftDust() {
  return (
    <div className="craft-dust" aria-hidden>
      {DUST_MOTES.map((mote) => (
        <span
          key={`${mote.left}-${mote.delay}`}
          className="craft-mote"
          style={{
            left: mote.left,
            animationDelay: mote.delay,
            animationDuration: mote.duration,
            width: mote.size,
            height: mote.size,
          }}
        />
      ))}
    </div>
  );
}

export function CraftPlaten() {
  return (
    <div className="craft-platen" aria-hidden>
      <div className="craft-platen-beam" />
      <div className="craft-platen-felt" />
      <p className="craft-platen-mark">Hand set · YYC</p>
    </div>
  );
}

export function CraftStamp() {
  return (
    <div className="craft-stamp" aria-hidden>
      <span>ST</span>
      <small>Clay · Press</small>
    </div>
  );
}

export function CraftTape() {
  return <span className="craft-tape" aria-hidden />;
}

export function CraftSheetPlate() {
  return <div className="craft-sheet-plate" aria-hidden />;
}
