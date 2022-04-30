import { atom } from "recoil";

export interface People {
  id: string;
  name: string;
  groupId: string;
  type: "student" | "worker" | "new" | "etc";
}
export interface EducationGroupData {
  id: string;
  name: string;
  type: "student" | "worker" | "new" | "etc";
  humanIds: string[];
}

export const peopleState = atom<People[]>({
  key: "people",
  default: [],
});

export const educationGroup = atom<EducationGroupData[]>({
  key: "educationGroup",
  default: [],
});
