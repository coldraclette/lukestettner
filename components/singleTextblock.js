import { useRef } from "react";
import { PortableText } from "@portabletext/react";
import { switchProjectDimensions } from "../lib/utils";

export const SingleTextblock = ({ text }) => {
  const textRef = useRef(null);
  const components = {
    block: {
      normal: ({ children }) => <p>{children}</p>,
    },
  };

  return (
    <div className="copyblock">
      <div ref={textRef} onClick={() => switchProjectDimensions(textRef.current)}>
        <PortableText value={text.textblock} components={components} />
      </div>
    </div>
  );
};
