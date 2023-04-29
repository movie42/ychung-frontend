import styled from "styled-components";
import { Group } from "@/lib/state";
import GroupPerson from "./GroupPerson";
import { useGetPeople } from "../hooks";

const ItemContainer = styled.li`
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.color.gray300};
  border-radius: 0.5rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  margin-top: 2rem;
`;

const Item = styled.div`
  h2 {
    padding: 1rem 0;
  }
  h3 {
    font-size: 1.4rem;
  }
  h4 {
    font-size: 2rem;
  }
  ul {
    padding: 0;
  }
`;

const InfoContainer = styled.div`
  margin-bottom: 1.3rem;
`;

interface IDetailGroupProps {
  group: Group;
}

const DetailGroup = ({ group }: IDetailGroupProps) => {
  const { data: humans } = useGetPeople(group._id);

  return (
    <ItemContainer>
      <Item>
        <InfoContainer>
          <h2>{group.name} 조</h2>
          <h3>조장</h3>
          <h4>{humans?.map((value) => value.isLeader && <>{value.name}</>)}</h4>
        </InfoContainer>
        <InfoContainer>
          <h3>장소</h3>
          <h4>{group?.place ? group?.place : "딱히 정해지지지 않았습니다."}</h4>
        </InfoContainer>
        <InfoContainer>
          <h3>참가자</h3>
          {humans && humans?.length !== 0 ? (
            <ul>
              {humans
                ?.filter((value) => !value.isLeader)
                .map((value) => (
                  <GroupPerson
                    key={value._id}
                    person={value}
                  />
                ))}
            </ul>
          ) : (
            <p>참가자가 없습니다.</p>
          )}
        </InfoContainer>
      </Item>
    </ItemContainer>
  );
};

export default DetailGroup;
