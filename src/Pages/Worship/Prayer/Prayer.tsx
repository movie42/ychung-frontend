import { Button } from "@/Components";
import { loginState } from "@/lib/state";
import useMakeICS from "@/lib/utils/saveICS";
import { useEffect } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import useDeletePrayer from "../hooks/useDeletePrayer";
import { ResponsePrayer } from "../hooks/useGetPrayers";

interface PrayerProps {
  prayer: Omit<ResponsePrayer, "updatedAt" | "createdAt">;
}

const Prayer = ({ prayer }: PrayerProps) => {
  const { isLogin } = useRecoilValue(loginState);
  const prayerDate = new Date(prayer.start);
  const { icsFile, saveICS } = useMakeICS();
  const navigate = useNavigate();

  const icsDate = `${prayerDate.getFullYear()}-${
    prayerDate.getMonth() + 1 < 10
      ? `0${prayerDate.getMonth() + 1}`
      : prayerDate.getMonth() + 1
  }-${
    prayerDate.getDate() < 10
      ? `0${prayerDate.getDate()}`
      : prayerDate.getDate()
  }`;

  const { mutate } = useDeletePrayer();

  const handleUpdatePrayer =
    (prayerId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      navigate(`/worship/prayer/${prayerId}`, {
        state: {
          id: prayerId,
          name: prayer.name,
          start: prayer.start,
          end: prayer.end
        }
      });
    };
  const handleDeletePrayer =
    (prayerId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      mutate(prayerId);
    };

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
          <div>
            {isLogin && (
              <>
                <Button
                  onClick={handleUpdatePrayer(prayer._id)}
                  buttonType="icon"
                >
                  <AiFillEdit />
                </Button>
                <Button
                  onClick={handleDeletePrayer(prayer._id)}
                  buttonType="icon"
                >
                  <MdDelete />
                </Button>
              </>
            )}
          </div>
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
  justify-content: space-between;
  p {
    box-sizing: border-box;
    height: 100%;
    font-size: 2rem;
  }
  button {
    font-size: 2.3rem;
    color: ${({ theme }) => theme.color.gray300};
    &:hover {
      color: ${({ theme }) => theme.color.primary300};
    }
  }
`;
