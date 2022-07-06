import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { Blog, BlogCreate, BlogUpdate, BlogDetail } from "@/page/Blog";
import {
  Educations,
  EducationsUpdate,
  CreateEducation as EducationCreate,
  EducationGroupsDetail,
  ReportsContainer,
} from "@/page/Educations";
import { Join, Login, Logout, Main } from "@/page/Root";
import { User, UserWorks, UserApplications, UserLike } from "@/page/User";
import {
  Worship,
  WorshipDetail,
  WorshipCreate,
  WorshipUpdate,
} from "@/page/Worship";
import {
  Notice,
  NoticeDetail,
  NoticeCreate,
  NoticeUpdate,
} from "@/page/Notice";

import Search from "../page/Search/Search";
import PrivateRoute from "./PrivateRoute";

import { notice, noticeModalControler } from "../state/notice.atom";
import { blog, blogModalControler } from "../state/blog.atom";
import { worshipDetail, worshipModalControler } from "../state/worship.atom";

import Documents from "../page/Document/Documents";
import Rules from "../page/Document/Rules/Rules";
import RulesDetail from "../page/Document/Rules/RulesDetail";
import Menuel from "../page/Document/Menuel/Menuel";
import MenuelDetail from "../page/Document/Menuel/MenuelDetail";
import Account from "../page/Document/Account/Account";
import AccountDetail from "../page/Document/Account/AccountDetail";
import Application from "../page/Document/Application/Application";
import ApplicationDetail from "../page/Document/Application/ApplicationDetail";

function Router() {
  const location = useLocation();
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
        <Route path="/education">
          <Route path="groups/create" element={<EducationCreate />} />
          <Route path="groups/:id/update" element={<EducationsUpdate />} />
          <Route path="groups/report" element={<ReportsContainer />} />
        </Route>
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
      <Route path="/join" element={<Join />} />
      <Route
        path="*"
        element={<p>보여줄게 아무것도 없네요. URL을 다시 입력해보세요.</p>}
      />
    </Routes>
  );
}

export default Router;
