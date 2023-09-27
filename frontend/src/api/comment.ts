import { Comment } from '@type/comment';

import { getFetch, postFetch, putFetch, deleteFetch } from '@utils/fetch';

const BASE_URL = process.env.VOTOGETHER_BASE_URL ?? '';

export interface CommentResponse {
  id: number;
  member: {
    id: number;
    nickname: string;
  };
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type CommentRequest = Pick<CommentResponse, 'content'>;

export const transformCommentListResponse = (commentList: CommentResponse[]): Comment[] => {
  return commentList.map(comment => ({
    id: comment.id,
    content: comment.content,
    createdAt: comment.createdAt,
    member: comment.member,
    isEdit: comment.createdAt !== comment.updatedAt,
  }));
};

export const getCommentList = async (postId: number): Promise<Comment[]> => {
  const commentList = await getFetch<CommentResponse[]>(`${BASE_URL}/posts/${postId}/comments`);

  return transformCommentListResponse(commentList);
};

export const createComment = async (postId: number, newComment: CommentRequest) => {
  return await postFetch(`${BASE_URL}/posts/${postId}/comments`, newComment);
};

export const editComment = async (
  postId: number,
  commentId: number,
  updatedComment: CommentRequest
) => {
  return await putFetch(`${BASE_URL}/posts/${postId}/comments/${commentId}`, {
    content: updatedComment.content,
  });
};

export const deleteComment = async (postId: number, commentId: number) => {
  return await deleteFetch(`${BASE_URL}/posts/${postId}/comments/${commentId}`);
};
