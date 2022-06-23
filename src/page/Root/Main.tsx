import React, { useEffect } from "react";
import {
  motion,
  useTransform,
  useViewportScroll,
  Variants,
} from "framer-motion";
import styled from "styled-components";
import { BsChevronDoubleDown } from "react-icons/bs";
import Input from "../../components/Form/Input";

const Wrapper = styled(motion.div)``;

const Section = styled(motion.section)`
  height: 100vh;
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
      br {
        display: none;
      }
      font-size: 6rem;
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

  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    &.main-section-1 {
      flex-direction: row;
      justify-content: center;
      align-items: center;
      h1 {
        br {
          display: none;
        }
        &.emoji {
          font-size: 6vw;
          margin-right: 2vw;
        }
        font-size: 6vw;
        font-weight: 900;
      }
    }

    &.main-section-2,
    &.main-section-3,
    &.main-section-4,
    &.main-section-5 {
      flex-direction: row-reverse;
      align-items: center;
      justify-content: center;
      div {
        h1 {
          br {
            display: block;
          }
          font-size: 5vw;
          margin-bottom: 1vh;
        }

        h3 {
          font-size: 2vw;
        }
        a {
          width: 40rem;
        }
      }
    }

    &.main-section-3 {
      div {
        &:nth-child(2) {
          margin-right: 2vw;
        }
      }
    }
    &.main-section-4 {
      display: block;
    }
  }
`;

const ArrowContainer = styled(motion.div)`
  position: fixed;
  bottom: 4rem;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .arrowIcon {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  margin-bottom: 1rem;
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    margin-bottom: 0;
  }
`;

const arrowVariants: Variants = {
  init: {
    x: -50,
  },
  animate: {
    x: -50,
    y: [-30, 0],
    transition: {
      y: { yoyo: 20, duration: 1, ease: "easeInOut" },
    },
  },
};

function Main() {
  const { scrollYProgress } = useViewportScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <>
      <Wrapper>
        <Section className="main-section-1">
          <h1 className="emoji">😃</h1>
          <h1>
            양청에 <br />
            오신 것을 <br />
            환영합니다.
          </h1>
          <ArrowContainer
            style={{ opacity }}
            initial="init"
            variants={arrowVariants}
            animate="animate">
            <BsChevronDoubleDown
              className="arrowIcon"
              onClick={() => scrollYProgress.set(0.25)}
            />
            <p>더 많은 내용 보기</p>
          </ArrowContainer>
        </Section>
        <Section className="main-section-2">
          <div className="logo-container"></div>
          <div>
            <TitleContainer>
              <h1>새로 오셨나요?</h1>
              <h3>양정교회 청년부와 함께하면 좋겠어요.</h3>
            </TitleContainer>
            <div>
              <a href="https://forms.gle/f6bVV6uCryXK3n1U7" target="_blank">
                양청과 함께하기
              </a>
            </div>
          </div>
        </Section>
        <Section className="main-section-3">
          <TitleContainer>
            <h1>
              예수 안에서
              <br /> 함께 자라가요.
            </h1>
            <h3>함께 배우고 성장하는 방법을 소개합니다.</h3>
          </TitleContainer>
          <div>
            <a
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLSc3jTGr-tQYivONAS_nGZ-iQ1LpxV_NlCHxnIRsbLkEstTmpg/viewform">
              동아리 신청하기
            </a>
            <a target="_blank" href="https://forms.gle/4TUo5gTMGWp6zb8J6">
              봉사 신청하기
            </a>
          </div>
        </Section>
        <Section className="main-section-4">
          <TitleContainer>
            <h1>양청은 당신의 성장을 응원합니다.</h1>
            <h3>당신의 신앙 성장을 지원해드립니다.</h3>
          </TitleContainer>
          <div>
            <a
              href="https://docs.google.com/forms/d/1Zszlov0YSkdVXnz75JVki85wPIqxAc0nfhNWbQvtWSA/viewform?edit_requested=true"
              target="_blank">
              교육 지원비 신청하기
            </a>
          </div>
        </Section>
      </Wrapper>
    </>
  );
}

export default Main;
