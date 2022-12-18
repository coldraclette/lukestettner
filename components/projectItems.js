import { useRef, useEffect } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlForImage } from "../lib/sanity";
import { returnVideoUrl } from "../lib/utils";

export const ProjectItems = ({ items }) => {
  const itemRowRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {}, [itemRowRef.current]);

  const components = {
    block: {
      normal: ({ children }) => <p>{children}</p>,
    },
  };

  const renderCorrectItem = (item) => {
    if (item._type === "image") {
      return (
        <img
          alt=""
          src={urlForImage(item).url()}
          onClick={(e) => onItemClick(e)}
        />
      );
    }

    if ("textblock" in item) {
      return (
        <div className="copyblock" onClick={(e) => onItemClick(e)}>
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

  const onItemClick = (element) => {
    const { parentElement } = element.target.parentElement;

    console.log(parentElement.id);
  };

  return (
    <div ref={itemRowRef} className="imagerow">
      {items.map((item) => {
        return <div key={item._key}>{renderCorrectItem(item)}</div>;
      })}
    </div>
  );
};
