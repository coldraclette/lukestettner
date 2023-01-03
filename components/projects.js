import { useRef } from "react";
import { ProjectItems } from "./projectItems";

export const Projects = ({ projects }) => {
  const overlayRef = useRef(null);

  const onProjectOpen = () => (overlayRef.current.style.display = "block");
  const onProjectClose = () => (overlayRef.current.style.display = "none");

  return (
    <>
      {projects.map((project) => {
        return (
          <div key={project._id} className="row">
            <ProjectItems
              projectId={project._id}
              items={project.items}
              onProjectOpen={() => onProjectOpen()}
              onProjectClose={() => onProjectClose()}
            />
            <div className="rowcaption">{project.title}</div>
          </div>
        );
      })}
      <div className="overlay" ref={overlayRef} />
    </>
  );
};
