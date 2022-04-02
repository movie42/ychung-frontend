import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useFetch } from "../../customhooks/useFectch";

interface WorshipProps {
  title: string;
}

function Join() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<WorshipProps>();

  const [{ response, isLoading, error, csrfToken }, handleOptions] = useFetch({
    URL: `${process.env.REACT_APP_SERVER_URL}/worship/create`,
  });

  const onSubmit = handleSubmit((data: WorshipProps) => {
    handleOptions({
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
    if (response !== null) {
      navigate(`/worship/${response._id}`);
    }
  }, [response]);

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

        <button>글쓰기</button>
      </form>
    </>
  );
}

export default Join;
