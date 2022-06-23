import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Button from "../../components/Buttons/Button";
import Loading from "../../components/Loading";
import { groupInfoState } from "../../state/educationGroup.atom";

const Wrapper = styled.div`
  margin-top: 8rem;
`;

const CreateGroupButton = styled(Button)``;

interface IEducationFetchData {
  _id: string;
  title: string;
  isPublic: boolean;
  groups: [];
}

const Educations = () => {
  // const navigate = useNavigate();
  // const setEducationGroups = useSetRecoilState(groupInfoState);
  // const { isLoading, isSuccess, error, data } = useQuery<IEducationFetchData[]>(
  //   "notice",
  //   async () => {
  //     const response = await fetch(`/api/education/groups`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       mode: "cors",
  //     });
  //     const { data } = await response.json();
  //     return data;
  //   },
  //   { staleTime: 10000 }
  // );

  // const createGroup = () => {
  //   navigate("/education/groups/create");
  // };

  // const moveToDetail = (e: React.MouseEvent<HTMLLIElement>) => {
  //   const id = e.currentTarget.dataset.id;
  //   if (data) {
  //     const [{ _id, title, isPublic, groups }] = data.filter(
  //       (value) => value._id === id
  //     );
  //     setEducationGroups({ id: _id, title, isPublic, groups });

  //     isPublic
  //       ? navigate(`/education/groups/${id}`)
  //       : navigate(`/education/groups/${id}/update`);
  //   }
  // };

  // return isLoading ? (
  //   <Loading />
  // ) : (
  //   <Wrapper>
  //     <CreateGroupButton onClick={createGroup} buttonType="block">
  //       추가하기
  //     </CreateGroupButton>
  //     <ul>
  //       {data?.map((value) => (
  //         <li key={value._id} data-id={value._id} onClick={moveToDetail}>
  //           {value.title}
  //         </li>
  //       ))}
  //     </ul>
  //   </Wrapper>
  // );
  return null;
};

export default Educations;
