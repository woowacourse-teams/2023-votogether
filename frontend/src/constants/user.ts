import { UserInfoLength } from '@type/user';

export const NICKNAME: UserInfoLength = {
  MAX_LENGTH: 15,
  MIN_LENGTH: 2,
} as const;

export const BIRTH_YEAR: UserInfoLength = {
  MAX_LENGTH: new Date().getFullYear(),
  MIN_LENGTH: 1900,
} as const;
