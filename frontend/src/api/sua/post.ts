import { PostInfo } from '@type/post';

import { deleteFetch, getFetch, patchFetch, postFetch } from '@utils/fetch';

export const votePost = async (postId: number, optionId: number) => {
  return await postFetch(`/posts/${postId}/options/${optionId}`, '');
};

export const changeVotedOption = async (
  postId: number,
  { originOptionId, newOptionId }: { originOptionId: number; newOptionId: number }
) => {
  return await patchFetch(
    `/posts/${postId}/options?source=${originOptionId}&target=${newOptionId}`
  );
};

export const getPost = async (postId: number): Promise<PostInfo> => {
  return await getFetch<PostInfo>(`/posts/${postId}`);
};

export const removePost = async (postId: number) => {
  return await deleteFetch(`/posts/${postId}`);
};

export const setEarlyClosePost = async (postId: number) => {
  return await patchFetch(`/posts/${postId}/close`);
};
