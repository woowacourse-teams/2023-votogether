import { DHMTime } from '@type/time';

export const getDeadlineMessage = ({ day, hour, minute }: DHMTime) => {
  const timeMessage = [];

  if (day < 0 || hour < 0 || minute < 0) {
    return '마감 시간을 다시 설정해주세요';
  }

  if (day === 0 && hour === 0 && minute === 0) {
    return '마감 시간을 선택해주세요';
  }

  if (day > 0) {
    timeMessage.push(`${day}일`);
  }

  if (hour > 0) {
    timeMessage.push(`${hour}시간`);
  }

  if (minute > 0) {
    timeMessage.push(`${minute}분`);
  }

  return `${timeMessage.join(' ')} 후에 마감됩니다.`;
};
