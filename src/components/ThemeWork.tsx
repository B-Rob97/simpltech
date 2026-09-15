"use client";

import { useState } from "react";
import { projects, type Project } from "@/lib/projects";
import { useTheme } from "@/components/ThemeProvider";

function ProjectDetails({ project }: { project: Project }) {
  return <>
    <p className="project-category">{project.tags.join(" / ")}</p>
    <h3>{project.name}</h3>
    <p className="project-summary">{project.summary}</p>
    {project.href ? <a className="project-link" href={project.href} target="_blank" rel="noopener noreferrer">Explore project <span aria-hidden>↗</span><span className="sr-only">: {project.name} (opens in a new tab)</span></a> : <p className="project-note">{project.privateNote || "Project overview"}</p>}
  </>;
}

// Abstract project covers are intentionally typographic, never fabricated screenshots.
function ProjectCover({ project, index }: { project: Project; index: number }) {
  return <div className={`project-cover cover-${index % 4}`} aria-hidden="true">
    <span className="cover-folio">ST® / {String(index + 1).padStart(2, "0")}</span>
    <span className="cover-symbol">{["↗", "⊕", "◎", "✳"][index % 4]}</span>
    <span className="cover-name">{project.name}</span>
    <span className="cover-caption">{project.tags[0]} · {project.tags[1]}</span>
  </div>;
}

export function ThemeWork() {
  const { theme } = useTheme();
  const [selected, setSelected] = useState(0);
  const showcase = theme.id === "cupertino";
  return <section id="work" className={`design-work work-${theme.id}`}>
    <div className="design-section-heading"><p className="section-kicker">Selected work / 01</p><h2>Products and brands<br />we&apos;ve shipped.</h2><p>A sample of client work and internal platforms — from storefronts to operations software.</p></div>
    {showcase ? <>
      <div className="showcase-picker" role="group" aria-label="Choose a project">
        {projects.map((project, index) => <button key={project.id} aria-pressed={selected === index} onClick={() => setSelected(index)}>{project.name}</button>)}
      </div>
      <article className="showcase-project"><ProjectCover project={projects[selected]} index={selected} /><div><ProjectDetails project={projects[selected]} /></div></article>
    </> : <div className="design-projects">
      {projects.map((project, index) => <article className="design-project" key={project.id}>
        <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <ProjectCover project={project} index={index} />
        <div className="project-details"><ProjectDetails project={project} /></div>
      </article>)}
    </div>}
  </section>;
}
