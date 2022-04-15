import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useFetch } from "../../customhooks/useFectch";
import { postRequest } from "../../httpMethod";

const Wrapper = styled.div`
  position: relative;
  height: 70vh;

  button.upload {
    position: absolute;
    top: -1rem;
    right: 0;
    cursor: pointer;
    font-size: 3rem;
    color: ${(props) => props.theme.white};
    padding: 0 0.4rem;
    margin: 0;
    border: 0;
    border-radius: 50%;
    background-color: ${(props) => props.theme.lineColor};
    svg {
      transform: translate(0.1rem, 0.3rem);
    }
    &:hover {
      background-color: ${(props) => props.theme.basicColor};
    }
  }
`;

const InputWrapper = styled.form`
  box-sizing: border-box;
  margin-bottom: 1rem;
  div {
    border-bottom: 1px solid ${(props) => props.theme.lineColor};
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

  const [{ response, isLoading, error, csrfToken }, handleOptions] = useFetch({
    URL: `${process.env.REACT_APP_SERVER_URL}/worship/create`,
  });

  const onSubmit = handleSubmit((data) => {
    handleOptions(postRequest(data, csrfToken));
  });

  useEffect(() => {
    if (response) {
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
            {...register("title", {
              required: "제목을 입력하세요",
            })}
          />
        </div>
        {errors.title && <p>{errors?.title?.message}</p>}
      </InputWrapper>
    </Wrapper>
  );
}

export default WorshipCreate;
