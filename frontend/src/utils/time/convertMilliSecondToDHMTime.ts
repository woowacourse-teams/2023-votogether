import { DHMTime } from '@type/time';

export const convertMilliSecondToDHMTime = (milliSecond: number): DHMTime => {
  const minuteUnit = 60_000;
  const hourUnit = minuteUnit * 60;
  const dayUnit = hourUnit * 24;

  const hourTimeInMilliseconds = milliSecond % dayUnit;
  const minuteTimeInMilliseconds = hourTimeInMilliseconds % hourUnit;

  const day = Math.floor(milliSecond / dayUnit);
  const hour = Math.floor(hourTimeInMilliseconds / hourUnit);
  const minute = Math.floor(minuteTimeInMilliseconds / minuteUnit);

  return {
    day,
    hour,
    minute,
  };
};
