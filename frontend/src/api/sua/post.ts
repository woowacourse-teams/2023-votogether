import { PostInfo } from '@type/post';

import { getFetch, patchFetch, postFetch } from '@utils/fetch';

export const votePost = async (postId: number, optionId: number) => {
  return await postFetch(`/posts/${postId}/options/${optionId}`, '');
};

interface ChangeVotedOptionProps {
  postId: number;
  optionData: { originOptionId: number; newOptionId: number };
}

export const changeVotedOption = async ({ postId, optionData }: ChangeVotedOptionProps) => {
  return await patchFetch(
    `/posts/${postId}/options?source=${optionData.originOptionId}&target=${optionData.newOptionId}`
  );
};

export const getVoteDetail = async (postId: number): Promise<PostInfo> => {
  return await getFetch<PostInfo>(`/posts/${postId}`);
};
