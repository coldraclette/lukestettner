import { Projects } from "../components/projects";
import { Navigation } from "../components/navigation";
import { getProjectsData, getSiteSettings } from "../lib/api";

export default function Home({ projects, siteSettings }) {
  const { siteTitle, siteDescription, backgroundColor, fontColor } =
    siteSettings;
  return (
    <div id="main" style={{ backgroundColor: backgroundColor.hex, color: fontColor.hex }}>
      <Navigation backgroundColor={backgroundColor.hex} />
      <Projects projects={projects} />
    </div>
  );
}

export const getStaticProps = async () => {
  const projects = await getProjectsData();
  const siteSettings = await getSiteSettings();

  return {
    props: { projects, siteSettings },
  };
};
