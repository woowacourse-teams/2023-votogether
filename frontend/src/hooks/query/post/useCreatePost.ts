import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from '@api/jero/post';

import { QUERY_KEY } from '@constants/queryKey';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError, error } = useMutation((post: FormData) => createPost(post), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.POSTS]);
    },
    onError: error => {
      window.console.log('createPost error', error);
    },
  });

  return { mutate, isLoading, isError, error };
};
