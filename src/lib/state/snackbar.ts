import { atom } from "recoil";

export interface SnackBarItemProps {
  id: string;
  type: "success" | "warning" | "caution";
  message: string;
}

export const snackbarState = atom<SnackBarItemProps[]>({
  key: "snackbarState",
  default: <SnackBarItemProps[]>[],
});
