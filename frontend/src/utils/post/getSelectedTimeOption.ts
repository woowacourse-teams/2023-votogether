import { Time } from '@type/post';

import { DEADLINE_OPTION, DeadlineOptionName } from '@components/PostForm/constants';

export const getSelectedTimeOption = (time: Time): DeadlineOptionName | '사용자지정' | null => {
  if (time.day === 0 && time.hour === 0 && time.minute === 0) return null;

  return DEADLINE_OPTION.find(option => option.time === time)?.name ?? '사용자지정';
};
