import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface LoginProps {
  email: string;
  password: string;
}

function Login() {
  const [csrfToken, setCsrfToken] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const handleLogin = handleSubmit(async (data: LoginProps) => {
    try {
      const response = await fetch("http://localhost:4000/login", {
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

      if (!response.ok) {
        throw new Error();
      }
    } catch (e) {
      console.log(e);
    }
  });

  const csrf = async () => {
    const response = await fetch("http://localhost:4000/getCSRFToken", {
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
      <form onSubmit={handleLogin}>
        <label>이메일</label>
        <input
          type="text"
          {...register("email", {
            required: "이메일을 입력하세요.",
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
          {...register("password", {
            required: "비밀번호를 입력하세요.",
          })}
        />
        <p>{errors?.password?.message}</p>
        <button>로그인</button>
      </form>
    </>
  );
}

export default Login;
