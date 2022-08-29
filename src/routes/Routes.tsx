import { Route, Routes, useLocation, useParams } from "react-router-dom";
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

import {
  Documents,
  Rules,
  RulesDetail,
  Menuel,
  MenuelDetail,
  Account,
  AccountDetail,
  Application,
  ApplicationDetail,
} from "@/page/Document";

import { Search } from "@/page/Search";

import {
  loginState,
  notice,
  noticeModalControler,
  blog,
  blogModalControler,
  worshipDetail,
  worshipModalControler,
} from "@/lib/state";

import ProtectRouter from "./ProtectRouter";
import { PageNotFound } from "@/page/Errors";
import TokenValidationCheckRouter from "./TokenValidationCheckRouter";
import { MainLayout } from "@/components";

function Router() {
  const location = useLocation();
  const { userId } = useParams();

  const { isLogin, authority, _id } = useRecoilValue(loginState);
  const noticeItem = useRecoilValue(notice);
  const setNoticeModalState = useSetRecoilState(noticeModalControler);
  const blogItem = useRecoilValue(blog);
  const setBlogModalState = useSetRecoilState(blogModalControler);
  const weeklyItem = useRecoilValue(worshipDetail);
  const setWeeklyModalState = useSetRecoilState(worshipModalControler);
  return (
    <Routes location={location} key={location.key}>
      <Route
        element={<ProtectRouter isAllow={isLogin} redirectPath="/login" />}>
        <Route path="/logout" element={<Logout />} />
      </Route>
      <Route path="/" element={<MainLayout />}>
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
        <Route
          path="/education/groups/:id"
          element={<EducationGroupsDetail />}
        />
        <Route path="/search" element={<Search />} />

        <Route
          element={
            <ProtectRouter
              isAllow={isLogin && authority < 3}
              redirectPath="/"
            />
          }>
          <Route element={<TokenValidationCheckRouter />}>
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
          </Route>
        </Route>
        <Route
          element={
            <ProtectRouter
              isAllow={isLogin && _id === userId}
              redirectPath="/"
            />
          }>
          <Route path="/user/:userId" element={<User />} />
          <Route path="/user/:userId/works" element={<UserWorks />} />
          <Route
            path="/user/:userId/applications"
            element={<UserApplications />}
          />
          <Route path="/user/:userId/like" element={<UserLike />} />
        </Route>

        <Route element={<ProtectRouter isAllow={!isLogin} redirectPath="/" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default Router;
