import React from "react";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import styled from "styled-components";

import useImageUpload from "./hooks/useImageUpload";
import SpiningLoading from "../Loading/SpiningLoading";

const Wrapper = styled.div`
  position: relative;
  height: 100vh;

  .toastui-editor-defaultUI {
    .ProseMirror {
      font-size: 2.5rem;
      p,
      div {
        font-size: 2rem;
      }
    }
  }

  .toastui-editor-main {
    .toastui-editor-md-tab-style {
      .active {
        h1,
        h2,
        h3,
        h4,
        h5 {
          border-bottom: 0;
        }
      }
    }
  }
`;

interface IEditorContainerProps {
  reference: React.RefObject<Editor>;
  initialValue?: string | undefined;
}

function EditorContainer({ initialValue, reference }: IEditorContainerProps) {
  const { mutate: imageUpload, isLoading } = useImageUpload();
  return (
    <>
      <Wrapper>
        {isLoading && <SpiningLoading message="이미지를 저장하고 있어요!" />}
        <Editor
          ref={reference}
          customHTMLRenderer={{
            htmlBlock: {
              iframe: (node) => [
                {
                  type: "openTag",
                  tagName: "iframe",
                  outerNewLine: true,
                  attributes: node.attrs
                },
                {
                  type: "html",
                  content: node.childrenHTML ? node.childrenHTML : ""
                },
                {
                  type: "closeTag",
                  tagName: "iframe",
                  outerNewLine: true
                }
              ]
            }
          }}
          toolbarItems={[
            ["heading", "bold", "italic", "strike"],
            ["hr", "quote"],
            ["ul", "ol", "task"],
            ["table", "image", "link"],
            ["code", "codeblock"]
          ]}
          hooks={{
            addImageBlobHook: async (blob: Blob | File, callback) => {
              const formData = new FormData();
              formData.append("image", blob);

              imageUpload(formData, {
                onSuccess: (response) => {
                  callback(
                    response.data,
                    "시각 장애인을 위해 어떤 이미지인지 묘사해주세요. 묘사하기 힘들다면 이미지의 제목만 적어주세요."
                  );
                }
              });
            }
          }}
          previewStyle="tab"
          placeholder="내용을 입력해주세요."
          height="100%"
          initialValue={initialValue ? initialValue : ""}
          initialEditType="markdown"
          useCommandShortcut={true}
          plugins={[colorSyntax]}
        />
      </Wrapper>
    </>
  );
}

export default EditorContainer;
