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

type timeType = 'day' | 'hour' | 'minute';

//시간 수정을 할 수 없다면 true
export const checkIrreplaceableTime = (addTime: Record<timeType, number>, createTime: string) => {
  const changedDeadline = addTimeToDate(addTime, new Date(createTime));
  // changedDeadline가 undefined인 경우는 작성일시에서 시간이 더해지지 않았을 경우라 거절
  if (!changedDeadline) return true;

  const limitDeadline = addTimeToDate({ day: 3, hour: 0, minute: 0 }, new Date(createTime))!;
  const changedDeadlineNumber = convertTimeFromStringToNumber(changedDeadline);
  const limitDeadlineNumber = convertTimeFromStringToNumber(limitDeadline);

  //작성일시로부터 3일된 일시보다 지정하고자 하는 일시가 크다면 거절
  if (changedDeadlineNumber >= limitDeadlineNumber) return true;

  //지금 일시보다 지정하고자 하는 일시가 작다면 거절
  return changedDeadlineNumber <= convertNowTimeToNumber();
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
