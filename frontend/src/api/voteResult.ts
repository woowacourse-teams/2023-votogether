import { VoteResultResponse } from '@components/VoteStatistics/type';

import { getFetch } from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_BASE_URL;

export const getPostStatistics = async (postId: number): Promise<VoteResultResponse> => {
  return await getFetch<VoteResultResponse>(`${BASE_URL}/posts/${postId}/options`);
};

export const getOptionStatistics = async ({
  postId,
  optionId,
}: {
  postId: number;
  optionId: number;
}): Promise<VoteResultResponse> => {
  return await getFetch<VoteResultResponse>(`${BASE_URL}/posts/${postId}/options/${optionId}`);
};
