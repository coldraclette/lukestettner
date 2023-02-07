import { useState } from "react";
import { Projects } from "../components/projects";
import { Navigation } from "../components/navigation";
import { getProjectsData, getSiteSettings } from "../lib/api";
import Head from "next/head";
import localFont from "@next/font/local";
import { Public_Sans } from "@next/font/google";
import { Old_Standard_TT } from "@next/font/google";

const fontUnivers = localFont({ src: "./font/univers.ttf" });
const fontPublicSans = Public_Sans({ subsets: ["latin"], weight: ["400"] });
const fontOldSandardTT = Old_Standard_TT({ subsets: ["latin"], weight: ["400"] });

export default function Home({ projects, projectTitleAndId, siteSettings }) {
  const { siteTitle, siteDescription, backgroundColor, fontColor, menuString, fontFamily } =
    siteSettings;
  const [artworkCloseClicked, setArtworkCloseClicked] = useState({
    clicked: false,
    project: null,
  });
  const [currentProject, setCurrentProject] = useState({
    id: null,
    title: "",
    projectOpen: false,
  });

  const onProjectClicked = (id, title, projectOpen) => {
    setCurrentProject({ id, title, projectOpen });
  };

  const onArtworkCloseClicked = () => {
    setArtworkCloseClicked({ clicked: true, project: currentProject.id });
  };

  const applyFontFamily = () => {
    if (fontFamily === "fontPublicSans") {
      return fontPublicSans.className;
    } else if (fontFamily === "fontOldStandardTT") {
      return fontOldSandardTT.className;
    } else {
      return fontUnivers.className;
    }
  };

  return (
    <div
      id="main"
      className={applyFontFamily()}
      style={{ backgroundColor: backgroundColor.hex, color: fontColor.hex }}
    >
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} key="ogdesc" />
        <meta property="og:url" content={`https://lukestettner.com/`} />
        <meta property="og:type" content="website" />
        {/* <meta property="og:image" content={imgUrl} key="ogimage" /> */}
      </Head>
      <Navigation
        menuString={menuString}
        backgroundColor={backgroundColor.hex}
        currentProject={currentProject}
        projects={projectTitleAndId}
        onArtworkCloseClicked={() => onArtworkCloseClicked()}
        siteTitle={siteTitle}
      />
      <Projects
        projects={projects}
        onProjectClicked={(id, title, projectOpen) => onProjectClicked(id, title, projectOpen)}
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
    projectTitleAndId.push({ id: project._id, title: project.title, year: project.year })
  );

  return {
    props: { projects, projectTitleAndId, siteSettings },
  };
};
