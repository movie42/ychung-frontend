import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../state/Authrization";
import Login from "../page/Root/Login";

interface IPrivatRouteProps {
  children?: JSX.Element;
}

const PrivateRoute = ({ children }: IPrivatRouteProps) => {
  const { login, userId } = useRecoilValue(loginState);

  if (!login) {
    return <Login />;
  }
  return children ? children : <Outlet />;
};

export default PrivateRoute;
