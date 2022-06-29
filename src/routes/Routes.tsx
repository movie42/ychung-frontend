import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Blog from "../page/Blog/Bolg";
import Documents from "../page/Document/Documents";
import Join from "../page/Root/Join";
import Login from "../page/Root/Login";
import Logout from "../page/Root/Logout";
import Main from "../page/Root/Main";
import User from "../page/User/User";
import Worship from "../page/Worship/Worship";
import Notice from "../page/Notice/Notice";
import Search from "../page/Search/Search";
import WorshipDetail from "../page/Worship/WorshipDetail";
import WorshipCreate from "../page/Worship/WorshipCreate";
import BlogDetail from "../page/Blog/BlogDetail";
import UserWorks from "../page/User/UserWorks";
import UserApplications from "../page/User/UserApplications";
import UserLike from "../page/User/UserLike";
import NoticeDetail from "../page/Notice/NoticeDetail";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../state/Authrization";
import PrivateRoute from "./PrivateRoute";

import NoticeCreate from "../page/Notice/NoticeCreate";
import { notice, noticeModalControler } from "../state/notice.atom";
import { blog, blogModalControler } from "../state/blog.atom";
import { worshipDetail, worshipModalControler } from "../state/worship.atom";
import BlogCreate from "../page/Blog/BlogCreate";
import NoticeUpdate from "../page/Notice/NoticeUpdate";
import BlogUpdate from "../page/Blog/BlogUpdate";
import WorshipUpdate from "../page/Worship/WorshipUpdate";

import Rules from "../page/Document/Rules/Rules";
import RulesDetail from "../page/Document/Rules/RulesDetail";
import Menuel from "../page/Document/Menuel/Menuel";
import MenuelDetail from "../page/Document/Menuel/MenuelDetail";
import Account from "../page/Document/Account/Account";
import AccountDetail from "../page/Document/Account/AccountDetail";
import Application from "../page/Document/Application/Application";
import ApplicationDetail from "../page/Document/Application/ApplicationDetail";
import Educations from "../page/Educations/Educations";
import EducationsUpdate from "../page/Educations/UpdateGroup/EducationsUpdate";
import EducationCreate from "../page/Educations/CreateGroup/EducationCreate";
import EducationGroupsDetail from "../page/Educations/Detail/EducationGroupsDetail";
import { AnimatePresence } from "framer-motion";

function Router() {
  const location = useLocation();
  const { isLogin } = useRecoilValue(loginState);
  const noticeItem = useRecoilValue(notice);
  const setNoticeModalState = useSetRecoilState(noticeModalControler);

  const blogItem = useRecoilValue(blog);
  const setBlogModalState = useSetRecoilState(blogModalControler);

  const weeklyItem = useRecoilValue(worshipDetail);
  const setWeeklyModalState = useSetRecoilState(worshipModalControler);
  return (
    <Routes location={location} key={location.key}>
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
      <Route path="/education" element={<Educations />} />
      <Route path="/documents" element={<Documents />}>
        <Route path="rule" element={<Rules />}>
          <Route path=":id" element={<RulesDetail />} />
        </Route>
        <Route path="menual" element={<Menuel />}>
          <Route path=":id" element={<MenuelDetail />} />
        </Route>
        <Route path="applications" element={<Application />}>
          <Route path=":id" element={<ApplicationDetail />} />
        </Route>
        <Route path="account" element={<Account />}>
          <Route path=":id" element={<AccountDetail />} />
        </Route>
      </Route>
      <Route path="/education/groups/:id" element={<EducationGroupsDetail />} />
      <Route element={<PrivateRoute />}>
        <Route path="/education/groups/create" element={<EducationCreate />} />
        <Route
          path="/education/groups/:id/update"
          element={<EducationsUpdate />}
        />
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
        <Route path="/user/:id" element={<User />} />
        <Route path="/user/:id/works" element={<UserWorks />} />
        <Route path="/user/:id/applications" element={<UserApplications />} />
        <Route path="/user/:id/like" element={<UserLike />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
      <Route path="/search" element={<Search />} />

      <Route path="/login" element={<Login />} />
      {/* <Route path="/join" element={<Join />} /> */}

      <Route
        path="*"
        element={<p>보여줄게 아무것도 없네요. URL을 다시 입력해보세요.</p>}
      />
    </Routes>
  );
}

export default Router;
