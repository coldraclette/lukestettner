import { ProjectItems } from "./projectItems";

export const Project = ({ project }) => {
  return (
    <div className="row">
      <ProjectItems items={project.items} />
      <div className="rowcaption">{project.title}</div>
    </div>
  );
};
