import { DHMTime, StringDate } from '@type/time';

import { calculateTimeGap } from '@utils/time/calculateTimeGap';
import { convertMilliSecondToDHMTime } from '@utils/time/convertMilliSecondToDHMTime';

export const calculateDeadlineDHMTime = (
  createdAt?: StringDate,
  deadline?: StringDate
): DHMTime => {
  if (!createdAt || !deadline) {
    return {
      day: 0,
      hour: 0,
      minute: 0,
    };
  }

  const timeGap = calculateTimeGap(createdAt, deadline);

  return convertMilliSecondToDHMTime(timeGap);
};
