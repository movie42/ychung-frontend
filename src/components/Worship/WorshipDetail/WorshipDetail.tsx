import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import WorshipNotice from "./WorshipNotice";
import WorshipBlog from "./WorshipBlog";
import { SetterOrUpdater } from "recoil";
import {
  movingCard,
  opacity,
} from "../../../animation variants/modalAnimation";
import { motion } from "framer-motion";
import { calculateDate } from "../../../customhooks/utiles";

const Wrapper = styled(motion.div)`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 10;
`;

const WeeklyDetailContainer = styled(motion.div)`
  background-color: ${(props) => props.theme.white};
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 90%;
  padding: 1rem 2rem;
  border-radius: 2rem 2rem 0 0;
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

const WorshipInfoContainer = styled.div``;

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
  const navigator = useNavigate();
  const modalHandler = () => {
    setDetailItem(false);
  };

  useEffect(() => {
    return () => navigator("/worship");
  }, [navigator]);

  return (
    <Wrapper
      onClick={modalHandler}
      variants={opacity}
      initial="initial"
      animate="animate"
      exit="exit">
      <WeeklyDetailContainer
        variants={movingCard}
        initial="initial"
        animate="animate"
        exit="exit">
        <h1 className="head-title">{data?.title}</h1>
        <UserInfoContainer>
          <ImageContainer>
            <img src="" alt="" />
          </ImageContainer>
          <InforContainer>
            <span>{data?.creator.userName}</span>
            <span>{calculateDate(data?.createdAt)}</span>
          </InforContainer>
        </UserInfoContainer>
        <WorshipInfoContainer>
          <div>
            <img src="" alt="" />
          </div>
          <div>
            <WorshipItems>
              <WorshipItem>
                <span>본문</span>
                <a href="#">
                  <span>
                    {data?.word} {data?.chapter}장 {data?.verse}
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
        <NoticeContainer>
          <WorshipNotice />
        </NoticeContainer>
        <BlogContainer>
          <WorshipBlog />
        </BlogContainer>
      </WeeklyDetailContainer>
    </Wrapper>
  );
}

export default WorshipDetail;
