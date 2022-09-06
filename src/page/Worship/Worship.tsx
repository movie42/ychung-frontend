import { useEffect, useMemo, useState } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import WorshipItem from "./WorshipDetailComponents/WorshipItem";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  IWorshipItems,
  worshipDetail,
  worshipModalControler,
} from "@/lib/state";
import {
  Authorization,
  ListContainer,
  SEO,
  SkeletonForListItem,
} from "@/components";

import { useGetInfinityItem, useIntersect } from "@/lib/hooks";

const Wrapper = styled(motion.div)`
  width: 100%;
  margin-top: 8rem;
`;

const WeeklyComponentInfoContainer = styled.div`
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

const Target = styled.div`
  height: 1px;
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

function Worship() {
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const { id } = useParams();
  const setDetailItem = useSetRecoilState(worshipDetail);
  const [worshipModalState, setWorshipModalState] = useRecoilState(
    worshipModalControler
  );

  const { isSuccess, isLoading, isRefetching, data, fetchNextPage } =
    useGetInfinityItem<IWorshipItems>({
      size: 10,
      pageParam: 0,
      url: "/api/worship",
      queryKey: ["weeklies"],
    });

  const weeklies = useMemo(
    () => (data ? data.pages.flatMap(({ data }) => data) : []),
    [data]
  );

  const onClick = (id: string): void => {
    if (weeklies) {
      const [detailItem] = weeklies.filter((item) => item._id === id);
      setWorshipModalState(true);
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
    if (id && isSuccess && !isRefetching) {
      const [detailItem] = weeklies.filter((item) => item._id === id);
      setWorshipModalState(true);
      setDetailItem({ ...detailItem });
    }
  }, [id, isSuccess, isRefetching]);

  return (
    <>
      <SEO title="주보" keywords="양청 주보, 주보, 양정교회 청년부 주보" />

      <Wrapper>
        <WeeklyComponentInfoContainer>
          <h1>주보</h1>
          <Authorization authority={3}>
            <Link to="/worship/create">
              <AiFillPlusCircle />
            </Link>
          </Authorization>
        </WeeklyComponentInfoContainer>
        {weeklies && (
          <ListContainer
            isRefetching={isRefetching}
            isLoading={isLoading && isRefetching}
            data={weeklies}
            renderFunc={(item) => (
              <WorshipItem key={item?._id} worship={item} onClick={onClick} />
            )}
          />
        )}
        {isLoading && (
          <List>
            <SkeletonForListItem />
          </List>
        )}
        <Target ref={ref} />
        <AnimatePresence>{worshipModalState && <Outlet />}</AnimatePresence>
      </Wrapper>
    </>
  );
}

export default Worship;
