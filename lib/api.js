import client, { previewClient } from "./sanity";

const getClient = (preview) => (preview ? previewClient : client);

export async function getProjectsData(preview) {
  const result = await getClient(preview)
    .fetch(`*[_type == "project"]|order(orderRank) {
  _id,
  title,
  year,
  items
}`);
  return result;
}

export async function getSiteSettings(preview) {
  const result = await getClient(preview).fetch(`*[_type== "siteSettings"] {
  siteTitle,
  siteDescription,
  menuString,
  backgroundColor,
  fontColor
}`);
  return result[0];
}
