import { useMutation, useQueryClient } from '@tanstack/react-query';

import { CommentRequest } from '@type/comment';

import { createComment } from '@api/comment';

import { QUERY_KEY } from '@constants/queryKey';

export const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation(
    (newComment: CommentRequest) => createComment(postId, newComment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.POSTS, postId, QUERY_KEY.COMMENTS]);
      },
      onError: error => {
        window.console.log('createComment error', error);
      },
    }
  );

  return { mutate, isLoading, isError, error };
};
