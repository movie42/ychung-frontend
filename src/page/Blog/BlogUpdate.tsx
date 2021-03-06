import React, { useEffect, useRef } from "react";
import { Editor as IEditor } from "@toast-ui/react-editor";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import usePostOrPatch from "../../utils/hooks/usePost";
import { FetchDataProps } from "../../lib/interface";

import { Editor, SEO } from "@/components";

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
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef<IEditor>(null);
  const { register, handleSubmit } = useForm<BlogDetail>();

  const {
    mutate,
    isSuccess,
    data: response,
  } = usePostOrPatch<FetchDataProps<BlogDetail>, Error, BlogDetail>({
    url: `/api/blog/${id}`,
    queryKey: "posts",
    method: "POST",
  });

  const onClick = handleSubmit((data) => {
    const editorParser = editorRef.current?.getInstance().getMarkdown();
    if (editorParser) {
      const formData = {
        ...data,
        paragraph: editorParser,
      };
      mutate(formData, {
        onSuccess: (response) => {
          const { data } = response;
          navigate(`/blog/${data?._id}`);
        },
      });
    }
  });

  return (
    <>
      <SEO
        title="????????? ????????? ??????"
        keywords="?????????, ???????????? ????????? ?????????, ?????? ?????????"
      />
      <Wrapper>
        <button className="upload" onClick={onClick}>
          <AiOutlineCloudUpload />
        </button>
        <Form>
          <label htmlFor="title">??????</label>
          <input
            placeholder="????????? ???????????????."
            {...register("title", {
              required: "????????? ???????????????.",
              value: data.title,
            })}
            id="title"
            type="text"
          />
        </Form>
        <Editor initialValue={data.paragraph} reference={editorRef} />
      </Wrapper>
    </>
  );
};

export default BlogUpdate;
