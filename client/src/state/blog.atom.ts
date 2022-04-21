import { atom } from "recoil";

export const blog = atom({
  key: "blog",
  default: {},
});

export const blogModalControler = atom({
  key: "blogModal",
  default: false,
});
