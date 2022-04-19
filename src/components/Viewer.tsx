import React from "react";
import { Viewer as ToastViewer } from "@toast-ui/react-editor";

interface IViwerProps {
  paragraph: string;
}

const Viewer = ({ paragraph }: IViwerProps) => {
  return (
    <ToastViewer
      initialValue={paragraph}
      customHTMLRenderer={{
        htmlBlock: {
          iframe: (node) => [
            {
              type: "openTag",
              tagName: "iframe",
              outerNewLine: true,
              attributes: node.attrs,
            },
            { type: "html", content: `${node.childrenHTML}` },
            {
              type: "closeTag",
              tagName: "iframe",
              outerNewLine: true,
            },
          ],
        },
      }}
    />
  );
};

export default Viewer;
