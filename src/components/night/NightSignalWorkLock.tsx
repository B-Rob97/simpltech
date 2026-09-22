"use client";

import { ProjectLiveView } from "@/components/ProjectLiveView";
import { projects } from "@/lib/projects";

export function NightSignalWorkLock() {
  return (
    <div className="night-feed">
      <p className="night-feed-folio">
        <span className="night-live-dot" aria-hidden />
        YYC · Observatory · Live
      </p>
      <p className="night-feed-kicker">Selected work</p>
      <h2 className="night-feed-title">
        Products and brands we&apos;ve shipped.
      </h2>
      <p className="night-feed-lede">
        A sample of client work and internal platforms — from storefronts to
        operations software.
      </p>
      <ol className="night-feed-board">
        {projects.map((project, index) => {
          const row = (
            <>
              <span className="night-feed-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="night-feed-live">
                <ProjectLiveView project={project} />
              </span>
              <span className="night-feed-name">{project.name}</span>
              <span className="night-feed-tags">
                {project.tags.slice(0, 2).join(" · ")}
              </span>
              <span className="night-feed-status">
                {project.href
                  ? "Live →"
                  : project.privateNote
                    ? "Private"
                    : "Plugin"}
              </span>
            </>
          );

          return (
            <li
              key={project.id}
              className="night-feed-row"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="night-feed-link"
                >
                  {row}
                </a>
              ) : (
                <div className="night-feed-link">{row}</div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
