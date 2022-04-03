import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { loginState } from "../Authrization";
import { useFetch } from "../customhooks/useFectch";

interface LoginProps {
  email: string;
  password: string;
}

interface IUserProps {
  login: boolean;
  userId: string;
}

function Login() {
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginProps>();

  const [{ response, error, isLoading, csrfToken }, setOption] = useFetch({
    URL: `${process.env.REACT_APP_SERVER_URL}/login`,
  });

  const onSubmit = handleSubmit((data) => {
    setOption({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({ ...data }),
      credentials: "include",
      mode: "cors",
    });
  });

  useEffect(() => {
    if (response?.login) {
      localStorage.setItem("user", JSON.stringify(response));
      setIsLogin(response);
      navigate("/");
    }
  }, [response]);

  return (
    <>
      <h1>로그인</h1>
      {error?.message && <p>{error?.message}</p>}
      <form onSubmit={onSubmit}>
        <label>이메일</label>
        <input
          type="text"
          {...register("email", {
            required: "이메일을 입력하세요",
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "이메일이 아닙니다.",
            },
          })}
        />
        <p>{errors?.email?.message}</p>
        <label>비밀번호</label>
        <input
          type="password"
          {...register("password", { required: "비밀번호를 입력하세요" })}
        />
        <p>{errors?.password?.message}</p>
        <button>로그인</button>
      </form>
    </>
  );
}

export default Login;
