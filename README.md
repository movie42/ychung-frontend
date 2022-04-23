# 양청 프론트 앤드

## Style

### 🌈Color

1. Basic Color
   Primary : primary400
   Secondary: secondary300
   Error : error700
   Gray : gray300
   Background : background100
   Background Transparent : backgroundBlack70
   Font : fontColorBlack

## todo

- 22.3.27~ 3.29
- 기본 서비스 연결하기 (Backend와 연결하기)
- [ ] Router에 맞는 컴포넌트 만들기
- [ ] React Router Dom에 연결하기
- [x] Backend와 연결하기

  - cors이슈는 cors 패키지로 해결 하지만 본서버에서 어떻게 될지....

  - [x] csrf token
  - [x] Login
  - [x] react-cookie 설치
  - [x] customhook(https://www.youtube.com/watch?v=nJxpJ3wks90&t=205s)
  - [x] publick key?? jwt를 모든 라우터에서 설정하지 않기 로그인이 필요한 곳에서만 설정하기
  - [x] 로그인 한 사용자 기억하기
  - [x] logout

    - localstorage와 recoile 사용해서 기억하기

  - private router

    - https://www.robinwieruch.de/react-router-private-routes/

  - [x] token을 어떻게 가져오지? 토큰은 cookie에만
  - [x] jwt https://meetup.toast.com/posts/239
  - [x] jwt https://jasonwatmore.com/post/2018/08/06/nodejs-jwt-authentication-tutorial-with-example-api#running-react
  - [x] https://levelup.gitconnected.com/react-template-for-jwt-authentication-with-private-routes-and-redirects-f77c488bfb85
  - [x] https://www.daleseo.com/react-router-authentication/
  - [x] https://medium.com/zigbang/react-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC-%EB%8F%84%EA%B5%AC-%EC%82%B4%ED%8E%B4%EB%B3%B4%EA%B8%B0-1b2e6a771cb9

- [x] Heroku 연결하기.
- [ ] 기본 서비스 그대로 시작하기
- [ ] 실재로 얼마나 걸렸는지 피드백 꼭 하기
      빌드까지 일주일 걸렸다.

-22.03.28

- new app
- 22.3.30~ 4.2
- [ ] react helmet
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
