import { MAX_DEADLINE } from '@constants/post';

import { addTimeToDate } from './post/formatTime';

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

type TimeType = 'day' | 'hour' | 'minute';

//시간 수정을 할 수 없다면 true
export const checkIrreplaceableTime = (addTime: Record<TimeType, number>, createTime: string) => {
  const transCreateTime = createTime.split('-').join('/');
  const changedDeadline = addTimeToDate(addTime, new Date(transCreateTime));

  //마감시한이 0시간 0분 0초 추가된다면 거절
  if (Object.values(addTime).every(time => time === 0)) return true;

  const limitDeadline = addTimeToDate(
    { day: MAX_DEADLINE, hour: 0, minute: 0 },
    new Date(transCreateTime)
  )!;
  const changedDeadlineNumber = convertTimeFromStringToNumber(changedDeadline);
  const limitDeadlineNumber = convertTimeFromStringToNumber(limitDeadline);

  //작성일시로부터 마감시간 최대일시보다 지정하고자 하는 일시가 크다면 거절
  if (changedDeadlineNumber > limitDeadlineNumber) return true;

  //지금 일시보다 지정하고자 하는 일시가 작다면 거절
  return changedDeadlineNumber <= convertNowTimeToNumber();
};

const time = {
  hour: 24,
  minute: 60,
};

export const convertTimeToWord = (date: string, currentDate: Date = new Date()) => {
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
