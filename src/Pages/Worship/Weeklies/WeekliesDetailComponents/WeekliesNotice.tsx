import styled from "styled-components";
import { INoticeInterface } from "@/lib/state";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

import useGetNoticeForWeekly from "../../hooks/useGetNoticeForWeekly";

const ListContainer = styled.ul`
  padding: 0;
`;

const ListItem = styled.li`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 2rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  a {
    font-size: 2.2rem;
    color: ${(props) => props.theme.color.fontColorBlack};
    text-decoration: none;
    p {
      margin: 0 0 1rem 0;
    }
    div {
      font-size: 1.6rem;
    }
  }
  &:hover {
    background-color: ${(props) => props.theme.color.gray300};
  }
`;

function WeekliesNotice() {
  const { isLoading, data: notices, isSuccess } = useGetNoticeForWeekly();

  if (!isSuccess) {
    return <div>주보 데이터가 없습니다.</div>;
  }

  return isLoading ? (
    <p>광고 불러오는 중...</p>
  ) : (
    <ListContainer>
      {notices?.map((notice: INoticeInterface) => (
        <ListItem key={notice._id}>
          <Link to={`/notice/${notice._id}`}>
            <p>{notice.title}</p>
            <div>
              자세히 보기
              <span>
                <BsArrowRight />
              </span>
            </div>
          </Link>
        </ListItem>
      ))}
    </ListContainer>
  );
}

export default WeekliesNotice;
