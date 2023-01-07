import { useEffect, useRef } from "react";
import { ProjectItems } from "./projectItems";

export const Projects = ({
  projects,
  onProjectClicked,
  artworkCloseClicked,
}) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    console.log("clicked");

     if (artworkCloseClicked.clicked) {
          console.log(
            document.getElementById(artworkCloseClicked.project),
            document.getElementById(artworkCloseClicked.project).children[0]
              .children[0].children[0]
          );

          document
            .getElementById(artworkCloseClicked.project)
            .classList.remove("imagerowlarge");

          document.getElementById(artworkCloseClicked.project).scrollLeft =
            document.getElementById(artworkCloseClicked.project).offsetLeft / 5.5;

          onProjectClose();
          // onProjectClicked(projectId, title, false);
        }
  }, [artworkCloseClicked]);

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
              title={project.title}
              onProjectOpen={() => onProjectOpen()}
              onProjectClose={() => onProjectClose()}
              onProjectClicked={onProjectClicked}
            />
            <div className="rowcaption">{project.title}</div>
          </div>
        );
      })}
      <div className="overlay" ref={overlayRef} />
    </>
  );
};
