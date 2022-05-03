import { EducationGroupData } from "../../state/educationGroup.atom";

export const compare = (
  a: EducationGroupData,
  b: EducationGroupData
): number => {
  if (a.id > b.id) {
    return 1;
  }

  if (a.id < b.id) {
    return -1;
  }

  return 0;
};
