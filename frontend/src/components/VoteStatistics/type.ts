import { Size } from '@type/style';

export interface GraphProps {
  ageGroup: VoteDetailResult[];
  size: Size;
}

const AGE_OPTION = ['10대 미만', '10대', '20대', '30대', '40대', '50대', '60대 이상'] as const;

export type AgeCategory = (typeof AGE_OPTION)[number];

export interface VoteDetailResult {
  name: AgeCategory;
  total: number;
  female: number;
  male: number;
}

export interface VoteResult {
  ageGroup: VoteDetailResult[];
  total: number;
  female: number;
  male: number;
}

export interface VoteDetailResultResponse {
  ageGroup: AgeCategory;
  voteCount: number;
  femaleCount: number;
  maleCount: number;
}
export interface VoteResultResponse {
  ageGroup: VoteDetailResultResponse[];
  totalVoteCount: number;
  totalFemaleCount: number;
  totalMaleCount: number;
}

export type Gender = 'FEMALE' | 'MALE';
