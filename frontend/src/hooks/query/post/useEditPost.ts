import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editPost } from '@api/post';

import { QUERY_KEY } from '@constants/queryKey';

export const useEditPost = (postId: number) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isSuccess, isError, error } = useMutation(
    (updatedPost: FormData) => editPost(postId, updatedPost),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.POSTS, postId]);
      },
      onError: error => {
        window.console.log('editPost error', error);
      },
    }
  );

  return { mutate, isLoading, isSuccess, isError, error };
};
