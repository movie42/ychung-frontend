import { atom } from "recoil";

export interface People {
  id: string;
  name: string;
  groupIds: string[];
  type: "student" | "worker" | "new" | "etc";
}

export interface Group {
  id: string;
  name: string;
  type: "student" | "worker" | "new" | "etc";
  humanIds: string[];
}

export interface GroupInfo {
  id: string;
  title: string;
  isPublic: boolean;
  groups: string[];
}

export const peopleState = atom<People[]>({
  key: "people",
  default: [],
});

export const groupState = atom<Group[]>({
  key: "educationGroup",
  default: [],
});

export const groupInfoState = atom<GroupInfo>({
  key: "educationGroups",
  default: <GroupInfo>{},
});
