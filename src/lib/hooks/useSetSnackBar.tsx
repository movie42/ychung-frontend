import React from "react";
import { useSetRecoilState } from "recoil";
import { snackbarState } from "../state";

interface SnackBarProps {
  message: string;
  type: "success" | "warning" | "caution";
}

const useSetSnackBar = () => {
  const setSnackbar = useSetRecoilState(snackbarState);

  const handleAddSnackBar = ({ message, type }: SnackBarProps) => {
    const id = Date.now().toString();
    setSnackbar((pre) => [
      ...pre,
      {
        id,
        message,
        type,
      },
    ]);
  };

  return { handleAddSnackBar };
};

export default useSetSnackBar;
