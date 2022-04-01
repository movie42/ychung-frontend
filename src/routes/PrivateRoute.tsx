import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../Authrization";
import Login from "../components/Login";

interface IPrivatRouteProps {
  children?: JSX.Element;
}

const PrivateRoute = ({ children }: IPrivatRouteProps) => {
  const { login, userId } = useRecoilValue(loginState);

  if (!login) {
    return <Login />;
  }

  //   if (userId !== "hi") {
  //     return <p>권한이 없습니다.</p>;
  //   }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
