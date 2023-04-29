import { useParams } from "react-router";
import styled from "styled-components";

import { Loading } from "@/Components";

import DetailGroup from "./DetailGroup";
import useGetGroups from "../hooks/useGetGroups";

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
  const { educationId } = useParams();

  const { data: groups, isSuccess } = useGetGroups(
    educationId ? educationId : ""
  );

  const studentGroup = groups?.filter((value) => value.type === "student");
  const workerGroup = groups?.filter((value) => value.type === "worker");
  const newPeopleGorup = groups?.filter((value) => value.type === "new");
  const etcGroup = groups?.filter((value) => value.type === "etc");

  return isSuccess ? (
    <>
      {newPeopleGorup?.length !== 0 && (
        <Container>
          <TextContainer>
            <h2>새신자</h2>
          </TextContainer>
          <GroupContainer>
            {newPeopleGorup?.map((group) => (
              <DetailGroup
                key={group._id}
                group={group}
              />
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
            {studentGroup?.map((group) => (
              <DetailGroup
                key={group._id}
                group={group}
              />
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
            {workerGroup?.map((group) => (
              <DetailGroup
                key={group._id}
                group={group}
              />
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
            {etcGroup?.map((group) => (
              <DetailGroup
                key={group._id}
                group={group}
              />
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
