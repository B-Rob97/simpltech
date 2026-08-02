"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import type { Project } from "@/lib/projects";

type WorkRailProps = {
  projects: Project[];
};

function ProjectPanel({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const inner = (
    <>
      <div>
        <div className="flex items-start justify-between gap-4">
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-[color:var(--signal)]">
            {String(index + 1).padStart(2, "0")}
          </p>
          {project.href ? (
            <span className="text-sm font-medium text-[color:var(--volt)]">
              View live →
            </span>
          ) : project.privateNote ? (
            <span className="text-sm font-medium text-white/45">Private IP</span>
          ) : null}
        </div>
        <h3 className="mt-6 min-h-[2lh] font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white xl:text-4xl">
          {project.name}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65 sm:text-base">
          {project.summary}
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
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

  const className =
    "flex h-[min(70vh,560px)] w-[min(78vw,520px)] shrink-0 flex-col justify-between border border-white/10 bg-[color:var(--ink-elevated)]/80 p-8 backdrop-blur-sm sm:p-10";

  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} transition-colors hover:border-[color:var(--volt)]/40`}
      >
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}

export function WorkRail({ projects }: WorkRailProps) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  if (reduceMotion) {
    return (
      <div className="mt-14 flex gap-6 overflow-x-auto pb-4">
        {projects.map((project, index) => (
          <ProjectPanel key={project.id} project={project} index={index} />
        ))}
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="relative mt-6 h-[300vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max gap-6 px-5 will-change-transform sm:gap-8 sm:px-8 md:px-[12vw]"
        >
          {projects.map((project, index) => (
            <RailCard
              key={project.id}
              project={project}
              index={index}
              progress={scrollYProgress}
              total={projects.length}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function RailCard({
  project,
  index,
  progress,
  total,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const start = index / total;
  const mid = (index + 0.45) / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, mid, end], [0.45, 1, 0.55]);
  const scale = useTransform(progress, [start, mid, end], [0.94, 1, 0.96]);

  return (
    <motion.div style={{ opacity, scale }} className="will-change-transform">
      <ProjectPanel project={project} index={index} />
    </motion.div>
  );
}
