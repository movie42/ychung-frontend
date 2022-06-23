import React, { useEffect } from "react";

import styled from "styled-components";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

import { BIBLE_DATA_SET } from "../../bible";
import usePost from "../../utils/customhooks/usePost";
import { IWorshipItems } from "../../state/worship.atom";
import InputStyle from "../../components/Form/Input";
import LabelStyle from "../../components/Form/Label";

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
`;

const FormItemContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  label {
    font-size: 2rem;
    font-weight: 700;
    margin-right: 0.5rem;
  }
  input {
    width: 80%;
    box-sizing: border-box;
    padding: 0.8rem;
    border: 0;
    text-align: left;
    font-size: 3rem;
    outline: 0;
  }
`;

const Input = styled(InputStyle)``;
const Label = styled(LabelStyle)``;

interface IWorshipUpdate {
  data?: IWorshipItems;
}

const WorshipUpdate = ({ data }: IWorshipUpdate) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = usePost({
    url: `/api/worship/${id}`,
    queryKey: "weeklies",
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (response) => {
        const { data } = response;
        navigate(`/worship/${data._id}`);
      },
    });
  });

  const paintObject = () => {
    const list = Object.entries(BIBLE_DATA_SET).map((item) => {
      const [key, value] = item;
      return <option value={key}>{value}</option>;
    });
    return list;
  };

  return (
    <Wrapper>
      <h1>주보</h1>
      <button className="upload" onClick={onSubmit}>
        <AiOutlineCloudUpload />
      </button>
      <Form onSubmit={onSubmit}>
        <FormItemContainer>
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            type="text"
            placeholder="강론 제목이 무엇인가요?"
            defaultValue={data?.title}
            {...register("title", { required: "제목이 반드시 필요합니다." })}
          />
        </FormItemContainer>
        {errors.title && <p>{errors?.title?.message}</p>}
        <FormItemContainer>
          <Label htmlFor="word">본문</Label>
          <select id="word" {...register("word")} defaultValue={data?.word}>
            {paintObject().map((label, value) => (
              <option value={value}>{label}</option>
            ))}
          </select>
        </FormItemContainer>
        {errors.word && <p>{errors?.word?.message}</p>}
        <FormItemContainer>
          <Label htmlFor="chapter">장</Label>
          <Input
            id="chapter"
            type="number"
            defaultValue={data?.chapter}
            {...register("chapter", { required: "장을 입력하세요." })}
          />
        </FormItemContainer>
        <FormItemContainer>
          <Label htmlFor="verse">시작 절</Label>
          <Input
            id="verse"
            type="number"
            defaultValue={data?.verse}
            {...register("verse", { required: "절을 입력하세요." })}
          />
          <Label htmlFor="verse_end">끝 절</Label>
          <Input id="verse_end" type="number" {...register("verse_end")} />
        </FormItemContainer>
        {errors.verse_end && <p>{errors?.verse_end?.message}</p>}
        <FormItemContainer>
          <Label htmlFor="pastor">강론</Label>
          <Input
            id="pastor"
            type="text"
            defaultValue={data?.pastor}
            {...register("pastor", {
              required: "강론을 누가 하는지 알려주세요.",
            })}
          />
        </FormItemContainer>
        <FormItemContainer>
          <Label htmlFor="worshipTeam">찬양</Label>
          <Input
            id="worshipTeam"
            type="text"
            placeholder="찬양 팀이 누구인가요?"
            defaultValue={data?.worshipTeam}
            {...register("worshipTeam", { required: "찬양 팀을 알려주세요." })}
          />
        </FormItemContainer>
        <FormItemContainer>
          <Label htmlFor="prayer">대표기도</Label>
          <Input
            id="prayer"
            type="text"
            placeholder="대표를 누구하나요?"
            defaultValue={data?.prayer}
            {...register("prayer", {
              required: "대표기도를 누가하는지 알려주세요.",
            })}
          />
        </FormItemContainer>
        <FormItemContainer>
          <Label htmlFor="advertisement">광고</Label>
          <Input
            id="advertisement"
            type="text"
            placeholder="광고를 누가 하나요?"
            defaultValue={data?.advertisement}
            {...register("advertisement", {
              required: "누가 광고를 하는지 알려주세요.",
            })}
          />
        </FormItemContainer>
      </Form>
    </Wrapper>
  );
};

export default WorshipUpdate;
