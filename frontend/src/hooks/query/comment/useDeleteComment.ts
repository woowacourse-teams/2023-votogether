import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment } from '@api/comment';

import { QUERY_KEY } from '@constants/queryKey';

export const useDeleteComment = (postId: number, commentId: number) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation(
    () => deleteComment(postId, commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.POSTS, postId, QUERY_KEY.COMMENTS]);
      },
      onError: error => {
        window.console.log('editComment error', error);
      },
    }
  );

  return { mutate, isLoading, isError, error };
};
