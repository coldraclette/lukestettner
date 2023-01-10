import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "../lib/sanity";
import { returnVideoUrl } from "../lib/utils";
import { SingleImage } from "./singleImage";
import { SingleTextblock } from "./singleTextblock";
import { Singlevideo } from "./singleVideo";

export const ProjectItems = ({
  items,
  onProjectOpen,
  onProjectClose,
  onProjectClicked,
  title,
  artworkCloseClicked,
  projectId,
}) => {
  const [projectOpen, setProjectOpen] = useState(false);
  const rowRef = useRef(null);

  const components = {
    block: {
      normal: ({ children }) => <p>{children}</p>,
    },
  };

  const renderCorrectItem = (item) => {
    if (item._type === "image") {
      return <SingleImage image={item} />;
    }

    if ("textblock" in item) {
      return <SingleTextblock text={item} />;
    }

    if (item._type === "video") {
      return <Singlevideo video={item} />;
    }
  };

  useEffect(() => {
    if (artworkCloseClicked.clicked) {
      // document.getElementById(artworkCloseClicked.project).classList.remove("imagerowlarge");

      // document.getElementById(artworkCloseClicked.project).scrollLeft =
      //   document.getElementById(artworkCloseClicked.project).offsetLeft / 5.5;

      rowRef.current.classList.remove("imagerowlarge");
      rowRef.current.scrollLeft = rowRef.current.offsetLeft / 5.5;

      onProjectClose();
      onProjectClicked(projectId, title, false);
    }
  }, [artworkCloseClicked]);

  return (
    <div className="imagerow" id={projectId} ref={rowRef}>
      {items.map((item) => {
        return (
          <div
            key={item._key}
            className="rowItem"
            onClick={() => onProjectClicked(projectId, title, !projectOpen)}
          >
            {renderCorrectItem(item)}
          </div>
        );
      })}
    </div>
  );
};
