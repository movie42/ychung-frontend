import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface WorshipProps {
  title: string;
}

function Join() {
  const [csrfToken, setCsrfToken] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<WorshipProps>();

  const onSubmit = handleSubmit(async (data: WorshipProps) => {
    const response = await fetch("http://localhost:4000/worship/create", {
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
      <h1>주보</h1>
      <form onSubmit={onSubmit}>
        <label>제목</label>
        <input
          type="text"
          {...register("title", {
            required: "제목을 입력하세요",
          })}
        />
        <p>{errors?.title?.message}</p>

        <button>가입하기</button>
      </form>
    </>
  );
}

export default Join;
