import Image from "next/image";
import { nightSignalCover } from "@/lib/night-signal";

type NightSignalCoverProps = {
  projectId: string;
  className?: string;
};

export function NightSignalCover({
  projectId,
  className = "",
}: NightSignalCoverProps) {
  const cover = nightSignalCover(projectId);

  return (
    <div className={`night-work-cover ${className}`} aria-hidden>
      <Image
        src={cover.src}
        alt=""
        fill
        sizes="(max-width: 767px) 40vw, 28vw"
        className="object-cover"
        style={{ objectPosition: cover.position }}
      />
      <div className="night-window-grid" />
      <span className="night-window-lit" style={{ left: "18%", top: "28%" }} />
      <span
        className="night-window-lit"
        style={{ left: "42%", top: "46%", animationDelay: "0.8s" }}
      />
      <span
        className="night-window-lit"
        style={{ left: "67%", top: "34%", animationDelay: "1.6s" }}
      />
    </div>
  );
}
