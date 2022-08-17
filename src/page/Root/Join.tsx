import { usePost } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "../../components/Buttons/Button";
import FormItem from "../../components/Form/FormItem";
import SEO from "../../components/SEO/SEO";

const Wrapper = styled.div`
  margin-top: 8rem;
`;
const MessageContainer = styled.div`
  margin-top: -8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

interface SubmitProps {
  email: string;
  userName: string;
  name: string;
  password: string;
  password2: string;
}

function Join() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SubmitProps>();

  const { mutate: joinMutate, isSuccess } = usePost({
    url: "/api/join",
    queryKey: "join",
    method: "POST",
  });

  const onSubmit = handleSubmit(async (data: SubmitProps) => {
    if (data.password !== data.password2) {
      setError(
        "password2",
        {
          message: "앞에서 입력한 비밀번호와 같아야합니다.",
        },
        { shouldFocus: true }
      );
      return;
    }

    joinMutate(data);
  });

  useEffect(() => {
    if (isSuccess) {
      const timeout = setTimeout(() => navigate("/login"), 3000);
      return () => clearTimeout(timeout);
    }
  }, [isSuccess]);

  return isSuccess ? (
    <Wrapper>
      <MessageContainer>
        <h1>가입하신것을 축하드립니다! 😙</h1>
        <p>로그인 화면으로 이동합니다.</p>
      </MessageContainer>
    </Wrapper>
  ) : (
    <>
      <SEO title="회원가입" keywords="회원가입" />
      <Wrapper>
        <h1>회원 가입</h1>
        <form onSubmit={onSubmit}>
          <FormItem>
            <label>이메일</label>
            <input
              type="text"
              {...register("email", {
                required: "이메일을 입력해야합니다.",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "이메일이 아닙니다.",
                },
                validate: {
                  checkValue: async (value) => {
                    const dbEmail = await fetch(
                      `/api/checked-db/email=${value}`
                    );
                    return dbEmail.ok ? true : "이미 가입된 사용자입니다.";
                  },
                },
              })}
            />
          </FormItem>
          <p>{errors?.email?.message}</p>
          <FormItem>
            <label>사용자 이름</label>
            <input
              type="text"
              {...register("userName", {
                required: "사용자 이름을 입력해야합니다.",
                pattern: {
                  value: /^[a-zA-Z0-9]{5,10}$/,
                  message:
                    "사용자 이름은 영문과 숫자조합으로만 이루어져야하며 5자 이상 10자 이하여야합니다.",
                },
                validate: {
                  checkValue: async (value) => {
                    const dbEmail = await fetch(
                      `/api/checked-db/userName=${value}`
                    );
                    return dbEmail.ok ? true : "이미 가입된 사용자입니다.";
                  },
                },
              })}
            />
          </FormItem>
          <p>{errors?.userName?.message}</p>
          <FormItem>
            <label>실명</label>
            <input
              type="text"
              {...register("name", {
                required: "실명을 입력해야합니다.",
                pattern: {
                  value: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,6}$/,
                  message: "한글 2글자 이상 6글자 이하로 실명을 입력해주세요. ",
                },
              })}
            />
          </FormItem>
          <p>{errors?.name?.message}</p>
          <FormItem>
            <label>비밀번호</label>
            <input
              type="password"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
                pattern: {
                  value:
                    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/,
                  message:
                    "비밀번호는 영문, 특수문자, 숫자 조합으로만 이루어질 수 있습니다. 최소 8자 이상이어야합니다.",
                },
              })}
            />
          </FormItem>
          <p>{errors?.password?.message}</p>
          <FormItem>
            <label>비밀번호 확인</label>
            <input
              id="password2"
              type="password"
              {...register("password2", {
                required: "앞에서 입력한 비밀번호를 똑같이 입력해주세요.",
              })}
            />
            <p>{errors?.password2?.message}</p>
          </FormItem>
          <Button buttonType="block">가입하기</Button>
        </form>
      </Wrapper>
    </>
  );
}

export default Join;
