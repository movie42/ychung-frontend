import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { SetterOrUpdater } from "recoil";
import {
  movingCard,
  opacity,
} from "../../../animation variants/modalAnimation";
import { AnimatePresence, motion } from "framer-motion";
import {
  calculateDate,
  chapterNameTransferFromEngToKr,
} from "../../../customhooks/utiles";
import WorshipNotice from "./WorshipNotice";
import WorshipBlog from "./WorshipBlog";

const WorshipDetailContainer = styled.div``;

const Wrapper = styled(motion.div)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  z-index: 10;
`;

const ClipbordStateMessage = styled(motion.span)`
  position: fixed;
  right: 0;
  left: 0;
  bottom: 5rem;
  margin: 0 auto;
  text-align: center;
  font-size: 2rem;
  color: ${(props) => props.theme["fontColor-dark"]};
  z-index: 20;
  padding: 1rem 2rem;
  border: 0;
  border-radius: 0.8rem;
  width: 100%;
  max-width: 1020px;
  background-color: ${(props) => props.theme.grayBackgroundColor};
`;

const ModalBackground = styled(motion.span)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.8);
`;

const WeeklyDetailContainer = styled(motion.div)`
  background-color: ${(props) => props.theme.white};
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 1020px;
  height: 90%;
  padding: 1rem 2rem;
  margin: 0 auto;
  border-radius: 2rem 2rem 0 0;
  z-index: 13;
  h1.head-title {
    font-size: 12rem;
    word-break: keep-all;
    font-weight: 900;
    margin: 2rem 0;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.grayBackgroundColor};
`;

const InforContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const WorshipInfoContainer = styled(motion.div)`
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  background-color: ${(props) => props.theme.white};
`;

const WorshipGuide = styled.div`
  ul {
    padding: 0;
  }
  li {
    font-size: 2.2rem;
    margin-bottom: 1.2rem;
    line-height: 1.4;
  }
  button {
    border: 1px solid ${(props) => props.theme.lineColor};
    width: 100%;
    padding: 0.8rem 2rem;
    border-radius: 0.8rem;
    background-color: ${(props) => props.theme.white};
    cursor: pointer;
    p {
      &:first-child {
        font-size: 2rem;
      }
      &:nth-child(2) {
        font-size: 1.5rem;
      }
    }
    &:hover {
      background-color: ${(props) => props.theme["grayBackgroundColor-light"]};
    }

    &:active {
      color: ${(props) => props.theme.white};
      background-color: ${(props) => props.theme.basicColor};
    }
  }
`;

const WorshipItems = styled.ul`
  padding: 0;
`;

const WorshipItem = styled.li`
  padding: 0.7rem 0;
  display: flex;
  justify-content: space-between;
  font-size: 2.2rem;
  border-bottom: 1px solid ${(props) => props.theme.grayBackgroundColor};
  span {
    &:nth-child(1) {
      font-weight: bolder;
      margin-right: 1rem;
    }
  }
  a {
    span {
      &:nth-child(1) {
        margin-right: unset;
      }
    }
  }
`;

const NoticeContainer = styled.div``;

const BlogContainer = styled.div``;

interface IWorshipDetailProps {
  setDetailItem: SetterOrUpdater<boolean>;
  data?: any;
}

function WorshipDetail({ setDetailItem, data }: IWorshipDetailProps) {
  const [copyMessage, setCopyMessage] = useState("");
  const navigate = useNavigate();

  const modalHandler = () => {
    setDetailItem(false);
  };

  const copyText = async (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopyMessage("계좌번호가 복사되었습니다.");
      },
      () => {
        setCopyMessage("지원하지 않는 브라우저 입니다.");
      }
    );
  };

  useEffect(() => {
    return () => navigate("/worship");
  }, [navigate]);

  useEffect(() => {
    const setMessage = setTimeout(() => setCopyMessage(""), 5000);

    return () => clearTimeout(setMessage);
  }, [copyMessage]);
  return (
    <WorshipDetailContainer>
      <Wrapper
        variants={opacity}
        initial="initial"
        animate="animate"
        exit="exit">
        <AnimatePresence>
          {copyMessage !== "" && (
            <ClipbordStateMessage
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}>
              {copyMessage}
            </ClipbordStateMessage>
          )}
        </AnimatePresence>
        <WeeklyDetailContainer
          variants={movingCard}
          initial="initial"
          animate="animate"
          exit="exit">
          <motion.section>
            <motion.div>
              <motion.h1 className="head-title">{data?.title}</motion.h1>
              <UserInfoContainer>
                <ImageContainer>
                  <img src="" alt="" />
                </ImageContainer>
                <InforContainer>
                  <span>{data?.creator.userName}</span>
                  <span>{calculateDate(data?.createdAt)}</span>
                </InforContainer>
              </UserInfoContainer>
            </motion.div>
          </motion.section>
          <WorshipInfoContainer>
            <div>
              <img src="" alt="" />
            </div>
            <div>
              <WorshipItems>
                <WorshipItem>
                  <span>본문</span>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    href={`https://www.bskorea.or.kr/bible/korbibReadpage.php?version=SAENEW&book=${data?.word}&chap=${data?.chapter}&sec=${data?.verse}`}>
                    <span>
                      {`${chapterNameTransferFromEngToKr(data?.word)} `}
                      {data?.chapter}장 {data?.verse}
                      {data?.verse_end && `~ ${data?.verse_end}`}절
                    </span>
                  </a>
                </WorshipItem>
                <WorshipItem>
                  <span>강론</span>
                  <span>{data?.pastor}</span>
                </WorshipItem>
                <WorshipItem>
                  <span>경배와 찬양</span>
                  <span>{data?.worshipTeam}</span>
                </WorshipItem>
                <WorshipItem>
                  <span>대표 기도</span>
                  <span>{data?.prayer}</span>
                </WorshipItem>
                <WorshipItem>
                  <span>광고</span>
                  <span>{data?.advertisement}</span>
                </WorshipItem>
                <WorshipItem>
                  <span>성경 봉독</span>
                  <span>{data?.reader}</span>
                </WorshipItem>
                <WorshipItem>
                  <span>봉헌 기도 및 축도</span>
                  <span>{data?.benediction}</span>
                </WorshipItem>
              </WorshipItems>
            </div>
          </WorshipInfoContainer>
          <WorshipGuide>
            <h2>예배 안내</h2>
            <ul>
              <li>
                코로나를 예방하기 위해 교회 내에서 음식물 반입 금지입니다.
              </li>
              <li>
                마스크는 KF94로 착용해주세요. 일반 마스크를 쓰고 오셨다면 1충에
                구비된 마스크를 써주세요.
              </li>
              <li>
                먼저 오신 분은 안내 위원의 안내에 따라 앞자리부터 앉아주세요.
              </li>
              <li>청년부 계좌로도 헌금을 할 수 있습니다.</li>
            </ul>
            <button onClick={() => copyText("3511093649103")}>
              <p>계좌번호 농협 351-1093-6491-03</p>
              <p>복사하려면 클릭하세요</p>
            </button>
          </WorshipGuide>
          <NoticeContainer>
            <h1>광고</h1>
            <WorshipNotice />
          </NoticeContainer>
          <BlogContainer>
            <h1>블로그</h1>
            <WorshipBlog />
          </BlogContainer>
        </WeeklyDetailContainer>
        <ModalBackground onClick={modalHandler} />
      </Wrapper>
    </WorshipDetailContainer>
  );
}

export default WorshipDetail;
