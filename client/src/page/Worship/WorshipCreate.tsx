import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { BIBLE_DATA_SET } from "../../bible";
import { useFetch } from "../../utils/customhooks/useFectch";
import { postRequest } from "../../utils/utilities/httpMethod";

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
  div {
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
  }
`;

function WorshipCreate() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const queryClient = useQueryClient();

  const [{ response, isLoading, error, csrfToken }, handleOptions] = useFetch({
    URL: `/api/worship/create`,
  });

  const onSubmit = handleSubmit((data) => {
    handleOptions(postRequest(data, csrfToken));
  });

  const paintObject = () => {
    const list = Object.entries(BIBLE_DATA_SET).map((item) => {
      const [key, value] = item;
      return <option value={key}>{value}</option>;
    });
    return list;
  };

  useEffect(() => {
    if (response) {
      queryClient.invalidateQueries("weeklies");
      navigate(`/worship/${response._id}`);
    }
  }, [response]);

  return (
    <Wrapper>
      <h1>주보</h1>
      <button className="upload" onClick={onSubmit}>
        <AiOutlineCloudUpload />
      </button>
      <InputWrapper onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            placeholder="강론 제목이 무엇인가요?"
            {...register("title", {
              required: "강론 제목을 알려주세요.",
            })}
          />
        </div>
        {errors.title && <p>{errors?.title?.message}</p>}
        <div>
          <label htmlFor="word">본문</label>
          <select id="word" {...register("word")}>
            {paintObject().map((value) => value)}
          </select>
        </div>
        {errors.word && <p>{errors?.word?.message}</p>}
        <div>
          <label htmlFor="chapter">장</label>
          <input
            id="chapter"
            type="number"
            {...register("chapter", {
              required: "장을 입력하세요.",
            })}
          />
        </div>
        <div>
          <label htmlFor="verse">시작 절</label>
          <input
            id="verse"
            type="number"
            {...register("verse", {
              required: "절을 입력하세요.",
            })}
          />
          <label htmlFor="verse_end">끝 절</label>
          <input id="verse_end" type="number" {...register("verse_end")} />
        </div>
        {errors.verse_end && <p>{errors?.verse_end?.message}</p>}
        <div>
          <label htmlFor="pastor">강론</label>
          <input
            id="pastor"
            type="text"
            defaultValue="김상돈"
            {...register("pastor", {
              required: "강론을 누가 하는지 알려주세요.",
            })}
          />
        </div>
        <div>
          <label htmlFor="worshipTeam">찬양</label>
          <input
            id="worshipTeam"
            type="text"
            placeholder="찬양 팀이 누구인가요?"
            defaultValue="둘로스"
            {...register("worshipTeam", {
              required: "찬양 팀을 알려주세요.",
            })}
          />
        </div>
        <div>
          <label htmlFor="prayer">대표기도</label>
          <input
            id="prayer"
            type="text"
            placeholder="대표를 누구하나요?"
            {...register("prayer", {
              required: "대표기도를 누가하는지 알려주세요.",
            })}
          />
        </div>
        <div>
          <label htmlFor="advertisement">광고</label>
          <input
            id="advertisement"
            type="text"
            placeholder="광고를 누가 하나요?"
            defaultValue="박도현"
            {...register("advertisement", {
              required: "누가 광고를 하는지 알려주세요.",
            })}
          />
        </div>
      </InputWrapper>
    </Wrapper>
  );
}

export default WorshipCreate;
