import { VoteDetailResult, VoteResultResponse } from '@components/VoteStatistics/type';

export const MOCK_VOTE_RESULT: VoteResultResponse = {
  totalVoteCount: 100,
  totalFemaleCount: 30,
  totalMaleCount: 70,
  ageGroup: [
    { voteCount: 10, femaleCount: 10, maleCount: 0, ageGroup: '10대 미만' },
    { voteCount: 20, femaleCount: 10, maleCount: 10, ageGroup: '10대' },
    { voteCount: 10, femaleCount: 2, maleCount: 8, ageGroup: '20대' },
    { voteCount: 20, femaleCount: 16, maleCount: 4, ageGroup: '30대' },
    { voteCount: 40, femaleCount: 30, maleCount: 10, ageGroup: '40대' },
    { voteCount: 2, femaleCount: 1, maleCount: 1, ageGroup: '50대' },
    { voteCount: 3, femaleCount: 2, maleCount: 1, ageGroup: '60대 이상' },
  ],
};

export const MOCK_DETAIL_VOTE_RESULT: VoteDetailResult[] = [
  { total: 10, female: 10, male: 0, name: '10대 미만' },
  { total: 20, female: 10, male: 10, name: '10대' },
  { total: 10, female: 2, male: 8, name: '20대' },
  { total: 20, female: 16, male: 4, name: '30대' },
  { total: 40, female: 30, male: 10, name: '40대' },
  { total: 2, female: 1, male: 1, name: '50대' },
  { total: 3, female: 2, male: 1, name: '60대 이상' },
];
