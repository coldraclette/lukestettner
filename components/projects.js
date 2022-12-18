import { Project } from "./project";

export const Projects = ({ projects }) => {
  return (
    <>
      {projects.map((project) => (
        <Project key={project._id} project={project} />
      ))}
    </>
  );
};
