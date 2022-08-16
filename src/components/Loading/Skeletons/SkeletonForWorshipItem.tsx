import React from "react";
import styled from "styled-components";
import Skeleton from "./Skeleton";

const ListItem = styled.li`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 2rem 1rem;
  border-radius: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    box-shadow: 0rem 0 1rem rgba(0, 0, 0, 0.2);
  }
`;

const Link = styled.div`
  display: grid;
  height: 100%;
  color: ${(props) => props.theme.color.fontColorBlack};
  text-decoration: none;
  grid-template-rows: 3fr 1fr;
`;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const UserImageSkeletonContainer = styled.div`
  position: relative;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  overflow: hidden;
  z-index: -1;
`;

const UserImageSkeleton = styled(Skeleton)`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.color.gray300};
`;

const ItemDetailContainer = styled.div`
  margin-top: 1rem;
`;

const ItemDetailInfoContainer = styled.div`
  display: flex;
`;

const WeeklyInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleSkeleton = styled(Skeleton)`
  background-color: ${({ theme }) => theme.color.gray300};
`;
const UserNameSkeleton = styled(Skeleton)`
  background-color: ${({ theme }) => theme.color.gray300};
  margin-bottom: 1rem;
`;
const DateSkeleton = styled(Skeleton)`
  background-color: ${({ theme }) => theme.color.gray300};
`;
const ViewSkeleton = styled(Skeleton)`
  background-color: ${({ theme }) => theme.color.gray300};
`;

interface ISkeletonForWorshipItemProps {}

const SkeletonForWorshipItem = () => {
  return (
    <ListItem>
      <Link>
        <ItemDetailContainer>
          <TitleSkeleton skeletonBoxHeight="6rem" skeletonBoxWidth="20rem" />
        </ItemDetailContainer>
        <WeeklyInfoContainer>
          <UserInfoContainer>
            <UserImageSkeletonContainer>
              <UserImageSkeleton
                skeletonBoxHeight="4.5rem"
                skeletonBoxWidth="4.5rem"
              />
            </UserImageSkeletonContainer>
            <InfoContainer>
              <UserNameSkeleton
                skeletonBoxHeight="1.4rem"
                skeletonBoxWidth="10rem"
              />
              <DateSkeleton
                skeletonBoxHeight="1.4rem"
                skeletonBoxWidth="10rem"
              />
            </InfoContainer>
          </UserInfoContainer>
          <ItemDetailInfoContainer>
            <ViewSkeleton skeletonBoxHeight="1.4rem" skeletonBoxWidth="10rem" />
          </ItemDetailInfoContainer>
        </WeeklyInfoContainer>
      </Link>
    </ListItem>
  );
};

export default SkeletonForWorshipItem;
