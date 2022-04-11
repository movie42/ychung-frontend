import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import WorshipNotice from "./WorshipNotice";
import WorshipBlog from "./WorshipBlog";
import { SetterOrUpdater } from "recoil";
import {
  movingCard,
  opacity,
} from "../../../animation variants/modalAnimation";
import {
  motion,
  motionValue,
  useElementScroll,
  useTransform,
} from "framer-motion";
import {
  calculateDate,
  chapterNameTransferFromEngToKr,
} from "../../../customhooks/utiles";
import { relative } from "path";

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

const WorshipInfoContainer = styled(motion.div)`
  position: relative;
  z-index: 1;
  background-color: ${(props) => props.theme.white};
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
  const ref: React.Ref<HTMLDivElement> = useRef(null);
  const { scrollY } = useElementScroll(ref);
  const input = [0, 400];
  const output = [1, 0];
  const fixedOutPut = [0, 400];
  const scrollYOpacity = useTransform(scrollY, input, output);
  const scrollYFixed = useTransform(scrollY, input, fixedOutPut);

  const infoInput = [500, 800, 1000, 1200];
  const infoOutput = [1, 1, 1, 0];
  const infofixedOutPut = [0, 300, 500, 900];
  const infoContaineropacity = useTransform(scrollY, infoInput, infoOutput);
  const infoContainerfixed = useTransform(scrollY, infoInput, infofixedOutPut);

  const navigator = useNavigate();
  const modalHandler = () => {
    setDetailItem(false);
  };

  useEffect(() => {
    return () => navigator("/worship");
  }, [navigator]);

  return (
    <div>
      <Wrapper
        onClick={modalHandler}
        variants={opacity}
        initial="initial"
        animate="animate"
        exit="exit">
        <WeeklyDetailContainer
          ref={ref}
          variants={movingCard}
          initial="initial"
          animate="animate"
          exit="exit">
          <motion.section
            style={{
              opacity: scrollYOpacity,
              translateY: scrollYFixed,
            }}>
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
          <WorshipInfoContainer
            style={{
              opacity: infoContaineropacity,
              translateY: infoContainerfixed,
            }}>
            <div>
              <img src="" alt="" />
            </div>
            <div>
              <WorshipItems>
                <WorshipItem>
                  <span>본문</span>
                  <a
                    href={`https://www.bskorea.or.kr/bible/korbibReadpage.php?version=SAENEW&book=${data?.word}&chap=${data?.chapter}&sec=${data?.verse}`}
                    target="_blank">
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
            <div>
              <h1>예배는 앞자리부터 앉아주세요.</h1>
              <h1>예배는 앞자리부터 앉아주세요.</h1>
              <h1>예배는 앞자리부터 앉아주세요.</h1>
              <h1>예배는 앞자리부터 앉아주세요.</h1>
              <h1>예배는 앞자리부터 앉아주세요.</h1>
              <h1>예배는 앞자리부터 앉아주세요.</h1>
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
    </div>
  );
}

export default WorshipDetail;
