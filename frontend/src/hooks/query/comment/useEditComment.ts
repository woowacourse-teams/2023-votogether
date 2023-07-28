import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CommentRequest } from '@type/comment';

import { editComment } from '@api/comment';

import { QUERY_KEY } from '@constants/queryKey';

export const useEditComment = (postId: number, commentId: number) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation(
    (updatedComment: CommentRequest) => editComment(postId, commentId, updatedComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.POSTS, postId, QUERY_KEY.COMMENTS, commentId]);
      },
      onError: error => {
        window.console.log('editComment error', error);
      },
    }
  );

  return { mutate, isLoading, isError, error };
};
