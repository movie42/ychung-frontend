import { atom } from "recoil";

export interface People {
  _id: string;
  isLeader: boolean;
  name: string;
  type: "student" | "worker" | "new" | "etc";
  sex: "male" | "female";
  createdAt?: Date;
  __v?: number;
}

export interface Group {
  _id: string;
  name: string;
  place?: string;
  type: "student" | "worker" | "new" | "etc";
  humanIds: string[];
}

export interface GroupInfo {
  _id: string;
  title: string;
  isPublic: boolean;
  groups: string[];
}

export const countState = atom({
  key: "count",
  default: 0,
});

export const poepleState = atom<People[]>({
  key: "people",
  default: [],
});

export const groupsState = atom<Group[]>({
  key: "educationGroup",
  default: [],
});

export const groupInfoState = atom<GroupInfo>({
  key: "educationGroups",
  default: { _id: "", title: "", isPublic: false, groups: [] },
});
