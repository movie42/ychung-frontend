import React, { useEffect } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import WorshipItem from "./WorshipDetailComponents/WorshipItem";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { worshipDetail, worshipModalControler, loginState } from "@/lib/state";
import { ListContainer, SEO, SkeletonForWorshipItem } from "@/components";

import { useGetWeekies } from "./hooks";

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

// const ListContainer = styled.ul`
//   display: grid;
//   grid-auto-rows: minmax(30rem, auto);
//   margin: 0;
//   @media (min-width: ${(props) => props.theme.screen.labtop}) {
//     grid-template-columns: repeat(auto-fill, minmax(35rem, 1fr));
//     gap: 1.5rem;
//   }
//   padding: 0;
// `;

function Worship() {
  const { isLogin } = useRecoilValue(loginState);
  const { id } = useParams();
  const setDetailItem = useSetRecoilState(worshipDetail);
  const [worshipModalState, setWorshipModalState] = useRecoilState(
    worshipModalControler
  );

  const {
    isSuccess,
    isLoading,
    isRefetching,
    data: weeklies,
  } = useGetWeekies();

  const onClick = (id: string): void => {
    if (weeklies) {
      const [detailItem] = weeklies.filter((item) => item._id === id);
      setWorshipModalState(true);
      setDetailItem({ ...detailItem });
    }
  };

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
          {isLogin && (
            <Link to="/worship/create">
              <AiFillPlusCircle />
            </Link>
          )}
        </WeeklyComponentInfoContainer>
        {weeklies && (
          <ListContainer
            isLoading={isLoading && isRefetching}
            data={weeklies}
            renderFunc={(item) => (
              <WorshipItem key={item?._id} worship={item} onClick={onClick} />
            )}
            skeletonRenderFunc={() => <SkeletonForWorshipItem />}
          />
        )}
        <AnimatePresence>{worshipModalState && <Outlet />}</AnimatePresence>
      </Wrapper>
    </>
  );
}

export default Worship;
