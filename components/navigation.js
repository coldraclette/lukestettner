import { useEffect, useState } from "react";
import { hideOverlay, showOverlay } from "../lib/utils";

export const Navigation = ({
  backgroundColor,
  currentProject,
  projects,
  onArtworkCloseClicked,
}) => {
  const [currentMenuText, setCurrentMenuText] = useState("index");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && !currentProject.projectOpen) {
      setCurrentMenuText("close index");
    } else if (currentProject.projectOpen) {
      setCurrentMenuText("close artwork");
    } else {
      setCurrentMenuText("index");
    }
  }, [isOpen, currentProject]);

  useEffect(() => {
    if (isOpen) {
      showOverlay();
    } else {
      hideOverlay();
    }
  }, [isOpen]);

  const onMenuClicked = () => {
    if (currentMenuText === "close artwork") {
      onArtworkCloseClicked();
      setCurrentMenuText("index");
    }
    if (currentMenuText !== "close artwork") {
      setIsOpen(!isOpen);
    }
  };

  const scrollToProject = (id) => {
    window.scrollTo({
      top: document.getElementById(id).offsetTop,
      behavior: "smooth",
    });
  };

  const renderOpenedNavigationList = () => {
    return projects.map((project) => {
      return (
        <li key={project.id}>
          <a onClick={() => scrollToProject(project.id)}>{project.title}</a>
        </li>
      );
    });
  };

  return (
    <>
      <nav className="navigation" style={{ backgroundColor: backgroundColor }}>
        <h1>luke stettner</h1>

        <div className="project-title">{currentProject.title}</div>

        <div className="navigation-menu" onClick={() => onMenuClicked()}>
          {currentMenuText}
        </div>
      </nav>
      {isOpen && (
        <div className="navigation--opened">
          <ul>{renderOpenedNavigationList()}</ul>
        </div>
      )}
    </>
  );
};
