import { atom } from "recoil";
import { IWorshipItems } from "../page/Worship/Worship";

export const worship = atom<IWorshipItems>({
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
