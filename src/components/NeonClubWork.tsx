import { ProjectLiveView } from "@/components/ProjectLiveView";
import { projects, type Project } from "@/lib/projects";

function ProjectDetails({ project }: { project: Project }) {
  return (
    <>
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
          <span className="sr-only">: {project.name} (opens in a new tab)</span>
        </a>
      ) : (
        <p className="project-note">{project.privateNote || "Project overview"}</p>
      )}
    </>
  );
}

export function NeonClubWork() {
  return (
    <section id="work" className="design-work work-neon-club">
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
      <div className="design-projects">
        {projects.map((project, index) => (
          <article className="design-project" key={project.id}>
            <span className="project-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="project-cover">
              <ProjectLiveView project={project} />
            </div>
            <div className="project-details">
              <ProjectDetails project={project} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
