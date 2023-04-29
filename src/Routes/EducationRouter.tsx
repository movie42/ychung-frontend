import { MainLayout } from "@/Components";
import {
  EducationGroupsDetail,
  Educations,
  EducationsUpdate,
  ReportsContainer
} from "@/Pages/Educations";
import EducationCreate from "@/Pages/Educations/CreateGroup/EducationCreate";
import { Route, Routes } from "react-router";
import ProtectRouter from "./ProtectRouter";

interface IEducationRouterProps {
  isLogin: boolean;
  authority: number;
}

const EducationRouter = ({ isLogin, authority }: IEducationRouterProps) => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path=""
          element={<Educations />}
        />
      </Route>
      <Route path="groups">
        <Route
          path=":educationId"
          element={<EducationGroupsDetail />}
        />
        <Route
          element={
            <ProtectRouter
              isAllow={isLogin && authority < 3}
              redirectPath="/education"
            />
          }
        >
          <Route
            path="create"
            element={<EducationCreate />}
          />
          <Route
            path=":educationId/update"
            element={<EducationsUpdate />}
          />
        </Route>
        <Route
          path="report"
          element={<ReportsContainer />}
        />
      </Route>
    </Routes>
  );
};

export default EducationRouter;
