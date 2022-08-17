export interface EducationCreateData {
  _id: string;
  title: string;
  isPublic: boolean;
  groups: [];
  createdAt: Date;
}

export interface EducationGetData extends EducationCreateData {}

export interface EducationCreateVariable {
  title: "소그룹1";
  isPublic: false;
  groups: [];
}

export interface EducationPeopleVariable {
  id: string;
}

export interface GetGroupsQueyKey {
  queryKey: string[];
}

export interface EducationGroupData {
  _id: string;
  name: string;
  place?: string;
  type: "student" | "worker" | "new" | "etc";
  humanIds: string[];
}

export interface EducationPeopleData {
  _id: string;
  isLeader: boolean;
  name: string;
  type: "student" | "worker" | "new" | "etc";
  sex: "male" | "female";
  createdAt?: Date;
  __v?: number;
}
