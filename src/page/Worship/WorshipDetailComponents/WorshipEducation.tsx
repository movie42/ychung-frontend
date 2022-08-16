import { useGet } from "@/lib/utils/hooks/useGet";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

interface IWorshipEducationProps {
  _id: string;
  title: string;
  isPublic: boolean;
  groups: [];
  createdAt: Date;
}

const WorshipEducation = () => {
  const {
    data: educations,
    isLoading,
    isRefetchError,
    isSuccess,
  } = useGet<IWorshipEducationProps[]>({
    url: "/api/education/groups",
    queryKey: "educations",
    select: (data) => {
      return data.filter((value) => value.isPublic);
    },
  });

  if (isLoading) {
    return <p>교육 정보를 가져오고 있습니다.</p>;
  }

  if (educations?.length === 0) {
    return (
      <Wrapper>
        <p>나중에 만나요!</p>
      </Wrapper>
    );
  }

  return !isRefetchError && isSuccess ? (
    <Wrapper>
      <ListContainer>
        {educations?.map((info) => (
          <ListItem key={info._id}>
            <Link to={`/education/groups/${info._id}`}>
              <p>{info.title}</p>
              <div>
                자세히 보기
                <span>
                  <BsArrowRight />
                </span>
              </div>
            </Link>
          </ListItem>
        ))}
      </ListContainer>
    </Wrapper>
  ) : (
    <Wrapper>
      <p>교육 정보를 가져오고 있습니다.</p>
    </Wrapper>
  );
};

export default WorshipEducation;
