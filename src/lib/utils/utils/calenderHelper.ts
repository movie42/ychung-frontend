export default () => {
  const current = new Date();
  current.setDate(current.getDate());
  let date = current.toISOString().substring(0, 10);
  return date;
};
