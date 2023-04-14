import { atom } from "recoil";

export interface LoginProps {
  isLogin: boolean;
  _id: string;
  authority: number;
  email: string;
}

const defaultValue = {
  isLogin: false,
  _id: "",
  authority: 20,
  email: ""
};

export const loginState = atom<LoginProps>({
  key: "loginState",
  default: defaultValue
});
