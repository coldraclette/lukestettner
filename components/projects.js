import { ProjectItems } from "./projectItems";

export const Projects = ({ projects, onProjectClicked, artworkCloseClicked }) => {
  return (
    <>
      {projects.map((project) => {
        return (
          <div key={project._id} className="row">
            <ProjectItems
              projectId={project._id}
              items={project.items}
              title={project.title}
              onProjectClicked={onProjectClicked}
              artworkCloseClicked={artworkCloseClicked}
            />
            <div className="rowcaption">{project.title}</div>
          </div>
        );
      })}
      <div className="overlay" id="overlay" />
    </>
  );
};
