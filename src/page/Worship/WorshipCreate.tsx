import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { AiFillCaretDown, AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { BIBLE_DATA_SET } from "../../bible";
import usePostOrPatch from "../../lib/utils/hooks/usePost";
import FormItem from "../../components/Form/FormItem";
import Label from "../../components/Form/Label";
import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import SEO from "../../components/SEO/SEO";
import { IWorshipItems } from "../../state/worship.atom";
import { FetchDataProps } from "../../lib/interface";

const Wrapper = styled.div`
  margin-top: 8rem;
  position: relative;
  height: 100vh;

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
  .bible-address-container {
    grid-template-columns: 1fr 1fr 1fr;
    & {
      div {
        border: 0;
        display: grid;
        align-items: center;
        grid-template-columns: 0.4fr 1fr;
      }
    }
  }
  .select-box {
    position: relative;
    select {
      width: 100%;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: 0;
      outline: unset;
      font-size: 3rem;
    }
    span {
      position: absolute;
      z-index: 0;
      top: 50%;
      right: 2rem;
      transform: translateY(-50%);
    }
  }
  div {
    label {
      font-size: 2rem;
      font-weight: 700;
      margin-right: 0.5rem;
    }
    Input {
      width: 80%;
      box-sizing: border-box;
      padding: 0.8rem;
      border: 0;
      text-align: left;
      font-size: 3rem;
      outline: 0;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

const WorshipCreate = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IWorshipItems>();

  const {
    mutate,
    isSuccess,
    data: response,
  } = usePostOrPatch<FetchDataProps<IWorshipItems>, Error, IWorshipItems>({
    url: "/api/worship/create",
    queryKey: "weeklies",
    method: "POST",
  });

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (response) => {
        const { data } = response;
        navigate(`/worship/${data?._id}`);
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
    <>
      <SEO
        title="주보 만들기"
        keywords="양청 주보, 주보, 양정교회 청년부 주보"
      />
      <Wrapper>
        <h1>주보</h1>
        <button className="upload" onClick={onSubmit}>
          <AiOutlineCloudUpload />
        </button>
        <Form onSubmit={onSubmit}>
          <FormItem>
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              type="text"
              placeholder="강론 제목이 무엇인가요?"
              {...register("title", {
                required: "강론 제목을 알려주세요.",
              })}
            />
          </FormItem>
          {errors.title && <p>{errors?.title?.message}</p>}
          <FormItem>
            <Label htmlFor="word">본문</Label>
            <div className="select-box">
              <Select id="word" {...register("word")} options={paintObject()} />
              <span>
                <AiFillCaretDown />
              </span>
            </div>
          </FormItem>
          {errors.word && <p>{errors?.word?.message}</p>}
          <FormItem className="bible-address-container">
            <div>
              <Label htmlFor="chapter">장</Label>
              <Input
                id="chapter"
                type="number"
                placeholder="0"
                {...register("chapter", {
                  required: "장을 입력하세요.",
                })}
              />
            </div>
            <div>
              <Label htmlFor="verse">시작 절</Label>
              <Input
                id="verse"
                type="number"
                placeholder="0"
                {...register("verse", {
                  required: "절을 입력하세요.",
                })}
              />
            </div>
            <div>
              <Label htmlFor="verse_end">끝 절</Label>
              <Input
                id="verse_end"
                placeholder="0"
                type="number"
                {...register("verse_end")}
              />
            </div>
          </FormItem>
          {errors.verse_end && <p>{errors?.verse_end?.message}</p>}
          <FormItem>
            <Label htmlFor="pastor">강론</Label>
            <Input
              id="pastor"
              type="text"
              defaultValue="김상돈"
              {...register("pastor", {
                required: "강론을 누가 하는지 알려주세요.",
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="reader">성경봉독</Label>
            <Input
              id="reader"
              type="text"
              defaultValue="다같이"
              {...register("reader", {
                required: "누가 성경을 읽나요?",
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="worshipTeam">찬양</Label>
            <Input
              id="worshipTeam"
              type="text"
              placeholder="찬양 팀이 누구인가요?"
              defaultValue="둘로스"
              {...register("worshipTeam", {
                required: "찬양 팀을 알려주세요.",
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="prayer">대표기도</Label>
            <Input
              id="prayer"
              type="text"
              placeholder="대표를 누구하나요?"
              {...register("prayer", {
                required: "대표기도를 누가하는지 알려주세요.",
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="advertisement">광고</Label>
            <Input
              id="advertisement"
              type="text"
              placeholder="광고를 누가 하나요?"
              defaultValue="박도현"
              {...register("advertisement", {
                required: "누가 광고를 하는지 알려주세요.",
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="benediction">봉헌 및 축도</Label>
            <Input
              id="benediction"
              type="text"
              placeholder="봉헌, 축도 기도를 누가 하나요?"
              defaultValue="김상돈"
              {...register("benediction", {
                required: "봉헌, 축도 기도자를 알려주세요.",
              })}
            />
          </FormItem>
        </Form>
      </Wrapper>
    </>
  );
};

export default WorshipCreate;
