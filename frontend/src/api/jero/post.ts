import { multiPutFetch, multiPostFetch } from '@utils/fetch';

const BASE_PATH = process.env.API_URL;

export const createPost = async (newPost: FormData) => {
  return await multiPostFetch(`${BASE_PATH}/posts`, newPost);
};

export const editPost = async (postId: number, updatedPost: FormData) => {
  return await multiPutFetch(`${BASE_PATH}/posts/${postId}`, updatedPost);
};
