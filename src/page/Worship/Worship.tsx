import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useParams, Outlet } from "react-router-dom";
import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import WorshipItem from "./WorshipDetailComponents/WorshipItem";
import { AnimatePresence } from "framer-motion";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { worship, worshipModalControler } from "../../state/worship.atom";
import Loading from "../../components/Loading";
import { loginState } from "../../state/Authrization";

const Wrapper = styled.div``;

const WeeklyComponentInfoContainer = styled.div`
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

const ListContainer = styled.ul`
  display: grid;
  margin: 0;
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    grid-template-columns: repeat(auto-fill, minmax(35rem, auto));
    gap: 1.5rem;
  }
  padding: 0;
`;

export interface IWorshipItems {
  _id: string;
  title: string;
  word: string;
  chapter: number;
  verse: number;
  verse_end: number;
  pastor: string;
  worshipTeam: string;
  prayer: string;
  advertisement: string;
  reader: string;
  offering: string;
  benediction: string;
  creator: {
    _id: string;
    userName: string;
  };
  views: number;
  createdAt: string;
}

function Worship() {
  const { login } = useRecoilValue(loginState);
  const { id } = useParams();
  const setDetailItem = useSetRecoilState(worship);
  const [worshipModalState, setWorshipModalState] = useRecoilState(
    worshipModalControler
  );

  const {
    isLoading,
    error,
    data: weeklies,
  } = useQuery(
    "weeklies",
    async () => {
      const response = await fetch(`/api/worship`, {
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
    const [detailItem] = weeklies.filter(
      (item: IWorshipItems) => item._id === id
    );
    setWorshipModalState(true);
    setDetailItem({ ...detailItem });
  };

  useEffect(() => {
    if (id && !isLoading) {
      const [detailItem] = weeklies.filter(
        (item: IWorshipItems) => item._id === id
      );
      setWorshipModalState(true);
      setDetailItem({ ...detailItem });
    }
  }, [id, isLoading]);

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
