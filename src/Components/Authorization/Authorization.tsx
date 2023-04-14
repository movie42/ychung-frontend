import { loginState } from "@/lib/state";
import { ReactNode, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface IAuthorizationProps {
  authority: number;
  children: ReactNode;
}

const Authorization = ({ authority, children }: IAuthorizationProps) => {
  const [isAllow, setIsAllow] = useState(false);
  const { isLogin, authority: userAuthority } = useRecoilValue(loginState);

  useEffect(() => {
    if (userAuthority <= authority && isLogin) {
      setIsAllow(true);
      return;
    }
  }, [userAuthority, authority]);

  if (isAllow) {
    return <>{children}</>;
  }

  return null;
};

export default Authorization;
