import { PostInfo } from '@type/post';

import {
  getFetch,
  patchFetch,
  postFetch,
  multiPutFetch,
  multiPostFetch,
  deleteFetch,
} from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_BASE_URL;

export const votePost = async (postId: number, optionId: number) => {
  return await postFetch(`${BASE_URL}/posts/${postId}/options/${optionId}`, '');
};

interface OptionData {
  originOptionId: number;
  newOptionId: number;
}

export const changeVotedOption = async (postId: number, optionData: OptionData) => {
  return await patchFetch(
    `${BASE_URL}/posts/${postId}/options?source=${optionData.originOptionId}&target=${optionData.newOptionId}`
  );
};

export const getPost = async (postId: number): Promise<PostInfo> => {
  return await getFetch<PostInfo>(`${BASE_URL}/posts/${postId}`);
};

export const createPost = async (newPost: FormData) => {
  return await multiPostFetch(`${BASE_URL}/posts`, newPost);
};

export const editPost = async (postId: number, updatedPost: FormData) => {
  return await multiPutFetch(`${BASE_URL}/posts/${postId}`, updatedPost);
};

export const removePost = async (postId: number) => {
  return await deleteFetch(`${BASE_URL}/posts/${postId}`);
};

export const setEarlyClosePost = async (postId: number) => {
  return await patchFetch(`${BASE_URL}/posts/${postId}/close`);
};
