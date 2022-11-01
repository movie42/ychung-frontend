import { Join, Login, Logout, Main } from "@/page/Root";
import { Route, Routes } from "react-router-dom";
import { ProtectRouter } from "@/routes";
import { PageNotFound } from "@/page/Errors";
import { MainLayout } from "@/components";

interface IMainRouterProps {
  isLogin: boolean;
}

const MainRouter = ({ isLogin }: IMainRouterProps) => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Main />} />
        <Route element={<ProtectRouter isAllow={!isLogin} redirectPath="/" />}>
          <Route path="login" element={<Login />} />
          <Route path="join" element={<Join />} />
        </Route>
      </Route>
      <Route element={<ProtectRouter isAllow={isLogin} redirectPath="login" />}>
        <Route path="logout" element={<Logout />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default MainRouter;
