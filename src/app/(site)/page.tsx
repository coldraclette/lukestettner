import { getLandingPage } from '../../../sanity/sanity.query';
import ProjectsList from './components/ProjectsList';
import { siteConfig } from './site.config';


export const revalidate = 120;

export async function generateMetadata() {
  return {
    title: {
      default: siteConfig.title,
    },
    description: siteConfig.description,
    openGraph: {
      type: 'website',
      url: siteConfig.siteUrl,
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.siteUrlShort,
      images: [
        {
          url: `${siteConfig.siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: siteConfig.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function Page() {
  const { projects } = await getLandingPage();

  if (!projects) return;

  return <ProjectsList projects={projects} />;
}
