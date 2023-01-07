import { useEffect, useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "../lib/sanity";
import { returnVideoUrl } from "../lib/utils";

export const ProjectItems = ({
  items,
  onProjectOpen,
  onProjectClose,
  onProjectClicked,
  title,
  projectId,
}) => {
  const [projectOpen, setProjectOpen] = useState(false);

  const components = {
    block: {
      normal: ({ children }) => <p>{children}</p>,
    },
  };

  const renderCorrectItem = (item) => {
    if (item._type === "image") {
      return (
        <div className="image-wrapper">
          <img alt="" src={urlForImage(item).url()} />
          {item.caption && <div className="image-text">{item.caption}</div>}
        </div>
      );
    }

    if ("textblock" in item) {
      return (
        <div className="copyblock">
          <PortableText value={item.textblock} components={components} />
        </div>
      );
    }

    if (item._type === "video") {
      return (
        <video controls preload="auto" width="100%">
          <source
            src={returnVideoUrl(item.asset) + "#t=000.1"}
            type="video/mp4"
          />
        </video>
      );
    }
  };

  const openProjectModal = (e) => {
    if (e.target.className === "rowItem") {
      e.target.parentElement.classList.add("imagerowlarge");
      e.target.parentElement.scrollLeft = e.target.offsetLeft - 10;
    } else if (e.target.className === "copyblock") {
      e.target.parentElement.parentElement.classList.add("imagerowlarge");
      e.target.parentElement.parentElement.scrollLeft =
        e.target.offsetLeft - 10;
    } else {
      e.target.parentElement.parentElement.parentElement.classList.add(
        "imagerowlarge"
      );
      e.target.parentElement.parentElement.parentElement.scrollLeft =
        e.target.parentElement.offsetLeft - 10;
    }
    // document.getElementById("navigation").innerHTML = "close artwork";
  };

  const closeProjectModal = (e) => {
    if (e.target.className === "copyblock") {
      e.target.parentElement.parentElement.classList.remove("imagerowlarge");
      e.target.parentElement.parentElement.scrollLeft =
        e.target.offsetLeft / 6.3;
    } else {
      e.target.parentElement.parentElement.parentElement.classList.remove(
        "imagerowlarge"
      );
      e.target.parentElement.parentElement.parentElement.scrollLeft =
        e.target.offsetLeft / 5.5;
    }
    // document.getElementById("navigation").innerHTML = "index";
  };

  const onItemClick = (e) => {
    console.log(
      "CLICKED",
      e.target,
      e.target.parentElement.parentElement.parentElement
    );
    onProjectClicked(projectId, title, !projectOpen);
    if (projectOpen) {
      onProjectClose();
      closeProjectModal(e);
    } else {
      onProjectOpen();
      openProjectModal(e);
    }
    setProjectOpen(!projectOpen);
  };

  return (
    <div className="imagerow" id={projectId}>
      {items.map((item) => {
        return (
          <div
            key={item._key}
            className="rowItem"
            onClick={(e) => onItemClick(e)}
          >
            {renderCorrectItem(item)}
          </div>
        );
      })}
    </div>
  );
};
