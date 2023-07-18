import { QUERY_KEY } from '@constants/queryKey';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { PostRequest } from '@type/post';

import { createPost } from '@api/jero/post';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation(
    (post: PostRequest) => createPost(post),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.posts]);
      },
      onError: () => {
        window.console.log('createPost error');
      },
    }
  );

  return { mutate, isLoading, isError, error };
};
