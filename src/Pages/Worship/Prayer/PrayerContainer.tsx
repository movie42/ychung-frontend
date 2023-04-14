import { Loading } from "@/Components";
import styled from "styled-components";
import useGetPrayers from "../hooks/useGetPrayers";
import Prayer from "./Prayer";

const PrayerContainer = () => {
  const { data, isLoading } = useGetPrayers();

  return isLoading ? (
    <Loading />
  ) : (
    <Container>
      <Notice>이름을 클릭하면 캘린더에 기도 일정을 저장할 수 있습니다.</Notice>
      <ul>
        {data?.map((prayers, index) => (
          <>
            <Month key={prayers.month + index}>{prayers.month + 1}월</Month>
            <List key={index + 20}>
              {prayers.data.map((value) => (
                <li key={value._id}>
                  <Prayer prayer={value} />
                </li>
              ))}
            </List>
          </>
        ))}
      </ul>
    </Container>
  );
};

export default PrayerContainer;

const Container = styled.div`
  padding-top: 3rem;
  ul {
    padding: 0;
  }
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 3rem;
  gap: 1rem;
  padding-bottom: 3rem;
  @media (max-width: 400px) {
    flex-direction: column;
  }
  /* border-bottom: 2px solid ${({ theme }) => theme.color.primary400}; */
`;

const Month = styled.li`
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  padding-bottom: 1rem;
  color: ${({ theme }) => theme.color.primary200};
  &:hover {
    color: ${({ theme }) => theme.color.primary300};
  }
`;

const Notice = styled.p`
  font-size: 2rem;
  margin-bottom: 4rem;
`;
