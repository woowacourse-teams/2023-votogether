import { PostInfo } from '@type/post';

import {
  getFetch,
  patchFetch,
  postFetch,
  multiPutFetch,
  multiPostFetch,
  deleteFetch,
} from '@utils/fetch';

const BASE_URL = process.env.API_URL;

export const votePost = async (postId: number, optionId: number) => {
  return await postFetch(`/posts/${postId}/options/${optionId}`, '');
};

const BASE_URL = process.env.API_URL;

interface OptionData {
  originOptionId: number;
  newOptionId: number;
}

export const changeVotedOption = async (postId: number, optionData: OptionData) => {
  return await patchFetch(
    `/posts/${postId}/options?source=${optionData.originOptionId}&target=${optionData.newOptionId}`
  );
};

export const getPost = async (postId: number): Promise<PostInfo> => {
  return await getFetch<PostInfo>(`/posts/${postId}`);
};

export const createPost = async (token: string, newPost: FormData) => {
  return await multiPostFetch(token, `${BASE_URL}/posts`, newPost);
};

export const editPost = async (postId: number, updatedPost: FormData) => {
  return await multiPutFetch(`http://3.35.232.54/api/posts/${postId}`, updatedPost);
};

export const removePost = async (postId: number) => {
  return await deleteFetch(`/posts/${postId}`);
};

export const setEarlyClosePost = async (postId: number) => {
  return await patchFetch(`/posts/${postId}/close`);
};
