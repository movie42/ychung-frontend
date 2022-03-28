import React, { useEffect, useState } from "react";
import { useFetch } from "../customhooks/useFectch";

const CSRFToken = () => {
  const [csrfToken, setCsrfToken] = useState("");

  const csrf = async () => {
    const response = await fetch("http://localhost:4000/getCSRFToken", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });
    const parseResponse = await response.json();

    setCsrfToken(parseResponse.CSRFToken);
  };

  useEffect(() => {
    csrf();
  }, []);

  return <div>{csrfToken}</div>;
};

export default CSRFToken;
