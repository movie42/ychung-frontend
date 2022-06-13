import { Group } from "../../state/educationGroup.atom";

export const compare = (a: Group, b: Group): number => {
  if (a.id > b.id) {
    return 1;
  }

  if (a.id < b.id) {
    return -1;
  }

  return 0;
};
