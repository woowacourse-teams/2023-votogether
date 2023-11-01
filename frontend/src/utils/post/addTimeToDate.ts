import { DHMTime, StringDate } from '@type/time';

/**
 * @param addTime  : 사용자가 선택한 마감 시간 (EX.7일 후)
 * @param baseTime : 현재 시간 (작성) 혹은 과거에 게시글이 작성된 시간 (수정)
 * @returns yyyy-mm-dd HH:MM
 */
export const addTimeToDate = (addTime: DHMTime, baseTime: Date): StringDate => {
  const { day, hour, minute } = addTime;

  const newTime = new Date(baseTime);

  newTime.setDate(baseTime.getDate() + day);
  newTime.setHours(baseTime.getHours() + hour);
  newTime.setMinutes(baseTime.getMinutes() + minute);

  const newYear = newTime.getFullYear();
  const newDay = String(newTime.getDate()).padStart(2, '0');
  const newMonth = String(newTime.getMonth() + 1).padStart(2, '0');
  const newHour = String(newTime.getHours()).padStart(2, '0');
  const newMinute = String(newTime.getMinutes()).padStart(2, '0');

  return `${newYear}-${newMonth}-${newDay} ${newHour}:${newMinute}`;
};
