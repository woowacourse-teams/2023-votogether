import { DHMTime, StringDate } from '@type/time';

import { calculateTimeGap } from '@utils/time/calculateTimeGap';
import { convertMilliSecondToDHMTime } from '@utils/time/convertMilliSecondToDHMTime';

export const calculateDeadlineDHMTime = (
  createdAt?: StringDate,
  deadLine?: StringDate
): DHMTime => {
  if (!createdAt || !deadLine) {
    return {
      day: 0,
      hour: 0,
      minute: 0,
    };
  }

  const timeGap = calculateTimeGap(createdAt, deadLine);

  return convertMilliSecondToDHMTime(timeGap);
};
