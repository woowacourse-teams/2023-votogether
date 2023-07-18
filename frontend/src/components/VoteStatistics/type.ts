import { Size } from '@components/common/AddButton/type';

export interface GraphProps {
  voteResult: VoteResult;
  size: Size;
}

interface VoteDetailResult {
  name: string;
  total: number;
  female: number;
  male: number;
}

export const AGE_OPTION = [
  'underTeenager',
  'teenager',
  'twenties',
  'thirties',
  'forties',
  'fifties',
  'aboveFifties',
] as const;

export type AgeCategory = (typeof AGE_OPTION)[number];

export type VoteResultAge = Record<AgeCategory, VoteDetailResult>;

export interface VoteResult extends VoteDetailResult {
  age: VoteResultAge;
}
