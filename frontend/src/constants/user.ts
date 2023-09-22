export interface TextLimit {
  MAX_LENGTH: number;
  MIN_LENGTH: number;
}

export const NICKNAME: TextLimit = {
  MAX_LENGTH: 15,
  MIN_LENGTH: 2,
} as const;

export const BIRTH_YEAR: TextLimit = {
  MAX_LENGTH: new Date().getFullYear(),
  MIN_LENGTH: 1900,
} as const;
