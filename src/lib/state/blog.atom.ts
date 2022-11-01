import { atom } from "recoil";

export interface IBlogItems {
  _id: string;
  title: string;
  paragraph: string;
  creator: {
    _id: string;
    name: string;
    userName: string;
  };
  comments: [];
  views: number;
  createdAt: string;
}

export const blog = atom<IBlogItems>({
  key: "blog",
  default: {
    _id: "",
    title: "",
    paragraph: "",
    creator: {
      _id: "",
      name: "",
      userName: ""
    },
    comments: [],
    views: 0,
    createdAt: ""
  }
});

export const blogModalControler = atom({
  key: "blogModal",
  default: false
});
