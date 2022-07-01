import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../state/Authrization";
import Login from "../page/Root/Login";

interface IPrivatRouteProps {
  children?: ReactNode;
}

const PrivateRoute = ({ children }: IPrivatRouteProps) => {
  const { isLogin } = useRecoilValue(loginState);

  if (!isLogin) {
    return <Login />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
