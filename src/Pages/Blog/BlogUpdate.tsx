import { useRef } from "react";
import { Editor as IEditor } from "@toast-ui/react-editor";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { Editor } from "@/Components";
import { useUpdateBlogPost } from "./hooks";

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

interface BlogDetail {
  _id: string;
  title: string;
  isWeekly: boolean;
  paragraph: string;
  creator: {
    _id: string;
  };
  comments: [];
  views: number;
  createdAt: string;
}

interface IBlogDetailProps {
  data: any;
}
const BlogUpdate = ({ data }: IBlogDetailProps) => {
  const { postId } = useParams();
  const editorRef = useRef<IEditor>(null);
  const { register, handleSubmit } = useForm<BlogDetail>();

  const { mutate: updateBlogPostMutate } = useUpdateBlogPost();

  const onClick = handleSubmit((data) => {
    const editorParser = editorRef.current?.getInstance().getMarkdown();
    if (editorParser && postId) {
      const body = {
        ...data,
        paragraph: editorParser
      };
      updateBlogPostMutate({ id: postId, body });
    }
  });

  return (
    <>
      <Wrapper>
        <button
          className="upload"
          onClick={onClick}
        >
          <AiOutlineCloudUpload />
        </button>
        <Form>
          <label htmlFor="title">제목</label>
          <input
            placeholder="제목을 입력하세요."
            {...register("title", {
              required: "제목을 입력하세요.",
              value: data.title
            })}
            id="title"
            type="text"
          />
        </Form>
        <Editor
          initialValue={data.paragraph}
          reference={editorRef}
        />
      </Wrapper>
    </>
  );
};

export default BlogUpdate;
