import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AiFillPlusCircle } from "react-icons/ai";
import { useRecoilState, useSetRecoilState } from "recoil";
import { INoticeInterface, notice, noticeModalControler } from "@/lib/state";
import { useGetInfinityItem, useIntersect } from "@/lib/hooks";

import {
  Authorization,
  ListContainer,
  ListItem,
  SEO,
  SkeletonForListItem,
} from "@/components";

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
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const { noticeId } = useParams();
  const setDetailItem = useSetRecoilState(notice);
  const [noticeModalState, setNoticeModalState] =
    useRecoilState(noticeModalControler);

  const { data, isRefetching, isLoading, fetchNextPage } =
    useGetInfinityItem<INoticeInterface>({
      size: 10,
      pageParam: 0,
      url: "/api/notice",
      queryKey: ["notices"],
    });

  const onClick = (id: string) => {
    if (notices) {
      const [detailItem] = notices.filter((item) => item._id === id);
      setNoticeModalState(true);
      setDetailItem({ ...detailItem });
    }
  };

  const notices = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data) : []),
    [data]
  );

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  useEffect(() => {
    if (noticeId && notices) {
      const [detailItem] = notices.filter((item) => item._id === noticeId);
      setNoticeModalState(true);
      setDetailItem({ ...detailItem });
    }
  }, [noticeId]);

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
