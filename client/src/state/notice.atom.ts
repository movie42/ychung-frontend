import { atom } from "recoil";

export const notice = atom({
  key: "notice",
  default: {},
});

export const noticeModalControler = atom({
  key: "noticeModal",
  default: false,
});
