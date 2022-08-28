import React from "react";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import styled, { keyframes } from "styled-components";
import { api } from "@/lib/api";
import { useMutation } from "react-query";
import { AxiosError } from "axios";

const loadingKeyframes = keyframes`
  0%{
    rotate: 0deg
  }
  
  100%{
    rotate: 360deg ;
  }
`;
const opacityKeyframes = keyframes`
  0% {
    background-position:200% center;
  }
`;

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  .loading {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    position: absolute;
    top: 5.7rem;
    right: 1rem;
    z-index: 1000;
    width: 100%;
    height: 2rem;
    .loading-title {
      position: relative;
      padding-top: 0.2rem;
      margin-right: 1rem;
      font-size: 1.5rem;
      color: ${(props) => props.theme.color.gray400};
      text-align: center;
      background: linear-gradient(
        to right,
        #ff0000 5%,
        #fff 20%,
        #fff 80%,
        #ff2200 95%
      );
      background-clip: text;
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: ${opacityKeyframes} 2s linear infinite;
    }

    .loading-ball {
      border: 0.5rem solid transparent;
      background-image: linear-gradient(#fff, #fff),
        linear-gradient(to right, white 0%, red 100%);
      background-origin: border-box;
      background-clip: content-box, border-box;
      width: 1rem;
      height: 1rem;
      border-radius: 100%;
      animation: ${loadingKeyframes} 2s linear infinite;
    }
  }
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
  const { mutate, isLoading } = useMutation<
    { data: string },
    AxiosError,
    FormData
  >(async (body) => await api.postMultiPartData(`/api/post-image`, body));

  return (
    <>
      <Wrapper>
        {isLoading && (
          <span className="loading">
            <span className="loading-title">이미지를 서버에 올리고 있어요</span>
            <span className="loading-ball"></span>
          </span>
        )}
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

              mutate(formData, {
                onSuccess: (response) => {
                  callback(
                    response.data,
                    "시각 장애인을 위해 어떤 이미지인지 묘사해주세요. 묘사하기 힘들다면 이미지의 제목만 적어주세요."
                  );
                },
              });
            },
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
