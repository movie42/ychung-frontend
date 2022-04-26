import { useState } from "react";

export const useFetchToken = () => {
  const [csrfToken, setCsrfToken] = useState<string>("");

  const csrf = async () => {
    const response = await fetch(`/api/csrf-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    });

    const result = await response.json();
    setCsrfToken(result.CSRFToken);
  };

  return { csrfToken, csrf };
};
