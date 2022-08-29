import { useEffect } from "react";
import styled from "styled-components";
import { Loading } from "@/Components";
import { useCreateEducation } from "../hooks";

const Wrapper = styled.div`
  margin-top: 8rem;
`;

interface CreateGroup {
  title: string;
  isPublic: boolean;
  groups: [];
}

function EducationCreate() {
  const { mutate: educationCreateMutate, isLoading } = useCreateEducation();

  useEffect(() => {
    const postDelay = setTimeout(() => {
      educationCreateMutate({ title: "소그룹1", isPublic: false, groups: [] });
    }, 3000);
    return () => clearTimeout(postDelay);
  }, []);

  return <Wrapper>{!isLoading && <Loading />}</Wrapper>;
}

export default EducationCreate;
