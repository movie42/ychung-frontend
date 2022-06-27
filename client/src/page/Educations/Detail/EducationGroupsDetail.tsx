import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Loading from "../../../components/Loading";
import { FetchDataProps } from "../../../lib/interface";
import { GroupInfo, groupInfoState } from "../../../state/educationGroup.atom";
import { useGet } from "../../../utils/customhooks/useGet";
import DetailGroupContainer from "./DetailGroupContainer";

const Wrapper = styled.div`
  margin-top: 8rem;
`;

const EducationGroupsDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGet<GroupInfo>({
    url: `/api/education/groups/${id}`,
    queryKey: "group",
  });

  return isLoading ? (
    <Loading />
  ) : (
    <Wrapper>
      <h1>{data?.title}</h1>
      <Link to={`/education/groups/${id}/update`}>수정</Link>
      {/* <Link to={``}>삭제</Link> */}
      <DetailGroupContainer />
    </Wrapper>
  );
};

export default EducationGroupsDetail;
