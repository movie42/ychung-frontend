import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { PageNotFound } from "@/Pages/Errors";
import {
  MainRouter,
  NoticeRouter,
  WorshipRouter,
  BlogRouter,
  EducationRouter,
  DocumentRouter,
  UserRouter
} from "@/Routes";
import { loginState } from "@/lib/state";
import { MainLayout } from "@/Components";

function Routers() {
  const { isLogin, authority, _id } = useRecoilValue(loginState);

  return (
    <Routes>
      <Route
        path="/*"
        element={<MainRouter isLogin={isLogin} />}
      />
      <Route element={<MainLayout />}>
        <Route
          path="/notice/*"
          element={
            <NoticeRouter
              isLogin={isLogin}
              authority={authority}
            />
          }
        />
        <Route
          path="/worship/*"
          element={
            <WorshipRouter
              isLogin={isLogin}
              authority={authority}
            />
          }
        />
        <Route
          path="/blog/*"
          element={
            <BlogRouter
              isLogin={isLogin}
              authority={authority}
            />
          }
        />
        <Route
          path="/education/*"
          element={
            <EducationRouter
              isLogin={isLogin}
              authority={authority}
            />
          }
        />
        <Route
          path="/document/*"
          element={<DocumentRouter />}
        />
        <Route
          path="/user/*"
          element={
            <UserRouter
              isLogin={isLogin}
              authority={authority}
              id={_id}
            />
          }
        />
      </Route>
      <Route
        path="*"
        element={<PageNotFound />}
      />
    </Routes>
  );
}

export default Routers;
