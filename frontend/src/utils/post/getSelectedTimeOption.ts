import { DHMTime } from '@type/time';

import { DEADLINE_OPTION, DeadlineOptionName } from '@components/PostForm/constants';

export const getSelectedDHMTimeOption = (
  time: DHMTime
): DeadlineOptionName | '사용자지정' | null => {
  if (time.day === 0 && time.hour === 0 && time.minute === 0) return null;

  const stringTime = JSON.stringify(time);

  return (
    DEADLINE_OPTION.find(option => JSON.stringify(option.time) === stringTime)?.name ?? '사용자지정'
  );
};
