const convertNowTimeToNumber = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return Number(`${year}${month}${day}${hours}${minutes}`);
};

const convertTimeFromStringToNumber = (date: string) => {
  const dateComponents = date.split(' ');
  const datePieces = dateComponents[0].split('-');
  const timePieces = dateComponents[1].split(':');
  return Number([...datePieces, ...timePieces].join(''));
};

export const checkClosedPost = (deadline: string) => {
  const nowTimeNumber = convertNowTimeToNumber();
  const endTimeNumber = convertTimeFromStringToNumber(deadline);
  return nowTimeNumber >= endTimeNumber;
};

const time = {
  day: 3,
  hour: 24,
  minute: 60,
};

export const convertTimeToWord = (date: string) => {
  const targetDate = new Date(date);
  const currentDate = new Date();

  //분 단위로 산출됨
  const timeDifference = Math.floor((targetDate.getTime() - currentDate.getTime()) / 60000);

  if (timeDifference === 0) return '지금';

  const afterBefore = timeDifference > 0 ? '후 마감' : '전 작성 |';

  const positiveTimeDifference = Math.abs(timeDifference);

  if (Math.round(positiveTimeDifference / (time.hour * time.minute)) > 0)
    return `${Math.round(positiveTimeDifference / (time.hour * time.minute))}일 ${afterBefore}`;

  if (Math.round(positiveTimeDifference / time.minute) > 0)
    return `${Math.round(positiveTimeDifference / time.minute)}시간 ${afterBefore}`;

  return `${positiveTimeDifference}분 ${afterBefore}`;
};
