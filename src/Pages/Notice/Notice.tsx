import { useEffect, useMemo } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";
import { AiFillPlusCircle } from "react-icons/ai";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";

import {
  Authorization,
  ListContainer,
  ListItem,
  SkeletonForListItem
} from "@/Components";
import { useGetInfinityItem, useIntersect } from "@/lib/hooks";
import { INoticeInterface, notice, noticeModalControler } from "@/lib/state";

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

const List = styled.ul`
  display: grid;
  grid-auto-rows: minmax(30rem, auto);
  margin: 0;
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    grid-template-columns: repeat(auto-fill, minmax(35rem, auto));
    gap: 1.5rem;
  }
  padding: 0;
`;

const Target = styled.div`
  height: 1px;
`;

const Notice = () => {
  const { noticeId } = useParams();
  const setDetailItem = useSetRecoilState(notice);
  const [noticeModalState, setNoticeModalState] =
    useRecoilState(noticeModalControler);

  const {
    data,
    isRefetching,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage
  } = useGetInfinityItem<INoticeInterface>({
    size: 10,
    pageParam: 0,
    url: "/api/notice",
    queryKey: ["notices"]
  });

  const notices = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data) : []),
    [data]
  );

  const onClick = (id: string) => {
    if (notices) {
      const [detailItem] = notices.filter((item) => item._id === id);
      setNoticeModalState(true);
      setDetailItem({ ...detailItem });
    }
  };

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  useEffect(() => {
    if (noticeId && notices) {
      setNoticeModalState(true);
    }
  }, [noticeId, notices]);

  return (
    <>
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
          {notices && (
            <ListContainer
              isRefetching={isRefetching}
              isLoading={isLoading}
              data={notices}
              renderFunc={(item) => (
                <ListItem
                  key={item._id}
                  data={item}
                  onClick={() => onClick(item._id)}
                />
              )}
            />
          )}
          {isLoading && (
            <List>
              <SkeletonForListItem />
            </List>
          )}
          <Target ref={ref} />
        </Wrapper>
        {noticeModalState && (
          <AnimatePresence>
            <Outlet />
          </AnimatePresence>
        )}
      </NoticeListContainer>
    </>
  );
};

export default Notice;
