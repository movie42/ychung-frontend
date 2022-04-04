import React from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useRef } from "react";

const Wrapper = styled.div`
  height: 70vh;
`;

interface IPropCreateData {
  title: string;
}

const NoticeCreate = () => {
  const { register, handleSubmit } = useForm<IPropCreateData>();
  const editor = useRef<Editor>(null);

  const onClick = handleSubmit((data) => {
    const editorParser = editor.current?.getInstance().getMarkdown();
    console.log(data, editorParser);
  });

  return (
    <Wrapper>
      <label htmlFor="title"></label>
      <input
        {...register("title", { required: "제목을 입력하세요." })}
        id="title"
        type="text"
      />
      <Editor
        hooks={{
          addImageBlobHook: (blob, callback) => {},
        }}
        previewStyle="vertical"
        height="100%"
        initialEditType="markdown"
        useCommandShortcut={true}
        language="ko-KR"
        ref={editor}
      />
      <button onClick={onClick}>데이터 받기</button>
    </Wrapper>
  );
};

export default NoticeCreate;
