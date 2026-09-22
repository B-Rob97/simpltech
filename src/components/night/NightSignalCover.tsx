import { ProjectLiveView } from "@/components/ProjectLiveView";
import { projects } from "@/lib/projects";

type NightSignalCoverProps = {
  projectId: string;
  className?: string;
};

export function NightSignalCover({
  projectId,
  className = "",
}: NightSignalCoverProps) {
  const project = projects.find((item) => item.id === projectId) ?? projects[0];

  return (
    <div className={`night-work-cover ${className}`}>
      <ProjectLiveView project={project} />
    </div>
  );
}
