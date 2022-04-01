import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useResetRecoilState } from "recoil";
import { loginState } from "../Authrization";
import { useFetch } from "../customhooks/useFectch";
import Main from "./Main";

const Logout = () => {
  const removeLoginState = useResetRecoilState(loginState);
  const navigate = useNavigate();
  const [{ response, error, isLoading }, setOptions] = useFetch({
    URL: "http://localhost:4000/logout",
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
