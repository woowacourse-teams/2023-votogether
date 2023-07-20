import { PostInfo } from '@type/post';

import { getFetch, patchFetch, postFetch, multiPutFetch, multiPostFetch } from '@utils/fetch';

export const votePost = async (postId: number, optionId: number) => {
  return await postFetch(`/posts/${postId}/options/${optionId}`, '');
};

interface OptionData {
  originOptionId: number;
  newOptionId: number;
}

export const changeVotedOption = async (postId: number, optionData: OptionData) => {
  return await patchFetch(
    `/posts/${postId}/options?source=${optionData.originOptionId}&target=${optionData.newOptionId}`
  );
};

export const getVoteDetail = async (postId: number): Promise<PostInfo> => {
  return await getFetch<PostInfo>(`/posts/${postId}`);
};

export const createPost = async (newPost: FormData) => {
  return await multiPostFetch('/posts', newPost);
};

export const editPost = async (postId: number, updatedPost: FormData) => {
  return await multiPutFetch(`/posts/${postId}`, updatedPost);
};
