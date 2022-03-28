# 양청 프론트 앤드

## todo

- 22.3.27~ 3.29
- 기본 서비스 연결하기 (Backend와 연결하기)
- [ ] Router에 맞는 컴포넌트 만들기
- [ ] React Router Dom에 연결하기
- [ ] Backend와 연결하기
- [ ] Heroku 연결하기
- [ ] 기본 서비스 그대로 시작하기
- [ ] 실재로 얼마나 걸렸는지 피드백 꼭 하기

-22.03.28

- [Typescript의 Generic을 사용해보자.](https://feel5ny.github.io/2018/12/09/Typescript_14/)
- [How to create a custom React hook to fetch an API (using TypeScript)?](https://dev.to/sulistef/how-to-create-a-custom-react-hook-to-fetch-an-api-using-typescript-ioi)

- new app
- - 22.3.30~ 4.2
- [ ] 게시물
  - [ ] drag and drop
- [ ] 회계
  - [ ] grid
  - [ ] category
- [ ] 교육
  - [ ] drag and drop
  - [ ] 그룹 만들기
- [ ] 지원서

  - [ ] 구글 드라이브에 exel에 연결하기(구글드라이브 API사용)
  - [ ] 새신자 인적사항 입력
  - [ ] 교육 지원비
  - [ ] 동아리 신청서

- 22.4.3~4.9
- [ ] 서비스 피드백 받기

Router

- Router.tsx

| url                         | component | detial                 |
| --------------------------- | --------- | ---------------------- |
| /                           | Main.tsx  | 랜딩 페이지            |
| /notice                     |           | 공지 리스트            |
| /notice/editor              |           | 공지 쓰기              |
| /notice/editor/:id          |           | 공지 수정              |
| /notice/:id                 |           | 공지 디테일            |
| /worship                    |           | 예배 주보 리스트       |
| /worship/editor             |           | 예배 쓰기              |
| /worship/editor/:id         |           | 예배 수정              |
| /worship/:id                |           | 예배 주보 디테일       |
| /blog                       |           | 블로그 리스트          |
| /blog/editor                |           | 블로그 쓰기            |
| /blog/editor/:id            |           | 블로그 수정            |
| /blog?tag=tagname           |           | 블로그 태그            |
| /blog/:id                   |           | 블로그 디테일          |
| /education/                 |           | 교육                   |
| /education/group            |           | 소그룹                 |
| /education/newlife          |           | 새신자                 |
| /education/oneandone        |           | 일대일 양육            |
| /documents                  |           | 공식 문서 리스트       |
| /documents/rule             |           | 회칙 리스트            |
| /documents/rule/:id         |           | 회칙 디테일            |
| /documents/menual           |           | 메뉴얼 리스트          |
| /documents/manual/:id       |           | 메뉴얼 디테일          |
| /documents/applications     |           | 지원서 리스트          |
| /documents/applications/:id |           | 지원서 디테일          |
| /documents/account          |           | 회계 월별 리스트       |
| /documents/account/:id      |           | 회계 디테일            |
| /user/:id                   |           | 사용자 디테일          |
| /user/:id/edit              |           | 사용자 정보 수정       |
| /user/:id/works             |           | 사용자 글, 댓글 리스트 |
| /user/:id/applications      |           | 사용자 지원서 리스트   |
| /user/:id/like              |           | 사용자 좋아요 리스트   |
| /admin/users                |           | 회원 정보 관리         |
| /admin/documents            |           | 도큐멘트 관리          |
| /admin/applications         |           | 지원서 관리            |
| /search                     |           | 검색                   |
| /search?term=somthing       |           | 검색 결과              |
| /login                      |           | 로그인                 |
| /join                       |           | 회원가입               |
