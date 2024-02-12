import { ProjectProps } from '../types';

interface IndexProps {
  isIndexMenuOpen: boolean;
  projects: ProjectProps[];
  handleProjectSelect: (id: string) => void;
}

export default function Index({
  isIndexMenuOpen,
  projects,
  handleProjectSelect,
}: IndexProps) {
  return (
    <>
      {isIndexMenuOpen && (
        <div className="fixed bottom-0 left-0 z-40 flex h-full w-full transform flex-col gap-3 overflow-y-auto bg-white/90 px-4 pb-4 pt-24 md:gap-8 md:px-48 md:pb-8">
          {projects.map((project) => (
            <div
              key={project._id}
              onClick={() => handleProjectSelect(project._id)}
              className="cursor-pointer text-center text-xl leading-6 hover:underline md:text-5xl"
            >
              {project.title}
              {project.subtitle && <div>{project.subtitle}</div>}
              {project.year && <div>{project.year}</div>}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
