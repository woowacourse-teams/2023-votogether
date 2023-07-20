import { VoteResult } from '@components/VoteStatistics/type';

import { getFetch } from '@utils/fetch';

export const getPostStatistics = async (postId: number): Promise<VoteResult> => {
  return await getFetch<VoteResult>(`/posts/${postId}/options`);
};

export const getOptionStatistics = async ({
  postId,
  optionId,
}: {
  postId: number;
  optionId: number;
}): Promise<VoteResult> => {
  return await getFetch<VoteResult>(`/posts/${postId}/options/${optionId}`);
};
