import React, { useEffect } from "react";
import { Viewer } from "@toast-ui/react-editor";
import styled from "styled-components";
import { calculateDate } from "../../customhooks/utiles";
import { motion } from "framer-motion";
import { SetterOrUpdater } from "recoil";
import { useNavigate } from "react-router-dom";
import { movingCard, opacity } from "../../animation variants/modalAnimation";

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

const NoticeDetailContainer = styled(motion.div)`
  background-color: ${(props) => props.theme.white};
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 86%;
  padding: 1rem 2rem;
  border-radius: 2rem 2rem 0 0;
  .toastui-editor-contents {
    h4 {
      font-size: 2.2rem;
      line-height: 1.5;
    }
    h5 {
      font-size: 2rem;
      line-height: 1.5;
    }
    p {
      font-size: 1.6rem;
    }
  }
`;

const HeadInfoContainer = styled.div`
  box-sizing: border-box;
  padding: 0;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid ${(props) => props.theme["grayBackgroundColor"]};
  h1 {
    font-size: 3.4rem;
    word-break: keep-all;
  }
  .noticeInfo {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    span {
      &:first-child {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-column: 1/4;
      }
      color: ${(props) => props.theme["fontColor-light"]};
    }
  }
`;

interface INoticeDetailProps {
  setDetailItem: SetterOrUpdater<boolean>;
  data?: any;
}

function NoticeDetail({ setDetailItem, data }: INoticeDetailProps) {
  const navigator = useNavigate();
  const modalHandler = () => {
    setDetailItem(false);
  };

  useEffect(() => {
    return () => navigator("/notice");
  }, [navigator]);

  return (
    <Wrapper
      onClick={modalHandler}
      variants={opacity}
      initial="initial"
      animate="animate"
      exit="exit">
      <NoticeDetailContainer
        variants={movingCard}
        initial="initial"
        animate="animate"
        exit="exit">
        <HeadInfoContainer>
          <h1>{data?.title}</h1>
          <div className="noticeInfo">
            <span>글쓴이 : {data?.creator.userName}</span>
            <span>조회수 : {data?.views}</span>
            <span>날짜 : {data && calculateDate(data?.createdAt)}</span>
          </div>
        </HeadInfoContainer>
        <Viewer
          initialValue={data?.paragraph}
          customHTMLRenderer={{
            htmlBlock: {
              iframe: (node) => [
                {
                  type: "openTag",
                  tagName: "iframe",
                  outerNewLine: true,
                  attributes: node.attrs,
                },
                { type: "html", content: `${node.childrenHTML}` },
                {
                  type: "closeTag",
                  tagName: "iframe",
                  outerNewLine: true,
                },
              ],
            },
          }}
        />
      </NoticeDetailContainer>
    </Wrapper>
  );
}

export default NoticeDetail;
