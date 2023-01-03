import { useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "../lib/sanity";
import { returnVideoUrl } from "../lib/utils";

export const ProjectItems = ({ items, onProjectOpen, onProjectClose }) => {
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
          <div className="image-text">lol</div>
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

  const onItemClick = (e) => {
    const topPos = e.target.offsetLeft;
    if (projectOpen) {
      onProjectClose();
      if (e.target.className === "copyblock") {
        e.target.parentElement.parentElement.classList.remove("imagerowlarge");
        e.target.parentElement.parentElement.scrollLeft = topPos / 6.3;
      } else {
        e.target.parentElement.parentElement.parentElement.classList.remove(
          "imagerowlarge"
        );
        e.target.parentElement.parentElement.parentElement.scrollLeft =
          topPos / 5.5;
      }
    } else {
      onProjectOpen();
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
    }
    setProjectOpen(!projectOpen);
  };

  return (
    <div className="imagerow">
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
