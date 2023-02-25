import styled from "styled-components";
import { AiFillPlusCircle } from "react-icons/ai";
import { Authorization } from "@/Components";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const WeeklyComponentInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  a {
    color: ${(props) => props.theme.color.gray300};
    font-size: 4rem;
    &:hover {
      color: ${(props) => props.theme.color.primary400};
    }
  }
`;

const WorshipNavContainer = styled.div`
  display: flex;
  div {
    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
`;
const WorshipNavItem = styled.div``;

const WorshipNavLink = styled(NavLink)`
  text-decoration: none;
  font-size: 2rem;
  font-weight: 900;
  color: ${(props) => props.theme.color.gray300};
  padding: 0.5rem 0.8rem;
  border: 2.5px solid ${(props) => props.theme.color.gray200};
  border-radius: 0.7rem;
  &.active {
    border: 2.5px solid ${(props) => props.theme.color.primary400};
    color: ${(props) => props.theme.color.primary400};
  }
  &:hover {
    border: 2.5px solid ${(props) => props.theme.color.primary400};
    color: ${(props) => props.theme.color.primary400};
  }
  &:active {
    border: 2.5px solid ${(props) => props.theme.color.secondary300};
    color: ${(props) => props.theme.color.secondary300};
  }
`;

const WorshipHeader = () => {
  const [linkState, setLinkState] = useState("weeklies");
  const handleCreateButtonLink = (url: string) => () => {
    setLinkState(url);
  };

  return (
    <WeeklyComponentInfoContainer>
      <WorshipNavContainer>
        <WorshipNavItem>
          <WorshipNavLink
            onClick={handleCreateButtonLink("weeklies")}
            className={({ isActive }) => (isActive ? "active" : "")}
            to="weeklies"
            data-nav="weeklies"
          >
            주보
          </WorshipNavLink>
        </WorshipNavItem>
        <WorshipNavItem>
          <WorshipNavLink
            onClick={handleCreateButtonLink("prayer")}
            to="prayer"
            data-nav="prayer"
          >
            대표 기도
          </WorshipNavLink>
        </WorshipNavItem>
      </WorshipNavContainer>
      <Authorization authority={3}>
        <Link to={`/worship/${linkState}/create`}>
          <AiFillPlusCircle />
        </Link>
      </Authorization>
    </WeeklyComponentInfoContainer>
  );
};

export default WorshipHeader;
