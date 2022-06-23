import React, { useEffect } from "react";
import styled from "styled-components";
import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AiFillPlusCircle } from "react-icons/ai";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { notice, noticeModalControler } from "../../state/notice.atom";
import Loading from "../../components/Loading";
import { loginState } from "../../state/Authrization";
import ListContainer from "../../components/List/ListContainer";
import ListItem from "../../components/List/ListItem";
import { INoticeInterface } from "../../state/notice.atom";
import { useGet } from "../../utils/customhooks/useGet";
import SEO from "../../components/SEO/SEO";

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
  const { login } = useRecoilValue(loginState);
  const setDetailItem = useSetRecoilState(notice);
  const [noticeModalState, setNoticeModalState] =
    useRecoilState(noticeModalControler);

  const {
    isSuccess,
    isRefetching,
    isLoading,
    data: notices,
  } = useGet<INoticeInterface[]>({
    url: `/api/notice`,
    queryKey: "notice",
  });

  const onClick = (id: string) => {
    if (notices) {
      const [detailItem] = notices.filter((item) => item._id === id);
      setNoticeModalState(true);
      setDetailItem({ ...detailItem });
    }
  };

  useEffect(() => {
    if (id && isSuccess && !isRefetching) {
      const [detailItem] = notices.filter((item) => item._id === id);
      setNoticeModalState(true);
      setDetailItem({ ...detailItem });
    }
  }, [id, isSuccess, isRefetching]);

  return (
    <>
      <SEO
        title="공지사항"
        keywords="공지, 공지사항, 양청 공지사항, 양정교회 청년부 공지사항"
      />
      <AnimatePresence>{isLoading && <Loading />}</AnimatePresence>
      {!isLoading && (
        <NoticeListContainer>
          <Wrapper>
            <NoticeComponentInfoContainer>
              <h1>공지사항</h1>
              {login && (
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
