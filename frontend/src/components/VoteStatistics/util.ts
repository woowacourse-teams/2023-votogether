import { VoteResult, VoteResultResponse, VoteDetailResultResponse, VoteDetailResult } from './type';

const transDetailVoteStatisticsFormat = (
  voteResult: VoteDetailResultResponse
): VoteDetailResult => {
  const { ageGroup, femaleCount, maleCount, voteCount } = voteResult;

  return { name: ageGroup, female: femaleCount, male: maleCount, total: voteCount };
};

export const transVoteStatisticsFormat = (voteResult: VoteResultResponse): VoteResult => {
  const { ageGroup, totalFemaleCount, totalMaleCount, totalVoteCount } = voteResult;

  const newAgeGroup = ageGroup.map(ageResult => transDetailVoteStatisticsFormat(ageResult));

  return {
    ageGroup: newAgeGroup,
    female: totalFemaleCount,
    male: totalMaleCount,
    total: totalVoteCount,
  };
};
