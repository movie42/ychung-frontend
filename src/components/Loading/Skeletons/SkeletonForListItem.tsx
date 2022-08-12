import React from "react";
import styled from "styled-components";
import Skeleton from "./Skeleton";

const Item = styled.li`
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0.2rem 0.2rem 0.8rem
    ${(props) => props.theme.color.backgroundBlack20};
  border: 1px solid ${(props) => props.theme.color.gray300};
  border-radius: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  margin-top: 3rem;
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    box-shadow: 0rem 0 1.2rem ${(props) => props.theme.color.backgroundBlack20};
  }
`;

const Link = styled.div`
  display: grid;
  height: 100%;
  color: ${(props) => props.theme.color.fontColorBlack};
  text-decoration: none;
  grid-template-rows: 6fr 1fr;
`;

const PostInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem 2rem;
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

const ImageContainer = styled.div`
  position: relative;
  z-index: -1;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${(props) => props.theme.color.gray300};
`;

const ItemDetailContainer = styled.div`
  .skeleton-padding {
    padding: 1rem 2rem;
  }
`;

const ItemDetailInfoContainer = styled.div`
  display: flex;
`;

const ThumnailSkeleton = styled(Skeleton)`
  background-color: ${({ theme }) => theme.color.gray300};
`;
const HumanIconSkeleton = styled(Skeleton)`
  background-color: ${({ theme }) => theme.color.gray300};
`;
const TitleSkeleton = styled(Skeleton)`
  box-sizing: border-box;
  margin: 1rem 0;
  background-color: ${({ theme }) => theme.color.gray300};
`;
const ParagrahSkeleton = styled(Skeleton)`
  background-color: ${({ theme }) => theme.color.gray300};
`;
const UserNameSkeleton = styled(Skeleton)`
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.color.gray300};
`;
const DateSkeleton = styled(Skeleton)`
  background-color: ${({ theme }) => theme.color.gray300};
`;
const ViewsSkeleton = styled(Skeleton)`
  background-color: ${({ theme }) => theme.color.gray300};
`;
const CommonetSkeleton = styled(Skeleton)`
  margin-left: 1rem;
  background-color: ${({ theme }) => theme.color.gray300};
`;

interface ISkeletonForListItemProps {}

const SkeletonForListItem = () => {
  return (
    <Item>
      <Link>
        <ItemDetailContainer>
          <ThumnailSkeleton skeletonBoxHeight="25rem" skeletonBoxWidth="100%" />
          <div className="skeleton-padding">
            <TitleSkeleton skeletonBoxHeight="3rem" skeletonBoxWidth="100%" />
            <ParagrahSkeleton
              skeletonBoxHeight="1.6rem"
              skeletonBoxWidth="100%"
            />
          </div>
        </ItemDetailContainer>
        <PostInfoContainer>
          <UserInfoContainer>
            <ImageContainer>
              <HumanIconSkeleton
                skeletonBoxHeight="4.5rem"
                skeletonBoxWidth="4.5rem"
              />
            </ImageContainer>
            <InfoContainer>
              <UserNameSkeleton
                skeletonBoxHeight="1.4rem"
                skeletonBoxWidth="10rem"
              />
              <DateSkeleton
                skeletonBoxHeight="1.4rem"
                skeletonBoxWidth="6rem"
              />
            </InfoContainer>
          </UserInfoContainer>
          <ItemDetailInfoContainer>
            <ViewsSkeleton skeletonBoxHeight="1.4rem" skeletonBoxWidth="6rem" />
            <CommonetSkeleton
              skeletonBoxHeight="1.4rem"
              skeletonBoxWidth="6rem"
            />
          </ItemDetailInfoContainer>
        </PostInfoContainer>
      </Link>
    </Item>
  );
};

export default SkeletonForListItem;
