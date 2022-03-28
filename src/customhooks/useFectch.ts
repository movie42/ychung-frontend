import { useEffect, useState } from "react";

export interface IAipResponse {
  data: any;
  loading: boolean;
  error: boolean;
}

export const useFetch = (initialValue: string): IAipResponse => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>();

  const fetchData = async () => {
    try {
      const response = await fetch(initialValue, { method: "GET" });
      if (response.ok) {
        const { data } = await response.json();
        setData(data);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { error, loading, data };
};
