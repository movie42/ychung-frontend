import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useResetRecoilState } from "recoil";
import { loginState } from "../../state/Authrization";
import { useFetch } from "../../utils/customhooks/useFetch";

const Logout = () => {
  const removeLoginState = useResetRecoilState(loginState);
  const navigate = useNavigate();
  const [{ response, error, isLoading }, setOptions] = useFetch({
    URL: `/api/logout`,
  });

  useEffect(() => {
    setOptions({
      method: "GET",
      credentials: "include",
      mode: "cors",
    });

    if (response?.logout) {
      localStorage.removeItem("user");
      removeLoginState();
      navigate("/");
    }

    return () => setOptions();
  }, [response]);

  return null;
};

export default Logout;
