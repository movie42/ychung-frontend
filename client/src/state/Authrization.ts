import { atom } from "recoil";

export interface LoginProps {
  isLogin?: boolean;
  _id: string;
  authority: string;
  email: string;
}

const defaultValue = {
  isLogin: false,
  _id: "",
  authority: "",
  email: "",
};

export const loginState = atom<LoginProps>({
  key: "loginState",
  default: defaultValue,
});
