export default (date: string) => {
  const createDate = new Date(date);

  const createDateToTime = new Date(date).getTime();
  const now = Date.now();
  const amountTimeFromNow = now - createDateToTime;
  const amountTimeForSeconds = amountTimeFromNow / 1000;

  const time = {
    minute: Math.floor((amountTimeForSeconds % 3600) / 60),
    hour: Math.floor(amountTimeForSeconds / 3600),
    day: Math.floor(amountTimeForSeconds / (3600 * 24)),
  };

  if (time.hour < 1) {
    return `${time.minute}분 전`;
  }

  if (time.day < 1) {
    return `${time.hour}시간 전`;
  }

  if (time.day > 1 && time.day <= 7) {
    return `${time.day}일 전`;
  }

  return `${createDate.getFullYear()}년 ${
    createDate.getMonth() + 1
  }월 ${createDate.getDate()}일`;
};
