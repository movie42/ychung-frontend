import { HiUser } from "react-icons/hi";
import styled from "styled-components";
import { People } from "@/lib/state";

const Item = styled.li`
  box-sizing: border-box;
  margin: 1rem 0;
  border: 1px solid ${(props) => props.theme.color.gray300};
  border-radius: 1rem;
  padding: 1rem;
`;

const PersonInfoContainer = styled.div`
  display: flex;
  align-items: center;
  h5 {
    font-size: 1.8rem;
    font-weight: 400;
  }
`;

const ImageContainer = styled.div<{ sex: "male" | "female" }>`
  position: relative;
  overflow: hidden;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  background-color: ${(props) =>
    props.sex === "male"
      ? props.theme.color.primary500
      : props.theme.color.secondary500};
  margin-right: 1rem;
`;

const HumanIcon = styled(HiUser)`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4rem;
  height: 4rem;
  color: ${(props) => props.theme.color.gray100};
`;

interface IGroupPersonProps {
  person: People;
}

const GroupPerson = ({ person }: IGroupPersonProps) => {
  return (
    <Item data-id={person._id}>
      <PersonInfoContainer>
        <ImageContainer sex={person.sex}>
          <HumanIcon />
        </ImageContainer>
        <h5>{person.name}</h5>
      </PersonInfoContainer>
    </Item>
  );
};

export default GroupPerson;
