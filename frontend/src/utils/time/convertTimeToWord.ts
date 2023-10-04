import { StringDate } from '@type/time';

const time = {
  hour: 24,
  minute: 60,
};

export const convertTimeToWord = (date: StringDate, currentDate: Date = new Date()) => {
  const targetDate = new Date(date.split('-').join('/'));

  //분 단위로 산출됨
  const timeDifference = Math.floor((targetDate.getTime() - currentDate.getTime()) / 60000);

  if (timeDifference === 0) return '지금';

  const afterBefore = timeDifference > 0 ? '후 마감' : '전 작성';

  const positiveTimeDifference = Math.abs(timeDifference);

  if (Math.round(positiveTimeDifference / (time.hour * time.minute)) > 0) {
    const day = Math.round(positiveTimeDifference / (time.hour * time.minute));
    return day >= 30 ? `${date.split(' ')[0]}` : `${day}일 ${afterBefore}`;
  }

  if (Math.round(positiveTimeDifference / (time.hour * time.minute)) > 0)
    return `${Math.round(positiveTimeDifference / (time.hour * time.minute))}일 ${afterBefore}`;

  if (Math.round(positiveTimeDifference / time.minute) > 0)
    return `${Math.round(positiveTimeDifference / time.minute)}시간 ${afterBefore}`;

  return `${positiveTimeDifference}분 ${afterBefore}`;
};
