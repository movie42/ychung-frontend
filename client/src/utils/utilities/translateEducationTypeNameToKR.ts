export const translateEducationTypeNameToKR = (type: string) => {
  if (type === "student") {
    return "학생";
  }
  if (type === "new") {
    return "새신자";
  }
  if (type === "worker") {
    return "직장";
  }
  return "기타";
};
