import { atom } from "recoil";

export interface INoticeInterface {
  _id: string;
  title: string;
  startDate: string;
  endDate: string;
  summary: string;
  isWeekly: boolean;
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

export const notice = atom<INoticeInterface>({
  key: "notice",
  default: {
    _id: "",
    title: "",
    startDate: "",
    endDate: "",
    summary: "",
    isWeekly: false,
    paragraph: "",
    creator: {
      _id: "",
      name: "",
      userName: "",
    },
    comments: [],
    views: 0,
    createdAt: "",
  },
});

export const noticeModalControler = atom({
  key: "noticeModal",
  default: false,
});
