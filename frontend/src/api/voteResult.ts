import { VoteResult, VoteResultResponse } from '@components/VoteStatistics/type';
import { transVoteStatisticsFormat } from '@components/VoteStatistics/util';

import { getFetch } from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_BASE_URL;

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
