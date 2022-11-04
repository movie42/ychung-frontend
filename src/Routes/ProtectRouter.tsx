import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IPrivatRouteProps {
  isAllow: boolean;
  redirectPath: string;
  children?: ReactElement;
}

const ProtectRouter = ({
  isAllow,
  redirectPath,
  children
}: IPrivatRouteProps) => {
  if (!isAllow) {
    return <Navigate to={redirectPath} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectRouter;
