import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import EditorContainer from "../../components/Editor";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import usePost from "../../utils/customhooks/usePost";
import SEO from "../../components/SEO/SEO";

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

const Form = styled.form`
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

const BlogCreate = () => {
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
    <>
      <SEO
        title="블로그 작성"
        keywords="블로그, 양정교회 청년부 블로그, 양청 블로그"
      />
      <Wrapper>
        <button className="upload" onClick={onClick}>
          <AiOutlineCloudUpload />
        </button>
        <Form>
          <label htmlFor="title">제목</label>
          <input
            placeholder="제목을 입력하세요."
            {...register("title", { required: "제목을 입력하세요." })}
            id="title"
            type="text"
          />
        </Form>
        <EditorContainer reference={editorRef} />
      </Wrapper>
    </>
  );
};

export default BlogCreate;