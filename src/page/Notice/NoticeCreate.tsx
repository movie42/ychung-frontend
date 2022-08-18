import { useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor as IEditor } from "@toast-ui/react-editor";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { calenderHelper } from "@/lib/utils";
import { INoticeInterface } from "@/lib/state";

import { Editor, Label, Input, SEO } from "@/components";
import { useCreateNotice } from "./hooks";

const Wrapper = styled.div`
  margin-top: 8rem;
  position: relative;
  height: 70vh;
  z-index: 0;
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
    &.flex {
      label {
        margin-left: 0.5rem;
      }
      input {
        width: unset;
      }
    }
  }
`;

const NoticeCreate = () => {
  const navigate = useNavigate();
  const editorRef = useRef<IEditor>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INoticeInterface>();

  const { mutate: createNoticeMutate } = useCreateNotice();

  const onClick = handleSubmit((data) => {
    const editorParser = editorRef.current?.getInstance().getMarkdown();
    if (editorParser) {
      const body = {
        ...data,
        paragraph: editorParser,
      };
      createNoticeMutate(body);
    }
  });

  return (
    <>
      <SEO
        title="공지사항 작성"
        keywords="공지, 공지사항, 양청 공지사항, 양정교회 청년부 공지사항"
      />

      <Wrapper>
        <button className="upload" onClick={onClick}>
          <AiOutlineCloudUpload />
        </button>
        <Form>
          <div>
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              type="text"
              placeholder="제목을 입력하세요."
              {...register("title", { required: "제목을 입력하세요." })}
            />
          </div>
          <div>
            <Label htmlFor="startDate">행사 시작</Label>
            <Input
              type="date"
              {...register("startDate", { required: "제목을 입력하세요." })}
              defaultValue={`${calenderHelper()}`}
            />
          </div>
          <div>
            <Label htmlFor="endDate">행사 끝</Label>
            <Input
              type="date"
              {...register("endDate", {
                validate: (value) =>
                  (value && value >= calenderHelper()) ||
                  "오늘 이전 날짜를 선택할 수 없어요.",
              })}
              defaultValue={`${calenderHelper()}`}
            />
            {<p>{errors?.endDate?.message}</p>}
          </div>
          <div>
            <Label htmlFor="summary">행사 요약</Label>
            <Input
              type="text"
              {...register("summary", { min: 0, max: 100 })}
              placeholder="달력에 들어갈 메시지를 100자 이내로 적어주세요."
            />
            {<p>{errors?.endDate?.message}</p>}
          </div>
          <div className="flex">
            <Input
              id="isWeekly"
              type="checkbox"
              {...register("isWeekly", { value: false })}
            />
            <Label htmlFor="isWeekly">주보에 넣기</Label>
          </div>
        </Form>
        <Editor reference={editorRef} />
      </Wrapper>
    </>
  );
};

export default NoticeCreate;
