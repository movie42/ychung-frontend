import React, { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import IconButton from "../../../components/Buttons/IconButton";
import Loading from "../../../components/Loading";
import { FetchDataProps } from "../../../lib/interface";
import { loginState } from "../../../state/Authrization";
import { GroupInfo, groupInfoState } from "../../../state/educationGroup.atom";
import { useGet } from "../../../utils/customhooks/useGet";
import DetailGroupContainer from "./DetailGroupContainer";

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
  const { data, isLoading } = useGet<GroupInfo>({
    url: `/api/education/groups/${id}`,
    queryKey: "group",
  });

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
