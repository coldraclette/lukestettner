import { useRef } from "react";
import { returnVideoUrl, switchProjectDimensions } from "../lib/utils";

export const Singlevideo = ({ video }) => {
  const videoRef = useRef(null);

  return (
    <div>
      <div ref={videoRef} onClick={() => switchProjectDimensions(videoRef.current)}>
        <video controls preload="auto" width="100%">
          <source src={returnVideoUrl(video.asset) + "#t=000.1"} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};
