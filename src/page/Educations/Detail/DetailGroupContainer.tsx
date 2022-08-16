import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import { Loading } from "@/components";

import { Group } from "../../../state/educationGroup.atom";
import { useGet } from "../../../lib/utils/hooks/useGet";
import DetailGroup from "./DetailGroup";

const Container = styled.section`
  width: 100%;
  padding: 2rem 0;
`;

const TextContainer = styled.div``;

const GroupContainer = styled.ul`
  display: grid;
  grid-auto-rows: minmax(30rem, auto);
  margin: 0;
  @media (min-width: ${(props) => props.theme.screen.labtop}) {
    grid-template-columns: repeat(auto-fill, minmax(35rem, auto));
    gap: 1.5rem;
  }
  padding: 0;
`;

const DetailGroupContainer = () => {
  const { id } = useParams();
  const { data, isSuccess } = useGet<Group[]>({
    url: `/api/education/groups/${id}/group`,
    queryKey: "groups",
  });

  const studentGroup = data?.filter((value) => value.type === "student");
  const workerGroup = data?.filter((value) => value.type === "worker");
  const newPeopleGorup = data?.filter((value) => value.type === "new");
  const etcGroup = data?.filter((value) => value.type === "etc");

  return isSuccess ? (
    <>
      {newPeopleGorup?.length !== 0 && (
        <Container>
          <TextContainer>
            <h2>새신자</h2>
          </TextContainer>
          <GroupContainer>
            {newPeopleGorup?.map((value) => (
              <DetailGroup key={value._id} group={value} />
            ))}
          </GroupContainer>
        </Container>
      )}
      {studentGroup?.length !== 0 && (
        <Container>
          <TextContainer>
            <h2>학생</h2>
          </TextContainer>
          <GroupContainer>
            {studentGroup?.map((value) => (
              <DetailGroup key={value._id} group={value} />
            ))}
          </GroupContainer>
        </Container>
      )}
      {workerGroup?.length !== 0 && (
        <Container>
          <TextContainer>
            <h2>직장</h2>
          </TextContainer>
          <GroupContainer>
            {workerGroup?.map((value) => (
              <DetailGroup key={value._id} group={value} />
            ))}
          </GroupContainer>
        </Container>
      )}
      {etcGroup?.length !== 0 && (
        <Container>
          <TextContainer>
            <h2>기타</h2>
          </TextContainer>
          <GroupContainer>
            {etcGroup?.map((value) => (
              <DetailGroup key={value._id} group={value} />
            ))}
          </GroupContainer>
        </Container>
      )}
    </>
  ) : (
    <Loading />
  );
};

export default DetailGroupContainer;
