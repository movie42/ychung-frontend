import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { AiFillCaretDown, AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { BIBLE_DATA_SET } from "../../bible";
import usePostOrPatch from "../../utils/hooks/usePost";
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
        title="?????? ?????????"
        keywords="?????? ??????, ??????, ???????????? ????????? ??????"
      />
      <Wrapper>
        <h1>??????</h1>
        <button className="upload" onClick={onSubmit}>
          <AiOutlineCloudUpload />
        </button>
        <Form onSubmit={onSubmit}>
          <FormItem>
            <Label htmlFor="title">??????</Label>
            <Input
              id="title"
              type="text"
              placeholder="?????? ????????? ????????????????"
              {...register("title", {
                required: "?????? ????????? ???????????????.",
              })}
            />
          </FormItem>
          {errors.title && <p>{errors?.title?.message}</p>}
          <FormItem>
            <Label htmlFor="word">??????</Label>
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
              <Label htmlFor="chapter">???</Label>
              <Input
                id="chapter"
                type="number"
                placeholder="0"
                {...register("chapter", {
                  required: "?????? ???????????????.",
                })}
              />
            </div>
            <div>
              <Label htmlFor="verse">?????? ???</Label>
              <Input
                id="verse"
                type="number"
                placeholder="0"
                {...register("verse", {
                  required: "?????? ???????????????.",
                })}
              />
            </div>
            <div>
              <Label htmlFor="verse_end">??? ???</Label>
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
            <Label htmlFor="pastor">??????</Label>
            <Input
              id="pastor"
              type="text"
              defaultValue="?????????"
              {...register("pastor", {
                required: "????????? ?????? ????????? ???????????????.",
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="reader">????????????</Label>
            <Input
              id="reader"
              type="text"
              defaultValue="?????????"
              {...register("reader", {
                required: "?????? ????????? ??????????",
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="worshipTeam">??????</Label>
            <Input
              id="worshipTeam"
              type="text"
              placeholder="?????? ?????? ????????????????"
              defaultValue="?????????"
              {...register("worshipTeam", {
                required: "?????? ?????? ???????????????.",
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="prayer">????????????</Label>
            <Input
              id="prayer"
              type="text"
              placeholder="????????? ????????????????"
              {...register("prayer", {
                required: "??????????????? ??????????????? ???????????????.",
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="advertisement">??????</Label>
            <Input
              id="advertisement"
              type="text"
              placeholder="????????? ?????? ??????????"
              defaultValue="?????????"
              {...register("advertisement", {
                required: "?????? ????????? ????????? ???????????????.",
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="benediction">?????? ??? ??????</Label>
            <Input
              id="benediction"
              type="text"
              placeholder="??????, ?????? ????????? ?????? ??????????"
              defaultValue="?????????"
              {...register("benediction", {
                required: "??????, ?????? ???????????? ???????????????.",
              })}
            />
          </FormItem>
        </Form>
      </Wrapper>
    </>
  );
};

export default WorshipCreate;
