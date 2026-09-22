import { projects, type Project } from "@/lib/projects";

/**
 * Sites that send X-Frame-Options / frame-ancestors and cannot be iframed.
 * The file is a current capture of that same public URL.
 */
const FRAME_BLOCKED_CAPTURES: Record<string, string> = {
  "evolving-prowess": "/work/evolving-prowess.webp",
};

export type ProjectLiveMode =
  | { kind: "iframe"; href: string }
  | { kind: "capture"; src: string }
  | { kind: "private" };

export function projectLiveMode(project: Project): ProjectLiveMode {
  const capture = FRAME_BLOCKED_CAPTURES[project.id];
  if (project.href && capture) {
    return { kind: "capture", src: capture };
  }
  if (project.href) {
    return { kind: "iframe", href: project.href };
  }
  return { kind: "private" };
}

export const featuredLiveProject: Project =
  projects.find((project) => project.id === "revolution-drilling") ??
  projects[0];

export const phoneLiveProject: Project =
  projects.find((project) => project.id === "corn-crush") ?? featuredLiveProject;
