"use client";

import { SkylineBand } from "@/components/CityNight";
import { useTheme } from "@/components/ThemeProvider";
import { projects } from "@/lib/projects";
import { Reveal } from "@/components/Reveal";
import { WorkRail } from "@/components/WorkRail";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ThemeWork } from "@/components/ThemeWork";

export function Work() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { theme } = useTheme();
  const stacked = theme.stackWork || !isDesktop;

  if (theme.id !== "night-signal") return <ThemeWork />;

  return (
    <section id="work" className="relative scroll-mt-24 pt-[var(--section-space)]">
      <SkylineBand id="work" className="opacity-70" />
      <div className="relative z-10 mx-auto max-w-[var(--content-max)] px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--volt)]">
            Selected work
          </p>
        </Reveal>
        <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          <Reveal mode="words">{"Products and brands we've shipped."}</Reveal>
        </h2>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/65 sm:text-lg">
            A sample of client work and internal platforms — from storefronts to
            operations software.
          </p>
        </Reveal>
      </div>

      {stacked ? (
        <div className="mx-auto max-w-[var(--content-max)] px-5 pb-[var(--section-space)] sm:px-8">
          <ul className="mt-14 divide-y divide-foreground/10 border-y border-foreground/10">
            {projects.map((project, index) => {
              const content = (
                <>
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground">
                      {project.name}
                    </h3>
                    {project.href ? (
                      <span className="text-sm font-medium text-[color:var(--volt)]">
                        View live →
                      </span>
                    ) : project.privateNote ? (
                      <span className="text-sm font-medium text-foreground/45">
                        Private IP
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/65">
                    {project.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[var(--radius-button)] border-[length:var(--border-width)] border-foreground/10 px-3 py-1 text-xs text-foreground/55"
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
      ) : (
        <WorkRail projects={projects} />
      )}
    </section>
  );
}
