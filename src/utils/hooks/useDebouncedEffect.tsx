import { useCallback, useEffect } from "react";

export const useDebouncedEffect = (func: any, delay: number, deps: any) => {
  const callback = useCallback(func, deps);

  useEffect(() => {
    const timer = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [callback, delay]);
};
