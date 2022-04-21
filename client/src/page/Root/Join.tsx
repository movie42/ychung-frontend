import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface SubmitProps {
  email: string;
  userName: string;
  name: string;
  password: string;
  password2: string;
}

function Join() {
  const [csrfToken, setCsrfToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SubmitProps>();

  const onSubmit = handleSubmit(async (data: SubmitProps) => {
    if (data.password !== data.password2) {
      setError(
        "password2",
        {
          message: "앞에서 입력한 비밀번호와 같아야합니다.",
        },
        { shouldFocus: true }
      );
    }

    const response = await fetch(`/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({ ...data }),
      credentials: "include",
      mode: "cors",
    });

    if (response.ok) {
      window.location.pathname = "/";
    }
  });

  const csrf = async () => {
    const response = await fetch(`/getCSRFToken`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });
    const parseResponse = await response.json();

    setCsrfToken(parseResponse.CSRFToken);
  };

  useEffect(() => {
    csrf();
  }, []);

  return (
    <>
      <h1>안녕하세요. 여기는 회원가입 페이지입니다.</h1>
      <form onSubmit={onSubmit}>
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
                const dbEmail = await fetch(`/api/checked-db/email=${value}`);
                return dbEmail.ok ? true : "이미 가입된 사용자입니다.";
              },
            },
          })}
        />
        <p>{errors?.email?.message}</p>
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
        <p>{errors?.userName?.message}</p>
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
        <p>{errors?.name?.message}</p>
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
        <p>{errors?.password?.message}</p>
        <label>비밀번호 확인</label>
        <input
          id="password2"
          type="password"
          {...register("password2", {
            required: "앞에서 입력한 비밀번호를 똑같이 입력해주세요.",
          })}
        />
        <p>{errors?.password2?.message}</p>
        <button>가입하기</button>
      </form>
    </>
  );
}

export default Join;
