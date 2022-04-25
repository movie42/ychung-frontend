import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { SetterOrUpdater } from "recoil";
import { motion } from "framer-motion";

import WorshipNotice from "./WorshipDetailComponents/WorshipNotice";
import WorshipBlog from "./WorshipDetailComponents/WorshipBlog";
import WorshipHeader from "./WorshipDetailComponents/WorshipHeader";

import PageDetailModal from "../../components/Modals/PageDetailModal";
import CopyTextModal from "../../components/Modals/CopyTextModal";
import {
  checkGodpeopleBibleInstall,
  godpeopleDeepLink,
} from "../../utils/utilities/bibleDeepLink";
import { chapterNameTransferFromEngToKr } from "../../utils/utilities/chapterNameTransferFromEngToKr";

const WorshipInfoContainer = styled(motion.div)`
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  background-color: ${(props) => props.theme.color.fontColorWhite};
`;

const WorshipGuide = styled.div`
  margin-bottom: 2rem;
  ul {
    padding: 0;
  }
  li {
    font-size: 2.2rem;
    margin-bottom: 1.2rem;
    line-height: 1.4;
  }
  button {
    border: 1px solid ${(props) => props.theme.color.gray300};
    width: 100%;
    padding: 3rem 1rem;
    border-radius: 0.8rem;
    background-color: ${(props) => props.theme.color.fontColorWhite};
    cursor: pointer;
    p {
      line-height: 1.5;
      &:first-child {
        font-size: 2.2rem;
      }
      &:nth-child(2) {
        font-size: 2rem;
      }
    }
    &:hover {
      background-color: ${(props) => props.theme.color.primary400};
      color: ${(props) => props.theme.color.fontColorWhite};
      border: 1px soild ${(props) => props.theme.color.fontColorWhite};
    }

    &:active {
      background-color: ${(props) => props.theme.color.secondary200};
      color: ${(props) => props.theme.color.fontColorWhite};
      border: 1px soild ${(props) => props.theme.color.fontColorWhite};
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
  align-items: center;
  font-size: 2.2rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  button {
    padding: 0.8rem 0.5rem;
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.color.primary700};
    border-radius: 0.3rem;
    color: ${(props) => props.theme.color.primary700};
    background-color: unset;
    &:hover {
      background-color: ${(props) => props.theme.color.primary700};
      color: ${(props) => props.theme.color.fontColorWhite};
    }
  }
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

  const handleBibleOpen = () => {
    godpeopleDeepLink(data?.word, data?.chapter, data?.verse);
    if (document.hidden) {
      return;
    }
    checkGodpeopleBibleInstall(data?.word, data?.chapter, data?.verse);
  };

  useEffect(() => {
    if (copyMessage === "계좌번호가 복사되었습니다.") {
      window.location.href = `supertoss://link/`;
      window.location.href = `kakaobank://link/`;
    }
    const setMessage = setTimeout(() => setCopyMessage(""), 5000);
    return () => clearTimeout(setMessage);
  }, [copyMessage]);

  return (
    <>
      <CopyTextModal text={copyMessage} />
      <PageDetailModal setDetailItem={setDetailItem}>
        <WorshipHeader {...data} />
        <WorshipInfoContainer>
          <WorshipItems>
            <WorshipItem>
              <span>본문</span>
              <button onClick={handleBibleOpen}>
                {`${chapterNameTransferFromEngToKr(data?.word)} `}
                {data?.chapter}장 {data?.verse}
                {data?.verse_end && `~ ${data?.verse_end}`}절
              </button>
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
        </WorshipInfoContainer>
        <WorshipGuide>
          <h2>예배 안내</h2>
          <ul>
            <li>
              먼저 오신 분은 안내 위원의 안내에 따라 앞자리부터 앉아주세요.
            </li>
          </ul>
          <h2>헌금</h2>
          <ul>
            <li>청년부 계좌로 헌금을 할 수 있습니다.</li>
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
      </PageDetailModal>
    </>
  );
}

export default WorshipDetail;
