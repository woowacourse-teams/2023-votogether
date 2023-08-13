export const calculateDeadlineTime = (createdAt?: string, deadLine?: string) => {
  if (!createdAt || !deadLine) {
    return {
      day: 0,
      hour: 0,
      minute: 0,
    };
  }

  const createTimeNumber = new Date(createdAt);

  const deadlineTimeNumber = new Date(deadLine);

  const timeDifference = Number(deadlineTimeNumber) - Number(createTimeNumber);

  const minuteUnit = 60_000;
  const hourUnit = minuteUnit * 60;
  const dayUnit = hourUnit * 24;

  const hourTimeInMilliseconds = timeDifference % dayUnit;
  const minuteTimeInMilliseconds = hourTimeInMilliseconds % hourUnit;

  const day = Math.floor(timeDifference / dayUnit);
  const hour = Math.floor(hourTimeInMilliseconds / hourUnit);
  const minute = Math.floor(minuteTimeInMilliseconds / minuteUnit);

  return {
    day,
    hour,
    minute,
  };
};
