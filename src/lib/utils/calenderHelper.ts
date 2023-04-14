export default () => {
  const current = new Date();
  current.setDate(current.getDate());
  const date = current.toISOString().substring(0, 10);
  return date;
};
