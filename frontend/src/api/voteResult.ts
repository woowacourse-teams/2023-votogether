import {
  VoteDetailResult,
  VoteDetailResultResponse,
  VoteResult,
  VoteResultResponse,
} from '@components/VoteStatistics/type';

import { getFetch } from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_BASE_URL;

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

export const getPostStatistics = async (postId: number): Promise<VoteResult> => {
  const data = await getFetch<VoteResultResponse>(`${BASE_URL}/posts/${postId}/options`);

  return transVoteStatisticsFormat(data);
};

export const getOptionStatistics = async ({
  postId,
  optionId,
}: {
  postId: number;
  optionId: number;
}): Promise<VoteResult> => {
  const data = await getFetch<VoteResultResponse>(
    `${BASE_URL}/posts/${postId}/options/${optionId}`
  );

  return transVoteStatisticsFormat(data);
};
