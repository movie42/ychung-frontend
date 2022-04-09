import React from "react";
import { Route, Routes } from "react-router-dom";
import Blog from "../components/Blog/Bolg";
import Documents from "../components/Document/Documents";
import Join from "../components/Join";
import Login from "../components/Login";
import Main from "../components/Main";
import User from "../components/User/User";
import Worship from "../components/Worship/Worship";
import Header from "../components/Header/Header";
import Notice from "../components/Notice/Notice";
import Search from "../components/Search/Search";
import WorshipDetail from "../components/Worship/WorshipDetail/WorshipDetail";
import WorshipCreate from "../components/Worship/WorshipCreate";
import BlogDetail from "../components/Blog/BlogDetail";
import UserWorks from "../components/User/UserWorks";
import UserApplications from "../components/User/UserApplications";
import UserLike from "../components/User/UserLike";
import NoticeDetail from "../components/Notice/NoticeDetail";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "../Authrization";
import PrivateRoute from "./PrivateRoute";
import Logout from "../components/Logout";
import NoticeCreate from "../components/Notice/NoticeCreate";
import { notice, noticeModalControler } from "../state/notice.atom";
import { blog, blogModalControler } from "../state/blog.atom";

function Router() {
  const { login, userId } = useRecoilValue(loginState);
  const noticeItem = useRecoilValue(notice);
  const [noticeModalState, setNoticeModalState] =
    useRecoilState(noticeModalControler);

  const blogItem = useRecoilValue(blog);
  const [blogModalState, setBlogModalState] =
    useRecoilState(blogModalControler);

  return (
    <>
      <Header />
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
        <Route path="/notice/create" element={<NoticeCreate />} />
        <Route path="/worship" element={<Worship />} />
        <Route path="/worship/:id" element={<WorshipDetail />} />
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
          <Route path="/worship/create" element={<WorshipCreate />} />
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
            <Route path="/join" element={<Join />} />
          </>
        )}
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
}

export default Router;
