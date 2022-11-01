import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { PageNotFound } from "@/page/Errors";
import {
  MainRouter,
  NoticeRouter,
  WorshipRouter,
  BlogRouter,
  EducationRouter,
  DocumentRouter,
  UserRouter
} from "@/routes";
import { loginState } from "@/lib/state";
import { MainLayout } from "@/components";

function Routers() {
  const { isLogin, authority, _id } = useRecoilValue(loginState);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/*" element={<MainRouter isLogin={isLogin} />} />
        <Route
          path="/notice/*"
          element={<NoticeRouter isLogin={isLogin} authority={authority} />}
        />
        <Route
          path="/worship/*"
          element={<WorshipRouter isLogin={isLogin} authority={authority} />}
        />
        <Route
          path="/blog/*"
          element={<BlogRouter isLogin={isLogin} authority={authority} />}
        />
        <Route
          path="/education/*"
          element={<EducationRouter isLogin={isLogin} authority={authority} />}
        />
        <Route path="/document/*" element={<DocumentRouter />} />
        <Route
          path="/user/*"
          element={
            <UserRouter isLogin={isLogin} authority={authority} id={_id} />
          }
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Routers;
