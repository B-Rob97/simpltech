"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projectLiveMode } from "@/lib/project-live";
import type { Project } from "@/lib/projects";

type ProjectLiveViewProps = {
  project: Project;
  /** Mount the live site immediately (hero glass, above-the-fold plates). */
  eager?: boolean;
};

export function ProjectLiveView({ project, eager = false }: ProjectLiveViewProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(eager);
  const mode = projectLiveMode(project);

  useEffect(() => {
    if (eager || mode.kind !== "iframe") return;
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "280px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, mode.kind]);

  return (
    <div className="project-live" ref={rootRef} aria-hidden>
      <LiveSurface project={project} active={active} />
    </div>
  );
}

function LiveSurface({
  project,
  active,
}: {
  project: Project;
  active: boolean;
}) {
  const mode = projectLiveMode(project);

  switch (mode.kind) {
    case "iframe":
      if (!active) return null;
      return (
        <div className="project-live-stage">
          <iframe
            src={mode.href}
            title={`${project.name} live site`}
            tabIndex={-1}
            loading="lazy"
            scrolling="no"
          />
        </div>
      );
    case "capture":
      return (
        <div className="project-live-stage">
          <Image
            src={mode.src}
            alt=""
            width={1440}
            height={900}
            sizes="(max-width: 767px) 100vw, 42vw"
            className="project-live-capture"
          />
        </div>
      );
    case "private":
      return (
        <div className="project-live-private">
          <p className="project-live-private-kicker">No public site</p>
          <p className="project-live-private-name">{project.name}</p>
          <p className="project-live-private-note">
            {project.privateNote ?? "Details stay with the client."}
          </p>
        </div>
      );
    default: {
      const unreachable: never = mode;
      return unreachable;
    }
  }
}
