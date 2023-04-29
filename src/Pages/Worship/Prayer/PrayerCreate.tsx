import styled from "styled-components";
import { useForm } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";

import { FormItem, Label, Input } from "@/Components";
import { Prayer } from "../hooks/useGetPrayers";
import { calenderHelper } from "@/lib/utils";
import useCreatePrayer from "../hooks/useCreatePrayer";

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
      font-size: 2.2rem;
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
      font-size: 2.2rem;
      outline: 0;
    }

    textarea {
      font-size: 2.2rem;
      resize: vertical;
      min-height: 20rem;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    @media (max-width: 400px) {
      label,
      input {
        font-size: 1.7rem;
      }
    }
  }
`;

const PrayerCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Omit<Prayer, "createdAt" | "updatedAt">>();
  const { mutate } = useCreatePrayer();

  const handleCreatePrayer = handleSubmit((data) => {
    const prayer = {
      name: data.name,
      start: `${data.start}T14:00:00+09:00`,
      end: `${data.start}T14:00:00+09:00`
    };
    mutate(prayer);
  });

  return (
    <>
      <Wrapper>
        <h1>대표기도 일정</h1>
        <button
          className="upload"
          onClick={handleCreatePrayer}
        >
          <AiOutlineCloudUpload />
        </button>
        <Form onSubmit={handleCreatePrayer}>
          <FormItem>
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              type="text"
              placeholder="대표기도자 이름을 알려주세요."
              {...register("name", {
                required: "대표기도자 이름을 알려주세요."
              })}
            />
          </FormItem>
          {errors.name && <p>{errors?.name?.message}</p>}
          <FormItem>
            <Label htmlFor="start">날짜</Label>
            <Input
              type="date"
              {...register("start", {
                required: "언제 기도를 하는지 반드시 알려줘야해요!"
              })}
              defaultValue={`${calenderHelper()}`}
            />
          </FormItem>
          {errors.start && <p>{errors?.start?.message}</p>}
        </Form>
      </Wrapper>
    </>
  );
};

export default PrayerCreate;
