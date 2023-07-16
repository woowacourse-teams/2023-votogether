interface VoteDetailResult {
  name: string;
  total: number;
  female: number;
  male: number;
}

export type AgeCategory =
  | 'underTeenager'
  | 'teenager'
  | 'twenites'
  | 'thirites'
  | 'fourties'
  | 'fifties'
  | 'aboveFifties';

export interface VoteResult extends VoteDetailResult {
  age: {
    underTeenager: VoteDetailResult;
    teenager: VoteDetailResult;
    twenites: VoteDetailResult;
    thirites: VoteDetailResult;
    fourties: VoteDetailResult;
    fifties: VoteDetailResult;
    aboveFifties: VoteDetailResult;
  };
}
