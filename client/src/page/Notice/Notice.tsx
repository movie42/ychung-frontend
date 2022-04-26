import React, { useEffect } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AiFillPlusCircle } from "react-icons/ai";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { notice, noticeModalControler } from "../../state/notice.atom";
import Loading from "../../components/Loading";
import { loginState } from "../../state/Authrization";
import ListContainer from "../../components/List/ListContainer";
import ListItem from "../../components/List/ListItem";
import { INoticeInterface } from "../../state/notice.atom";

const NoticeListContainer = styled(motion.div)``;

const Wrapper = styled.div`
  margin-top: 8rem;
  width: 100%;
`;

const NoticeComponentInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    color: ${(props) => props.theme.color.gray300};
    font-size: 4rem;
    &:hover {
      color: ${(props) => props.theme.color.primary400};
    }
  }
`;

function Notice() {
  const { id } = useParams();
  const isLogin = useRecoilValue(loginState);
  const setDetailItem = useSetRecoilState(notice);
  const [noticeModalState, setNoticeModalState] =
    useRecoilState(noticeModalControler);

  const {
    isLoading,
    error,
    data: notices,
  } = useQuery<INoticeInterface[]>(
    "notice",
    async () => {
      const response = await fetch(`/api/notice`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        mode: "cors",
      });
      const { data } = await response.json();
      return data;
    },
    { staleTime: 10000 }
  );

  const onClick = (id: string) => {
    if (notices) {
      const [detailItem] = notices.filter((item) => item._id === id);
      setNoticeModalState(true);
      setDetailItem({ ...detailItem });
    }
  };

  useEffect(() => {
    if (id && !isLoading && notices) {
      const [detailItem] = notices.filter((item) => item._id === id);
      setNoticeModalState(true);
      setDetailItem({ ...detailItem });
    }
  }, [id, isLoading]);

  return (
    <>
      <AnimatePresence>{isLoading && <Loading />}</AnimatePresence>
      {!isLoading && (
        <NoticeListContainer>
          <Wrapper>
            <NoticeComponentInfoContainer>
              <h1>공지사항</h1>
              {isLogin.login && (
                <Link to={"/notice/create"}>
                  <AiFillPlusCircle />
                </Link>
              )}
            </NoticeComponentInfoContainer>
            {notices && (
              <ListContainer
                data={notices}
                renderData={(item) => (
                  <ListItem data={item} onClick={() => onClick(item._id)} />
                )}
              />
            )}
          </Wrapper>
          <AnimatePresence>{noticeModalState && <Outlet />}</AnimatePresence>
        </NoticeListContainer>
      )}
    </>
  );
}

export default Notice;
