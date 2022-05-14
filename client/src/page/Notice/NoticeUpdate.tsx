import { Editor } from "@toast-ui/react-editor";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import styled from "styled-components";
import { useFetch } from "../../utils/customhooks/useFectch";
import { postRequest } from "../../utils/utilities/httpMethod";
import EditorContainer from "../../components/Editor";
import { useNavigate } from "react-router-dom";
import Label from "../../components/Form/Label";
import Input from "../../components/Form/Input";
import { currentDate } from "../../utils/utilities/calenderHelper";

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
  const editorRef = useRef<Editor>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [{ response, error, isLoading, csrfToken }, handleOption] = useFetch({
    URL: `/api/notice/${data._id}`,
  });

  const onClick = handleSubmit((data) => {
    const editorParser = editorRef.current?.getInstance().getMarkdown();
    const formData = {
      ...data,
      paragraph: editorParser,
    };
    handleOption(postRequest(formData, csrfToken));
  });

  useEffect(() => {
    if (response) {
      navigate(`/notice/${response._id}`);
    }
  }, [response]);

  return (
    <Wrapper>
      <button className="upload" onClick={onClick}>
        <AiOutlineCloudUpload />
      </button>
      <InputWrapper>
        <div>
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            type="text"
            placeholder="제목을 입력하세요."
            register={register}
            registerName="title"
            defaultValue={data.title}
            registerOptions={{ required: "제목을 입력하세요." }}
          />
        </div>
        <div>
          <Label htmlFor="startDate">행사 시작</Label>
          <Input
            type="date"
            register={register}
            registerName="startDate"
            defaultValue={`${currentDate()}`}
          />
        </div>
        <div>
          <Label htmlFor="endDate">행사 끝</Label>
          <Input
            type="date"
            register={register}
            registerName="endDate"
            defaultValue={`${currentDate()}`}
          />
          {<p>{errors?.endDate?.message}</p>}
        </div>
        <div>
          <Label htmlFor="summary">행사 요약</Label>
          <Input
            type="text"
            register={register}
            registerName="summary"
            registerOptions={{ min: 0, max: 100 }}
            defaultValue={data.summary}
            placeholder="달력에 들어갈 메시지를 100자 이내로 적어주세요."
          />
          {<p>{errors?.endDate?.message}</p>}
        </div>
        <div className="flex">
          <Input
            id="isWeekly"
            type="checkbox"
            register={register}
            registerName="isWeekly"
            defaultChecked={data.isWeekly}
            registerOptions={{ value: false }}
          />
          <Label htmlFor="isWeekly">주보에 넣기</Label>
        </div>
      </InputWrapper>
      <EditorContainer initialValue={data.paragraph} reference={editorRef} />
    </Wrapper>
  );
};

export default NoticeUpdate;
