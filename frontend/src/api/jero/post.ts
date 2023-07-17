import { PostRequest } from '@type/post';

import { putFetch, postFetch } from '@utils/fetch';

export const createPost = async (newPost: PostRequest) => {
  return await postFetch('/posts', newPost);
};

export const editPost = async (postId: number, updatedPost: PostRequest) => {
  return await putFetch(`/posts/${postId}`, updatedPost);
};
