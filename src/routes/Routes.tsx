import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
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

function Router() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/notice/:id" element={<NoticeDetail />} />
        <Route path="/worship" element={<Worship />} />
        <Route path="/worship/create" element={<WorshipCreate />} />
        <Route path="/worship/:id" element={<WorshipDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/documents" element={<Documents />} />
        {/* <Route path="/documents/rule" element={<WorshipDetail />} />
        <Route path="/documents/rule/:id" element={<WorshipDetail />} />
        <Route path="/documents/menual" element={<WorshipDetail />} />
        <Route path="/documents/menual/:id" element={<WorshipDetail />} />
        <Route path="/documents/applications" element={<WorshipDetail />} />
        <Route path="/documents/applications/:id" element={<WorshipDetail />} />
        <Route path="/documents/account" element={<WorshipDetail />} />
        <Route path="/documents/account/:id" element={<WorshipDetail />} /> */}
        <Route path="/user/:id" element={<User />} />
        <Route path="/user/:id/works" element={<UserWorks />} />
        <Route path="/user/:id/applications" element={<UserApplications />} />
        <Route path="/user/:id/like" element={<UserLike />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </>
  );
}

export default Router;
