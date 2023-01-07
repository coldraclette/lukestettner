import { useState } from "react";
import { Projects } from "../components/projects";
import { Navigation } from "../components/navigation";
import { getProjectsData, getSiteSettings } from "../lib/api";

export default function Home({ projects, projectTitleAndId, siteSettings }) {
  const [artworkCloseClicked, setArtworkCloseClicked] = useState({
    clicked: false,
    project: null,
  });
  const [currentProject, setCurrentProject] = useState({
    id: null,
    title: "",
    projectOpen: false,
  });
  const { siteTitle, siteDescription, backgroundColor, fontColor } =
    siteSettings;

  const onProjectClicked = (id, title, projectOpen) => {
    setCurrentProject({ id, title, projectOpen });
  };

  const onArtworkCloseClicked = () => {
    setArtworkCloseClicked({ clicked: true, project: currentProject.id });
  };

  return (
    <div
      id="main"
      style={{ backgroundColor: backgroundColor.hex, color: fontColor.hex }}
    >
      <Navigation
        backgroundColor={backgroundColor.hex}
        currentProject={currentProject}
        projects={projectTitleAndId}
        onArtworkCloseClicked={() => onArtworkCloseClicked()}
      />
      <Projects
        projects={projects}
        onProjectClicked={(id, title, projectOpen) =>
          onProjectClicked(id, title, projectOpen)
        }
        artworkCloseClicked={artworkCloseClicked}
      />
    </div>
  );
}

export const getStaticProps = async () => {
  const projects = await getProjectsData();
  const siteSettings = await getSiteSettings();

  const projectTitleAndId = [];
  projects.map((project) =>
    projectTitleAndId.push({ id: project._id, title: project.title })
  );

  return {
    props: { projects, projectTitleAndId, siteSettings },
  };
};
