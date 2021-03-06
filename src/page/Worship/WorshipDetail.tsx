import React, { useEffect } from "react";
import styled from "styled-components";

import { SetterOrUpdater, useRecoilState } from "recoil";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

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
import { IWorshipItems, worshipDetail } from "../../state/worship.atom";
import { useCopyText } from "../../utils/hooks/useCopyText";
import { useSetView } from "../../utils/hooks/useSetView";
import SEO from "../../components/SEO/SEO";
import { previewParagraph } from "../../utils/utilities/previewParagraph";
import { useGet } from "@/utils/hooks/useGet";
import WorshipEducation from "./WorshipDetailComponents/WorshipEducation";

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

const EducationContainer = styled.div``;

const NoticeContainer = styled.div``;

const BlogContainer = styled.div``;

interface IWorshipDetailProps {
  setDetailItem: SetterOrUpdater<boolean>;
  data?: IWorshipItems;
}

interface IEducationFetchData {
  _id: string;
  title: string;
  isPublic: boolean;
  groups: [];
  createdAt: Date;
}

function WorshipDetail({ setDetailItem, data }: IWorshipDetailProps) {
  const { id } = useParams();
  const [worshipData, setWorshipData] = useRecoilState(worshipDetail);

  const countViews = useSetView(
    `/api/worship/${id}/count-views`,
    setWorshipData
  );
  const { copyMessage, copyText } = useCopyText();

  const handleBibleOpen = () => {
    if (data) {
      godpeopleDeepLink(data?.word, data?.chapter, data?.verse);
      checkGodpeopleBibleInstall(data?.word, data?.chapter, data?.verse);
    }
  };

  useEffect(() => {
    countViews();
  }, []);

  useEffect(() => {
    if (copyMessage === "??????????????? ?????????????????????.") {
      window.location.href = `kakaobank://link/`;
    }
    const setMessage = setTimeout(() => copyText("", ""), 5000);
    return () => clearTimeout(setMessage);
  }, [copyMessage]);

  return (
    <>
      <SEO
        title={data?.title}
        description={data?.title}
        keywords={`?????? ??????, ??????, ???????????? ????????? ??????, ${data?.title}`}
      />
      <CopyTextModal text={copyMessage} />
      <PageDetailModal setDetailItem={setDetailItem}>
        <WorshipHeader {...data} views={worshipData?.views} />
        <WorshipInfoContainer>
          <WorshipItems>
            <WorshipItem>
              <span>??????</span>
              <button onClick={handleBibleOpen}>
                {`${data?.word && chapterNameTransferFromEngToKr(data?.word)} `}
                {data?.chapter}??? {data?.verse}
                {data?.verse_end && `~ ${data?.verse_end}`}???
              </button>
            </WorshipItem>
            <WorshipItem>
              <span>??????</span>
              <span>{data?.pastor}</span>
            </WorshipItem>
            <WorshipItem>
              <span>????????? ??????</span>
              <span>{data?.worshipTeam}</span>
            </WorshipItem>
            <WorshipItem>
              <span>?????? ??????</span>
              <span>{data?.prayer}</span>
            </WorshipItem>
            <WorshipItem>
              <span>??????</span>
              <span>{data?.advertisement}</span>
            </WorshipItem>
            <WorshipItem>
              <span>?????? ??????</span>
              <span>{data?.reader}</span>
            </WorshipItem>
            <WorshipItem>
              <span>?????? ?????? ??? ??????</span>
              <span>{data?.benediction}</span>
            </WorshipItem>
          </WorshipItems>
        </WorshipInfoContainer>
        <WorshipGuide>
          <h2>?????? ??????</h2>
          <ul>
            <li>
              ?????? ?????? ?????? ?????? ????????? ????????? ?????? ??????????????? ???????????????.
            </li>
            <li>
              <strong>????????? ??????????????? ?????????????????????.</strong> ????????? ????????????
              ??????????????? ????????? ????????? ????????? ??? ?????? ????????? ???????????????
              ??????????????????.
            </li>
            <li>5???22????????? ?????? ?????? ????????? ???????????????.</li>
          </ul>
          <h2>??????</h2>
          <ul>
            <li>????????? ????????? ????????? ??? ??? ????????????.</li>
          </ul>
          <button
            onClick={() =>
              copyText("3511093649103", "??????????????? ?????????????????????.")
            }>
            <p>???????????? ?????? 351-1093-6491-03</p>
            <p>??????????????? ???????????????</p>
          </button>
        </WorshipGuide>
        <EducationContainer>
          <h1>??????</h1>
          <WorshipEducation />
        </EducationContainer>
        <NoticeContainer>
          <h1>??????</h1>
          <WorshipNotice />
        </NoticeContainer>
        <BlogContainer>
          <h1>?????????</h1>
          <WorshipBlog />
        </BlogContainer>
      </PageDetailModal>
    </>
  );
}

export default WorshipDetail;
