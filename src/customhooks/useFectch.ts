import React, { useCallback, useEffect, useState } from "react";

interface IFetchProps {
  URL: RequestInfo;
  initState?: RequestInit;
}

export interface IUseFetchReturnValue {
  response: any;
  error: { message: string } | null;
  isLoading: boolean;
  csrfToken: string;
}

export const useFetch = ({
  URL,
}: IFetchProps): [IUseFetchReturnValue, Function] => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [option, setOption] = useState({});
  const [csrfToken, setCsrfToken] = useState("");

  const handleOption = useCallback((options: RequestInit) => {
    setOption(options);
    setIsLoading(true);
  }, []);

  const setFetch = async ({ URL, initState }: IFetchProps) => {
    try {
      const response = await fetch(URL, initState);

      if (response.ok) {
        const { data } = await response.json();
        setResponse(data);
        setError(null);
        setIsLoading(false);
      }

      if (!response.ok) {
        const { message } = await response.json();
        setError({ message });
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError({ message: "서버에서 요청을 거부했습니다." });
      setIsLoading(false);
    }
  };

  const csrf = async () => {
    const response = await fetch("http://localhost:4000/getCSRFToken", {
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

  useEffect(() => {
    csrf();
    if (!isLoading) return;

    setFetch({ URL, initState: option });
  }, [isLoading, URL, option]);

  return [{ response, error, isLoading, csrfToken }, handleOption];
};
