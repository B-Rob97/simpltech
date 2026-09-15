import Image from "next/image";
import { projects, type Project } from "@/lib/projects";

const neonClubPosters = {
  brettos: "/themes/neon-club-work-brettos.webp",
  "revolution-drilling": "/themes/neon-club-work-revolution-drilling.webp",
  "evolving-prowess": "/themes/neon-club-work-evolving-prowess.webp",
  prism: "/themes/neon-club-work-prism.webp",
  "wp-mls-ab": "/themes/neon-club-work-mls.webp",
  "deep-set": "/themes/neon-club-work-deep-set.webp",
  "network-travel": "/themes/neon-club-work-network-travel.webp",
  "corn-crush": "/themes/neon-club-work-corn-crush.webp",
} as const;

type NeonClubProjectId = keyof typeof neonClubPosters;

function isNeonClubProjectId(id: string): id is NeonClubProjectId {
  return id in neonClubPosters;
}

function posterFor(project: Project) {
  if (isNeonClubProjectId(project.id)) return neonClubPosters[project.id];
  return "/themes/neon-club-flyers.webp";
}

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
            <div className="project-cover" aria-hidden="true">
              <Image
                src={posterFor(project)}
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 40vw"
                className="neon-club-work-photo"
              />
              <span className="cover-folio">
                ST® / {String(index + 1).padStart(2, "0")}
              </span>
              <span className="cover-name">{project.name}</span>
              <span className="cover-caption">
                {project.tags[0]} · {project.tags[1]}
              </span>
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
