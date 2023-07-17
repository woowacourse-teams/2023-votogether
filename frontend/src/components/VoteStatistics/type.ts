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

export type AgeCategory =
  | 'underTeenager'
  | 'teenager'
  | 'twenties'
  | 'thirties'
  | 'forties'
  | 'fifties'
  | 'aboveFifties';

export interface VoteResult extends VoteDetailResult {
  age: {
    underTeenager: VoteDetailResult;
    teenager: VoteDetailResult;
    twenties: VoteDetailResult;
    thirties: VoteDetailResult;
    forties: VoteDetailResult;
    fifties: VoteDetailResult;
    aboveFifties: VoteDetailResult;
  };
}
