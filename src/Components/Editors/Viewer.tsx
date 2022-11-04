import React from "react";
import { Viewer as ToastViewer } from "@toast-ui/react-editor";
import styled from "styled-components";

const Wrapper = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    border: 0;
  }
`;

interface IViwerProps {
  paragraph?: string;
}

const Viewer = ({ paragraph }: IViwerProps) => {
  return (
    <Wrapper>
      <ToastViewer
        initialValue={paragraph}
        customHTMLRenderer={{
          htmlBlock: {
            iframe: (node) => [
              {
                type: "openTag",
                tagName: "iframe",
                outerNewLine: true,
                attributes: node.attrs
              },
              { type: "html", content: `${node.childrenHTML}` },
              {
                type: "closeTag",
                tagName: "iframe",
                outerNewLine: true
              }
            ]
          }
        }}
      />
    </Wrapper>
  );
};

export default Viewer;
