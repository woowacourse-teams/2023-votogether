interface Time {
  day: number;
  hour: number;
  minute: number;
}

export function addTimeToCurrentDate(time: Time, startTime?: string) {
  const { day, hour, minute } = time;
  if (day === 0 && hour === 0 && minute === 0) return;

  let now;
  if (startTime) now = new Date(startTime);
  else now = new Date();

  const newTime = new Date(now);
  newTime.setDate(now.getDate() + day);
  newTime.setHours(now.getHours() + hour);
  newTime.setMinutes(now.getMinutes() + minute);

  const newYear = newTime.getFullYear();
  const newDay = String(newTime.getDate()).padStart(2, '0');
  const newMonth = String(newTime.getMonth() + 1).padStart(2, '0');
  const newHour = String(newTime.getHours()).padStart(2, '0');
  const newMinute = String(newTime.getMinutes()).padStart(2, '0');

  return `${newYear}-${newMonth}-${newDay} ${newHour}:${newMinute}`;
}

export function formatTimeWithOption(option: string) {
  if (option === '10분') return { day: 0, hour: 0, minute: 10 };
  else if (option === '30분') return { day: 0, hour: 0, minute: 30 };
  else if (option === '1시간') return { day: 0, hour: 1, minute: 0 };
  else if (option === '6시간') return { day: 0, hour: 6, minute: 0 };
  else return { day: 1, hour: 0, minute: 0 };
}
