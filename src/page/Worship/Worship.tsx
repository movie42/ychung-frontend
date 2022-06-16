import React, { useEffect } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import WorshipItem from "./WorshipDetailComponents/WorshipItem";
import { AnimatePresence, motion } from "framer-motion";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { worshipDetail, worshipModalControler } from "../../state/worship.atom";
import Loading from "../../components/Loading";
import { loginState } from "../../state/Authrization";
import { IWorshipItems } from "../../state/worship.atom";
import { useGet } from "../../utils/customhooks/useGet";
import { movingCard } from "../../animation variants/modalAnimation";

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

const ListContainer = styled.ul`
  display: grid;
  grid-auto-rows: minmax(30rem, auto);
  margin: 0;
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    grid-template-columns: repeat(auto-fill, minmax(35rem, 1fr));
    gap: 1.5rem;
  }
  padding: 0;
`;

function Worship() {
  const { login } = useRecoilValue(loginState);
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
  } = useGet<IWorshipItems[]>({
    url: `/api/worship`,
    queryKey: "weeklies",
  });

  const onClick = (id: string): void => {
    if (weeklies) {
      const [detailItem] = weeklies.filter(
        (item: IWorshipItems) => item._id === id
      );
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
      {<AnimatePresence>{isLoading && <Loading />}</AnimatePresence>}
      {!isLoading && (
        <Wrapper>
          <WeeklyComponentInfoContainer>
            <h1>주보</h1>
            {login && (
              <Link to="/worship/create">
                <AiFillPlusCircle />
              </Link>
            )}
          </WeeklyComponentInfoContainer>
          <ListContainer>
            {weeklies?.map((item: IWorshipItems) => (
              <WorshipItem key={item?._id} worship={item} onClick={onClick} />
            ))}
          </ListContainer>
          <AnimatePresence>{worshipModalState && <Outlet />}</AnimatePresence>
        </Wrapper>
      )}
    </>
  );
}

export default Worship;
