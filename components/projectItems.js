import { useEffect, useState, useRef } from "react";
import { hideOverlay } from "../lib/utils";
import { SingleImage } from "./singleImage";
import { SingleTextblock } from "./singleTextblock";
import { Singlevideo } from "./singleVideo";

export const ProjectItems = ({
  items,
  onProjectClicked,
  title,
  artworkCloseClicked,
  projectId,
}) => {
  const [projectOpen, setProjectOpen] = useState(false);
  const rowRef = useRef(null);

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
      rowRef.current.classList.remove("imagerowlarge");
      rowRef.current.scrollLeft = rowRef.current.offsetLeft / 5.5;

      hideOverlay();
      onProjectClicked(projectId, "", false);
    }
  }, [artworkCloseClicked]);

  const handleProjectClick = () => {
    setProjectOpen(!projectOpen);

    if (rowRef.current.classList.contains("imagerowlarge")) {
      onProjectClicked(projectId, title, true);
    } else {
      onProjectClicked(projectId, "", false);
    }
  };

  return (
    <div className="imagerow" id={projectId} ref={rowRef}>
      {items && items.map((item) => {
        return (
          <div key={item._key} className="rowItem" onClick={() => handleProjectClick()}>
            {renderCorrectItem(item)}
          </div>
        );
      })}
    </div>
  );
};
