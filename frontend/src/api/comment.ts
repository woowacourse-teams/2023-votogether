import { Comment, CommentRequest, CommentResponse } from '@type/comment';

import { getFetch, postFetch, putFetch, deleteFetch } from '@utils/fetch';

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
  const commentList = await getFetch<CommentResponse[]>(`/posts/${postId}/comments`);

  return transformCommentListResponse(commentList);
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