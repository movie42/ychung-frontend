import { useEffect } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AiFillPlusCircle } from "react-icons/ai";
import { useRecoilState, useSetRecoilState } from "recoil";
import { notice, noticeModalControler } from "@/lib/state";

import { Authorization, ListContainer, ListItem, SEO } from "@/components";

import SkeletonForListItem from "@/components/Loading/Skeletons/SkeletonForListItem";
import { useGetNotices } from "./hooks";

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
  const setDetailItem = useSetRecoilState(notice);
  const [noticeModalState, setNoticeModalState] =
    useRecoilState(noticeModalControler);

  const { isSuccess, isRefetching, isLoading, data: notices } = useGetNotices();

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
      <NoticeListContainer>
        <Wrapper>
          <NoticeComponentInfoContainer>
            <h1>공지사항</h1>
            <Authorization authority={3}>
              <Link to={"/notice/create"}>
                <AiFillPlusCircle />
              </Link>
            </Authorization>
          </NoticeComponentInfoContainer>
          <>
            {notices && (
              <ListContainer
                isLoading={isLoading && isRefetching}
                data={notices}
                renderFunc={(item) => (
                  <ListItem
                    key={item._id}
                    data={item}
                    onClick={() => onClick(item._id)}
                  />
                )}
                skeletonRenderFunc={(item: number[], index: number) => (
                  <SkeletonForListItem key={index} />
                )}
              />
            )}
          </>
        </Wrapper>
        <AnimatePresence>{noticeModalState && <Outlet />}</AnimatePresence>
      </NoticeListContainer>
    </>
  );
}

export default Notice;
