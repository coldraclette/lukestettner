import { client } from './lib/client';

export async function getLandingPage() {
  const query = `*[_type == "landingPage"][0] {
    projects[]->{
      _id,
      title,
      subtitle,
      year,
      items[]{
        ...,
        _type == 'image' => {
          "asset": asset->{
            _id,
            url,
            metadata {
              lqip,
              dimensions {
                aspectRatio
              }
            }
          }
        }
      }
    }
  }`;

  const data = await client.fetch(query);
  return data;
}


export async function getSettings() {
  const query = `*[_type == "settings"][0] {
    googleFontName,
    fontColor
  }`;

  const data = await client.fetch(query);
  return data;
}
