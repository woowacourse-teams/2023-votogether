import { MAX_DEADLINE } from '@constants/policy';

export const TIMEBOX_CHILD_HEIGHT = 33;

export const TIME_UNIT: { [key: string]: number } = {
  day: MAX_DEADLINE,
  hour: 24,
  minute: 60,
};

export const TIME_KOREAN: { [key: string]: string } = {
  day: '일',
  hour: '시간',
  minute: '분',
};
