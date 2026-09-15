"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { projects } from "@/lib/projects";

export function CupertinoWork() {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const project = projects[selected];

  return (
    <section id="work" className="design-work work-cupertino">
      <div className="design-section-heading">
        <p className="section-kicker">Selected work / 01</p>
        <h2>
          Products and brands
          <br />
          we&apos;ve shipped.
        </h2>
        <p>
          A sample of client work and internal platforms — from storefronts to
          operations software.
        </p>
      </div>

      <div className="cupertino-work-stage">
        <div className="showcase-picker" role="group" aria-label="Choose a project">
          {projects.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected === index}
              onClick={() => setSelected(index)}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="cupertino-work-viewport">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.article
              key={project.id}
              className="showcase-project"
              initial={
                reduceMotion ? false : { y: "28%", opacity: 0.28 }
              }
              animate={{ y: "0%", opacity: 1 }}
              exit={reduceMotion ? undefined : { y: "-22%", opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className={`project-cover cover-${selected % 4}`}
                aria-hidden="true"
              >
                <span className="cover-folio">
                  ST® / {String(selected + 1).padStart(2, "0")}
                </span>
                <span className="cover-symbol">
                  {["↗", "⊕", "◎", "✳"][selected % 4]}
                </span>
                <span className="cover-name">{project.name}</span>
                <span className="cover-caption">
                  {project.tags[0]} · {project.tags[1]}
                </span>
              </div>
              <div>
                <p className="project-category">{project.tags.join(" / ")}</p>
                <h3>{project.name}</h3>
                <p className="project-summary">{project.summary}</p>
                {project.href ? (
                  <a
                    className="project-link"
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore project <span aria-hidden>↗</span>
                    <span className="sr-only">
                      : {project.name} (opens in a new tab)
                    </span>
                  </a>
                ) : (
                  <p className="project-note">
                    {project.privateNote || "Project overview"}
                  </p>
                )}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
