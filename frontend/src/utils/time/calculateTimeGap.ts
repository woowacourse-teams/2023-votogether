import { StringDate } from '@type/time';

export const calculateTimeGap = (beforeTime: StringDate, afterTime: StringDate) => {
  const beforeTimeDate = new Date(beforeTime);
  const afterTimeDate = new Date(afterTime);

  return Number(afterTimeDate) - Number(beforeTimeDate);
};
