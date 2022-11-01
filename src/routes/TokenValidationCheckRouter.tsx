import { useTokenValidate } from "@/lib/hooks";
import { ReactElement } from "react";
import { Outlet } from "react-router";

interface ITokenValidationCheckRouterProps {
  children?: ReactElement;
}

const TokenValidationCheckRouter = ({
  children
}: ITokenValidationCheckRouterProps) => {
  useTokenValidate();
  return children ? children : <Outlet />;
};

export default TokenValidationCheckRouter;
