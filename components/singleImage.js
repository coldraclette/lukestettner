import { useRef } from "react";
import { urlForImage } from "../lib/sanity";
import { switchProjectDimensions } from "../lib/utils";

export const SingleImage = ({ image }) => {
  const imageRef = useRef(null);

  return (
    <div className="image-wrapper">
      <img
        alt=""
        src={urlForImage(image).url()}
        ref={imageRef}
        onClick={() => switchProjectDimensions(imageRef.current)}
      />
      {image.caption && <div className="image-text">{image.caption}</div>}
    </div>
  );
};
