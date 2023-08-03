import { VoteResult } from '@components/VoteStatistics/type';

import { getFetch } from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_BASE_URL;

export const getPostStatistics = async (postId: number): Promise<VoteResult> => {
  return await getFetch<VoteResult>(`${BASE_URL}/posts/${postId}/options`);
};

export const getOptionStatistics = async ({
  postId,
  optionId,
}: {
  postId: number;
  optionId: number;
}): Promise<VoteResult> => {
  return await getFetch<VoteResult>(`${BASE_URL}/posts/${postId}/options/${optionId}`);
};
