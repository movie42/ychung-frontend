import { useEffect, useState } from "react";

export const useFetch = <T>(initialValue: string) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(initialValue, { method: "GET" });
        if (response.ok) {
          const { data } = await response.json();
          setData(data);
        }
      } catch (e) {
        console.log(e);
        throw new Error("서버에서 요청을 거부했습니다.");
      }
    };

    fetchData();
  }, []);

  return data;
};
