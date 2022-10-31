import { useEffect, useMemo, useState } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState, useSetRecoilState } from "recoil";
import { WeekliesItem } from "../Weeklies/WeekliesDetailComponents";
import {
  IWorshipItems,
  worshipDetail,
  worshipModalControler,
} from "@/lib/state";
import { useGetInfinityItem, useIntersect } from "@/lib/hooks";
import { ListContainer, SkeletonForListItem } from "@/components";

const Wrapper = styled(motion.div)`
  width: 100%;
  margin-top: 8rem;
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

interface IWeekliesContainerProps {}

const WeekliesContainer = () => {
  const { weekliesId } = useParams();
  const setDetailItem = useSetRecoilState(worshipDetail);
  const [worshipModalState, setWorshipModalState] = useRecoilState(
    worshipModalControler
  );

  const {
    isSuccess,
    isLoading,
    isRefetching,
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useGetInfinityItem<IWorshipItems>({
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
    if (weekliesId && isSuccess && !isRefetching) {
      const [detailItem] = weeklies.filter((item) => item._id === weekliesId);
      setDetailItem({ ...detailItem });
      setWorshipModalState(true);
    }
  }, [weekliesId, isSuccess, isRefetching]);

  return (
    <Wrapper>
      {weeklies && (
        <ListContainer
          isRefetching={isRefetching}
          isLoading={isLoading && isRefetching}
          data={weeklies}
          renderFunc={(item) => (
            <WeekliesItem key={item?._id} worship={item} onClick={onClick} />
          )}
        />
      )}
      {isLoading && (
        <List>
          <SkeletonForListItem />
        </List>
      )}
      <Target ref={ref} />
      <AnimatePresence>{worshipModalState && <Outlet />}</AnimatePresence>;
    </Wrapper>
  );
};

export default WeekliesContainer;
