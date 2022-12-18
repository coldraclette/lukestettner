import createImageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

const config = {
  // Find your project ID and dataset in `sanity.json` in your studio project
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn:
    typeof document !== "undefined" && process.env.NODE_ENV === "production",

  apiVersion: "2022-09-05",
};

export const imageBuilder = createImageUrlBuilder(config);

export const urlForImage = (source) =>
  imageBuilder.image(source).auto("format").fit("max");

export const urlForPlaceholder = (source) =>
  imageBuilder.image(source).auto("format").quality(50).height(10).blur(50);

export const client = createClient(config);
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export const getClient = (usePreview) => (usePreview ? previewClient : client);
export default client;
