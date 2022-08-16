import { keyboard } from "@testing-library/user-event/dist/keyboard";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 8rem;
`;

interface IReportsContainerProps {}

const ReportsContainer = () => {
  /**
   TODO:
   * 리더 권한을 가진 사람만 접속할 수 있다.
   DB는 user의 아이디를 참조하고 있기 떄문에 그것을 체크해야만 한다.
   * 그룹 리포트를 작성할 수 있다. - 소그룹 활동이나 그룹 전체에 대한
   * 처음에 접속하면 할당받은 그룹 정보가 불러와진다.
   * 그룹 안에 속한 사람들에 대한 정보가 불러와 그려진다.
   * 사람에 대한 리포트가 날짜별로 출력된다. 접었다 펼 수 있다.
   * 사람을 클릭하면 리포트를 작성할 수 있는 에디터가 나온다.
   * 사람에 대해서 개별적으로 리포트를 작성할 수 있다.
   * 출석 체크도 이곳에서 가능하다. 리포트만 쓸수도 있고 출석 체크만 할 수도 있다.
   * 읽기는 날짜 별로 볼 수 있다.
   * 한번 작성한 리포트는 삭제할 수 없고, 수정만 가능하다.
   * 할당되지 않은 그룹에 접근해서 작성하는 것은 불가능하다.
   * 목사, 리더, 교육국장, 회장 할당을 받은 사람은 전체 리포트에 접근, 열람이 가능하다.
   * 댓글을 달 수 있다. 
   */
  return (
    <Wrapper>
      <h1>소그룹 리포트</h1>
      <div></div>
    </Wrapper>
  );
};

export default ReportsContainer;
