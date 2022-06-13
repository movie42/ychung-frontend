import { atom } from "recoil";

export interface IWorshipItems {
  _id: string;
  title: string;
  word: string;
  chapter: number;
  verse: number;
  verse_end: number;
  pastor: string;
  worshipTeam: string;
  prayer: string;
  advertisement: string;
  reader: string;
  offering: string;
  benediction: string;
  creator: {
    _id: string;
    userName: string;
  };
  views: number;
  createdAt: string;
}

export const worshipDetail = atom<IWorshipItems>({
  key: "worsiph",
  default: {
    _id: "",
    title: "",
    word: "",
    chapter: 0,
    verse: 0,
    verse_end: 0,
    pastor: "",
    worshipTeam: "",
    prayer: "",
    advertisement: "",
    reader: "",
    offering: "",
    benediction: "",
    creator: {
      _id: "",
      userName: "",
    },
    views: 0,
    createdAt: "",
  },
});

export const worshipModalControler = atom({
  key: "worshipModal",
  default: false,
});
