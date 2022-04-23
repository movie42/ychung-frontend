import { motion } from "framer-motion";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { scrollAnimationVariants } from "../../animation variants/scrollAnimationVariants";
import Button from "../../components/Buttons/Button";
import Input from "../../components/Form/Input";

const Wrapper = styled.div`
  height: calc(100vh - 100px);
`;

const Section = styled(motion.section)`
  height: 100%;
  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin: 0;
    padding: 0;
    line-height: 1.3;
  }

  &.main-section-1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
      &.emoji {
        font-size: 10rem;
      }
      font-size: 7rem;
      font-weight: 900;
    }
  }

  &.main-section-2,
  &.main-section-3,
  &.main-section-4,
  &.main-section-5 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    h1 {
      font-size: 5rem;
      font-weight: 900;
      margin-bottom: 1rem;
    }

    h3 {
      font-size: 2.6rem;
      font-weight: 300;
      word-break: keep-all;
    }

    div {
      display: flex;
      flex-direction: column;
      a {
        display: block;
        box-sizing: border-box;
        text-decoration: unset;
        font-size: 2rem;
        text-align: center;
        color: ${(props) => props.theme.color.fontColorBlack};
        border: 1px solid ${(props) => props.theme.color.gray800};
        border-radius: 0.7rem;
        padding: 1rem 0;
        margin-bottom: 1rem;
        &:hover {
          background-color: ${(props) => props.theme.color.primary400};
          color: ${(props) => props.theme.color.fontColorWhite};
          border-color: ${(props) => props.theme.color.fontColorWhite};
        }
      }
    }
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionInput = styled(Input)`
  font-size: 2.2rem;
  border: 0;
  padding: 1rem 0;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  margin-bottom: 1rem;
`;

const TitleContainer = styled.div`
  margin-bottom: 1rem;
`;

function Main() {
  const { register, handleSubmit } = useForm();

  return (
    <Wrapper>
      <Section
        variants={scrollAnimationVariants}
        exit="exit"
        className="main-section-1">
        <h1 className="emoji">😄</h1>
        <h1>
          양청에 <br />
          오신 것을
          <br />
          환영합니다.
        </h1>
      </Section>
      {/* <Section className="main-section-2">
        <TitleContainer>
          <h1>새로 오셨나요?</h1>
          <h3>양정교회 청년부와 함께하면 좋겠어요.</h3>
        </TitleContainer>
        <div>
          <Link to="">양청과 함께하기</Link>
          <Link to="">예배 안내</Link>
        </div>
      </Section>
      <Section className="main-section-3">
        <TitleContainer>
          <h1>예수 안에서 함께 자라가요.</h1>
          <h3>함께 배우고 성장하는 방법을 소개합니다.</h3>
        </TitleContainer>
        <div>
          <Link to="">소그룹 참여하기</Link>
          <Link to="">일대일 양육 신청하기</Link>
          <Link to="">동아리 신청하기</Link>
          <Link to="">봉사 신청하기</Link>
        </div>
      </Section>
      <Section className="main-section-4">
        <TitleContainer>
          <h1>양청은 당신의 성장을 응원합니다.</h1>
          <h3>당신의 신앙 성장을 지원해드립니다.</h3>
        </TitleContainer>
        <div>
          <Link to="">교육 지원비 신청하기</Link>
        </div>
      </Section>
      <Section className="main-section-5">
        <TitleContainer>
          <h1>나를 소개하는 가장 쉬운 방법</h1>
          <h3>목걸이를 만들고 다른 사람에게 나를 소개해보세요.</h3>
        </TitleContainer>
        <Form>
          <SectionInput
            register={register}
            registerName="name"
            registerOptions={{ required: "이름을 알려주세요." }}
            placeholder="이름"
          />
          <SectionInput
            register={register}
            registerName="expression"
            placeholder="자기를 소개하는 한마디"
          />
          <Button buttonType="block">목걸이 다운 받기</Button>
        </Form>
      </Section> */}
    </Wrapper>
  );
}

export default Main;
