import { multiPutFetch, multiPostFetch } from '@utils/fetch';

export const createPost = async (newPost: FormData) => {
  return await multiPostFetch('/posts', newPost);
};

export const editPost = async (postId: number, updatedPost: FormData) => {
  return await multiPutFetch(`/posts/${postId}`, updatedPost);
};

// husky hook test;
