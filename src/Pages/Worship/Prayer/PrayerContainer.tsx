import styled from "styled-components";
import Prayer from "./Prayer";
const praySchedule = [
  { date: new Date("2023-01-01 14:00:00"), name: "유믿음" },
  { date: new Date("2023-01-08 14:00:00"), name: "유정우" },
  { date: new Date("2023-01-15 14:00:00"), name: "강소영" },
  { date: new Date("2023-01-22 14:00:00"), name: "이하송" },
  { date: new Date("2023-01-29 14:00:00"), name: "박영규" },
  { date: new Date("2023-02-05 14:00:00"), name: "나성진" },
  { date: new Date("2023-02-12 14:00:00"), name: "김영범" },
  { date: new Date("2023-02-19 14:00:00"), name: "최여명" },
  { date: new Date("2023-02-26 14:00:00"), name: "이승현" },
  { date: new Date("2023-03-05 14:00:00"), name: "최다은" },
  { date: new Date("2023-03-12 14:00:00"), name: "박혜연" },
  { date: new Date("2023-03-19 14:00:00"), name: "유정현" },
  { date: new Date("2023-03-26 14:00:00"), name: "박은비" },
  { date: new Date("2023-04-02 14:00:00"), name: "심효재" },
  { date: new Date("2023-04-09 14:00:00"), name: "박다향" },
  { date: new Date("2023-04-16 14:00:00"), name: "박혜진" },
  { date: new Date("2023-04-23 14:00:00"), name: "김창원" },
  { date: new Date("2023-04-30 14:00:00"), name: "정현근" },
  { date: new Date("2023-05-07 14:00:00"), name: "최소연" },
  { date: new Date("2023-05-14 14:00:00"), name: "최선아" },
  { date: new Date("2023-05-21 14:00:00"), name: "변수용" },
  { date: new Date("2023-05-28 14:00:00"), name: "박다현" },
  { date: new Date("2023-06-04 14:00:00"), name: "최병찬" },
  { date: new Date("2023-06-11 14:00:00"), name: "김승아" },
  { date: new Date("2023-06-18 14:00:00"), name: "최대한" },
  { date: new Date("2023-06-25 14:00:00"), name: "강태양" },
  { date: new Date("2023-07-02 14:00:00"), name: "장우현" },
  { date: new Date("2023-07-09 14:00:00"), name: "박도연" },
  { date: new Date("2023-07-16 14:00:00"), name: "최은혜" },
  { date: new Date("2023-07-23 14:00:00"), name: "신영민" },
  { date: new Date("2023-07-30 14:00:00"), name: "정준영" },
  { date: new Date("2023-08-06 14:00:00"), name: "조영훈" },
  { date: new Date("2023-08-13 14:00:00"), name: "김준수" },
  { date: new Date("2023-08-20 14:00:00"), name: "박규연" },
  { date: new Date("2023-08-27 14:00:00"), name: "박은규" },
  { date: new Date("2023-09-03 14:00:00"), name: "박도현" },
  { date: new Date("2023-09-10 14:00:00"), name: "이광현" },
  { date: new Date("2023-09-17 14:00:00"), name: "김현빈" },
  { date: new Date("2023-09-24 14:00:00"), name: "나대웅" },
  { date: new Date("2023-10-01 14:00:00"), name: "박다성" },
  { date: new Date("2023-10-08 14:00:00"), name: "장수아" },
  { date: new Date("2023-10-15 14:00:00"), name: "조희원" },
  { date: new Date("2023-10-22 14:00:00"), name: "김태연" },
  { date: new Date("2023-10-29 14:00:00"), name: "최우혁" },
  { date: new Date("2023-11-05 14:00:00"), name: "김하빈" },
  { date: new Date("2023-11-12 14:00:00"), name: "정태희" },
  { date: new Date("2023-11-19 14:00:00"), name: "이현섭" },
  { date: new Date("2023-11-02 14:00:00"), name: "형은영" },
  { date: new Date("2023-12-03 14:00:00"), name: "박석현" },
  { date: new Date("2023-12-10 14:00:00"), name: "김기현" },
  { date: new Date("2023-12-17 14:00:00"), name: "박혜민" },
  { date: new Date("2023-12-24 14:00:00"), name: "조상은" },
  { date: new Date("2023-12-31 14:00:00"), name: "안지후" }
];
const PrayerContainer = () => {
  return (
    <Container>
      <Notice>
        사파리에서 이름을 클릭하면 캘린더에 기도 일정을 저장할 수 있습니다.
      </Notice>
      <ul>
        <Month>
          <h2>1월</h2>
        </Month>
        <li>
          {praySchedule
            .filter((value) => value.date.getMonth() === 0)
            .map((prayer, index) => (
              <Prayer key={index} prayer={prayer} />
            ))}
        </li>
        <Month>
          <h2>2월</h2>
        </Month>
        <li>
          {praySchedule
            .filter((value) => value.date.getMonth() === 1)
            .map((prayer, index) => (
              <Prayer key={index} prayer={prayer} />
            ))}
        </li>
        <Month>
          <h2>3월</h2>
        </Month>
        <li>
          {praySchedule
            .filter((value) => value.date.getMonth() === 2)
            .map((prayer, index) => (
              <Prayer key={index} prayer={prayer} />
            ))}
        </li>
        <Month>
          <h2>4월</h2>
        </Month>
        <li>
          {praySchedule
            .filter((value) => value.date.getMonth() === 3)
            .map((prayer, index) => (
              <Prayer key={index} prayer={prayer} />
            ))}
        </li>
        <Month>
          <h2>5월</h2>
        </Month>
        <li>
          {praySchedule
            .filter((value) => value.date.getMonth() === 4)
            .map((prayer, index) => (
              <Prayer key={index} prayer={prayer} />
            ))}
        </li>
        <Month>
          <h2>6월</h2>
        </Month>
        <li>
          {praySchedule
            .filter((value) => value.date.getMonth() === 5)
            .map((prayer, index) => (
              <Prayer key={index} prayer={prayer} />
            ))}
        </li>
        <Month>
          <h2>7월</h2>
        </Month>
        <li>
          {praySchedule
            .filter((value) => value.date.getMonth() === 6)
            .map((prayer, index) => (
              <Prayer key={index} prayer={prayer} />
            ))}
        </li>
        <Month>
          <h2>8월</h2>
        </Month>
        <li>
          {praySchedule
            .filter((value) => value.date.getMonth() === 7)
            .map((prayer, index) => (
              <Prayer key={index} prayer={prayer} />
            ))}
        </li>
        <Month>
          <h2>9월</h2>
        </Month>
        <li>
          {praySchedule
            .filter((value) => value.date.getMonth() === 8)
            .map((prayer, index) => (
              <Prayer key={index} prayer={prayer} />
            ))}
        </li>
        <Month>
          <h2>10월</h2>
        </Month>
        <li>
          {praySchedule
            .filter((value) => value.date.getMonth() === 9)
            .map((prayer, index) => (
              <Prayer key={index} prayer={prayer} />
            ))}
        </li>
        <Month>
          <h2>11월</h2>
        </Month>
        <li>
          {praySchedule
            .filter((value) => value.date.getMonth() === 10)
            .map((prayer, index) => (
              <Prayer key={index} prayer={prayer} />
            ))}
        </li>
        <Month>
          <h2>12월</h2>
        </Month>
        <li>
          {praySchedule
            .filter((value) => value.date.getMonth() === 11)
            .map((prayer, index) => (
              <Prayer key={index} prayer={prayer} />
            ))}
        </li>
      </ul>
    </Container>
  );
};

export default PrayerContainer;

const Container = styled.div`
  padding-top: 3rem;
  ul {
    li {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 2rem;
      margin-right: 1rem;
      gap: 1rem;
    }
  }
`;

const Month = styled.li`
  font-size: 2rem;
  margin: 0;
  border-bottom: 2px solid black;
  padding-bottom: 0.5rem;
  &:hover {
    color: ${({ theme }) => theme.color.primary800};
  }
`;
const Notice = styled.p`
  font-size: 2rem;
  padding-left: 2.5rem;
`;
