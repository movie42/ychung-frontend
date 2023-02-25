import { useEffect, useState } from "react";
import styled from "styled-components";

import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

import {
  WeekliesNotice,
  WeekliesBlog,
  WeekliesHeader,
  WeekliesEducation
} from "./WeekliesDetailComponents";

import { PageDetailModal, CopyTextModal, SEO, Loading } from "@/Components";

import {
  checkGodpeopleBibleInstall,
  godpeopleDeepLink,
  openWebBible,
  chapterNameTransferFromEngToKr
} from "@/lib/utils";
import { IWorshipItems, worshipDetail } from "@/lib/state";
import { useSetView, useCopyText } from "@/lib/hooks";
import { useGetWeekly } from "../hooks";

const WorshipInfoContainer = styled(motion.div)`
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  mix-blend-mode: multiply;
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
  position: relative;
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
const BibleSelectButtonBox = styled.div`
  background-color: ${(props) => props.theme.color.background100};
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 1rem;
  z-index: 10;
  button {
    margin: 0.5rem 0;
  }
`;

const NoticeContainer = styled.div``;

const BlogContainer = styled.div``;

interface IWorshipDetailProps {
  setDetailItem: SetterOrUpdater<boolean>;
  data?: IWorshipItems;
}

interface BibleToMobileProps {
  word?: string;
  chapter?: number;
  verse?: number;
}

function WeekliesDetail({ setDetailItem }: IWorshipDetailProps) {
  const { weekliesId } = useParams();
  const setWeekly = useSetRecoilState(worshipDetail);
  const { data, isLoading } = useGetWeekly({
    id: weekliesId ? weekliesId : ""
  });

  const [isBibleSelectorOpen, setIsBibleSelectorOpen] = useState(false);

  const countViews = useSetView(
    `/api/worship/${weekliesId}/count-views`,
    setWeekly
  );

  const { copyMessage, copyText } = useCopyText();

  const handleBibleOpen = () => {
    setIsBibleSelectorOpen(true);
  };
  const handleOpenBibleToMobile =
    ({ word, chapter, verse }: BibleToMobileProps) =>
    () => {
      if (word && chapter && verse) {
        godpeopleDeepLink(word, chapter, verse);
        checkGodpeopleBibleInstall();
      }
      setIsBibleSelectorOpen(false);
    };
  const handleOpenBibleToWeb =
    ({ word, chapter, verse }: BibleToMobileProps) =>
    () => {
      if (word && chapter && verse) {
        openWebBible(word, chapter, verse);
      }
      setIsBibleSelectorOpen(false);
    };

  useEffect(() => {
    countViews();
  }, []);

  useEffect(() => {
    if (copyMessage === "계좌번호가 복사되었습니다.") {
      window.location.href = "kakaobank://link/";
    }
    const setMessage = setTimeout(() => copyText("", ""), 5000);
    return () => clearTimeout(setMessage);
  }, [copyMessage]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <SEO
        title={data?.title}
        description={data?.title}
        keywords={`양청 주보, 주보, 양정교회 청년부 주보, ${data?.title}`}
      />
      <CopyTextModal text={copyMessage} />
      <PageDetailModal
        pageRoot="worship/weeklies"
        setDetailItem={setDetailItem}
      >
        <WeekliesHeader {...data} views={data?.views} />

        <WorshipInfoContainer>
          <WorshipItems>
            <WorshipItem>
              <span>본문</span>
              <button
                onClick={handleBibleOpen}
                style={{
                  visibility: isBibleSelectorOpen ? "hidden" : "visible"
                }}
              >
                {`${data?.word && chapterNameTransferFromEngToKr(data?.word)} `}
                {data?.chapter}장 {data?.verse}
                {data?.verse_end && `~ ${data?.verse_end}`}절
              </button>
              {isBibleSelectorOpen && (
                <>
                  <BibleSelectButtonBox>
                    <button
                      onClick={handleOpenBibleToMobile({
                        word: data?.word,
                        chapter: data?.chapter,
                        verse: data?.verse
                      })}
                    >
                      갓피플 성경
                    </button>
                    <button
                      onClick={handleOpenBibleToWeb({
                        word: data?.word,
                        chapter: data?.chapter,
                        verse: data?.verse
                      })}
                    >
                      웹
                    </button>
                  </BibleSelectButtonBox>
                </>
              )}
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
          <div>
            <h2>예배 안내</h2>
            {data?.worshipInfo ? (
              <div>
                <ul>
                  <li>{data?.worshipInfo}</li>
                </ul>
              </div>
            ) : (
              <div>
                <ul>
                  <li>
                    먼저 오신 분은 안내 위원의 안내에 따라 앞자리부터
                    앉아주세요.
                  </li>
                  <li>
                    <strong>코로나 방역지침이 완화되었습니다.</strong> 온라인
                    예배자는 출석예배로 전환해 주시고 소그룹 등 교회 활동이
                    회복되도록 노력해주세요.
                  </li>
                  <li>5월22일부터 교회 식당 운영을 재개합니다.</li>
                </ul>
              </div>
            )}
            <h2>헌금</h2>
            <ul>
              <li>청년부 계좌로 헌금을 할 수 있습니다.</li>
            </ul>
            <button
              onClick={() =>
                copyText("3511093649103", "계좌번호가 복사되었습니다.")
              }
            >
              <p>계좌번호 농협 351-1093-6491-03</p>
              <p>복사하려면 클릭하세요</p>
            </button>
          </div>
        </WorshipGuide>

        <EducationContainer>
          <h1>교육</h1>
          <WeekliesEducation />
        </EducationContainer>
        <NoticeContainer>
          <h1>광고</h1>
          <WeekliesNotice />
        </NoticeContainer>
        <BlogContainer>
          <h1>블로그</h1>
          <WeekliesBlog />
        </BlogContainer>
      </PageDetailModal>
    </>
  );
}

export default WeekliesDetail;
