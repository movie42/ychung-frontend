import { Editor as IEditor } from "@toast-ui/react-editor";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { currentDate } from "../../utils/utilities/calenderHelper";
import usePostOrPatch from "../../utils/hooks/usePost";
import { previewParagraph } from "../../utils/utilities/previewParagraph";
import { FetchDataProps } from "../../lib/interface";

import { Editor, Label, Input, FormItem, SEO } from "@/components";

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

interface NoticeDetail {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  summary: string;
  isWeekly: boolean;
  paragraph: string;
  creator: {
    _id: string;
    userName: string;
    name: string;
  };
  createdAt: string;
}

interface INoticeDetailProps {
  data: NoticeDetail;
}
const NoticeUpdate = ({ data }: INoticeDetailProps) => {
  const navigate = useNavigate();
  const editorRef = useRef<IEditor>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoticeDetail>();

  const {
    mutate,
    isSuccess,
    data: response,
  } = usePostOrPatch<FetchDataProps<NoticeDetail>, Error, NoticeDetail>({
    url: `/api/notice/${data?._id}`,
    queryKey: "notice",
    method: "POST",
  });

  const onClick = handleSubmit((data) => {
    const editorParser = editorRef.current?.getInstance().getMarkdown();
    if (editorParser) {
      const formData = {
        ...data,
        paragraph: editorParser,
      };
      mutate(formData);
    }
  });

  useEffect(() => {
    if (isSuccess) {
      const { data } = response;
      navigate(`/notice/${data?._id}`);
    }
  }, [isSuccess]);

  return (
    <>
      <SEO
        title={`${data?.title} ??????`}
        description={data?.paragraph && previewParagraph(data?.paragraph)}
        keywords="??????, ????????????, ?????? ????????????, ???????????? ????????? ????????????"
      />
      <Wrapper>
        <button className="upload" onClick={onClick}>
          <AiOutlineCloudUpload />
        </button>
        <Form>
          <FormItem>
            <Label htmlFor="title">??????</Label>
            <Input
              id="title"
              type="text"
              placeholder="????????? ???????????????."
              defaultValue={data?.title}
              {...register("title", { required: "????????? ???????????????." })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="startDate">?????? ??????</Label>
            <Input
              type="date"
              defaultValue={`${currentDate()}`}
              {...register("startDate", { required: "????????? ???????????????." })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="endDate">?????? ???</Label>
            <Input
              type="date"
              defaultValue={`${currentDate()}`}
              {...register("endDate", { required: "????????? ???????????????." })}
            />
            {<p>{errors?.endDate?.message}</p>}
          </FormItem>
          <FormItem>
            <Label htmlFor="summary">?????? ??????</Label>
            <Input
              type="text"
              defaultValue={data?.summary}
              {...register("summary", { min: 0, max: 100 })}
              placeholder="????????? ????????? ???????????? 100??? ????????? ???????????????."
            />
            {<p>{errors?.endDate?.message}</p>}
          </FormItem>
          <FormItem className="flex">
            <Input
              id="isWeekly"
              type="checkbox"
              defaultChecked={data?.isWeekly}
              {...register("isWeekly", { value: false })}
            />
            <Label htmlFor="isWeekly">????????? ??????</Label>
          </FormItem>
        </Form>
        <Editor initialValue={data?.paragraph} reference={editorRef} />
      </Wrapper>
    </>
  );
};

export default NoticeUpdate;
