import useMakeICS from "@/lib/utils/saveICS";
import { useEffect } from "react";
import styled from "styled-components";

interface Prayer {
  name: string;
  date: Date;
}

interface PrayerProps {
  prayer: Prayer;
}

const Prayer = ({ prayer }: PrayerProps) => {
  const { icsFile, saveICS } = useMakeICS();
  const icsDate = `${prayer.date.getFullYear()}-${
    prayer.date.getMonth() + 1 < 10
      ? `0${prayer.date.getMonth() + 1}`
      : prayer.date.getMonth() + 1
  }-${
    prayer.date.getDate() < 10
      ? `0${prayer.date.getDate()}`
      : prayer.date.getDate()
  }`;

  useEffect(() => {
    saveICS(icsDate, prayer.name);
  }, []);

  return (
    <Container
      download={`${prayer.name}.ics`}
      href={`data:text/calendar;charset=utf-8,${encodeURIComponent(icsFile)}`}
    >
      <div>
        <DateContainer>
          <p>
            {prayer.date.getDate() < 10
              ? `0${prayer.date.getDate()}`
              : prayer.date.getDate()}
            일
          </p>
        </DateContainer>
        <h3>{prayer.name}</h3>
      </div>
    </Container>
  );
};

export default Prayer;

const Container = styled.a`
  color: black;
  text-decoration: none;
  border: 2px solid black;
  border-radius: 0.5rem;
  padding: 2rem;
  h3 {
    font-size: 3rem;
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.primary200};
  }
`;

const DateContainer = styled.div`
  display: flex;
  margin-bottom: 0.4rem;
  p {
    box-sizing: border-box;
    height: 100%;
    font-size: 2rem;
  }
`;
