import React from "react";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import styled from "styled-components";
import { postRequestMultipartFormData } from "@/lib/utils";

const Wrapper = styled.div`
  height: 100%;
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
  return (
    <Wrapper>
      <Editor
        ref={reference}
        customHTMLRenderer={{
          htmlBlock: {
            iframe: (node) => [
              {
                type: "openTag",
                tagName: "iframe",
                outerNewLine: true,
                attributes: node.attrs,
              },
              {
                type: "html",
                content: node.childrenHTML ? node.childrenHTML : "",
              },
              {
                type: "closeTag",
                tagName: "iframe",
                outerNewLine: true,
              },
            ],
          },
        }}
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task"],
          ["table", "image", "link"],
          ["code", "codeblock"],
        ]}
        hooks={{
          addImageBlobHook: async (blob: Blob | File, callback) => {
            let formData = new FormData();
            formData.append("data", blob);

            const responseToken = await fetch(`/api/csrf-token`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              mode: "cors",
            });

            const { CSRFToken } = await responseToken.json();

            const postOption = postRequestMultipartFormData(
              formData,
              CSRFToken
            );

            const response = await fetch(`/api/post-image`, postOption);

            const { data } = await response.json();
            callback(data, "이미지의 이름을 입력하세요.");
          },
        }}
        previewStyle="tab"
        placeholder="내용을 입력해주세요."
        height="100%"
        initialValue={initialValue ? initialValue : ""}
        initialEditType="markdown"
        useCommandShortcut={true}
        // language="ko-KR"
        plugins={[colorSyntax]}
      />
    </Wrapper>
  );
}

export default EditorContainer;
