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

export interface GetGroupsQueyKey {
  queryKey: string[];
}

export interface EducationGroupBody {
  _id: string;
  name?: string;
  place?: string;
  type?: "student" | "worker" | "new" | "etc";
}

export interface EducationGroupVariable {
  body: EducationGroupBody;
}

export interface EducationGroupData {
  _id: string;
  name: string;
  place?: string;
  type: "student" | "worker" | "new" | "etc";
  humanIds: string[];
}

export interface EducatioCreateGroupVariable {
  id: string;
  body: EducationGroupBody;
}

export interface EducationGroupInfoData {
  _id: string;
  title: string;
  isPublic: boolean;
  groups: string[];
}

export interface EducationGroupInfoBody {
  _id?: string;
  title?: string;
  isPublic?: boolean;
  groups?: string[];
}

export interface EducationGroupInfoVariable {
  id: string;
  body: EducationGroupInfoBody;
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

export interface EducationPeopleVariable {
  id: string;
}

export interface EducationPersonData {
  _id: string;
  isLeader: boolean;
  name: string;
  type: "student" | "worker" | "new" | "etc";
  sex: "male" | "female";
  createdAt?: Date;
  __v?: number;
}

export interface EducationPersonBody {
  _id?: string;
  isLeader?: boolean;
  name?: string;
  type?: "student" | "worker" | "new" | "etc";
  sex?: "male" | "female";
}

export interface EducationPersonVariable {
  id: string;
  body: EducationPersonBody;
}
