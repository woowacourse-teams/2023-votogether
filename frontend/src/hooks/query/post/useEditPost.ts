import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editPost } from '@api/jero/post';

export const useEditPost = (postId: number) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation(
    (updatedPost: FormData) => editPost(postId, updatedPost),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.posts, postId]);
      },
      onError: () => {
        window.console.log('editPost error');
      },
    }
  );

  return { mutate, isLoading, isError, error };
};
