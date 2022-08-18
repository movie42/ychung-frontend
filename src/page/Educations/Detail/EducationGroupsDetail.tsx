import { AiFillEdit } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { IconButton, Loading } from "@/components";
import { loginState } from "@/lib/state";

import DetailGroupContainer from "./DetailGroupContainer";
import { useGetGroupInfo } from "../hooks";

const Wrapper = styled.div`
  margin-top: 8rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    font-size: 3rem;
    text-decoration: none;
    color: ${(props) => props.theme.color.fontColorWhite};
    &:hover {
    }
  }
`;

const EducationGroupsDetail = () => {
  const { isLogin } = useRecoilValue(loginState);
  const { id } = useParams();

  const { data, isLoading } = useGetGroupInfo(id ? id : "");

  return isLoading ? (
    <Loading />
  ) : (
    <Wrapper>
      <Header>
        <h1>{data?.title}</h1>
        {isLogin ? (
          <>
            <IconButton>
              <Link to={`/education/groups/${id}/update`}>
                <AiFillEdit />
              </Link>
            </IconButton>
          </>
        ) : (
          <p>자신의 조를 확인해주세요.</p>
        )}
      </Header>
      <DetailGroupContainer />
    </Wrapper>
  );
};

export default EducationGroupsDetail;
