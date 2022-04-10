import React, { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import NoticeItem from "./NoticeItem";
import { Link, Outlet, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AiFillPlusCircle } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { notice, noticeModalControler } from "../../state/notice.atom";

const NoticeListContainer = styled(motion.div)``;

const NoticeComponentInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    color: ${(props) => props.theme.grayBackgroundColor};
    font-size: 4rem;
    &:hover {
      color: ${(props) => props.theme.basicColor};
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const ListContainer = styled.ul`
  display: grid;
  grid-auto-rows: minmax(35rem, 42rem);
  margin: 0;
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    grid-template-columns: repeat(auto-fill, minmax(35rem, auto));
    gap: 1.5rem;
  }
  padding: 0;
`;

export interface INoticeInterface {
  _id: string;
  title: string;
  isWeekly: boolean;
  paragraph: string;
  creator: {
    _id: string;
    name: string;
    userName: string;
  };
  comments: [];
  views: number;
  createdAt: string;
}

function Notice() {
  const { id } = useParams();
  const [detailItem, setDetailItem] = useRecoilState(notice);
  const [noticeModalState, setNoticeModalState] =
    useRecoilState(noticeModalControler);

  const {
    isLoading,
    error,
    data: notices,
  } = useQuery(
    "notice",
    async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/notice`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          mode: "cors",
        }
      );
      const { data } = await response.json();
      return data;
    },
    { staleTime: 10000 }
  );

  const onClick = (id: string) => {
    const [detailItem] = notices.filter(
      (item: INoticeInterface) => item._id === id
    );
    setNoticeModalState(true);
    setDetailItem({ ...detailItem });
  };

  useEffect(() => {
    if (id && !isLoading) {
      const [detailItem] = notices.filter(
        (item: INoticeInterface) => item._id === id
      );
      setNoticeModalState(true);
      setDetailItem({ ...detailItem });
    }
  }, [id, isLoading]);

  return (
    <NoticeListContainer>
      <Wrapper>
        <NoticeComponentInfoContainer>
          <h1>공지사항</h1>
          <Link to={"/notice/create"}>
            <AiFillPlusCircle />
          </Link>
        </NoticeComponentInfoContainer>
        <ListContainer>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            notices.map((notice: INoticeInterface) => (
              <NoticeItem key={notice._id} onClick={onClick} notice={notice} />
            ))
          )}
        </ListContainer>
      </Wrapper>
      <AnimatePresence>{noticeModalState && <Outlet />}</AnimatePresence>
    </NoticeListContainer>
  );
}

export default Notice;
