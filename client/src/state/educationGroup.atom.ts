import { atom } from "recoil";

export interface People {
  id: string;
  name: string;
  groupIds: string[];
  type: "student" | "worker" | "new" | "etc";
}

export interface EducationGroupData {
  id: string;
  name: string;
  type: "student" | "worker" | "new" | "etc";
  humanIds: string[];
}

export interface EducationGroupsData {
  id: string;
  title: string;
  isPublic: boolean;
  groups: string[];
}

export const peopleState = atom<People[]>({
  key: "people",
  default: [],
});

export const educationGroup = atom<EducationGroupData[]>({
  key: "educationGroup",
  default: [],
});

export const educationGroups = atom<EducationGroupsData>({
  key: "educationGroups",
  default: <EducationGroupsData>{},
});
