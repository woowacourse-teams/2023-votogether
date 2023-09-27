/**
 * 일(day)만 입력가능합니다.
 * @param days
 * @returns 초로 반환해준다.
 */
export const convertDayToSecond = (days: number) => {
  const secondsPerDay = 24 * 60 * 60;

  return secondsPerDay * days;
};
