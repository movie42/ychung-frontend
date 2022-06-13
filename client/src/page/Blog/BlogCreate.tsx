import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import EditorContainer from "../../components/Editor";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import usePost from "../../utils/customhooks/usePost";

const Wrapper = styled.div`
  margin-top: 8rem;
  position: relative;
  height: 70vh;
  button.upload {
    position: absolute;
    top: -1rem;
    right: 0;
    cursor: pointer;
    font-size: 3rem;
    color: ${(props) => props.theme.color.fontColorWhite};
    padding: 0 0.4rem;
    margin: 0;
    border: 0;
    border-radius: 50%;
    background-color: ${(props) => props.theme.color.gray300};
    svg {
      transform: translate(0.1rem, 0.3rem);
    }
    &:hover {
      background-color: ${(props) => props.theme.color.primary400};
    }
  }
`;

const InputWrapper = styled.form`
  box-sizing: border-box;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  label {
    font-size: 2rem;
    font-weight: 700;
    margin-right: 0.5rem;
  }
  input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.8rem;
    border: 0;
    text-align: left;
    font-size: 3rem;
    outline: 0;
  }

  div {
    label {
      margin-left: 0.5rem;
    }
    input {
      width: unset;
    }
  }
`;

const BlogCreate: React.FC = () => {
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);
  const { register, handleSubmit } = useForm();

  const {
    mutate,
    isSuccess,
    data: response,
  } = usePost({
    url: `/api/blog/create`,
    queryKey: "posts",
  });

  const onClick = handleSubmit((data) => {
    const editorParser = editorRef.current?.getInstance().getMarkdown();
    const formData = {
      ...data,
      paragraph: editorParser,
    };
    mutate(formData);
  });

  useEffect(() => {
    if (isSuccess) {
      const { data } = response;
      navigate(`/blog/${data._id}`);
    }
  }, [isSuccess]);

  return (
    <Wrapper>
      <button className="upload" onClick={onClick}>
        <AiOutlineCloudUpload />
      </button>
      <InputWrapper>
        <label htmlFor="title">제목</label>
        <input
          placeholder="제목을 입력하세요."
          {...register("title", { required: "제목을 입력하세요." })}
          id="title"
          type="text"
        />
      </InputWrapper>
      <EditorContainer reference={editorRef} />
    </Wrapper>
  );
};

export default BlogCreate;
