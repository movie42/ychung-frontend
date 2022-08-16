import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { calculateDate } from "../../lib/utils/utilities/calculateDate";

import { HiUser } from "react-icons/hi";
import { previewParagraph } from "../../lib/utils/utilities/previewParagraph";
import { imageParser } from "../../lib/utils/utilities/imageParser";
import SkeletonForListItem from "../Loading/Skeletons/SkeletonForListItem";

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
  &:hover {
    background-color: ${(props) => props.theme.color.primary900};
    a {
      color: ${(props) => props.theme.color.fontColorWhite};
    }
  }
  a {
    display: grid;
    height: 100%;
    color: ${(props) => props.theme.color.fontColorBlack};
    text-decoration: none;
    grid-template-rows: 6fr 1fr;
  }
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
  span {
    &:not(:first-child) {
      margin-top: 0.4rem;
    }
    color: ${(props) => props.theme.color.gray300};
  }
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

const HumanIcon = styled(HiUser)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.6rem;
  width: 4.5rem;
  height: 4.5rem;
  color: ${(props) => props.theme.color.gray100};
`;

const ItemDetailContainer = styled.div`
  .thumnail-container {
    box-sizing: border-box;
    width: 100%;
    height: 25rem;
    overflow: hidden;
    border-radius: 0.5rem 0.5rem 0 0;
    img {
      width: 100%;
      height: 30rem;
      object-fit: cover;
    }
  }
  .title-paragraph-container {
    padding: 1rem 2rem;
    h3 {
      word-break: keep-all;
      margin: 0;
      font-size: 3rem;
      line-height: 1.8;
    }
    p {
      margin: 0;
      font-size: 1.6rem;
      line-height: 1.6;
    }
  }
`;

const ItemDetailInfoContainer = styled.div`
  span {
    color: ${(props) => props.theme.color.gray300};
    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
`;

interface UnkownType {
  _id: string;
  title: string;
  startDate?: string;
  endDate?: string;
  summary?: string;
  paragraph: string;
  creator: { userName: string };
  comments: [];
  views: number;
  createdAt: string;
}

interface IItemProps<T> extends React.LiHTMLAttributes<HTMLLIElement> {
  data: T;
}

const ListItem = <T extends UnkownType>({ data, ...rest }: IItemProps<T>) => {
  const {
    _id,
    title,
    startDate,
    endDate,
    summary,
    paragraph,
    creator,
    comments,
    views,
    createdAt,
  } = data;
  const [imageSrc, setImageSrc] = useState<string | null>("");
  const [isLoading, setIsLaoding] = useState(true);

  useEffect(() => {
    setImageSrc(() => imageParser(paragraph));
  }, []);

  useEffect(() => {
    if (!imageSrc) {
      setIsLaoding(false);
    }
  }, [imageSrc, setIsLaoding]);

  return !isLoading ? (
    <Item {...rest}>
      <Link to={`${_id}`}>
        <ItemDetailContainer>
          {imageSrc !== null && (
            <div className="thumnail-container">
              <img
                src={imageSrc}
                onLoad={() => {
                  setIsLaoding(false);
                }}
              />
            </div>
          )}
          <div className="title-paragraph-container">
            <h3>{title}</h3>
            <p>{previewParagraph(paragraph)}</p>
          </div>
        </ItemDetailContainer>

        <PostInfoContainer>
          <UserInfoContainer>
            <ImageContainer>
              <HumanIcon />
            </ImageContainer>
            <InfoContainer>
              <span>{creator.userName}</span>
              <span>{calculateDate(createdAt)}</span>
            </InfoContainer>
          </UserInfoContainer>

          <ItemDetailInfoContainer>
            <span>조회수 {views}</span>
            <span>댓글 {comments?.length}</span>
          </ItemDetailInfoContainer>
        </PostInfoContainer>
      </Link>
    </Item>
  ) : (
    <SkeletonForListItem />
  );
};

export default ListItem;
