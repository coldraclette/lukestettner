import { useEffect, useState } from "react";

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

  const onMenuClicked = () => {
    if (currentMenuText === "close artwork") {
      onArtworkCloseClicked();
      setCurrentMenuText("index");
    }

    if (currentMenuText !== "close artwork") {
      setIsOpen(!isOpen);
    }
  };

  const renderOpenedNavigationList = () => {
    return projects.map((project) => {
      return <li key={project.id}>{project.title}</li>;
    });
  };

  return (
    <>
      <nav id="top" style={{ backgroundColor: backgroundColor }}>
        <div className="topleft">
          <h1>luke stettner</h1>
        </div>

        {/* <div className="project-title">{currentProject.title}</div> */}

        <div className="navigation" onClick={() => onMenuClicked()}>
          {currentMenuText}
        </div>
      </nav>
      {/* {isOpen && (
        <div>
          <ul>{renderOpenedNavigationList()}</ul>
        </div>
      )} */}
    </>
  );
};
