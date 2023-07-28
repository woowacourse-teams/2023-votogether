import { CommentRequest, CommentResponse } from '@type/comment';

import { getFetch, postFetch, putFetch, deleteFetch } from '@utils/fetch';

export const getComment = async (postId: number): Promise<CommentResponse> => {
  return await getFetch<CommentResponse>(`/posts/${postId}/comments`);
};

export const createComment = async (postId: number, newComment: CommentRequest) => {
  return await postFetch(`/posts/${postId}/comments`, newComment);
};

export const editComment = async (
  postId: number,
  commentId: number,
  updatedComment: CommentRequest
) => {
  return await putFetch(`/posts/${postId}/comments/${commentId}`, updatedComment);
};

export const deleteComment = async (postId: number, commentId: number) => {
  return await deleteFetch(`/posts/${postId}/comments/${commentId}`);
};
