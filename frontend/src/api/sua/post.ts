import { patchFetch, postFetch } from '@utils/fetch';

export const votePost = async (postId: number, optionId: number) => {
  return await postFetch<'', ''>(`/posts/${postId}/options/${optionId}`, '');
};

export const changeVotedOption = async (
  postId: number,
  originOptionId: number,
  newOptionId: number
) => {
  return await patchFetch(
    `/posts/${postId}/options?source=${originOptionId}&target=${newOptionId}`
  );
};
