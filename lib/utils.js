import { buildFileUrl, parseAssetId } from "@sanity/asset-utils";

export const returnVideoUrl = (asset) => {
  const id = asset._ref;
  return buildFileUrl(parseAssetId(id), {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: "production",
  });
};

export const switchProjectDimensions = (item) => {
  if (item.parentElement.parentElement.parentElement.classList.contains("imagerowlarge")) {
    item.parentElement.parentElement.parentElement.classList.remove("imagerowlarge");
    item.parentElement.parentElement.parentElement.scrollLeft = item.offsetLeft / 5.5;
    document.getElementById("overlay").style.display = "none";
  } else {
    item.parentElement.parentElement.parentElement.classList.add("imagerowlarge");
    item.parentElement.parentElement.parentElement.scrollLeft = item.parentElement.offsetLeft - 10;
    document.getElementById("overlay").style.display = "block";
  }
};
