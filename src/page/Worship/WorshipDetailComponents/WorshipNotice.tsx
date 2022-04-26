import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { INoticeInterface } from "../../../state/notice.atom";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  overflow-x: hidden;
  width: 100%;
`;

const ListContainer = styled.ul`
  padding: 0;
`;

const ListItem = styled.li`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 2rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  a {
    font-size: 2.2rem;
    color: ${(props) => props.theme.color.fontColorBlack};
    text-decoration: none;
    p {
      margin: 0 0 1rem 0;
    }
    div {
      font-size: 1.6rem;
    }
  }
  &:hover {
    background-color: ${(props) => props.theme.color.gray300};
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.gray300};
`;

function WorshipNotice() {
  const {
    isLoading,
    error,
    data: notices,
  } = useQuery(
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
  return isLoading ? (
    <p>광고 불러오는 중...</p>
  ) : (
    <ListContainer>
      {notices
        .filter((item: INoticeInterface) => item.isWeekly)
        .map((notice: INoticeInterface) => (
          <ListItem key={notice._id}>
            <Link to={`/notice/${notice._id}`}>
              <p>{notice.title}</p>
              <div>
                자세히 보기{" "}
                <span>
                  <BsArrowRight />
                </span>
              </div>
            </Link>
          </ListItem>
        ))}
    </ListContainer>
  );
}

export default WorshipNotice;
