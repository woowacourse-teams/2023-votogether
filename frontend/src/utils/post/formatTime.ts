import { Time } from '@type/post';

export function addTimeToDate(addTime: Time, baseTime: Date) {
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
}
