import { DHMTime } from '@type/time';

export type DeadlineOptionName = '1일' | '3일' | '5일' | '7일' | '14일';

export interface DeadlineOptionInfo {
  name: DeadlineOptionName;
  time: DHMTime;
}

export const DEADLINE_OPTION: DeadlineOptionInfo[] = [
  {
    name: '1일',
    time: {
      day: 1,
      hour: 0,
      minute: 0,
    },
  },
  {
    name: '3일',
    time: {
      day: 3,
      hour: 0,
      minute: 0,
    },
  },
  {
    name: '5일',
    time: {
      day: 5,
      hour: 0,
      minute: 0,
    },
  },
  {
    name: '7일',
    time: {
      day: 7,
      hour: 0,
      minute: 0,
    },
  },
  {
    name: '14일',
    time: {
      day: 14,
      hour: 0,
      minute: 0,
    },
  },
];
