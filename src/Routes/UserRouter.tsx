import { User, UserApplications, UserLike, UserWorks } from "@/Pages/User";
import { Route, Routes, useParams } from "react-router";
import ProtectRouter from "./ProtectRouter";

interface IUserRouterProps {
  id: string;
  isLogin: boolean;
  authority: number;
}

const UserRouter = ({ isLogin, id }: IUserRouterProps) => {
  const { userId } = useParams();
  return (
    <Routes>
      <Route
        element={
          <ProtectRouter
            isAllow={isLogin && id === userId}
            redirectPath="/"
          />
        }
      >
        <Route
          path="/user/:userId"
          element={<User />}
        />
        <Route
          path="/user/:userId/works"
          element={<UserWorks />}
        />
        <Route
          path="/user/:userId/applications"
          element={<UserApplications />}
        />
        <Route
          path="/user/:userId/like"
          element={<UserLike />}
        />
      </Route>
    </Routes>
  );
};

export default UserRouter;
