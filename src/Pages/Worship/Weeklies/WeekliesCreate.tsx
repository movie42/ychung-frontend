import styled from "styled-components";
import { useForm } from "react-hook-form";
import { AiFillCaretDown, AiOutlineCloudUpload } from "react-icons/ai";
import { BIBLE_DATA_SET } from "@/lib/utils";
import { FormItem, Label, Input, Select, SEO, Textarea } from "@/Components";
import { IWorshipItems } from "@/lib/state";
// import { useCreateWeekly } from "../hooks";

const Wrapper = styled.div`
  margin-top: 8rem;
  position: relative;
  min-height: 100vh;

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
  font-size: 1.6rem;
  .select-box {
    position: relative;
    display: flex;
    align-items: center;
    select {
      cursor: pointer;
      width: 100%;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border: 0;
      outline: unset;
    }
    span {
      position: absolute;
      z-index: 0;
      top: 60%;
      right: 2rem;
      transform: translateY(-50%);
    }
  }
  div {
    label {
      font-weight: 700;
      margin-right: 0.5rem;
    }
    Input {
      width: 100%;
      box-sizing: border-box;
      padding: 0.8rem;
      border: 0;
      text-align: left;
      outline: 0;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    textarea {
      border: 0;
    }
  }
`;

const FormScriptItem = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1.2fr 1.5fr 1.5fr;
  .word-box {
    display: flex;
    align-items: center;
    input {
      width: 50%;
    }
  }
`;

const WeekliesCreate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IWorshipItems>();

  // const { mutate: createWeeklyMutate } = useCreateWeekly();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    // createWeeklyMutate(data);
  });

  const paintObject = () => {
    const list = Object.entries(BIBLE_DATA_SET).map((item) => {
      const [key, value] = item;
      return (
        <option key={key} value={key}>
          {value}
        </option>
      );
    });
    return list;
  };

  return (
    <>
      <SEO
        title="주보 만들기"
        keywords="양청 주보, 주보, 양정교회 청년부 주보"
      />
      <Wrapper>
        <h1>주보</h1>
        <button className="upload" onClick={onSubmit}>
          <AiOutlineCloudUpload />
        </button>
        <Form onSubmit={onSubmit}>
          <FormItem>
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              type="text"
              placeholder="강론 제목이 무엇인가요?"
              {...register("title", {
                required: "강론 제목을 알려주세요."
              })}
            />
          </FormItem>
          {errors.title && <p>{errors?.title?.message}</p>}
          <FormItem>
            <Label htmlFor="word">본문</Label>
            <FormScriptItem>
              <div className="select-box">
                <Select
                  id="word"
                  {...register("word")}
                  options={paintObject()}
                />
                <span>
                  <AiFillCaretDown />
                </span>
              </div>
              <div className="word-box">
                <Label htmlFor="chapter">장</Label>
                <Input
                  id="chapter"
                  type="number"
                  placeholder="0"
                  {...register("chapter", {
                    required: "장을 입력하세요."
                  })}
                />
              </div>
              <div className="word-box">
                <Label htmlFor="verse">시작 절</Label>
                <Input
                  id="verse"
                  type="number"
                  placeholder="0"
                  {...register("verse", {
                    required: "절을 입력하세요."
                  })}
                />
              </div>
              <div className="word-box">
                <Label htmlFor="verse_end">끝 절</Label>
                <Input
                  id="verse_end"
                  placeholder="0"
                  type="number"
                  {...register("verse_end")}
                />
              </div>
            </FormScriptItem>
          </FormItem>
          {errors.word && <p>{errors?.word?.message}</p>}
          {errors.verse_end && <p>{errors?.verse_end?.message}</p>}
          <FormItem>
            <Label htmlFor="pastor">강론</Label>
            <Input
              id="pastor"
              type="text"
              defaultValue="박선민"
              {...register("pastor", {
                required: "강론을 누가 하는지 알려주세요."
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="reader">성경봉독</Label>
            <Input
              id="reader"
              type="text"
              defaultValue="다같이"
              {...register("reader", {
                required: "누가 성경을 읽나요?"
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="worshipTeam">찬양</Label>
            <Input
              id="worshipTeam"
              type="text"
              placeholder="찬양 팀이 누구인가요?"
              defaultValue="둘로스"
              {...register("worshipTeam", {
                required: "찬양 팀을 알려주세요."
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="prayer">대표기도</Label>
            <Input
              id="prayer"
              type="text"
              placeholder="대표를 누구하나요?"
              {...register("prayer", {
                required: "대표기도를 누가하는지 알려주세요."
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="advertisement">광고</Label>
            <Input
              id="advertisement"
              type="text"
              placeholder="광고를 누가 하나요?"
              defaultValue="유믿음"
              {...register("advertisement", {
                required: "누가 광고를 하는지 알려주세요."
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="benediction">봉헌</Label>
            <Input
              id="benediction"
              type="text"
              placeholder="봉헌, 축도 기도를 누가 하나요?"
              defaultValue="박선민"
              {...register("benediction", {
                required: "봉헌, 축도 기도자를 알려주세요."
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="benediction">주기도문</Label>
            <Input
              id="benediction"
              type="text"
              placeholder="주기도문은 누가 하나요?"
              defaultValue="다같이"
              {...register("benediction", {
                required: "누가 주기도문을 하는지 알려주세요."
              })}
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="worshipNotice">예배 안내</Label>
            <Textarea
              id="worshipNotice"
              placeholder="성도에게 안내 할 내용을 작성해주세요."
              defaultValue={`먼저 오신 분은 안내 위원의 안내에 따라 앞자리부터 앉아주세요.
코로나 방역지침이 완화되었습니다. 온라인 예배자는 출석예배로 전환해 주시고 소그룹 등 교회 활동이 회복되도록 노력해주세요.
5월22일부터 교회 식당 운영을 재개합니다.`}
              {...register("worshipNotice", {
                required: "안내 할 내용을 작성해주세요."
              })}
            />
          </FormItem>
        </Form>
      </Wrapper>
    </>
  );
};

export default WeekliesCreate;
