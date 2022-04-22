import React from "react";
import { Route, Routes } from "react-router-dom";
import Blog from "../page/Blog/Bolg";
import Documents from "../page/Document/Documents";
import Join from "../page/Root/Join";
import Login from "../page/Root/Login";
import Logout from "../page/Root/Logout";
import Main from "../page/Root/Main";
import User from "../page/User/User";
import Worship from "../page/Worship/Worship";
import Header from "../components/Header/Header";
import Notice from "../page/Notice/Notice";
import Search from "../page/Search/Search";
import WorshipDetail from "../page/Worship/WorshipDetail";
import WorshipCreate from "../page/Worship/WorshipCreate";
import BlogDetail from "../page/Blog/BlogDetail";
import UserWorks from "../page/User/UserWorks";
import UserApplications from "../page/User/UserApplications";
import UserLike from "../page/User/UserLike";
import NoticeDetail from "../page/Notice/NoticeDetail";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../state/Authrization";
import PrivateRoute from "./PrivateRoute";

import NoticeCreate from "../page/Notice/NoticeCreate";
import { notice, noticeModalControler } from "../state/notice.atom";
import { blog, blogModalControler } from "../state/blog.atom";
import { worship, worshipModalControler } from "../state/worship.atom";
import BlogCreate from "../page/Blog/BlogCreate";
import NoticeUpdate from "../page/Notice/NoticeUpdate";
import BlogUpdate from "../page/Blog/BlogUpdate";
import WorshipUpdate from "../page/Worship/WorshipUpdate";
import WorshipItem from "../page/Worship/WorshipDetailComponents/WorshipItem";

function Router() {
  const { login, userId } = useRecoilValue(loginState);
  const noticeItem = useRecoilValue(notice);
  const setNoticeModalState = useSetRecoilState(noticeModalControler);

  const blogItem = useRecoilValue(blog);
  const setBlogModalState = useSetRecoilState(blogModalControler);

  const weeklyItem = useRecoilValue(worship);
  const setWeeklyModalState = useSetRecoilState(worshipModalControler);
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/notice" element={<Notice />}>
        <Route
          path=":id"
          element={
            <NoticeDetail
              setDetailItem={setNoticeModalState}
              data={noticeItem}
            />
          }
        />
      </Route>
      <Route path="/worship" element={<Worship />}>
        <Route
          path=":id"
          element={
            <WorshipDetail
              setDetailItem={setWeeklyModalState}
              data={weeklyItem}
            />
          }
        />
      </Route>
      <Route path="/blog" element={<Blog />}>
        <Route
          path=":id"
          element={
            <BlogDetail setDetailItem={setBlogModalState} data={blogItem} />
          }
        />
      </Route>
      <Route path="/documents" element={<Documents />} />
      <Route element={<PrivateRoute />}>
        <Route path="/notice/create" element={<NoticeCreate />} />
        <Route
          path="/notice/:id/update"
          element={<NoticeUpdate data={noticeItem} />}
        />
        <Route path="/worship/create" element={<WorshipCreate />} />
        <Route
          path="/worship/:id/update"
          element={<WorshipUpdate data={weeklyItem} />}
        />
        <Route path="/blog/create" element={<BlogCreate />} />
        <Route
          path="/blog/:id/update"
          element={<BlogUpdate data={blogItem} />}
        />
      </Route>
      {/* <Route path="/documents/rule" element={<WorshipDetail />} />
        <Route path="/documents/rule/:id" element={<WorshipDetail />} />
        <Route path="/documents/menual" element={<WorshipDetail />} />
        <Route path="/documents/menual/:id" element={<WorshipDetail />} />
        <Route path="/documents/applications" element={<WorshipDetail />} />
        <Route path="/documents/applications/:id" element={<WorshipDetail />} />
        <Route path="/documents/account" element={<WorshipDetail />} />
        <Route path="/documents/account/:id" element={<WorshipDetail />} /> */}
      <Route path="/search" element={<Search />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="/user/:id/works" element={<UserWorks />} />
      <Route path="/user/:id/applications" element={<UserApplications />} />
      <Route path="/user/:id/like" element={<UserLike />} />
      {login ? (
        <Route path="/logout" element={<Logout />} />
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/join" element={<Join />} /> */}
        </>
      )}
      <Route
        path="*"
        element={<p>보여줄게 아무것도 없네요. URL을 다 입력해보세요.</p>}
      />
    </Routes>
  );
}

export default Router;
