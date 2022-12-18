import { buildFileUrl, parseAssetId } from "@sanity/asset-utils";

export const returnVideoUrl = (asset) => {
  const id = asset._ref;
  return buildFileUrl(parseAssetId(id), {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
  });
};

