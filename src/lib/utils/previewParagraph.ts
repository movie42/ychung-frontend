export default (item: string) => {
  const newPreview = item
    .replace(/!\[(.*)\]|[#*\\[\]``]|<(.*)>|\((.*)\)/g, " ")
    .replace(/\s+/g, " ");
  return newPreview.length < 100
    ? newPreview
    : `${newPreview.slice(0, 100)}...`;
};
