import { useState } from "react";
import { Projects } from "../components/projects";
import { Navigation } from "../components/navigation";
import { getProjectsData, getSiteSettings } from "../lib/api";
import localFont from "@next/font/local";
import { Public_Sans } from "@next/font/google";
import { Old_Standard_TT } from "@next/font/google";
import { NextSeo } from "next-seo";

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
    <>
      <NextSeo
        title={siteTitle}
        description={siteDescription}
        canonical={`https://lukestettner.com/`}
        openGraph={{
          url: `https://lukestettner.com/`,
          title: siteTitle,
          description: siteDescription,
          images: [
            {
              url: "LS-screenshot-min.jpeg",
              width: 1200,
              height: 630,
              alt: "Luke Stettner",
            },
          ],
          site_name: "Luke Stettner",
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <div
        id="main"
        className={applyFontFamily()}
        style={{ backgroundColor: backgroundColor.hex, color: fontColor.hex }}
      >
        <Navigation
          menuString={menuString}
          backgroundColor={backgroundColor.hex}
          fontColor={fontColor.hex}
          currentProject={currentProject}
          projects={projectTitleAndId}
          onArtworkCloseClicked={() => onArtworkCloseClicked()}
          siteTitle={siteTitle}
        />
        <Projects
          projects={projects}
          onProjectClicked={(id, title, projectOpen) => onProjectClicked(id, title, projectOpen)}
          artworkCloseClicked={artworkCloseClicked}
          backgroundColor={backgroundColor.hex}
        />
      </div>
    </>
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
    revalidate: 3600
  };
};
