import useMakeICS from "@/lib/utils/saveICS";
import { useEffect } from "react";
import styled from "styled-components";
import { Prayer as PrayerResponse } from "../hooks/useGetPrayers";

interface PrayerProps {
  prayer: Omit<PrayerResponse, "updatedAt" | "createdAt">;
}

const Prayer = ({ prayer }: PrayerProps) => {
  const prayerDate = new Date(prayer.start);
  const { icsFile, saveICS } = useMakeICS();

  const icsDate = `${prayerDate.getFullYear()}-${
    prayerDate.getMonth() + 1 < 10
      ? `0${prayerDate.getMonth() + 1}`
      : prayerDate.getMonth() + 1
  }-${
    prayerDate.getDate() < 10
      ? `0${prayerDate.getDate()}`
      : prayerDate.getDate()
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
            {prayerDate.getDate() < 10
              ? `0${prayerDate.getDate()}`
              : prayerDate.getDate()}
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
  display: block;
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
