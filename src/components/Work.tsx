"use client";

import { SkylineBand } from "@/components/CityNight";
import { projects } from "@/lib/projects";
import { Reveal } from "@/components/Reveal";
import { WorkRail } from "@/components/WorkRail";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function Work() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <section id="work" className="relative scroll-mt-24 pt-24 sm:pt-32">
      <SkylineBand id="work" className="opacity-70" />
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--volt)]">
            Selected work
          </p>
        </Reveal>
        <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          <Reveal mode="words">{"Products and brands we've shipped."}</Reveal>
        </h2>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            A sample of client work and internal platforms — from storefronts to
            operations software.
          </p>
        </Reveal>
      </div>

      {isDesktop ? (
        <WorkRail projects={projects} />
      ) : (
        <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
          <ul className="mt-14 divide-y divide-white/10 border-y border-white/10">
            {projects.map((project, index) => {
              const content = (
                <>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white">
                      {project.name}
                    </h3>
                    {project.href ? (
                      <span className="text-sm font-medium text-[color:var(--volt)]">
                        View live →
                      </span>
                    ) : project.privateNote ? (
                      <span className="text-sm font-medium text-white/45">
                        Private IP
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {project.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              );

              return (
                <li key={project.id}>
                  <Reveal delay={index * 0.05}>
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block py-8"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="py-8">{content}</div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
