import { atom } from "recoil";

export interface People {
  _id: string;
  name: string;
  type: "student" | "worker" | "new" | "etc";
}

export interface Group {
  _id: string;
  name: string;
  type: "student" | "worker" | "new" | "etc";
  humanIds: string[];
}

export interface GroupInfo {
  _id: string;
  title: string;
  isPublic: boolean;
  groups: string[];
}

export interface GroupAndPeople {
  _id: string;
  name: string;
  type: "student" | "worker" | "new" | "etc";
  humanIds: People[];
}

export const groupAndpeopleState = atom<GroupAndPeople[]>({
  key: "groupAndPeople",
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
